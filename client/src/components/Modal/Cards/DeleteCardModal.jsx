import { useCardsContext } from "../../../contexts/cardContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { deleteCard } from "../../../services/cards";

export default function DeleteCardModal({ handleModalOpen, title = "N/A" }) {
  const { loading, error, execute: deleteCardFn } = useAsyncFn(deleteCard);
  const { deleteLocalCard } = useCardsContext();
  const { cardIdParam: cardId, handleDeleteCardIdParam } = useUrl();

  function onCardDelete(e) {
    e.preventDefault();

    return deleteCardFn({ cardId }).then((card) => {
      deleteLocalCard(card.id);
      handleDeleteCardIdParam();
      handleModalOpen();
    });
  }

  return (
    <div className="modal__wrapper">
      <div className="modal__titlebar_wrapper">
        <button className="modal__btn btn" onClick={handleModalOpen}>
          Cancel
        </button>
        <div className="modal_titlebar">Delete Card</div>
        <button className="modal__btn btn delete" disabled={loading} onClick={onCardDelete}>
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
