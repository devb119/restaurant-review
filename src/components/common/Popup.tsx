import { Dialog, DialogContent } from "@mui/material";

export interface PopupProps {
    title: string;
    open: boolean;
    setOpen: any;
    handleClickYes: () => void;
    popupContent: JSX.Element;
}
export default function Popup(props: PopupProps) {
  const handleClickOk = () => {
    props.handleClickYes();
  };

    
    const {title, open, setOpen, popupContent } = props;
  return (
    <div>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        sx={{ padding: 8, borderRadius: 8 }}
      >
        <p className="font-semibold text-xl m-2 text-center">{title}</p>
        <DialogContent>{popupContent}</DialogContent>
        <div className="flex p-4 gap-8">
          <button
            className="text-white font-semibold  bg-green-600 p-2 px-4 rounded-lg"
            onClick={handleClickOk}
          >
            オーケー
          </button>
          <button
            className="text-white font-semibold  bg-main  p-2 px-4 rounded-lg"
            onClick={() => {
              setOpen(false);
            }}
          >
            キャンセル
          </button>
        </div>
      </Dialog>
    </div>
  );
}
