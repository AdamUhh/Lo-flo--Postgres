import { useFlashCardsContext } from "../../contexts/flashcardContext";
import LoadingIcon from "../svg/LoadingIcon";
import Panel from "./Panel";
import styles from "../../styles/Flashcards.module.scss";

export default function FlashCards() {
  const { loading, error, flashCardData: value } = useFlashCardsContext();
  return (
    <div className={styles.container}>
      {loading && <LoadingIcon />}
      {value != null && <Panel data={value?.flashCards} />}
      {error && error}
    </div>
  );
}
