import { useEffect, useState } from 'react';
import AddIcon from '../../assets/icons/plus-filled.svg';
import RemoveIcon from '../../assets/icons/Remove_fill.svg';
import PublishIcon from '../../assets/icons/Publish.svg';

interface INoteView {
  text: string;
  className: string;
}

export interface IAttachments {
  address: string;
  alt: string;
  file?: any;
}

interface IFile {
  file: any;
  address: string;
}

const AddEditRequest = ({ onSubmit }: any) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [href, setHref] = useState<string>('');
  const [file, setFile] = useState<IFile>();
  const [attachments, setAttachments] = useState<IAttachments[]>([]);
  const [currCategorie, setCurrCategorie] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setErrors] = useState({ title: true });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (error && title && body) onSubmit(title, body, attachments, categories);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const isUrlImage = (url: string) => {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onerror = () => resolve(false);
      img.onload = () => resolve(true);
    });
  };

  const removeItem = (index: number, isAttachments: boolean) => {
    let temp = [...(isAttachments ? attachments : categories)] as any;
    temp.splice(index, 1);
    isAttachments ? setAttachments(temp) : setCategories(temp);
  };

  useEffect(() => {
    if (file)
      setAttachments((prev: any): any => [
        ...prev,
        { ...file, alt: `Photo ${file.address}` },
      ]);
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
    <form action="addRequest" onSubmit={handleSubmit}>
      <div className="card-container relative mx-3">
        <div className="pt-10 pb-1">
          {getBlockTitleView('Основна інформація')}
          <div className="flex flex-col gap-3">
            <div>
              <input
                type="text"
                value={title}
                required
                onChange={(e: any) => {
                  if (e.target.value.split('').length < 37) {
                    setErrors((prev: any) => ({
                      ...prev,
                      title: true,
                    }));
                    setTitle(e.target.value);
                  } else {
                    setErrors((prev: any) => ({
                      ...prev,
                      title: false,
                    }));
                  }
                }}
                className={`w-full bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] p-[10px] outline-0 resize-none ${
                  !error.title && 'border-[red]'
                }`}
                placeholder="Назва"
              />
              {!error.title && (
                <span className="text-red-600 font-light text-sm justify-start flex">
                  Довжина не більше 37 символів
                </span>
              )}
            </div>
            <div>
              <textarea
                className={`w-full bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] p-[10px] outline-0 resize-none`}
                name="Body"
                id="Body"
                required
                value={body}
                onChange={(e: any) => setBody(e.target.value)}
                placeholder="Опис"
                rows={10}
              ></textarea>
            </div>
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
              onChange={(e) =>
                !/\s/g.test(currCategorie) &&
                setCurrCategorie(e.target.value.replace(/\s/g, ''))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && currCategorie !== '') {
                  e.preventDefault();
                  setCategories((prev: any): any => [...prev, currCategorie]);
                  setCurrCategorie('');
                }
              }}
              className="w-full bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] p-[10px] outline-0 resize-none"
              placeholder="Категорії"
            />
            {getNoteView({
              text: '(Щоб додати категорію натисніть Enter, пробіл заборонений)',
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
                  setAttachments((prev: any): any => [
                    ...prev,
                    { address: href, alt: `Photo ${href}` },
                  ]);
                  setHref('');
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
                      setFile({
                        file: e.target.files[0],
                        address: URL.createObjectURL(e.target.files[0]),
                      } as IFile);
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
                <div key={img.alt} className="max-w-[11rem] h-[10rem] relative">
                  <div
                    className="select-none text-white flex justify-center align-middle text-center items-center font-extrabold absolute rounded-md top-0 left-0 bg-[black] w-full duration-500 cursor-pointer h-full opacity-0 hover:opacity-50"
                    onClick={() => removeItem(index, true)}
                  >
                    <img src={RemoveIcon} alt="RemoveIcon" />
                  </div>
                  <img
                    src={img.address}
                    alt={img.alt}
                    className="h-full rounded-md object-cover select-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="my-3 flex justify-end mx-3">
        <button
          type="submit"
          onKeyDown={handleKeyDown}
          className="text-[white] bg-[#176b87] rounded-[4px] flex justify-center items-center h-10 max-w-[10rem]"
        >
          Опублікувати
          <img className="p-1 max-h-9" src={PublishIcon} alt="Publish" />
        </button>
      </div>
    </form>
  );
};

export default AddEditRequest;
