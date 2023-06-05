import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  component,
  to,
  href,
  children,
  className,
  title,
  type = 'button',
  disabled,
  onClick,
}: {
  component?: any;
  to?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
  title?: string;
  type?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}) {
  const Component = href ? 'a' : to ? Link : component ?? 'button';

  return (
    <Component
      className={`flex items-center justify-center text-sm text-gray-800 dark:text-gray-200 font-semibold h-8 p-1 rounded-lg dark:hover:bg-slate-600 hover:bg-slate-500 hover:text-primary focus:outline-none focus:ring-slate-400 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      to={to}
      href={href}
      onClick={onClick}
      type={type}
      title={title}
      disabled={disabled}
    >
      {children}
    </Component>
  );
}
