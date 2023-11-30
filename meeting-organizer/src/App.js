import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import MeetingList from './components/MeetingList';
import AddMeeting from './components/AddMeeting';
import EditMeeting from './components/EditMeeting'; // Assuming you have this component

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
              <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/add-meeting">Add Meeting</Link>
              </nav>
              <Routes>
                <Route path="/" element={<MeetingList />} />
                <Route path="/add-meeting" element={<AddMeeting />} />
                <Route path="/edit-meeting/:id" element={<EditMeeting />} />
              </Routes>
            </VStack>
          </Grid>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
