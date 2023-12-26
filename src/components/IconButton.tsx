import clsx from "clsx";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: JSX.Element;
};

type IconButton = React.FC<IconButtonProps>;
export const IconButton: IconButton = ({ icon, className, ...props }) => {
  return (
    <button
      className={clsx(
        "h-8 w-8 p-2 rounded-full text-black bg-gray-200",
        className
      )}
      {...props}
    >
      <span className="h-4 w-4 block">{icon}</span>
    </button>
  );
};
