
const variants = {
  primary: 'bg-[#174735] text-white hover:bg-[#103629]',
  secondary: 'bg-[#E6EEE7] text-[#174735] hover:bg-[#dce8de]',
  outline: 'border border-[#EAE3D5] text-[#1D211D] hover:bg-[#F7F2E8]',
  ghost: 'text-[#174735] hover:bg-[#E6EEE7]',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-base',
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
