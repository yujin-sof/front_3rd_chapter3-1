import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  const events: Event[] = [
    {
      id: '1',
      title: 'Event 1',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10, // 10분 전 알림
    },
    {
      id: '2',
      title: 'Event 2',
      date: '2024-07-01',
      startTime: '15:00',
      endTime: '16:00',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30, // 30분 전 알림
    },
  ];
  const now = new Date('2024-07-01T14:20:00');
  const notifiedEvents = ['1'];

  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const result = getUpcomingEvents(events, now, []);
    expect(result).toEqual([events[0]]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const result = getUpcomingEvents(events, now, []);
    expect(result).not.toContain(events[1]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const pastEvents = [
      {
        ...events[0],
        startTime: '14:00',
        notificationTime: 10,
      },
    ];
    const result = getUpcomingEvents(pastEvents, now, []);
    expect(result).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '1',
      title: 'Event 1',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    };
    const result = createNotificationMessage(event);
    expect(result).toBe('10분 후 Event 1 일정이 시작됩니다.');
  });
});
