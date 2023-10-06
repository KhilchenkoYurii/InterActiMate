import { useEffect, useState } from 'react';
import AddIcon from '../../assets/icons/plus-filled.svg';
import RemoveIcon from '../../assets/icons/Remove_fill.svg';

interface INoteView {
  text: string;
  className: string;
}

const AddEditRequest = () => {
  const [href, setHref] = useState('');
  const [file, setFile] = useState(undefined);
  const [attachments, setAttachments] = useState([]);
  const [currCategorie, setCurrCategorie] = useState('');
  const [categories, setCategories] = useState([]);

  const isUrlImage = (url: string) => {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onerror = () => resolve(false);
      img.onload = () => resolve(true);
    });
  };

  const removeItem = (index: number, isAttachments: boolean) => {
    let temp = [...(isAttachments ? attachments : categories)];
    temp.splice(index, 1);
    isAttachments ? setAttachments(temp) : setCategories(temp);
  };

  useEffect(() => {
    if (file) setAttachments((prev: any): any => [...prev, file]);
  }, [file]);

  const getBlockTitleView = (title: string) => {
    return (
      <div className="absolute top-0 left-0 text-[#176b87] bg-[#DAFFFB] p-2 mb-3 rounded-br-md">
        {title}
      </div>
    );
  };

  const getNoteView = ({ text, className }: INoteView) => {
    return <span className={className}>{text}</span>;
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
          {getBlockTitleView('Категорії')}
          <div className="flex flex-col gap-1 text-left">
            <input
              type="text"
              value={currCategorie}
              onChange={(e) => setCurrCategorie(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && currCategorie !== '') {
                  let temp = currCategorie.split(' ');
                  if (temp.length > 0) {
                    setCategories((prev: any): any => [...prev, ...temp]);
                  } else {
                    setCategories((prev: any): any => [...prev, currCategorie]);
                  }
                  setCurrCategorie('');
                }
              }}
              className="w-full bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] p-[10px] outline-0 resize-none"
              placeholder="Категорії"
            />
            {getNoteView({
              text: '(Щоб додати категорії натисніть Enter)',
              className: 'text-[#176b87] font-extralight text-sm',
            })}
            <div className="card-categories">
              {categories.map((categorie: string, index: number) => (
                <div onClick={() => removeItem(index, false)} key={index}>
                  {categorie}
                </div>
              ))}
            </div>
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
              onClick={async () => {
                let isUrlValid = await isUrlImage(href);
                if (href !== '' && isUrlValid) {
                  setAttachments((prev: any): any => [...prev, href]);
                }
              }}
              className="cursor-pointer select-none"
            />
          </div>
          <div>
            або
            <br />
            <div className="flex flex-row flex-wrap justify-center items-center">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e: any) => {
                  if (e.target.files && e.target.files[0]) {
                    let fileType = e.target.files[0].type.split('/').pop();
                    if (fileType === 'jpeg' || fileType === 'png')
                      setFile(URL.createObjectURL(e.target.files[0]) as any);
                  }
                }}
                placeholder="Посилання"
              />
              {getNoteView({
                text: '(Підтримує лише .jpg, .png формати)',
                className: 'text-[#176b87] font-extralight',
              })}
            </div>
          </div>
          {attachments?.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {attachments.map((img, index) => (
                <div className="max-w-[11rem] h-[10rem] relative">
                  <div
                    className="select-none text-white flex justify-center align-middle text-center items-center font-extrabold absolute rounded-md top-0 left-0 bg-[black] w-full duration-500 cursor-pointer h-full opacity-0 hover:opacity-50"
                    onClick={() => removeItem(index, true)}
                  >
                    <img src={RemoveIcon} alt="RemoveIcon" />
                  </div>
                  <img
                    src={img}
                    alt={img}
                    className="h-full rounded-md object-cover select-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEditRequest;
