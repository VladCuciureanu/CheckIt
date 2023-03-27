import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "../index.module.scss";

export default function ClearAlert({
  open,
  onClose,
  onAccept,
}: {
  open: boolean;
  onClose: Function;
  onAccept: Function;
}) {
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.Overlay} />
        <AlertDialog.Content className={styles.Content}>
          <AlertDialog.Title className={styles.Title}>
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.Description}>
            This action cannot be undone.
            <br />
            This will permanently delete all your items.
            <br />
            Once deleted, the lost data cannot be recovered.
          </AlertDialog.Description>
          <div
            style={{
              display: "flex",
              width: "calc(100% + 4rem)",
              marginLeft: "-2rem",
              marginRight: "-2rem",
            }}
          >
            <AlertDialog.Cancel asChild>
              <button className={styles.CloseButton} onClick={() => onClose()}>
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className={styles.AcceptButton}
                onClick={() => {
                  onAccept();
                  onClose();
                }}
              >
                Yes, delete it
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
