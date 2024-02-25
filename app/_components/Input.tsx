export function Input({
  value,
  onChange,
  onBlur,
  className,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  className?: string;
}) {
  return (
    <input
      className={"p-2 w-[90%] rounded " + className}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
