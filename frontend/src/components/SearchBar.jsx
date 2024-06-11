import React, { useContext, useState, useRef } from 'react';
import { TextField, Box, CircularProgress, Grid, Card, CardMedia, CardContent, Typography, Button, Popper, Paper, ClickAwayListener, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { SearchContext } from '../context/SearchContext';
import { ReadingListContext } from '../context/ReadingListContext';
import { FetchBooks } from '../fetchBooks';
import SnackAlert from '../alert/SnackAlert';

const SearchBar = () => {
  const { updateSearchQuery } = useContext(SearchContext);
  const { readingList, addBook } = useContext(ReadingListContext);
  const { loading, error, books } = FetchBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const handleSearch = (e) => {
    const query = e.target.value;
    updateSearchQuery(query);
    if (query) {
      const filtered = books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredBooks(filtered);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

const handleAddBook = (book) => {
  if (readingList.some(item => item.title === book.title)) {
    setAlertMessage('Book is already in the reading list');
    setAlertSeverity('warning');
    setOpenAlert(true);
  } else {
    addBook(book);
    setAlertMessage('Book added to the reading list');
    setAlertSeverity('success');
    setOpenAlert(true);
  }
};

  return (
    <Box>
      <Box my={2} ref={anchorRef}>
        <TextField
          label="Search Books"
          variant="outlined"
          fullWidth
          onChange={handleSearch}
        />
      </Box>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" style={{ zIndex: 1300 }}>
        <ClickAwayListener onClickAway={handleClose}>
        <Paper elevation={3} sx={{ maxHeight: 400, overflow: 'auto', mt: 1, width: anchorRef.current ? anchorRef.current.clientWidth : 'auto', position: 'relative' }}>
      <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon />
      </IconButton>
      <Box p={2} pt={5}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">Error loading books.</Typography>}
        {filteredBooks.length === 0 && <Typography>No books found.</Typography>}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {filteredBooks.map((book) => (
            <Box
              key={book.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                boxShadow: 3,
                m: 2,
                p: 2,
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => handleAddBook(book)}
            >
              <Box sx={{ flexShrink: 0, width: 100, height: 140, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }}>
                <CardMedia
                  component="img"
                  sx={{ maxHeight: '100%', maxWidth: '100%' }}
                  image={book.coverPhotoURL}
                  alt={book.title}
                />
              </Box>
              <CardContent sx={{ flex: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', pb: 1 }}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', pb: 1 }}>
                  {book.author}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" color="primary">
                  Add
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
        </ClickAwayListener>
      </Popper>
      <SnackAlert
        data={{
          type: alertSeverity,
          open: openAlert,
          message: alertMessage,
          duration: 6000,
          origin: { vertical: 'bottom', horizontal: 'center' },
        }}
        closeSnack={closeAlert}
      />
    </Box>
  );
};

export default SearchBar;