import { InputWithIcon } from '../InputWithIcon/InputWithIcon';
import Apply from '../../assets/icons/Apply.svg';

const AddEditRequest = () => {
  return (
    <div>
      <div className="card-container">
        <div className="flex flex-col gap-3">
          <InputWithIcon />

          <textarea
            className="w-full bg-[#d9d9d938] rounded-[4px] border-[1px] border-[#00000033] px-[25px] py-[10px] outline-0 resize-none"
            name="Body"
            id="Body"
            rows={10}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AddEditRequest;
