
export default function ContentInput({ error, onSubmit, title, setTitle }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        className="modal__content_input"
        type="text"
        value={title}
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && error}
    </form>
  );
}
