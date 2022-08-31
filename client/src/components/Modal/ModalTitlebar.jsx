import ButtonLoadingIcon from "../svg/ButtonLoadingIcon";

export default function ModalTitlebar({
  title = "Card",
  actionTitle = "Create",
  loading = false,
  handleModal,
  handleAction,
}) {
  return (
    <div className="modal__titlebar_wrapper">
      <button className="modal__btn btn" onClick={handleModal}>
        Cancel
      </button>
      <div>
        {actionTitle} {title}
      </div>
      <button
        className={`modal__btn btn ${
          actionTitle === "Delete" ? "delete" : actionTitle === "Update" && "update"
        }`}
        disabled={loading}
        onClick={handleAction}
      >
        {loading ? <ButtonLoadingIcon /> : actionTitle}
      </button>
    </div>
  );
}
