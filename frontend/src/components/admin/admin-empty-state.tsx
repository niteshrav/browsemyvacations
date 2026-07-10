type Props = {
  title: string;
  description?: string;
};

export function AdminEmptyState({ title, description }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-12 text-center">
      <p className="text-base font-medium text-stone-700">{title}</p>
      {description ? <p className="mt-2 text-sm text-stone-500">{description}</p> : null}
    </div>
  );
}
