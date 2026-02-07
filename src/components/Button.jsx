export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  loading = false,
}) {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    active:scale-[0.98]
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 text-white
      hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25
      focus:ring-blue-500
    `,
    secondary: `
      bg-gray-100 text-gray-700 border border-gray-200
      hover:bg-gray-200 hover:border-gray-300
      focus:ring-gray-400
    `,
    success: `
      bg-gradient-to-r from-emerald-500 to-emerald-600 text-white
      hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25
      focus:ring-emerald-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600 text-white
      hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/25
      focus:ring-red-500
    `,
    warning: `
      bg-gradient-to-r from-amber-500 to-orange-500 text-white
      hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-500/25
      focus:ring-amber-500
    `,
    outline: `
      border-2 border-gray-300 text-gray-700 bg-white
      hover:bg-gray-50 hover:border-gray-400
      focus:ring-gray-400
    `,
    ghost: `
      text-gray-600 bg-transparent
      hover:bg-gray-100 hover:text-gray-900
      focus:ring-gray-400
    `,
    glass: `
      bg-white/10 backdrop-blur-md text-white border border-white/20
      hover:bg-white/20 hover:border-white/30
      focus:ring-white/50
    `,
  };

  const sizeClasses = {
    xs: 'px-2.5 py-1 text-xs gap-1.5',
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
    xl: 'px-8 py-4 text-lg gap-3',
  };

  const iconSizes = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <svg className="animate-spin" width={iconSizes[size]} height={iconSizes[size]} viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : Icon ? (
        <Icon size={iconSizes[size]} />
      ) : null}
      {children}
    </button>
  );
}

// Icon-only button variant
export function IconButton({
  icon: Icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  label,
}) {
  const sizeClasses = {
    xs: 'p-1',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
    xl: 'p-3',
  };

  const iconSizes = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
  };

  const variantClasses = {
    primary: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    success: 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200',
    danger: 'bg-red-100 text-red-600 hover:bg-red-200',
    warning: 'bg-amber-100 text-amber-600 hover:bg-amber-200',
    ghost: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`
        rounded-xl transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <Icon size={iconSizes[size]} />
    </button>
  );
}
