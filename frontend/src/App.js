import React from "react";
import {
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import ReadingList from "./components/ReadingList";
import { ReadingListProvider } from "./context/ReadingListContext";
import { SearchProvider } from "./context/SearchContext";



const App = () => {
  return (
    
        <Router>
          <SearchProvider>
            <ReadingListProvider>
              <CssBaseline />
              <Container>
                <Typography variant="h4" component="h2" gutterBottom>
                       Teachers Reading list
                </Typography>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <>
                        <SearchBar />
                        <Typography variant="h5" component="h2" gutterBottom>
                        </Typography>
                        <ReadingList />
                      </>
                    }
                  />
                </Routes>
              </Container>
            </ReadingListProvider>
          </SearchProvider>
        </Router>
  );
};

export default App;