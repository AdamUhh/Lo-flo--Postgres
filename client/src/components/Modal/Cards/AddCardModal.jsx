import { useState } from "react";
import { useCardsContext } from "../../../contexts/cardContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { createCard } from "../../../services/cards";
import ContentInput from "../ContentInput";

export default function AddCardModal({ handleModalOpen, initialValue = "" }) {
  const [title, setTitle] = useState(initialValue);

  const { loading, error, execute: createCardFn } = useAsyncFn(createCard);
  const { createLocalCard } = useCardsContext();

  function onCardCreate(e) {
    e.preventDefault();

    return createCardFn({ title }).then((title) => {
      createLocalCard(title);
      handleModalOpen();
    });
  }

  return (
    <div className="modal__wrapper">
      <div className="modal__titlebar_wrapper">
        <button className="modal__btn btn" onClick={handleModalOpen}>
          Cancel
        </button>
        <div className="modal_titlebar">New Card</div>
        <button className="modal__btn btn" disabled={loading} onClick={onCardCreate}>
          Create
        </button>
      </div>
      <div className="modal__content_container">
        Card name
        <ContentInput error={error} onSubmit={onCardCreate} title={title} setTitle={setTitle} />
      </div>
    </div>
  );
}
