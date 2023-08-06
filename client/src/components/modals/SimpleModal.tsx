export const SimpleModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="modal"
      tabIndex={-1}
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
