import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

export const FetchBooks = () => {
  const { loading, error, data } = useQuery(GET_BOOKS)
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data && data.books) {
      setBooks(data.books);
    }
  }, [data]);
    console.log(books)
  return { loading, error, books };
};