type Props = {
  children: React.ReactNode;
};

export function ButtonContainer({ children }: Readonly<Props>) {
  return <div className="flex gap-2 w-full justify-end mt-4">{children}</div>;
}
