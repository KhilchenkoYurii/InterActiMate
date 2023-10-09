import { useEffect, useState } from 'react';
import EditIcon from '../../assets/icons/Edit_fill.svg';
import apiService from '../../services/api.service';

export interface IUser {
  _id: string;
  userId: string;
  nickname: string;
  name: string;
  surname: string;
  email: string;
  bio: string;
  createdPosts: string[];
  answeredPosts: string[];
  chats: [];
  showOnlyNickname: boolean;
  avatar: string;
  favoritePosts: string[];
  phone: string;
}

interface IField {
  field: string;
  name: string;
}

const MyProfile = (user: IUser) => {
  const [isEdit, setIsEdit] = useState(false);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (isEdit) {
      setName(user.name);
      setSurname(user.surname);
      setNickname(user.nickname);
      setEmail(user.email);
      setPhone(user.phone);
      setBio(user.bio);
    }
  }, [isEdit]);

  const editData = async () => {
    await apiService.put('users/updateMe', {
      name,
      surname,
      nickname,
      email,
      phone,
      bio,
    });

    setIsEdit(false);
  };

  const getFieldView = (fieldProp: IField, onChange: any, value: string) => {
    if (fieldProp.field)
      return (
        <div className="flex flex-wrap gap-10 break-all align-middle items-center">
          <div className="font-bold text-[#176b87] min-w-[5rem]">
            {fieldProp.name}
          </div>
          {!isEdit && fieldProp.field}
          {isEdit && (
            <input
              onChange={(e) => onChange(e.target.value)}
              value={value}
              type="text"
              className="`w-full bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] px-3 outline-0 resize-none`"
            />
          )}
        </div>
      );
  };
  return (
    <div className="card-container mx-3">
      <div className="flex flex-row gap-2 whitespace-normal">
        {/* Avatar */}
        <div className="max-w-[20rem] relative">
          <img
            src={user.avatar}
            alt="Profile Avatar"
            className="min-w-[10rem]  rounded-[4px]"
          />
          {isEdit && (
            <img
              className="absolute bottom-[-1rem] right-[-1rem] shadow-md rounded-full p-1 bg-[white] cursor-pointer"
              src={EditIcon}
              alt="Edit"
            />
          )}
        </div>
        {/* Rest Info */}
        <div className="flex flex-col w-full mx-10">
          <div className="w-full font-bold text-[#176b87] text-[2rem] flex justify-center text-center items-center gap-2">
            {!isEdit && (
              <div>
                {user.name} {user.surname}
              </div>
            )}
            {isEdit && (
              <div className="flex gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="max-w-[10rem] bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] px-3 outline-0 resize-none"
                />
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="max-w-[10rem] bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] px-3 outline-0 resize-none"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col text-start  my-2 opacity-70">
            <span>Основна інформація</span>
            <hr />
          </div>
          <div className="flex flex-col text-start gap-1 ">
            {getFieldView(
              { field: user.nickname, name: 'Nickname' },
              setNickname,
              nickname,
            )}
            {getFieldView(
              { field: user.email, name: 'Email' },
              setEmail,
              email,
            )}
            {getFieldView(
              { field: user.phone, name: 'Phone' },
              setPhone,
              phone,
            )}
            {getFieldView({ field: user.bio, name: 'Bio' }, setBio, bio)}
          </div>
          <div className="flex flex-col text-start  my-2 opacity-70">
            <span>Дії</span>
            <hr />
          </div>
          <div className="mt-3">
            {!isEdit ? (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEdit(true)}
                  className="text-[white] bg-[#176b87] rounded-[4px] flex justify-center items-center h-10 max-w-[10rem]"
                >
                  Редагувати
                </button>
                <button
                  type="button"
                  className="text-[white] bg-[#d32f2f] rounded-[4px] flex justify-center items-center h-10 max-w-[10rem]"
                >
                  Деактивувати
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={editData}
                className="text-[white] bg-[#176b87] rounded-[4px] flex justify-center items-center h-10 max-w-[10rem]"
              >
                Зберегти зміни
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
