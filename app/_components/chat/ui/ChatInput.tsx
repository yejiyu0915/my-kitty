import { BaseInputProps } from '../types/input';
import TextInput from './input/TextInput';
import TextareaInput from './input/TextareaInput';
import SelectInput from './input/SelectInput';
import DateInput from './input/DateInput';
import DateTimeInput from './input/DateTimeInput';
import RadioInput from './input/RadioInput';
import NumberInput from './input/NumberInput';

interface ChatInputProps extends BaseInputProps {
  type?: 'text' | 'textarea' | 'select' | 'date' | 'datetime-local' | 'radio' | 'number';
  options?: { value: string; label: string }[];
}

export default function ChatInput({ type = 'text', options, ...props }: ChatInputProps) {
  switch (type) {
    case 'textarea':
      return <TextareaInput {...props} type="textarea" />;
    case 'select':
      if (!options) throw new Error('Select type requires options prop');
      return <SelectInput {...props} type="select" options={options} />;
    case 'date':
      return <DateInput {...props} type="date" />;
    case 'datetime-local':
      return <DateTimeInput {...props} type="datetime-local" />;
    case 'radio':
      if (!options) throw new Error('Radio type requires options prop');
      return <RadioInput {...props} type="radio" options={options} />;
    case 'number':
      return <NumberInput {...props} type="number" />;
    default:
      return <TextInput {...props} />;
  }
}
