
export default function Card({
  children,
  className = '',
  padding = 'p-5',
  ...props
}) {
  return (
    <div
      className={`rounded-2xl border border-[#EAE3D5] bg-[#FFFCF5] ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
