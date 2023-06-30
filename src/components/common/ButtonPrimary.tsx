export interface ButtonProps {
  title: string;
  onClick?: (e: React.FormEvent) => void;
}

const ButtonPrimary = (props: ButtonProps): JSX.Element => {
  return (
    <button
      className="border-2 border-white text-white bg-main hover:bg-mainShade py-2 px-4 rounded-full "
      {...props}
    >
      {props.title}
    </button>
  );
};

export default ButtonPrimary;
