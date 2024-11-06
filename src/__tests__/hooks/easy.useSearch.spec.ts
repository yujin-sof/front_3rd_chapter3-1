import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

const events: Event[] = [
  {
    id: '1',
    title: '팀 회의',
    date: '2024-07-01',
    startTime: '09:00',
    endTime: '10:00',
    description: '주간 팀 회의',
    location: '회의실 1',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  },
  {
    id: '2',
    title: '점심 식사',
    date: '2024-07-02',
    startTime: '12:00',
    endTime: '13:00',
    description: '외부 식사',
    location: '레스토랑',
    category: '개인',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 5,
  },
  {
    id: '3',
    title: '월간 보고',
    date: '2024-07-15',
    startTime: '14:00',
    endTime: '15:00',
    description: '7월 월간 보고',
    location: '사무실',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  },
];

const currentDate = new Date('2024-07-01');

it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(events, currentDate, 'month'));
  expect(result.current.filteredEvents).toEqual(events);
});

it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
  const { result } = renderHook(() => useSearch(events, currentDate, 'month'));
  act(() => result.current.setSearchTerm('점심'));
  expect(result.current.filteredEvents).toEqual([events[1]]);
});

it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(events, currentDate, 'month'));
  act(() => result.current.setSearchTerm('회의'));
  expect(result.current.filteredEvents).toEqual([events[0]]);
});

it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(events, currentDate, 'month'));
  const monthEvents = events.filter(
    (event) => new Date(event.date).getMonth() + 1 === currentDate.getMonth() + 1
  ); // 가정된 주간 범위
  expect(result.current.filteredEvents).toEqual(monthEvents);
});

it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
  const { result } = renderHook(() => useSearch(events, currentDate, 'month'));
  act(() => result.current.setSearchTerm('회의'));
  expect(result.current.filteredEvents).toEqual([events[0]]);

  act(() => result.current.setSearchTerm('점심'));
  expect(result.current.filteredEvents).toEqual([events[1]]);
});
