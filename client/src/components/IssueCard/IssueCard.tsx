import Placeholder from '../Placeholder/Placeholder';
import './IssueCard.scss';

export const IssueCard = () => {
  return (
    <div className="card">
      <Placeholder type="rect" width={245} height={132} borderRadius="4px" margin="10px auto" />
      <Placeholder type="rect" width={245} height={20} borderRadius="4px" margin="10px auto" />
      <Placeholder type="rect" width={245} height={20} borderRadius="4px" margin="10px auto" />
      <Placeholder type="rect" width={245} height={20} borderRadius="4px" margin="10px auto" />
    </div>
  );
}