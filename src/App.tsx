import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';

import { AlertComponent } from './components/AlertComponent.tsx';
import { CalendarView } from './components/CalendarView.tsx';
import { EventEdit } from './components/EventEdit.tsx';
import { EventList } from './components/EventList.tsx';
// import { Navigation } from './components/Navigation.tsx';
import { useEventForm } from './hooks/useEventForm.ts';
import { useEventOperations } from './hooks/useEventOperations.ts';
import { useNotifications } from './hooks/useNotifications.ts';

function App() {
  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState<Event[]>([]);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const { editingEvent, setEditingEvent } = useEventForm();
  const { events, saveEvent, deleteEvent } = useEventOperations(Boolean(editingEvent), () =>
    setEditingEvent(null)
  );

  const { notifications, setNotifications } = useNotifications(events);

  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventEdit
          events={events}
          saveEvent={saveEvent}
          setIsOverlapDialogOpen={setIsOverlapDialogOpen}
          setOverlappingEvents={setOverlappingEvents}
        />

        <CalendarView events={events} />

        <EventList events={events} deleteEvent={deleteEvent} />
      </Flex>

      <AlertComponent
        saveEvent={saveEvent}
        isOverlapDialogOpen={isOverlapDialogOpen}
        setIsOverlapDialogOpen={setIsOverlapDialogOpen}
        overlappingEvents={overlappingEvents}
        cancelRef={cancelRef}
      />

      {notifications.length > 0 && (
        <VStack position="fixed" top={4} right={4} spacing={2} align="flex-end">
          {notifications.map((notification, index) => (
            <Alert key={index} status="info" variant="solid" width="auto">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle fontSize="sm">{notification.message}</AlertTitle>
              </Box>
              <CloseButton
                onClick={() => setNotifications((prev) => prev.filter((_, i) => i !== index))}
              />
            </Alert>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default App;
