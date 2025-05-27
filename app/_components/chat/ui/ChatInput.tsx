import { BaseInputProps } from '../types/input';
import TextInput from './input/TextInput';
import TextareaInput from './input/TextareaInput';
import SelectInput from './input/SelectInput';

interface ChatInputProps extends BaseInputProps {
  type?: 'text' | 'textarea' | 'select';
  options?: { value: string; label: string }[];
}

export default function ChatInput({ type = 'text', options, ...props }: ChatInputProps) {
  switch (type) {
    case 'textarea':
      return <TextareaInput {...props} type="textarea" />;
    case 'select':
      if (!options) throw new Error('Select type requires options prop');
      return <SelectInput {...props} type="select" options={options} />;
    default:
      return <TextInput {...props} />;
  }
}
