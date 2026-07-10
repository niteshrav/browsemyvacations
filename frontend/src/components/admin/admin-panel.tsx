import type { ReactNode } from "react";
import {
  adminPanelBodyClassName,
  adminPanelClassName,
  adminPanelHeaderClassName,
} from "@/lib/admin-ui";

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function AdminPanel({ title, description, children, className }: Props) {
  return (
    <section className={`${adminPanelClassName()} ${className ?? ""}`}>
      {title ? (
        <div className={adminPanelHeaderClassName()}>
          <h2 className="text-base font-semibold text-stone-900">{title}</h2>
          {description ? <p className="mt-1 text-sm text-stone-500">{description}</p> : null}
        </div>
      ) : null}
      <div className={title ? adminPanelBodyClassName() : "p-5 sm:p-6"}>{children}</div>
    </section>
  );
}
