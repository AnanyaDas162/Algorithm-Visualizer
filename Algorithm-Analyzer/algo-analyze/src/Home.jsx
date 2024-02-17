// Home.jsx
import React from "react";
import Header from './Header.jsx';
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {
    return (
        <>
        <Header />
        <div className="h-screen w-full bg-black flex justify-center items-center text-2xl gap-9 home-container">
            <div className="bg-green-600 h-64 w-auto text-white font-semibold link flex justify-center items-center p-4 rounded-3xl">
                <Link to="/array" className="w-full h-full flex justify-center items-center">Array Sorting Algorithm</Link>
            </div>
            <div className="bg-green-600 h-64 w-auto text-white font-semibold link flex justify-center items-center p-4 rounded-3xl">
                <Link to="/tree" className="w-full h-full flex justify-center items-center">Tree Traversal Algorithm</Link>
            </div>
            <div className="bg-green-600 h-64 w-auto text-white font-semibold link flex justify-center items-center p-4 rounded-3xl">
                <Link to="/stack" className="w-full h-full flex justify-center items-center">Stack Operation Algorithm</Link>
            </div>
            <div className="bg-green-600 h-64 w-auto text-white font-semibold link  flex justify-center items-center p-4 rounded-3xl">
                <Link to="/queue" className="w-full h-full flex justify-center items-center">Queue Operation Algorithm</Link>
            </div>
        </div>
        </>
    );
}

export default Home;
