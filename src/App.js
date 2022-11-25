import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

// views
import Login from './views/Login'

const App = () => {
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path="/" />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
