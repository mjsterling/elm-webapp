import { useState, useEffect } from "react";

export const useNumDays = () => {
  const [numDays, setNumDays] = useState(7); // must be odd, don't fuck around
  const [windowInnerWidth, setWindowInnerWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowInnerWidth(window.innerWidth);
    });
  }, []);
  useEffect(() => {
    const newNumDays = Math.floor(windowInnerWidth / 100);
    setNumDays(Math.max(5, newNumDays + (newNumDays % 2 === 0 ? 1 : 0)));
  }, [windowInnerWidth]);

  return numDays;
};
