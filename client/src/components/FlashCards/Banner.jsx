import { useEffect } from "react";
import { usePanel } from "../../contexts/panelContext";
import { useUrl } from "../../contexts/urlContext";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";
import AddFlashCardModal from "../Modal/FlashCards/AddFlashCardModel";
import DeleteFlashCardModal from "../Modal/FlashCards/DeleteFlashCardModel";
import UpdateFlashCardModal from "../Modal/FlashCards/UpdateFlashCardModel";
import TrashIcon from "../svg/TrashIcon";
import styles from "../../styles/Flashcards.module.scss";

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

  // useEffect(() => {
  //   if (data.length > 0) {
  //     handleFlashCardIdParam(data[currentIndex]?.id || "");
  //   }
  // }, [currentIndex]);

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
      <div className={styles.banner}>
        {isData ? (
          <>
            {data?.length > 1 && (
              <>
                <button className={`${styles.Arrow} ${styles.left} btn`} onClick={handleGoToPrevious}>
                  ❮
                </button>
                <button className={`${styles.Arrow} ${styles.right} btn`} onClick={handleGoToNext}>
                  ❯
                </button>
              </>
            )}
            <div className={styles.bannerWrapper}>
              <span className={styles.centerText}>
                {showSolution ? data[currentIndex]?.solution : data[currentIndex]?.question}
              </span>
            </div>
          </>
        ) : (
          <div className={styles.bannerWrapper}>
            <div className={styles.banner_notfound}>
              No Flashcards Found! Create them now!
              <button className={`${styles.addFlashCard} btn`} onClick={handleModalOpen}>
                + Add Flashcard
              </button>
            </div>
          </div>
        )}
      </div>
      {isData && (
        <div className={styles.banner_options}>
          <button className={`${styles.btn} btn red`} onClick={handleDeleteModalOpen}>
            <TrashIcon />
          </button>
          <button className={`${styles.btn} ${styles.edit} btn yellow`} onClick={handleUpdateModalOpen}>
            Edit
          </button>
          <button
            className={`${styles.btn} ${styles.answer} btn green ${showSolution ? "selected" : ""}`}
            onClick={handleShowSolution}
          >
            View Answer
          </button>
        </div>
      )}
    </>
  );
}
