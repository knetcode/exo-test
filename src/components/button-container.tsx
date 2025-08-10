type Props = {
  children: React.ReactNode;
};

export function ButtonContainer({ children }: Readonly<Props>) {
  return <div className="flex gap-3 w-full justify-end mt-6 pt-4 border-t border-border/30">{children}</div>;
}
