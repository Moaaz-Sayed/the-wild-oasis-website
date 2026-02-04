"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ pendingLabel, children }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 px-6 sm:px-8 py-3 sm:py-4 text-primary-900 font-semibold rounded-md shadow-sm hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 w-full sm:w-auto"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
