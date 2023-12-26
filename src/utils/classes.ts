export const classes = (...args: (string | undefined)[]) =>
  [args.map((arg) => arg ?? "")].join(" ");
