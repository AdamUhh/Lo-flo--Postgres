import { useEffect } from "react";
import { useState } from "react";
import { useSubjectsContext } from "../contexts/subjectContext";
import { useUrl } from "../contexts/urlContext";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import DeleteCardModal from "./Modal/Cards/DeleteCardModal";
import UpdateCardModal from "./Modal/Cards/UpdateCardModal";
import AddSubjectModal from "./Modal/Subjects/AddSubjectModel";
import DeleteSubjectModal from "./Modal/Subjects/DeleteSubjectModel";
import UpdateSubjectModal from "./Modal/Subjects/UpdateSubjectModal";
import TrashIcon from "./svg/TrashIcon";
import LoadingIcon from "./svg/LoadingIcon";
import { usePanel } from "../contexts/panelContext";

export default function SubjectBar() {
  const { cardIdParam, subjectIdParam, handleSubjectIdParam } = useUrl();
  const { loading, error, subjectData: value } = useSubjectsContext();
  const { goToIndex } = usePanel();

  const { modalOpen, handleModalOpen } = useModal();
  const { modalOpen: deleteCardModalOpen, handleModalOpen: handleDeleteCardModalOpen } = useModal();
  const { modalOpen: deleteSubjectModalOpen, handleModalOpen: handleDeleteSubjectModalOpen } = useModal();
  const { modalOpen: updateSubjectModalOpen, handleModalOpen: handleUpdateSubjectModalOpen } = useModal();
  const { modalOpen: updateCardModalOpen, handleModalOpen: handleUpdateCardModalOpen } = useModal();

  const [subjectTitle, setSubjectTitle] = useState("");
  const [cardTitle, setCardTitle] = useState("");

  // ? required, incase user updates card title
  // ? because without this, navbar card title will changes,
  // ? but subjectbar card title will not
  useEffect(() => {
    setCardTitle(value?.title);
  }, [value?.title]);

  const handleSelectedSubj = (id, title) => {
    handleSubjectIdParam(id);
    setSubjectTitle(title);
    goToIndex();
  };

  if (cardIdParam.length < 1)
    return (
      <div className="subjectbar__container">
        <div className="subjectbar__ends top">Select a card</div>
      </div>
    );
  return (
    <div className="subjectbar__container">
      {loading && <LoadingIcon />}
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <AddSubjectModal handleModalOpen={handleModalOpen} />
      </Modal>
      <Modal modalOpen={deleteSubjectModalOpen} handleModalOpen={handleDeleteSubjectModalOpen}>
        <DeleteSubjectModal handleModalOpen={handleDeleteSubjectModalOpen} title={subjectTitle} />
      </Modal>
      <Modal modalOpen={updateSubjectModalOpen} handleModalOpen={handleUpdateSubjectModalOpen}>
        <UpdateSubjectModal
          handleModalOpen={handleUpdateSubjectModalOpen}
          initialValue={subjectTitle}
          reAssignTitle={setSubjectTitle}
        />
      </Modal>
      <Modal modalOpen={updateCardModalOpen} handleModalOpen={handleUpdateCardModalOpen}>
        <UpdateCardModal
          handleModalOpen={handleUpdateCardModalOpen}
          initialValue={cardTitle}
          reAssignTitle={setCardTitle}
        />
      </Modal>
      <Modal modalOpen={deleteCardModalOpen} handleModalOpen={handleDeleteCardModalOpen}>
        <DeleteCardModal handleModalOpen={handleDeleteCardModalOpen} title={cardTitle} />
      </Modal>
      {error ? (
        <h5>{error}</h5>
      ) : (
        <>
          <div className="subjectbar__ends top">
            <button className="tinybtn red" onClick={() => handleDeleteCardModalOpen()} />
            <button className="tinybtn" onClick={() => handleUpdateCardModalOpen()} />
            {cardTitle}
          </div>
          <div className={`subjectbar__wrapper ${subjectIdParam.length < 1 && "offset"}`}>
            {value != null &&
              value.subjects.map((subject) => (
                <button
                  key={subject.id}
                  className={`subjectbar__title btn ${subject.id === subjectIdParam && "selected"}`}
                  onClick={() => handleSelectedSubj(subject.id, subject.title)}
                >
                  {subject.title}
                </button>
              ))}
          </div>
          {value != null && subjectIdParam.length > 0 && (
            <div className="subjectbar__ends_options">
              <button
                className="subjectbar__ends bottom btn delete btn_red"
                onClick={handleDeleteSubjectModalOpen}
              >
                <TrashIcon />
              </button>
              <button
                className="subjectbar__ends bottom btn edit btn_yellow"
                onClick={handleUpdateSubjectModalOpen}
              >
                Edit
              </button>
            </div>
          )}
          <button className="subjectbar__ends bottom btn" onClick={handleModalOpen}>
            + Add Subject
          </button>
        </>
      )}
    </div>
  );
}
