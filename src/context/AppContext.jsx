import React, { useState, useEffect } from 'react';
import { AppContext } from './AppContextInstance';

// Storage keys
const STORAGE_KEYS = {
  USER_NAME: 'statecraft_user_name',
  COUNTER: 'statecraft_counter',
  THEME: 'statecraft_theme',
  VISITED: 'statecraft_visited_sections',
};

// Context Provider Component
export function AppProvider({ children }) {
  // Global Counter state with localStorage initialization
  const [counter, setCounter] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COUNTER);
    return saved !== null ? Number(saved) : 5;
  });

  // Global User Name state
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME) || 'Alex Rivera';
  });

  // Global Theme Accent state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'indigo';
  });

  // Navigation Active Page state
  const [activePage, setActivePage] = useState('overview');

  // Visited sections for progress tracking
  const [visitedSections, setVisitedSections] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VISITED);
      return saved ? JSON.parse(saved) : ['overview'];
    } catch {
      return ['overview'];
    }
  });

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUNTER, counter.toString());
  }, [counter]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_NAME, userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VISITED, JSON.stringify(visitedSections));
  }, [visitedSections]);

  // Mark section as visited when user navigates
  const navigateTo = (pageId) => {
    setActivePage(pageId);
    if (!visitedSections.includes(pageId)) {
      setVisitedSections((prev) => [...prev, pageId]);
    }
  };

  // State manipulation helper actions
  const incrementCounter = () => setCounter((prev) => prev + 1);
  const decrementCounter = () => setCounter((prev) => prev - 1);
  const resetCounter = () => setCounter(0);
  const adjustCounter = (amount) => setCounter((prev) => prev + amount);

  const resetAllProgress = () => {
    setCounter(5);
    setUserName('Alex Rivera');
    setTheme('indigo');
    setVisitedSections(['overview']);
    localStorage.clear();
  };

  const contextValue = {
    // State
    counter,
    userName,
    theme,
    activePage,
    visitedSections,

    // Actions
    setCounter,
    incrementCounter,
    decrementCounter,
    resetCounter,
    adjustCounter,
    setUserName,
    setTheme,
    navigateTo,
    resetAllProgress,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}


