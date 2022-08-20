import { useState } from "react";
import { useSubjectsContext } from "../../../contexts/subjectContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { updateSubject } from "../../../services/subjects";
import ContentInput from "../ContentInput";

export default function UpdateSubjectModal({
  handleModalOpen,
  initialValue = "",
  reAssignTitle,
}) {
  const { cardIdParam, subjectIdParam } = useUrl();
  const [title, setTitle] = useState(initialValue);

  const {
    loading,
    error,
    execute: updateSubjectFn,
  } = useAsyncFn(updateSubject);
  const { updateLocalSubject } = useSubjectsContext();

  function onSubjectUpdate(e) {
    e.preventDefault();

    return updateSubjectFn({
      cardId: cardIdParam,
      subjectId: subjectIdParam,
      title,
    }).then((result) => {
      updateLocalSubject(subjectIdParam, result);
      reAssignTitle(result.title);
      handleModalOpen();
    });
  }

  return (
    <div className="modal__wrapper">
      <div className="modal__titlebar_wrapper">
        <button className="modal__btn btn" onClick={handleModalOpen}>
          Cancel
        </button>
        <div className="modal_titlebar">Update Subject</div>
        <button
          className="modal__btn btn"
          disabled={loading}
          onClick={onSubjectUpdate}
        >
          Update
        </button>
      </div>
      <div className="modal__content_container">
        Subject name
        <ContentInput
          error={error}
          onSubmit={onSubjectUpdate}
          title={title}
          setTitle={setTitle}
        />
      </div>
    </div>
  );
}
