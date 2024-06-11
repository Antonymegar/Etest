import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const TransitionUp = (props) => {
  return <Slide {...props} direction="bottom" />;
};

const SnackAlert = ({ data, closeSnack }) => {
  const { type, open, message, duration, origin } = data;

  return (
    <Snackbar
      open={open}
      anchorOrigin={origin}
      autoHideDuration={duration}
      onClose={closeSnack}
      TransitionComponent={TransitionUp}
      sx={{ top: '30px' }}
    >
      <Alert severity={type} sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackAlert;
