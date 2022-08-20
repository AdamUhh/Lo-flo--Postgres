import { usePanel } from "../../../contexts/panelContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsync } from "../../../hooks/useAsync";
import { getFlashCards } from "../../../services/flashCards";

export default function ShowAllFlashCardModal({ handleModalOpen }) {
  const { cardIdParam, subjectIdParam } = useUrl();
  const { goToIndex } = usePanel();

  const { loading, error, value } = useAsync(() =>
    getFlashCards({ cardId: cardIdParam, subjectId: subjectIdParam }, [cardIdParam, subjectIdParam])
  );

  function handleSelectedFlashCard(indx) {
    goToIndex(indx);
    handleModalOpen();
  }

  return (
    <div className="modal__wrapper large">
      <div className="modal__titlebar_wrapper">
        <button className="modal__btn btn" onClick={handleModalOpen}>
          Cancel
        </button>
        <div className="modal_titlebar">All FlashCards</div>
      </div>
      <div className="modal__content_container">
        <div className="modal__content_overflow_container">
          {value?.flashCards.map((fc, indx) => (
            <button
              className="flashcards__queue_item btn"
              key={fc.id}
              onClick={() => handleSelectedFlashCard(indx)}
            >
              <div className="flashcards__queue_indx">{indx + 1}</div>
              <div className="flashcards__queue_question">{fc.question}</div>
            </button>
          ))}
        </div>
        {error && error}
      </div>
    </div>
  );
}
