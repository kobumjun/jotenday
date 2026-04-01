 "use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  pendingLabel?: string;
  children: ReactNode;
};

export function FormButton({ pendingLabel, children, className = "", ...rest }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-busy={pending}
      disabled={pending || rest.disabled}
      className={`inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...rest}
    >
      {pending ? (
        <>
          <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-[#e9d5ff] border-t-transparent" />
          <span>{pendingLabel ?? "처리 중..."}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

