import { adminStatusBadgeClassName } from "@/lib/admin-ui";

type Props = {
  label: string;
  active?: boolean;
};

export function AdminStatusBadge({ label, active }: Props) {
  return <span className={adminStatusBadgeClassName(label, active)}>{label}</span>;
}
