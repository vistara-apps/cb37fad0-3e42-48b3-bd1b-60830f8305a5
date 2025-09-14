'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Creator, ContentPiece, Notification, CommunityPoll } from '@/lib/types';

// State interface
interface AppState {
  currentUser: Creator | null;
  content: ContentPiece[];
  notifications: Notification[];
  polls: CommunityPoll[];
  loading: {
    content: boolean;
    user: boolean;
    notifications: boolean;
  };
  error: string | null;
}

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: Creator }
  | { type: 'SET_CONTENT'; payload: ContentPiece[] }
  | { type: 'ADD_CONTENT'; payload: ContentPiece }
  | { type: 'UPDATE_CONTENT'; payload: ContentPiece }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_POLLS'; payload: CommunityPoll[] }
  | { type: 'ADD_POLL'; payload: CommunityPoll }
  | { type: 'SET_LOADING'; payload: { key: keyof AppState['loading']; value: boolean } }
  | { type: 'SET_ERROR'; payload: string | null };

// Initial state
const initialState: AppState = {
  currentUser: null,
  content: [],
  notifications: [],
  polls: [],
  loading: {
    content: false,
    user: false,
    notifications: false,
  },
  error: null,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };

    case 'SET_CONTENT':
      return { ...state, content: action.payload };

    case 'ADD_CONTENT':
      return { ...state, content: [action.payload, ...state.content] };

    case 'UPDATE_CONTENT':
      return {
        ...state,
        content: state.content.map(item =>
          item.contentId === action.payload.contentId ? action.payload : item
        ),
      };

    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };

    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.notificationId === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };

    case 'SET_POLLS':
      return { ...state, polls: action.payload };

    case 'ADD_POLL':
      return { ...state, polls: [action.payload, ...state.polls] };

    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.key]: action.payload.value },
      };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Action creators
export const appActions = {
  setUser: (user: Creator) => ({ type: 'SET_USER' as const, payload: user }),

  setContent: (content: ContentPiece[]) => ({ type: 'SET_CONTENT' as const, payload: content }),

  addContent: (content: ContentPiece) => ({ type: 'ADD_CONTENT' as const, payload: content }),

  updateContent: (content: ContentPiece) => ({ type: 'UPDATE_CONTENT' as const, payload: content }),

  setNotifications: (notifications: Notification[]) => ({
    type: 'SET_NOTIFICATIONS' as const,
    payload: notifications,
  }),

  addNotification: (notification: Notification) => ({
    type: 'ADD_NOTIFICATION' as const,
    payload: notification,
  }),

  markNotificationRead: (notificationId: string) => ({
    type: 'MARK_NOTIFICATION_READ' as const,
    payload: notificationId,
  }),

  setPolls: (polls: CommunityPoll[]) => ({ type: 'SET_POLLS' as const, payload: polls }),

  addPoll: (poll: CommunityPoll) => ({ type: 'ADD_POLL' as const, payload: poll }),

  setLoading: (key: keyof AppState['loading'], value: boolean) => ({
    type: 'SET_LOADING' as const,
    payload: { key, value },
  }),

  setError: (error: string | null) => ({ type: 'SET_ERROR' as const, payload: error }),
};

// Selectors
export const selectors = {
  getUnreadNotificationsCount: (state: AppState) =>
    state.notifications.filter(n => !n.read).length,

  getUserContent: (state: AppState) =>
    state.content.filter(c => c.creatorId === state.currentUser?.creatorId),

  getActivePolls: (state: AppState) =>
    state.polls.filter(p => p.status === 'active'),

  getContentByCategory: (state: AppState, category: string) =>
    state.content.filter(c => c.category === category),

  getTotalRevenue: (state: AppState) =>
    state.content.reduce((sum, content) => sum + content.currentRevenue, 0),
};

