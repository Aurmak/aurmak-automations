import React from 'react';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={inputId} className="text-sm font-semibold text-aurmak-textDark flex justify-between">
        <span>{label}</span>
        {props.required && <span className="text-sm text-aurmak-textDim font-mono">Required</span>}
      </label>
      <input
        id={inputId}
        className={`w-full px-3.5 py-2.5 bg-white border rounded-sm text-sm text-aurmak-text placeholder:text-aurmak-textDim transition-colors focus-visible:outline-none focus-visible:border-aurmak-action focus-visible:ring-1 focus-visible:ring-aurmak-action ${
          error ? 'border-aurmak-danger' : 'border-aurmak-border hover:border-aurmak-borderHover'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-sm font-medium text-aurmak-danger">{error}</span>}
      {helperText && !error && <span className="text-sm text-aurmak-textMuted">{helperText}</span>}
    </div>
  );
};

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  rows = 4,
  ...props
}) => {
  const inputId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={inputId} className="text-sm font-semibold text-aurmak-textDark flex justify-between">
        <span>{label}</span>
        {props.required && <span className="text-sm text-aurmak-textDim font-mono">Required</span>}
      </label>
      <textarea
        id={inputId}
        rows={rows}
        className={`w-full px-3.5 py-2.5 bg-white border rounded-sm text-sm text-aurmak-text placeholder:text-aurmak-textDim transition-colors focus-visible:outline-none focus-visible:border-aurmak-action focus-visible:ring-1 focus-visible:ring-aurmak-action ${
          error ? 'border-aurmak-danger' : 'border-aurmak-border hover:border-aurmak-borderHover'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-sm font-medium text-aurmak-danger">{error}</span>}
      {helperText && !error && <span className="text-sm text-aurmak-textMuted">{helperText}</span>}
    </div>
  );
};

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  helperText?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  error,
  helperText,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={inputId} className="text-sm font-semibold text-aurmak-textDark flex justify-between">
        <span>{label}</span>
        {props.required && <span className="text-sm text-aurmak-textDim font-mono">Required</span>}
      </label>
      <select
        id={inputId}
        className={`w-full px-3.5 py-2.5 bg-white border rounded-sm text-sm text-aurmak-text placeholder:text-aurmak-textDim transition-colors focus-visible:outline-none focus-visible:border-aurmak-action focus-visible:ring-1 focus-visible:ring-aurmak-action cursor-pointer ${
          error ? 'border-aurmak-danger' : 'border-aurmak-border hover:border-aurmak-borderHover'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white text-aurmak-textDark">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm font-medium text-aurmak-danger">{error}</span>}
      {helperText && !error && <span className="text-sm text-aurmak-textMuted">{helperText}</span>}
    </div>
  );
};
