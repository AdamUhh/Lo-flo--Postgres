import { useFlashCardsContext } from "../../../contexts/flashcardContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { deleteFlashCard } from "../../../services/flashCards";

export default function DeleteFlashCardModal({
  handleModalOpen,
  title = "N/A",
  currentIndex,
  maxLength,
  assignCurrentIndx,
}) {
  const { loading, error, execute: deleteFlashCardFn } = useAsyncFn(deleteFlashCard);
  const { deleteLocalFlashCard } = useFlashCardsContext();
  const {
    cardIdParam: cardId,
    subjectIdParam: subjectId,
    flashCardIdParam: flashCardId,
  } = useUrl();

  function onFlashCardDelete(e) {
    e.preventDefault();
    return deleteFlashCardFn({ cardId, subjectId, flashCardId }).then((flashCard) => {
      deleteLocalFlashCard(flashCard.id);

      // if user deleted last item
      if (currentIndex === maxLength - 1) assignCurrentIndx(maxLength - 2);

      handleModalOpen();
    });
  }

  return (
    <div className="modal__wrapper">
      <div className="modal__titlebar_wrapper">
        <button className="modal__btn btn" onClick={handleModalOpen}>
          Cancel
        </button>
        <div className="modal_titlebar">Delete FlashCard</div>
        <button className="modal__btn btn delete" disabled={loading} onClick={onFlashCardDelete}>
          Delete
        </button>
      </div>
      <div className="modal__content_container">
        <div className="modal__delete_title">
          <div>Are you sure you wish to delete</div>
          <div className="modal__overflow_container">{title}</div>
        </div>
        {error && error}
      </div>
    </div>
  );
}
