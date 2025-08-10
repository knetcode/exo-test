type Props = {
  children: React.ReactNode;
};

export function FormContainer({ children }: Readonly<Props>) {
  return <div className="flex flex-col gap-6 w-full max-w-md mx-auto space-y-4">{children}</div>;
}
