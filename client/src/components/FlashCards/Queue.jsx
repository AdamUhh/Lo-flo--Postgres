import { usePanel } from "../../contexts/panelContext";
import { ellipsis } from "../../util";

export default function Queue({ data,  setShowSolution }) {
  const { currentIndex, maxLength, goToIndex } = usePanel();

  const slicedIndx = currentIndex === maxLength - 1 ? 0 : currentIndex + 1;
  const slicedIndx2 = currentIndex === maxLength - 1 ? -1 : maxLength;

  function handleGoTo(indx) {
    setShowSolution(false);
    goToIndex(indx);
  }

  return (
    <div className="flashcards__queue">
      <div className="flashcards__queue_title">Next in Queue</div>
      <div className="flashcards__queue_wrapper">
        {data.slice(slicedIndx, slicedIndx2).map((fc, indx) => (
          <button
            className="flashcards__queue_item btn"
            key={fc.id}
            onClick={() => handleGoTo(slicedIndx + indx)}
          >
            <div className="flashcards__queue_indx">{slicedIndx + indx + 1}</div>
            <div className="flashcards__queue_question">{ellipsis(fc.question, 200)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
