import { nanoid } from 'nanoid';
import { ChatMessage } from '../types/chatBubble';

export const chatScript: ChatMessage[] = [
  {
    id: nanoid(),
    type: 'doctor',
    message: '안녕하세요, 고양이 병원입니다. 환자분 성함이 어떻게 되세요?',
  },
  {
    id: nanoid(),
    type: 'patient',
    message: '유예지 입니다.',
  },
  {
    id: nanoid(),
    type: 'doctor',
    message: '네, 유예지님 안녕하세요. 어디가 아파서 오셨나요?',
  },
  {
    id: nanoid(),
    type: 'patient',
    message: '두통이 심하고 소화가 잘 안되는 것 같아요.',
  },
  {
    id: nanoid(),
    type: 'doctor',
    message: '그렇군요. 환자분 정보 한 번 확인하겠습니다.',
  },
  {
    id: nanoid(),
    type: 'doctor',
    message: '생년월일이 어떻게 되시나요?',
  },
  {
    id: nanoid(),
    type: 'patient',
    message: '1993-09-15 입니다.',
  },
  {
    id: nanoid(),
    type: 'doctor',
    message: '만 31세시군요.',
  },
  {
    id: nanoid(),
    type: 'doctor',
    message: '성별은 어떻게 되세요?',
  },
  {
    id: nanoid(),
    type: 'patient',
    message: '여자입니다.',
  },
  {
    id: nanoid(),
    type: 'doctor',
    message: '어떻게 방문하게 되셨나요?',
  },
  {
    id: nanoid(),
    type: 'patient',
    message: '검색, 지인 소개입니다.',
  },
  {
    id: nanoid(),
    type: 'doctor',
    message: '연락처 한 번 적어주시겠어요?',
  },
  {
    id: nanoid(),
    type: 'patient',
    message: '010-1234-5678입니다.',
  },
  {
    id: nanoid(),
    type: 'doctor',
    message: '네 소중한 정보 감사합니다.',
  },
  {
    id: nanoid(),
    type: 'doctor',
    message: '방문 원하는 날짜와 시간을 알려주시겠어요?',
  },
  {
    id: nanoid(),
    type: 'patient',
    message: '2025-05-23 오전 10시면 좋을 것 같습니다.',
  },
  {
    id: nanoid(),
    type: 'doctor',
    message: '네 가능할 것 같습니다. 예약 변동사항이 있다면 연락주세요.',
  },
];
