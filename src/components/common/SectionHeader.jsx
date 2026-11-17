
export default function SectionHeader({
  title,
  subtitle,
  action,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <div>
        <h2 className="font-serif text-xl font-semibold text-[#1D211D]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-[#77766E]">{subtitle}</p>
        )}
      </div>

      {action && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 text-sm font-semibold text-[#174735] hover:underline"
        >
          {action}
        </button>
      )}
    </div>
  )
}
