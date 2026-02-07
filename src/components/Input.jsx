import { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';

export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success,
  hint,
  className = '',
  required = false,
  disabled = false,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon size={18} className={`transition-colors ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-500'}`} />
          </div>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5
            bg-white border rounded-xl
            text-gray-900 placeholder-gray-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${Icon ? 'pl-11' : ''}
            ${isPassword || RightIcon ? 'pr-11' : ''}
            ${error
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : success
                ? 'border-emerald-300 focus:ring-emerald-500/20 focus:border-emerald-500'
                : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-300'
            }
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {RightIcon && !isPassword && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RightIcon size={18} />
          </button>
        )}
        {success && !RightIcon && !isPassword && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
            <Check size={18} className="text-emerald-500" />
          </div>
        )}
      </div>
      {(error || hint) && (
        <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  hint,
  className = '',
  required = false,
  disabled = false,
  icon: Icon,
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon size={18} className={`transition-colors ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-500'}`} />
          </div>
        )}
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5
            bg-white border rounded-xl
            text-gray-900
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            appearance-none cursor-pointer
            ${Icon ? 'pl-11' : ''}
            pr-10
            ${error
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-300'
            }
          `}
        >
          <option value="" className="text-gray-400">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {(error || hint) && (
        <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
  className = '',
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
}) {
  const charCount = value?.length || 0;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3
            bg-white border rounded-xl
            text-gray-900 placeholder-gray-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            resize-none
            ${error
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-300'
            }
          `}
        />
        {maxLength && (
          <div className="absolute bottom-2 right-3 text-xs text-gray-400">
            {charCount}/{maxLength}
          </div>
        )}
      </div>
      {(error || hint) && (
        <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  onClear,
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full pl-11 pr-10 py-2.5
          bg-gray-50 border border-gray-200 rounded-xl
          text-gray-900 placeholder-gray-400
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white
          hover:border-gray-300
        "
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}) {
  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className="
          w-5 h-5 border-2 rounded-md
          border-gray-300 bg-white
          peer-checked:border-blue-500 peer-checked:bg-blue-500
          peer-focus:ring-2 peer-focus:ring-blue-500/20
          transition-all duration-200
        ">
          <Check
            size={14}
            className="absolute top-0.5 left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
          />
        </div>
      </div>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
