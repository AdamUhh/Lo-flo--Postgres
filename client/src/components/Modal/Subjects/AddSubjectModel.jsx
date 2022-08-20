import { useState } from "react";
import { useSubjectsContext } from "../../../contexts/subjectContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { createSubject } from "../../../services/subjects";
import ContentInput from "../ContentInput";

export default function AddSubjectModal({ handleModalOpen }) {
  const { cardIdParam } = useUrl();
  const [title, setTitle] = useState("");

  const {
    loading,
    error,
    execute: createSubjectFn,
  } = useAsyncFn(createSubject);
  const { createLocalSubject } = useSubjectsContext();

  function onSubjectCreate(e) {
    e.preventDefault();

    return createSubjectFn({ cardId: cardIdParam, title }).then((title) => {
      createLocalSubject(title);
      handleModalOpen();
    });
  }

  return (
   <div className="modal__wrapper">
      <div className="modal__titlebar_wrapper">
        <button className="modal__btn btn" onClick={handleModalOpen}>
          Cancel
        </button>
        <div className="modal_titlebar">New Subject</div>
        <button
          className="modal__btn btn"
          disabled={loading}
          onClick={onSubjectCreate}
        >
          Create
        </button>
      </div>
      <div className="modal__content_container">
        Subject name
        <ContentInput
          error={error}
          onSubmit={onSubjectCreate}
          title={title}
          setTitle={setTitle}
        />
      </div>
   </div>
  );
}
