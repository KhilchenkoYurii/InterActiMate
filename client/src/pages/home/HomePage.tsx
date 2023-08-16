import { IssueCard } from "../../components/IssueCard/IssueCard";
import "./HomePage.scss";

export const HomePage = () => {
  return (
    <div className="cards-container">
      {Array(15).fill(5).map(() => (
        <IssueCard />
      ))}
    </div>
  );
};