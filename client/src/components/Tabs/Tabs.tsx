import { useNavigate } from "react-router-dom";
interface ITabs {
  name: string;
  path: string;
}

export const Tabs = ({ tabs }: any) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row text-center gap-16 justify-center my-3 ">
      {tabs.map((el: ITabs) => (
        <div
          className="hover:underline cursor-pointer p-2"
          onClick={() => navigate(tabs.path)}
        >
          {el.name}
        </div>
      ))}
    </div>
  );
};
