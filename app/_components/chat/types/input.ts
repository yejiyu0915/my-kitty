import { ChangeEvent, KeyboardEvent } from 'react';

export interface BaseInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  disabled: boolean;
}

export interface TextInputProps extends BaseInputProps {
  type?: 'text';
}

export interface TextareaInputProps extends BaseInputProps {
  type: 'textarea';
  rows?: number;
}

export interface SelectInputProps extends BaseInputProps {
  type: 'select';
  options: { value: string; label: string }[];
}

export interface DateInputProps extends BaseInputProps {
  type: 'date';
}

export interface DateTimeInputProps extends BaseInputProps {
  type: 'datetime-local';
}

export interface RadioInputProps extends BaseInputProps {
  type: 'radio';
  options: { value: string; label: string }[];
}

export interface NumberInputProps extends BaseInputProps {
  type: 'number';
}
