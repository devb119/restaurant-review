import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { closeDialog } from "../../redux/dialog.reducer";

export default function AlertDialogSlide() {
  const dialog = useSelector((state: RootState) => state.dialog);
  const handleClickOk = () => {
    dialog.handleClickYes();
  };

  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        open={dialog.open}
        // TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialog.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOk}>オーケー</Button>
          <Button
            onClick={() => {
              dispatch(closeDialog());
            }}
          >
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
