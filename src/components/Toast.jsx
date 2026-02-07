import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const toastStyles = {
  success: {
    bg: 'bg-gradient-to-r from-emerald-50 to-green-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    icon: CheckCircle,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    progress: 'bg-emerald-500',
  },
  error: {
    bg: 'bg-gradient-to-r from-red-50 to-rose-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: XCircle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    progress: 'bg-red-500',
  },
  warning: {
    bg: 'bg-gradient-to-r from-amber-50 to-yellow-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    icon: AlertCircle,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    progress: 'bg-amber-500',
  },
  info: {
    bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: Info,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    progress: 'bg-blue-500',
  }
};

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast, index) => {
        const style = toastStyles[toast.type] || toastStyles.info;
        const Icon = style.icon;

        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto
              flex items-start gap-3
              px-4 py-4
              rounded-2xl
              border ${style.border} ${style.bg}
              shadow-lg shadow-black/5
              backdrop-blur-sm
              animate-slide-in-right
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon */}
            <div className={`p-2 rounded-xl ${style.iconBg}`}>
              <Icon className={style.iconColor} size={18} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              {toast.title && (
                <p className={`font-semibold ${style.text} mb-0.5`}>{toast.title}</p>
              )}
              <p className={`text-sm ${style.text} opacity-90`}>{toast.message}</p>
            </div>

            {/* Dismiss button */}
            {onDismiss && (
              <button
                onClick={() => onDismiss(toast.id)}
                className="p-1 -mt-1 -mr-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            )}

            {/* Progress bar (optional - if toast has duration) */}
            {toast.duration && (
              <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl">
                <div
                  className={`h-full ${style.progress} animate-shrink-width`}
                  style={{ animationDuration: `${toast.duration}ms` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Mini toast for inline notifications
export function MiniToast({ type = 'info', message, className = '' }) {
  const style = toastStyles[type] || toastStyles.info;
  const Icon = style.icon;

  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-2
      rounded-lg border ${style.border} ${style.bg}
      ${className}
    `}>
      <Icon className={style.iconColor} size={16} />
      <span className={`text-sm font-medium ${style.text}`}>{message}</span>
    </div>
  );
}
