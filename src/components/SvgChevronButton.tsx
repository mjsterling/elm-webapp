type SvgChevronButtonProps = {
  direction: "left" | "right";
  x: number;
  y: number;
  size: number;
  onClick(): void;
};

type SvgChevronButton = React.FC<SvgChevronButtonProps>;
export const SvgChevronButton: SvgChevronButton = ({
  direction,
  x,
  y,
  size,
  onClick,
}) => (
  <>
    <circle
      r={size * 0.9}
      cx={x}
      cy={y + size / 4}
      fill="transparent"
      stroke="none"
      className="cursor-pointer"
      onClick={onClick}
    />
    <path
      d={
        direction === "left"
          ? `M${x + size / 4},${y - size / 4} l -${size / 2} ${size / 2} l ${
              size / 2
            } ${size / 2}`
          : `M${x - size / 4},${y - size / 4} l ${size / 2} ${size / 2} l -${
              size / 2
            } ${size / 2}`
      }
      fill="none"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </>
);
