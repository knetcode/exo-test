type Props = {
  children: React.ReactNode;
};

export function FormContainer({ children }: Readonly<Props>) {
  return <div className="flex flex-col gap-3 sm:gap-6 w-full max-w-md mx-auto space-y-3 sm:space-y-4">{children}</div>;
}
