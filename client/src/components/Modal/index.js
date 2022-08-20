export default function Modal({ children, modalOpen, handleModalOpen }) {
  if (!modalOpen) return <div className="hidden" />;

  return (
    <div className="modal__container">
      <div className="modal__blurBG" onClick={handleModalOpen} />
      {children}
    </div>
  );
}
