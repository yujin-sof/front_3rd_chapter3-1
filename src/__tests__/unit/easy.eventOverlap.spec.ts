import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    const date = '2024-07-01';
    const time = '14:30';
    const result = parseDateTime(date, time);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(6);
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    const date = '2024-07-32';
    const time = '14:30';
    const result = parseDateTime(date, time);
    expect(result.toString()).toBe('Invalid Date');
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    const date = '2024-07-01';
    const time = '25:61';
    const result = parseDateTime(date, time);
    expect(result.toString()).toBe('Invalid Date');
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const date = '';
    const time = '14:30';
    const result = parseDateTime(date, time);
    expect(result.toString()).toBe('Invalid Date');
  });
});

describe('convertEventToDateRange', () => {
  const events: Event[] = [
    {
      id: '1',
      title: 'Event 1',
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '17:00',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
    {
      id: '2',
      title: 'Event 2',
      date: '2024-07-32',
      startTime: '09:00',
      endTime: '17:00',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
    {
      id: '3',
      title: 'Event 3',
      date: '2024-07-02',
      startTime: '25:61',
      endTime: '99:00',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
    {
      id: '4',
      title: 'Event 4',
      date: '2024-07-03',
      startTime: '09:00',
      endTime: '17:00',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
  ];

  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const result = convertEventToDateRange(events[0]);
    expect(result.start).toEqual(parseDateTime('2024-07-01', '09:00'));
    expect(result.end).toEqual(parseDateTime('2024-07-01', '17:00'));
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const result = convertEventToDateRange(events[1]);
    expect(result.start.toString()).toBe('Invalid Date');
    expect(result.end.toString()).toBe('Invalid Date');
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const result = convertEventToDateRange(events[2]);
    expect(result.start.toString()).toBe('Invalid Date');
    expect(result.end.toString()).toBe('Invalid Date');
  });
});

describe('isOverlapping', () => {
  const events: Event[] = [
    {
      id: '1',
      title: 'Event 1',
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '11:00',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
    {
      id: '2',
      title: 'Event 2',
      date: '2024-07-01',
      startTime: '10:30',
      endTime: '12:00',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
    {
      id: '3',
      title: 'Event 3',
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '10:00',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
    {
      id: '4',
      title: 'Event 4',
      date: '2024-07-01',
      startTime: '10:30',
      endTime: '12:00',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
  ];

  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    const result = isOverlapping(events[0], events[1]);
    expect(result).toBe(true);
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const result = isOverlapping(events[2], events[3]);
    expect(result).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
  const events: Event[] = [
    {
      id: '1',
      title: 'Event 1',
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '10:00',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
    {
      id: '2',
      title: 'Event 2',
      date: '2024-07-01',
      startTime: '10:30',
      endTime: '12:00',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
    {
      id: '3',
      title: 'Event 3',
      date: '2024-07-01',
      startTime: '11:30',
      endTime: '12:30',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
  ];

  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const newEvent: Event = {
      id: '4',
      title: 'Event 4',
      date: '2024-07-01',
      startTime: '09:30',
      endTime: '11:30',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    };
    const overlappingEvents = findOverlappingEvents(newEvent, events);
    expect(overlappingEvents).toEqual([
      events[0], // id 1
      events[1], // id 2
    ]);
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const newEvent: Event = {
      id: '5',
      title: 'Event 5',
      date: '2024-07-01',
      startTime: '12:30',
      endTime: '13:30',
      description: 'test',
      location: 'test',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    };
    const overlappingEvents = findOverlappingEvents(newEvent, events);
    expect(overlappingEvents).toEqual([]);
  });
});
