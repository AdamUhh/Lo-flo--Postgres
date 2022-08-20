import { useCardsContext } from "../contexts/cardContext";
import { useUrl } from "../contexts/urlContext";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import AddCardModal from "./Modal/Cards/AddCardModal";

export default function NavBar() {
  const { handleCardIdParam, cardIdParam } = useUrl();

  const { loading, error, cardData: cards } = useCardsContext();

  const { modalOpen, handleModalOpen } = useModal();

  return (
    <div className="navbar__container">
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <AddCardModal handleModalOpen={handleModalOpen} />
      </Modal>
      <div className="navbar__cards">
        {loading ? (
          <h4>loading</h4>
        ) : error ? (
          <h4 className="error-msg">{error}</h4>
        ) : (
          cards?.map((card) => (
            <div
              key={card.id}
              className={`navbar__card ${card.id === cardIdParam && "selected"}`}
              onClick={() => handleCardIdParam(card.id)}
            >
              {card.title}
            </div>
          ))
        )}
      </div>
      <button className="navbar__btn btn" onClick={handleModalOpen}>
        + Add Card
      </button>
    </div>
  );
}
