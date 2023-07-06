import { Dialog, DialogActions, DialogContent } from "@mui/material";
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
        sx={{ padding: 8, borderRadius: 8 }}
      >
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialog.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="text-white font-semibold bg-main p-2 px-4 rounded-lg"
            onClick={handleClickOk}
          >
            オーケー
          </button>
          <button
            className=" font-semibold border border-main text-black  p-2 px-4 rounded-lg"
            onClick={() => {
              dispatch(closeDialog());
            }}
          >
            キャンセル
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
