import React, { createContext, useState, useEffect } from 'react';

export const ReadingListContext = createContext();

export const ReadingListProvider = ({ children }) => {
  const [readingList, setReadingList] = useState(() => {
    const savedList = localStorage.getItem('readingList');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }, [readingList]);

  const addBook = (book) => {
    setReadingList((prevList) => [...prevList, book]);
  };

  const removeBook = (book) => {
    setReadingList((prevList) => prevList.filter(item => item.title !== book.title));
  };

  return (
    <ReadingListContext.Provider value={{ readingList, addBook, removeBook }}>
      {children}
    </ReadingListContext.Provider>
  );
};