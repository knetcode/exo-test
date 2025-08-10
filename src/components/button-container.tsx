type Props = {
  children: React.ReactNode;
};

export function ButtonContainer({ children }: Readonly<Props>) {
  return <div className="flex gap-2">{children}</div>;
}
