import { act, renderHook } from '@testing-library/react';

import { useOverlapDialog } from '../../hooks/useOverlapDialog';

describe('useOverlapDialog 커스텀훅 테스트 코드', () => {
  it('초기 상태는 대화 상자가 닫혀 있어야 하고 겹치는 이벤트는 빈값', () => {
    const { result } = renderHook(() => useOverlapDialog());

    expect(result.current.isOverlapDialogOpen).toBe(false);
    expect(result.current.overlappingEvents).toEqual([]);
    expect(result.current.cancelRef.current).toBeNull();
  });

  it('setIsOverlapDialogOpen을 호출하여 대화 상자 상태를 열 수 있음', () => {
    const { result } = renderHook(() => useOverlapDialog());

    act(() => {
      result.current.setIsOverlapDialogOpen(true);
    });

    expect(result.current.isOverlapDialogOpen).toBe(true);
  });
});
