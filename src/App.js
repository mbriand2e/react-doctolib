import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import AuthRoute from 'components/AuthRoute'

// contexts
import UserContext from 'contexts/UserContext'

// views
import Login from 'views/Login'
import Register from 'views/Register'
import Dashboard from 'views/Dashboard'

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <ChakraProvider>
            <UserContext.Provider value={{ user, setUser }}>
                <Router>
                    <Routes>
                        <Route path="/" />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={
                            <AuthRoute user={user}>
                                <Dashboard />
                            </AuthRoute>
                        } />
                    </Routes>
                </Router>
            </UserContext.Provider>
        </ChakraProvider>
    );
}

export default App;
