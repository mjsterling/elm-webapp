export const StyledSubmit = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <input
      className="rounded px-4 py-2 bg-blue-700 text-white font-semibold"
      type="submit"
      {...props}
    />
  );
};
