import React, { useState, useContext, useEffect } from "react";
const Context = React.createContext();

export function usePanel() {
  return useContext(Context);
}

export function PanelProvider({ children, data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    const isLastSlide = currentIndex === data?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToIndex = (indx = 0, flashCardId = "") => {
    // if (flashCardId.length > 0) {
    //   const newIndex = data.findIndex((fc) => fc.id === flashCardId);
    //   setCurrentIndex(newIndex);
    // } else {
    // }
    setCurrentIndex(indx);
  };

  return (
    <Context.Provider
      value={{
        currentIndex,
        goToNext,
        goToPrevious,
        goToIndex,
        maxLength: data?.length || 0,
      }}
    >
      {children}
    </Context.Provider>
  );
}
