import { BaseInputProps } from '../../types/input';
import TextInput from '@/components/ui/input/text';
import TextareaInput from '@/components/ui/input/textarea';
import SelectInput from '@/components/ui/input/select';
import DateInput from '@/components/ui/input/date';
import DateTimeInput from '@/components/ui/input/datetime';
import RadioInput from '@/components/ui/input/radio';
import NumberInput from '@/components/ui/input/number';

interface ChatInputProps extends BaseInputProps {
  type?: 'text' | 'textarea' | 'select' | 'date' | 'datetime-local' | 'radio' | 'number';
  options?: { value: string; label: string }[];
}

export default function ChatInput({ type = 'text', options, ...props }: ChatInputProps) {
  switch (type) {
    case 'textarea':
      return <TextareaInput {...props} />;
    case 'select':
      if (!options) throw new Error('Select type requires options prop');
      return <SelectInput {...props} options={options} />;
    case 'date':
      return <DateInput {...props} />;
    case 'datetime-local':
      return <DateTimeInput {...props} />;
    case 'radio':
      if (!options) throw new Error('Radio type requires options prop');
      return <RadioInput {...props} options={options} />;
    case 'number':
      return <NumberInput {...props} />;
    default:
      return <TextInput {...props} />;
  }
}
