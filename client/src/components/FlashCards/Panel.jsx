import { useEffect, useState } from "react";
import { useUrl } from "../../contexts/urlContext";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";
import ThemeModal from "../Modal/ThemeModal";
import Palette from "../svg/Palette";
import Banner from "./Banner";
import DataPanel from "./DataPanel";
import Queue from "./Queue";
import styles from "../../styles/Flashcards.module.scss";

export default function Panel({ data }) {
  const { subjectIdParam, handleFlashCardIdParam } = useUrl();
  const [showSolution, setShowSolution] = useState(false);
  const { modalOpen, handleModalOpen } = useModal();

  useEffect(() => {
    setShowSolution(false);
  }, [subjectIdParam]);

  useEffect(() => {
    if (data?.length < 1) {
      handleFlashCardIdParam();
    }
  }, [data?.length < 1]);

  return (
    <>
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <ThemeModal handleModalOpen={handleModalOpen} />
      </Modal>
      <div className={styles.panel}>
        <div className={styles.panel_main}>
          {subjectIdParam?.length > 0 && (
            <Banner
              data={data}
              isData={data?.length > 0}
              showSolution={showSolution}
              setShowSolution={setShowSolution}
            />
          )}
          {data?.length > 1 && subjectIdParam?.length > 0 && (
            <Queue data={data} setShowSolution={setShowSolution} />
          )}
        </div>
        <div className={styles.side_container}>
          {subjectIdParam?.length > 0 ? <DataPanel isData={data?.length > 0} /> : <div></div>}
          <button className={`${styles.themebtn} btn`} onClick={handleModalOpen}>
            <Palette />
          </button>
        </div>
      </div>
    </>
  );
}
