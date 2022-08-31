import { useCardsContext } from "../contexts/cardContext";
import { useUrl } from "../contexts/urlContext";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import AddCardModal from "./Modal/Cards/AddCardModal";
import SearchModal from "./Modal/Search/SearchModal";
import LoadingIcon from "./svg/LoadingIcon";
import SearchIcon from "./svg/SearchIcon";

export default function NavBar() {
  const { handleCardIdParam, cardIdParam, handleDeleteSubjectIdParam } = useUrl();

  const { loading, error, cardData: cards } = useCardsContext();

  const { modalOpen, handleModalOpen } = useModal();
  const { modalOpen: searchModalOpen, handleModalOpen: handleSearchModalOpen } = useModal();

  return (
    <div className="navbar__container">
      <div className="navbar__wrapper">
        {loading && <LoadingIcon />}
        <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
          <AddCardModal handleModalOpen={handleModalOpen} />
        </Modal>
        <Modal modalOpen={searchModalOpen} handleModalOpen={handleSearchModalOpen}>
          <SearchModal handleModalOpen={handleSearchModalOpen} />
        </Modal>
        <div className="navbar__cards">
          {error ? (
            <h4 className="error-msg">{error}</h4>
          ) : (
            cards?.map((card) => (
              <div
                key={card.id}
                className={`navbar__card ${card.id === cardIdParam && "selected"}`}
                onClick={() => {
                  handleCardIdParam(card.id);
                  handleDeleteSubjectIdParam();
                }}
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
      <button className="navbar__btn btn search" onClick={handleSearchModalOpen}>
        <SearchIcon />
      </button>
    </div>
  );
}
