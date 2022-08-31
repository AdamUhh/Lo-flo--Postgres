import { useFlashCardsContext } from "../../contexts/flashcardContext";
import LoadingIcon from "../svg/LoadingIcon";
import Panel from "./Panel";

export default function FlashCards() {
  const { loading, error, flashCardData: value } = useFlashCardsContext();
  return (
    <>
      {loading && <LoadingIcon />}
      <div className="flashcards__container">
        {value != null && <Panel data={value?.flashCards} />}
        {error && error}
      </div>
    </>
  );
}
