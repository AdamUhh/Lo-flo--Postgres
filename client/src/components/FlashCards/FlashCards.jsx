import { useFlashCardsContext } from "../../contexts/flashcardContext";
import { PanelProvider } from "../../contexts/panelContext";
import LoadingIcon from "../svg/LoadingIcon";
import Panel from "./Panel";

export default function FlashCards() {
  const { loading, error, flashCardData: value } = useFlashCardsContext();
  return (
    <>
      {loading && <LoadingIcon />}
      <div className="flashcards__container">
        {value != null && (
          <PanelProvider data={value?.flashCards}>
            <Panel data={value?.flashCards} />
          </PanelProvider>
        )}
        {error && error}
      </div>
    </>
  );
}
