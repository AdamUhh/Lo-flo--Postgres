import { useState } from "react";
import { useCardsContext } from "../../../contexts/cardContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { updateCard } from "../../../services/cards";
import ContentInput from "../ContentInput";

export default function UpdateCardModal({ handleModalOpen, initialValue = "", reAssignTitle }) {
  const { cardIdParam } = useUrl();
  const [title, setTitle] = useState(initialValue);

  const { loading, error, execute: updateCardFn } = useAsyncFn(updateCard);
  const { updateLocalCard } = useCardsContext();

  function onCardUpdate(e) {
    e.preventDefault();

    return updateCardFn({
      cardId: cardIdParam,
      title,
    }).then((result) => {
      updateLocalCard(cardIdParam, result);
      reAssignTitle(result.title);
      handleModalOpen();
    });
  }

  return (
    <div className="modal__wrapper">
      <div className="modal__titlebar_wrapper">
        <button className="modal__btn btn" onClick={handleModalOpen}>
          Cancel
        </button>
        <div className="modal_titlebar">Update Card</div>
        <button className="modal__btn btn update" disabled={loading} onClick={onCardUpdate}>
          Update
        </button>
      </div>
      <div className="modal__content_container">
        Card name
        <ContentInput error={error} onSubmit={onCardUpdate} title={title} setTitle={setTitle} />
      </div>
    </div>
  );
}
