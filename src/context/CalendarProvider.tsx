import { createContext, useContext, useReducer } from 'react';

import {
  EventClickArg,
  EventDropArg,
  EventInput,
} from '@fullcalendar/core/index.js';
import {
  DateClickArg,
  EventResizeDoneArg,
} from '@fullcalendar/interaction/index.js';

type InitialState = {
  sessions: EventInput[];
  currentSession: EventInput | null;
  currentSessionsOfDay: EventInput[] | [];
  modalAdd: boolean;
  showModalAddSession: boolean;
  showModalSession: boolean;
  modelState: boolean;
  showEditModal: boolean;
  modalStateSessions: boolean;
  showDeleteModal: boolean;
};

const initialState: InitialState = {
  sessions: [],
  currentSession: null,
  currentSessionsOfDay: [],
  modalAdd: false,
  showModalAddSession: false,
  showModalSession: false,
  showEditModal: false,
  modalStateSessions: false,
  modelState: false,
  showDeleteModal: false,
};

type CalendarContextType = {
  state: InitialState;
  handleInitSessions: (data: EventInput[]) => void;
  handleShowModalAddSession: (state: boolean) => void;
  handleShowModalSession: (state: boolean) => void;
  handleShowModalEdit: (state: boolean) => void;
  handleShowModalDelete: (state: boolean) => void;
  handleCloseModals: VoidFunction;
  handleModalSessionsActionState: (state: boolean) => void;
  dispatch: React.Dispatch<CalendarAction>;
  handleAddSession: (data: EventInput) => void;
  handleEditSession: (data: EventInput) => void;
  handleSessionDrop: (data: EventDropArg) => void;
  handleDeleteSession: (id: string) => void;
  handleDateClick: (data: DateClickArg) => void;
  handleClickLink: (data: any) => void;
  handleSessionClick: (data: EventClickArg) => void;
  handleModalActionState: (state: boolean) => void;
  handleSessionResize: (data: EventResizeDoneArg) => void;
  handleSessionClickId: (id: string, sessionDateId: string) => void;
};

type CalendarAction =
  | { type: 'INIT_SESSIONS'; payload: { sessions: EventInput[] } }
  | { type: 'SHOW_MODAL_ADD'; payload: boolean }
  | { type: 'SHOW_MODAL_SESSION'; payload: boolean }
  | { type: 'SHOW_MODAL_EDIT_SESSION'; payload: boolean }
  | { type: 'SHOW_MODAL_Delete_SESSION'; payload: boolean }
  | { type: 'CLOS_ALL_MODALS' }
  | { type: 'ADD_SESSION'; payload: { session: EventInput } }
  | { type: 'EDIT_SESSION'; payload: { session: EventInput } }
  | { type: 'DELETE_SESSION'; payload: { id: string } }
  | { type: 'DROP_SESSION'; payload: { session: EventDropArg } }
  | { type: 'DATE_SESSION'; payload: { currentSession: EventInput } }
  | { type: 'CLICK_SESSION'; payload: { id: string; sessionDateId: string } }
  | { type: 'LINK_CLICK'; payload: { currentSessionsOfDay: EventInput[] } }
  | { type: 'OPEN_ADD_MODAL'; payload: boolean }
  | { type: 'OPEN_MODAL_SESSION'; payload: boolean }
  | {
      type: 'RESIZE_SESSION';
      payload: { id: string; end: string };
    };

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined,
);

