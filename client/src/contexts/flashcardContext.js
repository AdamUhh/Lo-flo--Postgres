import React, { useContext, useEffect, useState } from "react";
import { useAsync } from "../hooks/useAsync";
import { getFlashCards } from "../services/flashCards";
import { useUrl } from "./urlContext";
const Context = React.createContext();

export function useFlashCardsContext() {
  return useContext(Context);
}

export function FlashCardProvider({ children }) {
  const { cardIdParam, subjectIdParam } = useUrl();
  const [flashCardData, setFlashCardData] = useState([]);
  const {
    loading,
    error,
    value: flashCards,
  } = useAsync(
    () => getFlashCards({ cardId: cardIdParam, subjectId: subjectIdParam }),
    [cardIdParam, subjectIdParam]
  );
  useEffect(() => {
    if (flashCards == null) return;
    setFlashCardData(flashCards);
  }, [flashCards]);

  function createLocalFlashCard(result) {
    setFlashCardData((prevFlashCards) => ({
      ...prevFlashCards,
      flashCards: [...prevFlashCards.flashCards, result],
    }));
  }

  function updateLocalFlashCard(id, result) {
    console.log(result)
    setFlashCardData((prevFlashCards) => ({
      ...prevFlashCards,
      flashCards: prevFlashCards.flashCards.map((fc) => {
        if (fc.id === id) return result;
        else return fc;
      }),
    }));
  }

  function deleteLocalFlashCard(id) {
    setFlashCardData((prevFlashCards) => ({
      ...prevFlashCards,
      flashCards: prevFlashCards.flashCards.filter((fc) => fc.id !== id),
    }));
  }

  return (
    <Context.Provider
      value={{
        loading,
        error,
        flashCardData,
        createLocalFlashCard,
        updateLocalFlashCard,
        deleteLocalFlashCard,
      }}
    >
      {children}
    </Context.Provider>
  );
}
