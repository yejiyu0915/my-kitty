import { nanoid } from 'nanoid';
import { ChatMessage } from '../types/chatBubble';

export const chatScript: ChatMessage[] = [
  {
    id: nanoid(),
    message: '안녕하세요, 고양이 병원입니다. 환자분 성함이 어떻게 되세요?',
  },
  {
    id: nanoid(),
    message: '네, {name}님 안녕하세요. 어디가 아파서 오셨나요?',
  },
  {
    id: nanoid(),
    message: '그렇군요. 환자분 정보 한 번 확인하겠습니다.',
  },
  {
    id: nanoid(),
    message: '생년월일이 어떻게 되시나요?',
  },
  {
    id: nanoid(),
    message: '만 31세시군요.',
  },
  {
    id: nanoid(),
    message: '성별은 어떻게 되세요?',
  },
  {
    id: nanoid(),
    message: '어떻게 방문하게 되셨나요?',
  },
  {
    id: nanoid(),
    message: '연락처 한 번 적어주시겠어요?',
  },
  {
    id: nanoid(),
    message: '네 소중한 정보 감사합니다.',
  },
  {
    id: nanoid(),
    message: '방문 원하는 날짜와 시간을 알려주시겠어요?',
  },
  {
    id: nanoid(),
    message: '네 가능할 것 같습니다. 예약 변동사항이 있다면 연락주세요.',
  },
];
