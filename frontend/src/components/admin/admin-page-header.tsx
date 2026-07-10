import type { ReactNode } from "react";
import { adminPageDescriptionClassName, adminPageTitleClassName } from "@/lib/admin-ui";

type Props = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function AdminPageHeader({ title, description, actions }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className={adminPageTitleClassName()}>{title}</h1>
        {description ? <p className={adminPageDescriptionClassName()}>{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
