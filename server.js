const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const connectDb = require('./server/configs/connectDb');
const app = require('./app');
const messageController = require('./server/controllers/messageController');
const leaveChat = require('./server/utils/leaveChat');

dotenv.config({ path: './config.env' });
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN...');
  process.exit(1);
});
connectDb();
let server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room
let chatRoomUsers;
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // We can write our socket event listeners in here...
  socket.on('join_chat', (data) => {
    const { username, chatId } = data; // Data sent from client when join_room event emitted
    socket.join(chatId); // Join the user to a socket room
    // Save the new user to the room
    chatRoom = chatId;
    allUsers.push({ id: socket.id, username, chatId });
    chatRoomUsers = allUsers.filter((user) => user.chatId === chatId);
    socket.to(chatId).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
    const previousMessages = messageController.getMessagesForChat(chatId);
    socket.emit('previous_messages', previousMessages);
  });
  socket.on('send_message', (data) => {
    const { message, username, chatId, createdTime } = data;
    io.in(chatId).emit('receive_message', data); // Send to all users in room, including sender
    messageController.createMessageFromChat(
      message,
      username,
      chatId,
      createdTime,
    );
  });
  socket.on('leave_chat', (data) => {
    const { chatId } = data;
    socket.leave(chatId);
    // Remove user from memory
    allUsers = leaveChat(socket.id, allUsers);
    socket.to(chatId).emit('chatroom_users', allUsers);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected from the chat');
    const user = allUsers.find((userOne) => userOne.id === socket.id);
    if (user.username) {
      allUsers = leaveChat(socket.id, allUsers);
      socket.to(chatRoom).emit('chatroom_users', allUsers);
    }
  });
});
const port = process.env.PORT || 7000;
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  server = server.listen(port, () =>
    console.log(`Server running on port ${port}`),
  );
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTED! SHUTTING DOWN...');
  server.close(() => {
    process.exit(1);
  });
});
