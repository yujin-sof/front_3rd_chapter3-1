import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '이벤트 1',
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '10:00',
      description: '첫 번째 이벤트',
      location: '장소 1',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
    {
      id: '2',
      title: '이벤트 2',
      date: '2024-07-02',
      startTime: '10:30',
      endTime: '12:00',
      description: '두 번째 이벤트',
      location: '장소 2',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
    {
      id: '3',
      title: '이벤트 3',
      date: '2024-07-03',
      startTime: '11:00',
      endTime: '12:30',
      description: '세 번째 이벤트',
      location: '장소 3',
      category: 'test',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 1,
    },
  ];

  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const result = getFilteredEvents(events, '이벤트 2', new Date('2024-07-01'), 'week');
    expect(result).toEqual([events[1]]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'week');
    expect(result).toEqual(events);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');
    expect(result).toEqual(events);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const result = getFilteredEvents(events, '이벤트', new Date('2024-07-01'), 'week');
    expect(result).toEqual(events);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'week');
    expect(result).toEqual(events);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const result = getFilteredEvents(events, '이벤트 2', new Date('2024-07-01'), 'week');
    expect(result).toEqual([events[1]]);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    const newEvents: Event[] = [
      ...events,
      {
        id: '4',
        title: '경계 이벤트',
        date: '2024-07-31',
        startTime: '12:00',
        endTime: '13:00',
        description: '마지막 날 이벤트',
        location: '장소 4',
        category: 'test',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 1,
      },
    ];
    const result = getFilteredEvents(newEvents, '', new Date('2024-07-15'), 'month');
    expect(result).toEqual(newEvents);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const result = getFilteredEvents([], '이벤트 2', new Date(), 'week');
    expect(result).toEqual([]);
  });
});
