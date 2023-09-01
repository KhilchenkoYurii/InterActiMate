import Placeholder from '../Placeholder';
import './RequestCardPlaceHolder.scss';

export const RequestCardPlaceHolder = () => {
  return (
    <div className="card">
      <Placeholder type="rect" width={245} height={132} borderRadius="4px" margin="10px auto" />
      <Placeholder type="rect" width={245} height={20} borderRadius="4px" margin="10px auto" />
      <Placeholder type="rect" width={245} height={20} borderRadius="4px" margin="10px auto" />
      <Placeholder type="rect" width={245} height={20} borderRadius="4px" margin="10px auto" />
    </div>
  );
}
