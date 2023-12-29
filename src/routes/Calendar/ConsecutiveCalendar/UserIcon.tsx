export const UserIcon = ({
  x,
  y,
  size,
}: {
  x: number;
  y: number;
  size: number;
}) => (
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="white"
    d={`M${x},${y - size / 4} a ${size / 4} ${size / 4} 0 0 1 0 ${size / 2} a ${
      size / 4
    } ${size / 4} 0 0 1 0 ${-size / 2} Z M${x - size / 2},${
      y + size * (3 / 4)
    } a ${size / 2} ${size / 2} 0 0 1 ${size} 0 a ${size * 1.8} ${
      size * 2
    } 0 0 1 ${-size} 0 Z`}
  />
);
