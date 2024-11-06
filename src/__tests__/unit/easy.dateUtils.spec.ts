import { Event } from '../../types';
import {
  fillZero,
  formatDate,
  formatMonth,
  formatWeek,
  getDaysInMonth,
  getEventsForDay,
  getWeekDates,
  getWeeksAtMonth,
  isDateInRange,
} from '../../utils/dateUtils';

describe('getDaysInMonth', () => {
  it('1월은 31일 수를 반환한다', () => {
    expect(getDaysInMonth(2023, 1)).toBe(31);
  });

  it('4월은 30일 일수를 반환한다', () => {
    expect(getDaysInMonth(2023, 4)).toBe(30);
  });

  it('윤년의 2월에 대해 29일을 반환한다', () => {
    expect(getDaysInMonth(2024, 2)).toBe(29);
  });

  it('평년의 2월에 대해 28일을 반환한다', () => {
    expect(getDaysInMonth(2023, 2)).toBe(28);
  });

  it('유효하지 않은 월에 대해 적절히 처리한다', () => {
    expect(getDaysInMonth(2023, 13)).toBe(31);
  });
});

describe('getWeekDates', () => {
  it('주중의 날짜(수요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const wednesday = new Date('2023-11-01'); // 수요일
    const weekDates = getWeekDates(wednesday);
    expect(weekDates.map((date) => date.toDateString())).toEqual([
      'Sun Oct 29 2023',
      'Mon Oct 30 2023',
      'Tue Oct 31 2023',
      'Wed Nov 01 2023',
      'Thu Nov 02 2023',
      'Fri Nov 03 2023',
      'Sat Nov 04 2023',
    ]);
  });

  it('주의 시작(월요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const monday = new Date('2023-11-06');
    const weekDates = getWeekDates(monday);
    expect(weekDates.map((date) => date.toDateString())).toEqual([
      'Sun Nov 05 2023',
      'Mon Nov 06 2023',
      'Tue Nov 07 2023',
      'Wed Nov 08 2023',
      'Thu Nov 09 2023',
      'Fri Nov 10 2023',
      'Sat Nov 11 2023',
    ]);
  });

  it('주의 끝(일요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const sunday = new Date('2023-11-05');
    const weekDates = getWeekDates(sunday);
    expect(weekDates.map((date) => date.toDateString())).toEqual([
      'Sun Nov 05 2023',
      'Mon Nov 06 2023',
      'Tue Nov 07 2023',
      'Wed Nov 08 2023',
      'Thu Nov 09 2023',
      'Fri Nov 10 2023',
      'Sat Nov 11 2023',
    ]);
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연말)', () => {
    const endYearDay = new Date('2023-12-30');
    const weekDates = getWeekDates(endYearDay);
    expect(weekDates.map((date) => date.toDateString())).toEqual([
      'Sun Dec 24 2023',
      'Mon Dec 25 2023',
      'Tue Dec 26 2023',
      'Wed Dec 27 2023',
      'Thu Dec 28 2023',
      'Fri Dec 29 2023',
      'Sat Dec 30 2023',
    ]);
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연초)', () => {
    const startYearDay = new Date('2024-01-01');
    const weekDates = getWeekDates(startYearDay);
    expect(weekDates.map((date) => date.toDateString())).toEqual([
      'Sun Dec 31 2023',
      'Mon Jan 01 2024',
      'Tue Jan 02 2024',
      'Wed Jan 03 2024',
      'Thu Jan 04 2024',
      'Fri Jan 05 2024',
      'Sat Jan 06 2024',
    ]);
  });

  it('윤년의 2월 29일을 포함한 주를 올바르게 처리한다', () => {
    const leapDay = new Date('2024-02-29'); // 윤년 2월 29일
    const weekDates = getWeekDates(leapDay);
    expect(weekDates.map((date) => date.toDateString())).toEqual([
      'Sun Feb 25 2024',
      'Mon Feb 26 2024',
      'Tue Feb 27 2024',
      'Wed Feb 28 2024',
      'Thu Feb 29 2024',
      'Fri Mar 01 2024',
      'Sat Mar 02 2024',
    ]);
  });

  it('월의 마지막 날짜를 포함한 주를 올바르게 처리한다', () => {
    const endOfMonth = new Date('2023-11-30'); // 11월 마지막 날
    const weekDates = getWeekDates(endOfMonth);
    expect(weekDates.map((date) => date.toDateString())).toEqual([
      'Sun Nov 26 2023',
      'Mon Nov 27 2023',
      'Tue Nov 28 2023',
      'Wed Nov 29 2023',
      'Thu Nov 30 2023',
      'Fri Dec 01 2023',
      'Sat Dec 02 2023',
    ]);
  });
});

describe('getWeeksAtMonth', () => {
  it('2024년 7월 1일의 올바른 주 정보를 반환해야 한다', () => {
    const date = new Date('2024-07-01');
    const weeks = getWeeksAtMonth(date);

    expect(weeks).toEqual([
      [null, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, 31, null, null, null],
    ]);
  });
});

