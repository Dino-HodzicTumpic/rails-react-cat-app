import { useEffect, useState } from "react";

export const useBaseStarSize = () => {
  const [baseSize, setBaseSize] = useState<number>(4);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) setBaseSize(3);
      else if (window.innerWidth < 1024) setBaseSize(4);
      else setBaseSize(5);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return baseSize;
};
