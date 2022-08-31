import { usePanel } from "../../contexts/panelContext";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";
import AddFlashCardModal from "../Modal/FlashCards/AddFlashCardModel";
import ShowAllFlashCardModal from "../Modal/FlashCards/ShowAllFlashCard";
import ListIcon from "../svg/ListIcon";

export default function DataPanel({ isData }) {
  const { currentIndex, maxLength } = usePanel();
  const { modalOpen, handleModalOpen } = useModal();
  const { modalOpen: AllFlashCardModalOpen, handleModalOpen: handleAllFlashCardModalOpen } = useModal();

  return (
    <div className="flashcards__datapanel">
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <AddFlashCardModal handleModalOpen={handleModalOpen} />
      </Modal>
      <Modal modalOpen={AllFlashCardModalOpen} handleModalOpen={handleAllFlashCardModalOpen}>
        <ShowAllFlashCardModal handleModalOpen={handleAllFlashCardModalOpen} />
      </Modal>
      <div className="flashcards__datapanel_topbar">
        {isData && (
          <button className="flashcards__datapanel_listview btn" onClick={handleAllFlashCardModalOpen}>
            <ListIcon />
          </button>
        )}
        <button className="flashcards__datapanel_addFlashCard btn" onClick={handleModalOpen}>
          + Add Flashcard
        </button>
      </div>
      <div className="flashcards__datapanel_box">
        <div className="flashcards__datapanel_title">Card</div>
        <div className="flashcards__datapanel_desc">
          {maxLength === 0 ? (
            <span>N/A</span>
          ) : (
            <>
              <span>{currentIndex + 1}</span>
              <span>|</span>
              <span>{maxLength}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
