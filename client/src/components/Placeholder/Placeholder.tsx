import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css'; /* enables Placeholder animation */

interface PlaceholderInterface {
  width?: number;
  height?: number;
  rows?: number;
  type?: 'media' | 'rect' | 'round' | 'text' | 'textRow';
  margin?: 'none' | string;
  backgroundColor?: string;
  borderRadius?: string;
}

const Placeholder = ({ width, height, rows, type = 'textRow', borderRadius, backgroundColor, margin = 'none' }: PlaceholderInterface) => (
  <ReactPlaceholder
    showLoadingAnimation
    type={type}
    rows={rows}
    ready={false}
    style={{
      width,
      height: !height && type === 'textRow' ? 17 : height,
      margin: margin === 'none' ? '0' : margin,
      borderRadius: borderRadius || 'none',
    }}
  >
    <></>
  </ReactPlaceholder>
);

export default Placeholder;
