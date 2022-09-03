import { usePanel } from "../../contexts/panelContext";
import { ellipsis } from "../../util";
import styles from "../../styles/Flashcards.module.scss";

export default function Queue({ data, setShowSolution }) {
  const { currentIndex, maxLength, goToIndex } = usePanel();

  const slicedIndx = currentIndex === maxLength - 1 ? 0 : currentIndex + 1;
  const slicedIndx2 = currentIndex === maxLength - 1 ? -1 : maxLength;

  function handleGoTo(indx) {
    setShowSolution(false);
    goToIndex(indx);
  }

  return (
    <div className={styles.queue}>
      <div className={styles.queue_title}>Next in Queue</div>
      <div className={styles.queue_wrapper}>
        {data.slice(slicedIndx, slicedIndx2).map((fc, indx) => (
          <button
            className={`${styles.queue_item} btn`}
            key={fc.id}
            onClick={() => handleGoTo(slicedIndx + indx)}
          >
            <div className={styles.queue_indx}>{slicedIndx + indx + 1}</div>
            <div className={styles.queue_question}>{ellipsis(fc.question, 200)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
