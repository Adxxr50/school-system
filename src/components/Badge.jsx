export default function Badge({ children, variant = 'default', size = 'md', className = '', dot = false }) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    pink: 'bg-pink-50 text-pink-700 border-pink-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    // Grade badges with gradients
    a: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white border-transparent',
    b: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent',
    c: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-transparent',
    d: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent',
    f: 'bg-gradient-to-r from-red-500 to-rose-500 text-white border-transparent',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const dotColors = {
    default: 'bg-gray-500',
    primary: 'bg-blue-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    purple: 'bg-purple-500',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium border
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || dotColors.default}`} />
      )}
      {children}
    </span>
  );
}

export function GradeBadge({ percentage, size = 'md' }) {
  // Determine color based on score (1-100 scale)
  let colorClass = '';

  if (percentage >= 90) {
    colorClass = 'from-emerald-500 to-green-500';
  } else if (percentage >= 80) {
    colorClass = 'from-blue-500 to-indigo-500';
  } else if (percentage >= 70) {
    colorClass = 'from-amber-500 to-yellow-500';
  } else if (percentage >= 60) {
    colorClass = 'from-orange-500 to-amber-500';
  } else {
    colorClass = 'from-red-500 to-rose-500';
  }

  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs min-w-[50px]',
    md: 'px-3 py-1 text-sm min-w-[60px]',
    lg: 'px-4 py-1.5 text-base min-w-[70px]',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center rounded-lg font-bold text-white
        bg-gradient-to-r ${colorClass}
        shadow-sm
        ${sizeClasses[size]}
      `}
    >
      {percentage.toFixed(0)}
    </span>
  );
}

export function StatusBadge({ status, size = 'md' }) {
  const statusConfig = {
    present: { variant: 'success', label: 'Present', icon: true },
    absent: { variant: 'danger', label: 'Absent', icon: true },
    late: { variant: 'warning', label: 'Late', icon: true },
    pending: { variant: 'warning', label: 'Pending', pulse: true },
    in_progress: { variant: 'primary', label: 'In Progress', pulse: true },
    resolved: { variant: 'success', label: 'Resolved', icon: true },
    active: { variant: 'success', label: 'Active', dot: true },
    inactive: { variant: 'default', label: 'Inactive', dot: true },
    approved: { variant: 'success', label: 'Approved', icon: true },
    rejected: { variant: 'danger', label: 'Rejected', icon: true },
  };

  const config = statusConfig[status] || { variant: 'default', label: status };

  return (
    <Badge variant={config.variant} size={size} dot={config.dot}>
      {config.pulse && (
        <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {config.label}
    </Badge>
  );
}

// Percentage badge with color coding
export function PercentageBadge({ value, thresholds = { good: 90, warning: 75 }, size = 'md' }) {
  let variant = 'danger';
  if (value >= thresholds.good) variant = 'success';
  else if (value >= thresholds.warning) variant = 'warning';

  return (
    <Badge variant={variant} size={size}>
      {value}%
    </Badge>
  );
}

// Count badge (for notifications, etc.)
export function CountBadge({ count, max = 99, variant = 'danger', className = '' }) {
  const displayCount = count > max ? `${max}+` : count;

  if (count === 0) return null;

  return (
    <span
      className={`
        inline-flex items-center justify-center min-w-[20px] h-5 px-1.5
        text-xs font-bold text-white rounded-full
        ${variant === 'danger' ? 'bg-red-500' : variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'}
        ${className}
      `}
    >
      {displayCount}
    </span>
  );
}
