

export function NexoLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left vertical */}
      <rect x="4" y="4" width="3" height="16" rx="1.5" fill="currentColor" />

      {/* Diagonal */}
      <path
        d="M7 4L17 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Right vertical */}
      <rect x="17" y="4" width="3" height="16" rx="1.5" fill="currentColor" />
    </svg>
  )
}