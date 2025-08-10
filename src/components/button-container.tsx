type Props = {
  children: React.ReactNode;
};

export function ButtonContainer({ children }: Readonly<Props>) {
  return (
    <div className="flex gap-2 sm:gap-3 w-full justify-end mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/30">
      {children}
    </div>
  );
}