describe('getEventsForDay', () => {
  const events: Event[] = [
    {
      id: '1',
      title: 'Event 1',
      date: '2023-11-01',
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
      date: '2023-11-01',
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

  it('특정 날짜(1일)에 해당하는 이벤트만 정확히 반환한다', () => {
    const result = getEventsForDay(events, 1);
    expect(result).toEqual([
      {
        id: '1',
        title: 'Event 1',
        date: '2023-11-01',
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
        date: '2023-11-01',
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
    ]);
  });

  it('해당 날짜에 이벤트가 없을 경우 빈 배열을 반환한다', () => {
    const result = getEventsForDay(events, 4);
    expect(result).toEqual([]);
  });

  it('날짜가 0일 경우 빈 배열을 반환한다', () => {
    const result = getEventsForDay(events, 0);
    expect(result).toEqual([]);
  });

  it('날짜가 32일 이상인 경우 빈 배열을 반환한다', () => {
    const result = getEventsForDay(events, 32);
    expect(result).toEqual([]);
  });
});

describe('formatWeek', () => {
  it('월의 중간 날짜에 대해 올바른 주 정보를 반환한다', () => {
    const date = new Date('2024-07-15');
    const result = formatWeek(date);
    expect(result).toBe('2024년 7월 3주');
  });

  it('월의 첫 주에 대해 올바른 주 정보를 반환한다', () => {
    const date = new Date('2024-07-03');
    const result = formatWeek(date);
    expect(result).toBe('2024년 7월 1주');
  });

  it('월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const date = new Date('2024-07-29'); // 7월 마지막 주 날짜
    const result = formatWeek(date);
    expect(result).toBe('2024년 8월 1주');
  });

  it('연도가 바뀌는 주에 대해 올바른 주 정보를 반환한다', () => {
    const date = new Date('2023-12-31'); // 연말에 해당하는 날짜
    const result = formatWeek(date);
    expect(result).toBe('2024년 1월 1주');
  });

  it('윤년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const date = new Date('2024-02-29'); // 윤년의 2월 마지막 날
    const result = formatWeek(date);
    expect(result).toBe('2024년 2월 5주');
  });

  it('평년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const date = new Date('2023-02-28'); // 평년의 2월 마지막 날
    const result = formatWeek(date);
    expect(result).toBe('2023년 3월 1주');
  });
});

describe('formatMonth', () => {
  it("2024년 7월 10일을 '2024년 7월'로 반환한다", () => {
    const date = new Date('2024-07-10');
    const result = formatMonth(date);
    expect(result).toBe('2024년 7월');
  });
});

describe('isDateInRange', () => {
  const rangeStart = new Date('2024-07-01');
  const rangeEnd = new Date('2024-07-31');

  it('범위 내의 날짜 2024-07-10에 대해 true를 반환한다', () => {
    const date = new Date('2024-07-10');
    const result = isDateInRange(date, rangeStart, rangeEnd);
    expect(result).toBe(true);
  });

  it('범위의 시작일 2024-07-01에 대해 true를 반환한다', () => {
    const date = new Date('2024-07-01');
    const result = isDateInRange(date, rangeStart, rangeEnd);
    expect(result).toBe(true);
  });

  it('범위의 종료일 2024-07-31에 대해 true를 반환한다', () => {
    const date = new Date('2024-07-31');
    const result = isDateInRange(date, rangeStart, rangeEnd);
    expect(result).toBe(true);
  });

  it('범위 이전의 날짜 2024-06-30에 대해 false를 반환한다', () => {
    const date = new Date('2024-06-30');
    const result = isDateInRange(date, rangeStart, rangeEnd);
    expect(result).toBe(false);
  });

  it('범위 이후의 날짜 2024-08-01에 대해 false를 반환한다', () => {
    const date = new Date('2024-08-01');
    const result = isDateInRange(date, rangeStart, rangeEnd);
    expect(result).toBe(false);
  });

  it('시작일이 종료일보다 늦은 경우 모든 날짜에 대해 false를 반환한다', () => {
    const invalidStart = new Date('2024-08-01');
    const invalidEnd = new Date('2024-07-01');
    const date = new Date('2024-07-10');
    const result = isDateInRange(date, invalidStart, invalidEnd);
    expect(result).toBe(false);
  });
});

describe('fillZero', () => {
  test("5를 2자리로 변환하면 '05'를 반환한다", () => {
    expect(fillZero(5, 2)).toBe('05');
  });

  test("10을 2자리로 변환하면 '10'을 반환한다", () => {
    expect(fillZero(10, 2)).toBe('10');
  });

  test("3을 3자리로 변환하면 '003'을 반환한다", () => {
    expect(fillZero(3, 3)).toBe('003');
  });

  test("100을 2자리로 변환하면 '100'을 반환한다", () => {
    expect(fillZero(100, 2)).toBe('100');
  });

  test("0을 2자리로 변환하면 '00'을 반환한다", () => {
    expect(fillZero(0, 2)).toBe('00');
  });

  test("1을 5자리로 변환하면 '00001'을 반환한다", () => {
    expect(fillZero(1, 5)).toBe('00001');
  });

  test("소수점이 있는 3.14를 5자리로 변환하면 '03.14'를 반환한다", () => {
    expect(fillZero(3.14, 5)).toBe('03.14');
  });

  test('size 파라미터를 생략하면 기본값 2를 사용한다', () => {
    expect(fillZero(7)).toBe('07');
  });

  test('value가 지정된 size보다 큰 자릿수를 가지면 원래 값을 그대로 반환한다', () => {
    expect(fillZero(1234, 3)).toBe('1234');
  });
});

describe('formatDate', () => {
  it('날짜를 YYYY-MM-DD 형식으로 포맷팅한다', () => {
    const date = new Date('2024-07-10');
    expect(formatDate(date)).toBe('2024-07-10');
  });

  it('day 파라미터가 제공되면 해당 일자로 포맷팅한다', () => {
    const date = new Date('2024-07-10');
    expect(formatDate(date, 15)).toBe('2024-07-15');
  });

  it('월이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {
    const date = new Date('2024-03-10'); // 3월은 한 자리 수
    expect(formatDate(date)).toBe('2024-03-10');
  });

  it('일이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {
    const date = new Date('2024-07-05'); // 5일은 한 자리 수
    expect(formatDate(date)).toBe('2024-07-05');
  });
});
