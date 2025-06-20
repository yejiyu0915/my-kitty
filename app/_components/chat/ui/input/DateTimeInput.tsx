import { DateTimeInputProps } from '../../types/input';

export default function DateTimeInput({
  value,
  onChange,
  placeholder,
  disabled,
}: DateTimeInputProps) {
  // 현재 시간을 기준으로 최소 시간 계산
  const getMinDateTime = () => {
    const now = new Date();

    // 현재 시간을 30분 단위로 올림
    const minutes = now.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 30) * 30;
    now.setMinutes(roundedMinutes, 0, 0);

    // 일요일인 경우 다음 월요일로 설정
    if (now.getDay() === 0) {
      now.setDate(now.getDate() + 1);
      now.setHours(9, 0, 0, 0);
    }

    // 9시 이전이면 9시로 설정
    if (now.getHours() < 9) {
      now.setHours(9, 0, 0, 0);
    }

    // 18시 이후면 다음날 9시로 설정
    if (now.getHours() >= 18) {
      now.setDate(now.getDate() + 1);
      now.setHours(9, 0, 0, 0);
    }

    return now.toISOString().slice(0, 16);
  };

  // 최대 시간 설정 (현재 날짜로부터 30일 후)
  const getMaxDateTime = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    maxDate.setHours(17, 30, 0, 0); // 17:30 (18:00 이전)
    return maxDate.toISOString().slice(0, 16);
  };

  return (
    <input
      type="datetime-local"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      step="1800" // 30분 단위 (1800초 = 30분)
      min={getMinDateTime()}
      max={getMaxDateTime()}
      className="flex-1 bg-transparent outline-none disabled:opacity-50"
    />
  );
}
