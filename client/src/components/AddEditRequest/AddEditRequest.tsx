import { useState } from 'react';
import AddIcon from '../../assets/icons/plus-filled.svg';
import RemoveIcon from '../../assets/icons/Remove_fill.svg';

const AddEditRequest = () => {
  const [href, setHref] = useState('');
  const [file, setFile] = useState(undefined);
  console.log('file :', file);
  const [attachments, setAttachments] = useState([]);

  const getBlockTitleView = (title: string) => {
    return (
      <div className="absolute top-0 left-0 text-[#176b87] bg-[#DAFFFB] p-2 mb-3 rounded-br-md">
        {title}
      </div>
    );
  };

  return (
    <div>
      <div className="card-container relative mx-3">
        <div className="pt-10 pb-1">
          {getBlockTitleView('Основна інформація')}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              className="w-full bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] p-[10px] outline-0 resize-none"
              placeholder="Назва"
            />

            <textarea
              className="w-full bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] p-[10px] outline-0 resize-none"
              name="Body"
              id="Body"
              placeholder="Опис"
              rows={10}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="card-container relative mx-3">
        <div className="pt-10 pb-1">
          {getBlockTitleView('Фото')}
          <div className="flex flex-row gap-2">
            <input
              type="text"
              value={href}
              onChange={(e: any) => setHref(e.target.value)}
              className="w-full bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] p-[10px] outline-0 resize-none"
              placeholder="Посилання"
            />
            <img
              src={AddIcon}
              alt="Add"
              onClick={() =>
                setAttachments((prev: any): any => [...prev, href])
              }
              className="cursor-pointer"
            />
          </div>
          <div>
            або
            <br />
            <input
              type="file"
              value={file}
              onChange={(e: any) => setFile(e.target.value)}
              placeholder="Посилання"
            />
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {attachments?.length > 0 &&
              attachments.map((img, index) => (
                <div className="max-w-[11rem] h-[10rem] relative">
                  <div
                    className="text-white flex justify-center align-middle text-center items-center font-extrabold absolute rounded-md top-0 left-0 bg-[black] w-full duration-500 cursor-pointer h-full opacity-0 hover:opacity-50"
                    onClick={() => {
                      let temp = [...attachments];
                      temp.splice(index, 1);
                      setAttachments(temp);
                    }}
                  >
                    <img src={RemoveIcon} alt="RemoveIcon" />
                  </div>
                  <img
                    src={img}
                    alt={img}
                    className="h-full rounded-md object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditRequest;
