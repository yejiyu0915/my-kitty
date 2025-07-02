import { AIResponse } from '../../types/chatAI';

interface AIResponseInfoProps {
  lastAIResponse?: AIResponse;
}

export default function AIResponseInfo({ lastAIResponse }: AIResponseInfoProps) {
  if (!lastAIResponse) return null;

  return (
    <div className="item-center bg-primary/5 absolute bottom-0 left-0 z-11 flex h-8 w-full gap-2 px-8 py-1">
      <div className="flex items-center">
        <span className="text-primary mr-2 text-xs font-bold">AI 분석 결과</span>
        <span className="text-xs text-gray-700">
          신뢰도: {Math.round(lastAIResponse.confidence * 100)}%
        </span>
      </div>
      {lastAIResponse.suggestedActions && lastAIResponse.suggestedActions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {lastAIResponse.suggestedActions.map((action, index) => (
            <span key={index} className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
              {action}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
