import { useEffect } from "react";
import { usePanel } from "../../contexts/panelContext";
import { useUrl } from "../../contexts/urlContext";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";
import AddFlashCardModal from "../Modal/FlashCards/AddFlashCardModel";
import DeleteFlashCardModal from "../Modal/FlashCards/DeleteFlashCardModel";
import UpdateFlashCardModal from "../Modal/FlashCards/UpdateFlashCardModel";
import TrashIcon from "../svg/TrashIcon";

export default function Banner({ data = [], isData, showSolution, setShowSolution }) {
  const { currentIndex, maxLength, goToNext, goToPrevious, goToIndex } = usePanel();
  const { handleFlashCardIdParam } = useUrl();

  const handleGoToPrevious = () => {
    setShowSolution(false);
    goToPrevious();
  };
  const handleGoToNext = () => {
    setShowSolution(false);
    goToNext();
  };

  const handleShowSolution = () => {
    setShowSolution((prev) => !prev);
  };

  useEffect(() => {
    handleFlashCardIdParam(data[currentIndex]?.id || "");
  }, [currentIndex]);

  useEffect(() => {
    handleFlashCardIdParam(data[currentIndex]?.id);
  }, [data]);

  const { modalOpen, handleModalOpen } = useModal();
  const { modalOpen: updateModalOpen, handleModalOpen: handleUpdateModalOpen } = useModal();
  const { modalOpen: deleteModalOpen, handleModalOpen: handleDeleteModalOpen } = useModal();

  return (
    <>
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <AddFlashCardModal handleModalOpen={handleModalOpen} />
      </Modal>
      <Modal modalOpen={updateModalOpen} handleModalOpen={handleUpdateModalOpen}>
        <UpdateFlashCardModal
          handleModalOpen={handleUpdateModalOpen}
          initialQuestion={isData && data[currentIndex]?.question}
          initialSolution={isData && data[currentIndex]?.solution}
        />
      </Modal>
      <Modal modalOpen={deleteModalOpen} handleModalOpen={handleDeleteModalOpen}>
        <DeleteFlashCardModal
          handleModalOpen={handleDeleteModalOpen}
          title={data[currentIndex]?.question}
          currentIndex={currentIndex}
          maxLength={maxLength}
          assignCurrentIndx={goToIndex}
        />
      </Modal>
      <div className="flashcards__banner">
        {isData ? (
          <>
            {data?.length > 1 && (
              <>
                <button className="flashcards__Arrow left btn" onClick={handleGoToPrevious}>
                  ❮
                </button>
                <button className="flashcards__Arrow right btn" onClick={handleGoToNext}>
                  ❯
                </button>
              </>
            )}
            <div className={`flashcards__bannerWrapper ${showSolution && "smallerText"}`}>
              <span className="text_overflow_center">
                {showSolution ? data[currentIndex]?.solution : data[currentIndex]?.question}
              </span>
            </div>
          </>
        ) : (
          <div className="flashcards__bannerWrapper">
            <div className="flashcards__banner_notfound">
              No Flashcards Found! Create them now!
              <button className="flashcards__addFlashCard btn " onClick={handleModalOpen}>
                + Add Flashcard
              </button>
            </div>
          </div>
        )}
      </div>
      {isData && (
        <div className="flashcards__banner_options">
          <button className="flashcards__btn btn btn_red" onClick={handleDeleteModalOpen}>
            <TrashIcon />
          </button>
          <button className="flashcards__btn btn btn_yellow edit" onClick={handleUpdateModalOpen}>
            Edit
          </button>
          <button
            className={`flashcards__btn btn answer btn_green ${showSolution && "selected"}`}
            onClick={handleShowSolution}
          >
            View Answer
          </button>
        </div>
      )}
    </>
  );
}
