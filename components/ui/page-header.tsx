import type React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  children,
}: PageHeaderProps): React.JSX.Element {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-b">
      <div className="container mx-auto px-2 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          {children && <div className="flex-shrink-0">{children}</div>}
        </div>
      </div>
    </div>
  );
}
