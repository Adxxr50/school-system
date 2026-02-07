export function Card({ children, className = '', hover = false, onClick, gradient = false }) {
  return (
    <div
      className={`
        bg-white rounded-2xl
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]
        border border-gray-100/80
        backdrop-blur-sm
        ${hover ? 'card-hover cursor-pointer hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] hover:border-gray-200/80' : ''}
        ${gradient ? 'bg-gradient-to-br from-white to-gray-50/50' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', gradient = false }) {
  return (
    <div className={`
      px-5 py-4 border-b border-gray-100/80
      ${gradient ? 'bg-gradient-to-r from-gray-50/50 to-transparent' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-5 py-4 border-t border-gray-100/80 bg-gradient-to-r from-gray-50/80 to-gray-50/40 rounded-b-2xl ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, color = 'blue', className = '' }) {
  const colorConfig = {
    blue: {
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
    },
    green: {
      iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-600',
    },
    yellow: {
      iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
      textColor: 'text-amber-600',
    },
    red: {
      iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600',
      textColor: 'text-rose-600',
    },
    purple: {
      iconBg: 'bg-gradient-to-br from-violet-500 to-violet-600',
      textColor: 'text-violet-600',
    },
  };

  const config = colorConfig[color];

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`flex-shrink-0 p-2.5 sm:p-3 rounded-xl ${config.iconBg} text-white`}>
            <Icon size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">{label}</p>
            <p className={`text-xl sm:text-2xl font-bold ${config.textColor} mt-0.5`}>{value}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function GlassCard({ children, className = '', hover = false, onClick }) {
  return (
    <div
      className={`
        bg-white/70 backdrop-blur-xl rounded-2xl
        shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)]
        border border-white/50
        ${hover ? 'cursor-pointer hover:bg-white/80 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15)] transition-all duration-300' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function FeatureCard({ icon: Icon, title, description, color = 'blue', onClick }) {
  const colorConfig = {
    blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
    green: 'from-emerald-500 to-emerald-600 shadow-emerald-500/25',
    purple: 'from-violet-500 to-violet-600 shadow-violet-500/25',
    yellow: 'from-amber-500 to-amber-600 shadow-amber-500/25',
    red: 'from-rose-500 to-rose-600 shadow-rose-500/25',
  };

  return (
    <Card
      hover
      onClick={onClick}
      className="group overflow-hidden"
    >
      <CardBody className="p-6">
        <div className="flex items-start gap-4">
          <div className={`
            p-3 rounded-xl bg-gradient-to-br ${colorConfig[color]}
            text-white shadow-lg
            group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300
          `}>
            <Icon size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