function calendarReducer(state: InitialState, action: CalendarAction) {
  switch (action.type) {
    case 'SHOW_MODAL_ADD':
      return {
        ...state,
        showModalAddSession: action.payload,
      };

    case 'SHOW_MODAL_Delete_SESSION':
      return {
        ...state,
        showDeleteModal: action.payload,
      };

    case 'SHOW_MODAL_EDIT_SESSION':
      return {
        ...state,
        showEditModal: action.payload,
      };

    case 'SHOW_MODAL_SESSION':
      return {
        ...state,
        showModalSession: action.payload,
      };

    case 'CLOS_ALL_MODALS':
      return {
        ...state,
        showModalAddSession: false,
        showDeleteModal: false,
        showEditModal: false,
        showModalSession: false,
      };
    case 'ADD_SESSION':
      return {
        ...state,
        sessions: [...state.sessions, { ...action.payload.session }],
        currentSession: null,
        currentSessionsOfDay: [],
      };

    case 'EDIT_SESSION':
      return {
        ...state,
        sessions: state.sessions.map((session) => {
          if (session.id === action.payload.session.id) {
            return { ...session, ...action.payload.session };
          }

          return session;
        }),
        currentSession: null,
        currentSessionsOfDay: [],
      };

    case 'DELETE_SESSION':
      return {
        ...state,
        sessions: state.sessions.filter(
          (session) => session.id !== action.payload.id,
        ),
        currentSession: null,
        currentSessionsOfDay: [],
      };

    case 'DROP_SESSION':
      return {
        ...state,
        sessions: state.sessions?.map((session) =>
          session.id === action.payload.session.event.id
            ? {
                ...session,
                start: action.payload.session.event.startStr,
                end: action.payload.session.event.endStr,
                date: action.payload.session.event.startStr,
              }
            : session,
        ),
      };

    case 'DATE_SESSION':
      return {
        ...state,
        currentSession: { ...action.payload.currentSession },
        currentSessionsOfDay: state.sessions?.filter(
          (session) => session.date == action.payload.currentSession.dateStr,
        ),
      };

    case 'CLICK_SESSION': {
      const targetSession = state.sessions.find(
        (session) =>
          session.id === action.payload.id &&
          session.sessionDateId === action.payload.sessionDateId,
      );
      return {
        ...state,
        currentSessionsOfDay: targetSession ? [targetSession] : [],
        currentSession: targetSession || null,
      };
    }
    case 'OPEN_ADD_MODAL':
      return {
        ...state,
        modalAdd: action.payload,
      };
    case 'OPEN_MODAL_SESSION':
      return {
        ...state,
        modalStateSessions: action.payload,
      };

    case 'RESIZE_SESSION':
      return {
        ...state,
        sessions: state.sessions.map((session) => {
          if (session.id == action.payload.id) {
            return { ...session, end: action.payload.end };
          }

          return session;
        }),

        currentSession: null,
        currentSessionsOfDay: [],
      };
    case 'INIT_SESSIONS':
      return {
        ...state,
        sessions: action.payload.sessions,
      };
    case 'LINK_CLICK':
      return {
        ...state,
        currentSessionsOfDay: action.payload.currentSessionsOfDay,
      };
    default:
      return state;
  }
}

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  function handleInitSessions(data: EventInput[]) {
    dispatch({
      type: 'INIT_SESSIONS',
      payload: { sessions: data },
    });
  }
  function handleShowModalAddSession(state: boolean) {
    dispatch({ type: 'SHOW_MODAL_ADD', payload: state });
  }
  function handleModalSessionsActionState(state: boolean) {
    dispatch({ payload: state, type: 'OPEN_MODAL_SESSION' });
  }
  function handleShowModalSession(state: boolean) {
    dispatch({ type: 'SHOW_MODAL_SESSION', payload: state });
  }

  function handleShowModalEdit(state: boolean) {
    dispatch({ type: 'SHOW_MODAL_EDIT_SESSION', payload: state });
  }

  function handleShowModalDelete(state: boolean) {
    dispatch({ type: 'SHOW_MODAL_Delete_SESSION', payload: state });
  }

  function handleCloseModals() {
    dispatch({ type: 'CLOS_ALL_MODALS' });
  }
  function handleModalActionState(data: boolean) {
    dispatch({ type: 'OPEN_ADD_MODAL', payload: data });
  }

  function handleAddSession(data: EventInput) {
    if (!state.modalAdd) {
      handleModalActionState(true);
    }

    dispatch({
      type: 'ADD_SESSION',
      payload: { session: { ...data } },
    });

    handleModalActionState(false);
  }
  function handleClickLink(data: any) {
    // Check if data and data.allSegs exist before using them
    const sessionsOfDay = data?.allSegs || [];

    dispatch({
      type: 'LINK_CLICK',
      payload: { currentSessionsOfDay: sessionsOfDay },
    });

    handleModalSessionsActionState(true);
    if (data?.jsEvent) {
      data.jsEvent.isTrusted = false;
    }
  }
  function handleEditSession(data: EventInput) {
    if (!state.modalAdd) {
      handleModalActionState(true);
    }

    dispatch({ type: 'EDIT_SESSION', payload: { session: { ...data } } });

    handleModalActionState(false);
  }

  function handleDeleteSession(id: string) {
    dispatch({ type: 'DELETE_SESSION', payload: { id } });
  }

  function handleDateClick(data: DateClickArg) {
    const currentSession = {
      id: new Date().getTime().toString(),
      start: data.dateStr,
      date: data.dateStr,
      allDay: data.allDay,
    };

    dispatch({
      type: 'DATE_SESSION',
      payload: { currentSession: { ...currentSession } },
    });

    handleModalActionState(true);
  }

  async function handleSessionClick(data: EventClickArg) {
    dispatch({
      payload: {
        id: data.event.id,
        sessionDateId: data.event.extendedProps.sessionDateId,
      },
      type: 'CLICK_SESSION',
    });
    handleShowModalSession(true);
  }
  async function handleSessionClickId(id: string, sessionDateId: string) {
    dispatch({ payload: { id, sessionDateId }, type: 'CLICK_SESSION' });
    handleModalActionState(true);
    handleModalSessionsActionState(false);
  }

  const handleSessionDrop = (data: EventDropArg) => {
    dispatch({
      type: 'DROP_SESSION',
      payload: { session: { ...data } },
    });
  };

  const handleSessionResize = (data: EventResizeDoneArg) => {
    dispatch({
      type: 'RESIZE_SESSION',
      payload: {
        id: data.oldEvent.id,
        end: data.event.endStr,
      },
    });
  };

  return (
    <CalendarContext.Provider
      value={{
        state,
        dispatch,
        handleShowModalAddSession,
        handleShowModalSession,
        handleShowModalEdit,
        handleShowModalDelete,
        handleCloseModals,
        handleDateClick,
        handleSessionClick,
        handleDeleteSession,
        handleEditSession,
        handleModalSessionsActionState,
        handleClickLink,
        handleAddSession,
        handleSessionClickId,
        handleSessionDrop,
        handleModalActionState,
        handleSessionResize,
        handleInitSessions,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCalendarContext = (): CalendarContextType => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider',
    );
  }
  return context;
};
