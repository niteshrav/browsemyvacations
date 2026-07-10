type Props = {
  message: string;
};

export function AdminErrorAlert({ message }: Props) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
      {message}
    </div>
  );
}

export function AdminSuccessAlert({ message }: Props) {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
      {message}
    </div>
  );
}
