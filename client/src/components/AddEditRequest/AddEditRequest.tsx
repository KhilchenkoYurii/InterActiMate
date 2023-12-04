import { useEffect, useState } from 'react';
import AddIcon from '../../assets/icons/plus-filled.svg';
import RemoveIcon from '../../assets/icons/Remove_fill.svg';
import CrossIcon from '../../assets/icons/Close_square_fill.svg';
import PublishIcon from '../../assets/icons/Publish.svg';
import apiService from '../../services/api.service';
import { useSearchParams } from 'react-router-dom';
import { IRequest } from '../RequestCard/RequestCard';
import { useNavigate } from 'react-router-dom';
import { TitleWithIcons } from '../PageTitleWithIcons/TitleWithIcons';
import { CircularProgress } from '@mui/material';

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
  const maxTitleLength = 50;

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  // const [href, setHref] = useState<string>('');
  const [file, setFile] = useState<IFile>();
  const [attachments, setAttachments] = useState<IAttachments[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [defCategories, setDefCategories] = useState<string[]>([]);
  const [error, setErrors] = useState({ title: true });
  const [searchParams] = useSearchParams();
  const [isEdit, setIsEdit] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const {
        data: {
          data: { categories },
        },
      } = await apiService.get(`categories`);

      setDefCategories([...categories.map((e: any) => e.name)]);
    })();
  }, []);

  useEffect(() => {
    let postId = searchParams.get('postId');
    if (postId) {
      setIsEdit(true);
      (async () => {
        const {
          data: {
            data: { post },
          },
        }: { data: { data: { post: IRequest } } } = await apiService.get(
          `posts/${postId}`,
        );
        setTitle(post.title);
        setBody(post.body);
        setCategories(post.categories);
        setAttachments(post.attachments);
      })();
    }
  }, [searchParams]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (error && title && body)
      onSubmit(title, body, attachments, categories, isEdit);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const getImgUrl = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const {
        data: {
          data: { url },
        },
      } = await apiService.post('aws/getFileURL', formData);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSave = async () => {
  //   let postId = searchParams.get('postId');
  //   console.log('postId :', postId);
  //   if (postId) {
  //     let bodyToSend = {
  //       title,
  //       body,
  //       attachments,
  //       categories,
  //     };
  //     await apiService.put(`posts/${postId}`, bodyToSend);
  //     nav('/');
  //   }
  // };

  // const isUrlImage = (url: string) => {
  //   const img = new Image();
  //   img.src = url;
  //   return new Promise((resolve) => {
  //     img.onerror = () => resolve(false);
  //     img.onload = () => resolve(true);
  //   });
  // };

  const removeItem = (index: number, isAttachments: boolean) => {
    let temp = [...(isAttachments ? attachments : categories)] as any;
    if (!isAttachments) {
      setDefCategories((prev) => [...prev, categories[index]]);
    }
    temp.splice(index, 1);
    isAttachments ? setAttachments(temp) : setCategories(temp);
  };

  const addCategorie = (elem: string, index: number) => {
    setCategories((prev: any): any => [...prev, elem]);
    defCategories.splice(index, 1);
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
    <div>
      <TitleWithIcons
        title={isEdit ? 'Редагувати оголошення' : 'Створити оголошення'}
      />
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
                    if (e.target.value.split('').length < maxTitleLength) {
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
                    Довжина не більше {maxTitleLength} символів
                  </span>
                )}
              </div>
              <div>
                <textarea
                  className={`w-full bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] p-[10px] outline-0 resize-none`}
                  name="Body"
                  required
                  id="Body"
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
            {/* DefCategories */}
            {defCategories.length > 0 && (
              <div className="text-[25px] mb-3">
                Натисніть будь ласка лапкою щоб додати існуючу категорію
              </div>
            )}
            <div className="flex flex-col gap-1 text-left">
              <div className="card-categories">
                {defCategories.map((categorie: string, index: number) => (
                  <span
                    className="flex flex-row-reverse svg-hover select-none cursor-pointer"
                    onClick={() => addCategorie(categorie, index)}
                  >
                    <div className="flex justify-center text-center items-center gap-1">
                      {categorie}
                      <span key={index}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18Z"
                            fill="#176B87"
                          />
                        </svg>
                      </span>
                    </div>
                  </span>
                ))}
              </div>
            </div>
            {/* Categories */}
            {categories.length > 0 && (
              <div>
                {defCategories.length > 0 && <hr className="mt-5" />}
                <div className="text-[25px]">Додані категорії</div>
              </div>
            )}
            <div className="flex flex-col gap-1 text-left">
              <div className="card-categories">
                {categories.map((categorie: string, index: number) => (
                  <span
                    className="relative mr-1 mt-1"
                    onClick={() => removeItem(index, false)}
                  >
                    <span
                      className="absolute select-none top-[-10px] right-[-10px] cursor-pointer"
                      key={index}
                    >
                      <img
                        src={CrossIcon}
                        alt="RemoveIcon"
                        className="max-w-[1.3rem]"
                      />
                    </span>
                    <div>{categorie}</div>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card-container relative mx-3">
          <div className="pt-10 pb-1">
            {getBlockTitleView('Фото')}
            {/* <div className="flex flex-row gap-2">
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
          </div> */}
            <div>
              {/* або
            <br /> */}

              <div className="flex flex-row flex-wrap justify-center items-center">
                <div className="mx-3">
                  {isImgLoading && <CircularProgress size={20} />}
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={async (e: any) => {
                    if (e.target.files && e.target.files[0]) {
                      let fileType = e.target.files[0].type.split('/').pop();
                      if (fileType === 'jpeg' || fileType === 'png') {
                        let url: string = await getImgUrl(e.target.files[0]);
                        setIsImgLoading(true);
                        setTimeout(() => {
                          setIsImgLoading(false);
                          setFile({
                            file: e.target.files[0],
                            address: url,
                          } as IFile);
                        }, 1500);
                      }
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
                  <div
                    key={index}
                    onClick={() => removeItem(index, true)}
                    className="max-w-[11rem] h-[10rem] relative"
                  >
                    <span
                      className="block md:hidden absolute select-none top-[-10px] right-[-10px] cursor-pointer"
                      key={index}
                    >
                      <img
                        src={CrossIcon}
                        alt="RemoveIcon"
                        className="max-w-[1.3rem]"
                      />
                    </span>
                    <div className="hidden md:flex select-none text-white  justify-center align-middle text-center items-center font-extrabold absolute rounded-md top-0 left-0 bg-[black] w-full duration-500 cursor-pointer h-full opacity-0 hover:opacity-50">
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
          {!isEdit ? (
            <button
              type="submit"
              onKeyDown={handleKeyDown}
              className="text-[white] bg-[#176b87] rounded-[4px] flex justify-center items-center h-10 max-w-[10rem]"
            >
              Опублікувати
              <img className="p-1 max-h-9" src={PublishIcon} alt="Publish" />
            </button>
          ) : (
            <button
              type="submit"
              onKeyDown={handleKeyDown}
              className="text-[white] bg-[#176b87] rounded-[4px] flex justify-center items-center h-10 max-w-[12rem]"
            >
              Зберегти зміни
              <img className="p-1 max-h-9" src={PublishIcon} alt="Publish" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddEditRequest;
