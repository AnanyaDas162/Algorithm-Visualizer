import React from "react";
import './Header.css';

export default function Header(){
    return(
        <>
           <div className="w-full flex justify-center items-center bg-green-600 heading fixed top-0">
               <h1 className="text-white font-bold text-xl">Algorithm Visualizer</h1>
           </div>
        </>
    );
}