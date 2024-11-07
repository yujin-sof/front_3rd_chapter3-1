import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { AlertComponent } from '../../components/AlertComponent';

describe('AlertComponent 테스트코드', () => {
  const saveEventMock = vi.fn();
  const setIsOverlapDialogOpenMock = vi.fn();
  const cancelRefMock = { current: null };
  const overlappingEventsMock = [
    { id: 1, title: 'Event 1', date: '2023-12-01', startTime: '10:00', endTime: '11:00' },
    { id: 2, title: 'Event 2', date: '2023-12-02', startTime: '12:00', endTime: '13:00' },
  ];

  const renderComponent = (isOpen = true) =>
    render(
      <ChakraProvider>
        <AlertComponent
          saveEvent={saveEventMock}
          isOverlapDialogOpen={isOpen}
          setIsOverlapDialogOpen={setIsOverlapDialogOpenMock}
          overlappingEvents={overlappingEventsMock}
          cancelRef={cancelRefMock}
        />
      </ChakraProvider>
    );

  it('다이얼로그가 열려 있는지 확인', () => {
    renderComponent(true);
    expect(screen.getByText('일정 겹침 경고')).toBeInTheDocument();
  });

  it('취소버튼을 클릭했을 때 다이얼로그가 닫히는지 확인', () => {
    renderComponent();
    const cancelButton = screen.getByText('취소');
    fireEvent.click(cancelButton);
    expect(setIsOverlapDialogOpenMock).toHaveBeenCalledWith(false);
  });
});
