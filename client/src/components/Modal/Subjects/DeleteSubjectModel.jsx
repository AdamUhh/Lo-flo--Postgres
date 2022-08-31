import { useSubjectsContext } from "../../../contexts/subjectContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { deleteSubject } from "../../../services/subjects";
import ModalTitlebar from "../ModalTitlebar";
export default function DeleteSubjectModal({ handleModalOpen, title = "N/A" }) {
  const { loading, error, execute: deleteSubjectFn } = useAsyncFn(deleteSubject);
  const { deleteLocalSubject } = useSubjectsContext();
  const { cardIdParam: cardId, subjectIdParam: subjectId, handleDeleteSubjectIdParam } = useUrl();

  function onSubjectDelete(e) {
    e.preventDefault();

    return deleteSubjectFn({ cardId, subjectId }).then((subject) => {
      deleteLocalSubject(subject.id);
      handleDeleteSubjectIdParam();
      handleModalOpen();
    });
  }

  return (
    <div className="modal__wrapper">
      <ModalTitlebar
        title={"Subject"}
        actionTitle={"Delete"}
        loading={loading}
        handleModal={handleModalOpen}
        handleAction={onSubjectDelete}
      />

      <div className="modal__content_container">
        <div className="modal__delete_title">
          <div>Are you sure you wish to delete</div>
          <div className="modal__overflow_container">{title}</div>
        </div>
        {error && error}
      </div>
    </div>
  );
}
