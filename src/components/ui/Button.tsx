import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<
  Variant,
  string
> = {
  primary:
    "bg-gradient-to-br from-[#c4b5fd] via-[#e9d5ff] to-[#fbcfe8] text-[#3b2f55] shadow-sm hover:brightness-[1.03] active:scale-[0.99]",
  secondary:
    "bg-white text-[#4c3f66] border border-[var(--border)] shadow-sm hover:border-[#dcd6ec] hover:bg-[#faf8ff] active:scale-[0.99]",
  ghost: "text-[#5b4d78] hover:bg-[#f6f2ff] active:bg-[#efe8ff]",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({ variant = "primary", className = "", children, ...rest }: Props) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-45 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
