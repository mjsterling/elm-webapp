import clsx from "clsx";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: JSX.Element;
};

type IconButton = React.FC<IconButtonProps>;
export const IconButton: IconButton = ({ icon, className, ...props }) => {
  return (
    <button className={clsx(className)} {...props}>
      {icon}
    </button>
  );
};
