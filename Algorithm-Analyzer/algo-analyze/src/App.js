// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home.jsx';
import Array from './Array.jsx';
import Tree from './TreeVisualization.jsx';
import Stack from './Stack.js';
import Queue from './Queue.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/array" element={<Array />} />
                <Route path="/tree" element={<Tree />} />
                <Route path="/stack" element={<Stack />} />
                <Route path="/queue" element={<Queue />} />
            </Routes>
        </Router>
    );
}

export default App;
