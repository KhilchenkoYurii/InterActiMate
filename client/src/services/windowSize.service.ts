import { useLayoutEffect, useState } from "react";

export default function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }

      updateSize();

      let updateSizeTimeOut: ReturnType<typeof setTimeout>;
      window.onresize = () => {
        clearTimeout(updateSizeTimeOut);
        updateSizeTimeOut = setTimeout(updateSize, 100);
      };
    }, []);
    return size;
  }