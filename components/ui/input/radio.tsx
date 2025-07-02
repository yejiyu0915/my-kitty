import { useState, ChangeEvent } from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  options: RadioOption[];
  className?: string;
  name?: string;
  otherOptionValue?: string;
  otherOptionPlaceholder?: string;
}

export default function RadioInput({
  value,
  onChange,
  disabled,
  options = [],
  className = '',
  name = 'radio-group',
  otherOptionValue = '기타',
  otherOptionPlaceholder = '기타를 입력해주세요.',
}: RadioInputProps) {
  const [otherValue, setOtherValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(value || '');

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);

    // 기타가 선택된 경우 기타 텍스트 값을 사용
    const finalValue = newValue === otherOptionValue ? otherValue : newValue;

    // onChange 이벤트를 시뮬레이션
    const syntheticEvent = {
      target: { value: finalValue },
    } as ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
  };

  const handleOtherChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newOtherValue = e.target.value;
    setOtherValue(newOtherValue);

    // 기타가 선택된 경우에만 onChange 호출
    if (selectedOption === otherOptionValue) {
      const syntheticEvent = {
        target: { value: newOtherValue },
      } as ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    }
  };

  return (
    <div className={`flex-1 ${className}`}>
      <div className="flex flex-col md:flex-row md:flex-wrap md:gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`group hover:border-primary/30 hover:bg-primary/5 relative flex w-full cursor-pointer items-center rounded-lg border-2 border-white p-2 text-sm transition-all duration-200 md:flex-1 md:p-3 md:text-base ${
              selectedOption === option.value
                ? 'border-primary bg-primary/10 shadow-xs'
                : 'hover:shadow-xs'
            } ${disabled ? 'cursor-not-allowed opacity-50' : ''} `}
          >
            <div className="relative flex items-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleRadioChange}
                disabled={disabled}
                className="sr-only" // 스크린 리더용으로 숨김
              />
              {/* 커스텀 라디오 버튼 */}
              <div
                className={`mr-2 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-200 md:mr-3 md:h-5 md:w-5 ${
                  selectedOption === option.value
                    ? 'border-primary bg-primary'
                    : 'group-hover:border-primary/50 border-gray-300 bg-white'
                } `}
              >
                {selectedOption === option.value && (
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white md:h-2 md:w-2" />
                )}
              </div>
            </div>
            <span
              className={`font-medium transition-colors duration-200 ${selectedOption === option.value ? 'text-primary' : 'text-gray-700'} `}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {selectedOption === otherOptionValue && (
        <div className="animate-in slide-in-from-left-2 mt-3 duration-300">
          <input
            type="text"
            value={otherValue}
            onChange={handleOtherChange}
            placeholder={otherOptionPlaceholder}
            disabled={disabled}
            className="focus:border-primary focus:ring-primary/20 w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-xs transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:py-3 md:text-sm"
          />
        </div>
      )}
    </div>
  );
}
