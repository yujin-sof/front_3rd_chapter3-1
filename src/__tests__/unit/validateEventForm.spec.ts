import { EventForm } from '../../types.ts';
import { validateEventForm } from '../../utils/validateEventForm.ts';

describe('validateEventForm 유틸함수에 대한 테스트코드', () => {
  it('필수 필드가 모두 입력되었다면 true 반환', () => {
    const validFormData: Partial<EventForm> = {
      title: 'Event Title',
      date: '2024-11-08',
      startTime: '10:00',
      endTime: '11:00',
    };

    expect(validateEventForm(validFormData)).toBe(true);
  });

  it('제목 누락시 false 반환', () => {
    const invalidFormData: Partial<EventForm> = {
      date: '2024-11-08',
      startTime: '10:00',
      endTime: '11:00',
    };

    expect(validateEventForm(invalidFormData)).toBe(false);
  });

  it('날짜 누락시 false 반환', () => {
    const invalidFormData: Partial<EventForm> = {
      title: 'Event Title',
      startTime: '10:00',
      endTime: '11:00',
    };

    expect(validateEventForm(invalidFormData)).toBe(false);
  });

  it('시작시간 누락시 false 반환', () => {
    const invalidFormData: Partial<EventForm> = {
      title: 'Event Title',
      date: '2024-11-08',
      endTime: '11:00',
    };

    expect(validateEventForm(invalidFormData)).toBe(false);
  });

  it('종료시간 누락시 false 반환', () => {
    const invalidFormData: Partial<EventForm> = {
      title: 'Event Title',
      date: '2024-11-08',
      startTime: '10:00',
    };

    expect(validateEventForm(invalidFormData)).toBe(false);
  });
});
