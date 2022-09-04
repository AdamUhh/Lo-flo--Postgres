import { useUrl } from "../../contexts/urlContext";
import { useModal } from "../../hooks/useModal";
import styles from "../../styles/Flashcards.module.scss";
import Modal from "../Modal";
import AddCardModal from "../Modal/Cards/AddCardModal";

export default function HelperBox() {
  const { cardIdParam, subjectIdParam } = useUrl();

  const [modalOpen, handleModalOpen] = useModal();

  return (
    <div className={styles.helper_container}>
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <AddCardModal handleModalOpen={handleModalOpen} />
      </Modal>

      {cardIdParam === "" ? (
        <div className={styles.wrapper}>
          <h2>Hi! 👋🏻 </h2>
          <h4>
            Get started by
            <button className="btn" onClick={handleModalOpen}>
              Creating
            </button>
            or Selecting a card!
          </h4>
        </div>
      ) : (
        subjectIdParam === "" && (
          <div className={styles.wrapper}>
            <h3>
              <span>Nothing to see here...</span> yet!
            </h3>
            <h4>
              Get started by <button className="btn">Creating</button> or selecting a Subject!
            </h4>
          </div>
        )
      )}
    </div>
  );
}
