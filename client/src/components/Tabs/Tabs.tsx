import { useNavigate } from "react-router-dom";
import "./Tabs.scss";

interface ITabs {
  name: string;
  path: string;
}

interface ITabsProps {
  tabs: ITabs[];
  setTabName?: any;
  activeTabName: string;
}

export const Tabs = ({ tabs, setTabName, activeTabName }: ITabsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row text-center justify-center ">
      {tabs.map((tab: ITabs) => (
        <div
          key={tab.name}
          className={`tab-button cursor-pointer py-3 w-full h-full ${
            activeTabName === tab.name && "tab-button-active"
          }`}
          onClick={() => {
            setTabName(tab.name);
            navigate(tab.path);
          }}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};
