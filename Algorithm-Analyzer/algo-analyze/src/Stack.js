import react from 'react';
import Header from './Header.jsx';
import './Header.css';
import './Stack.css';
import { useState } from 'react';




const Stack=()=>{

    const [array, setArray] = useState([]);
    const [arrayLength, setArrayLength]=useState(6);
    const [animated, setAnimated] = useState(false);
    const [popAnimation, setPopAnimation] = useState(false);
    const [pushAnimation, setPushAnimation] = useState(false);
    const [peekAnimation, setPeekAnimation] = useState(false);

    const handleLength=(event)=>{
        if (event.target.value > 98)
        {
          setArrayLength(98);
          alert("Enter array length maximum to 99");
        }
        else if (event.target.value< 0){
          setArrayLength(0);
          alert("Array length should be greater or equal to 0");
        }
        else {
          setArrayLength(Math.floor(event.target.value));
        }
    }
    
    const handlePop =(length)=>{
        setPopAnimation(false);
        if (array.length === 0){
          alert("Underflow condition!");
        }
        else{
          let x = array[length-1];
          array.pop();
          length --;
          setTimeout(()=> setPopAnimation(true), array.length * 1000);
          setArrayLength(length);
         // setArray(array);
          setPopAnimation(false);
        }
    }

    const handlePush=(length)=>{
       //setAnimated(true);
      setTimeout(()=>  setPushAnimation(true) , 1000);
      array.push(Math.floor(Math.random() * 100) + 1);
    //  setTimeout(() => setAnimated(false), array.length * 1000);
      length ++;
      setArray(array);
      setPushAnimation(false);
    }

   const handlePeek=()=>{
        if (array.length === 0){
          alert("The stack is already empty!");
        }
        else{
          setTimeout(()=>  setPeekAnimation(true), 1000);
        setPeekAnimation(false);
        }
   }

    function generateRandomArray(length) {
      setAnimated(true);
     
        let newArray = [];
        for (let i = 0; i < length; i++) {
          newArray.push(Math.floor(Math.random() * 100) + 1);
        }
        setTimeout(() => setAnimated(false), newArray.length * 1000);
        setArray(newArray);
        
      }

      

    return(
        
           <div className='h-screen w-full bg-black flex justify-center items-center flex-col-reverse'>
               <Header></Header>
               <div className='stack-menu h-screen bg-green-600 flex justify-center items-center flex-col-reverse absolute left-0'>
                  <div className="w-full flex justify-center items-center flex-col flex-wrap p-5">
                       <h6 className="text-white font-medium p-3">Enter stack size :</h6>
                       <input type="number" className="bg-green-100 w-full input-btn" onChange={handleLength}></input>
                      
                  </div>
               </div>

               <div className='w-full flex justify-center items-center h-40'>
                      <button onClick={() => generateRandomArray(arrayLength)} className="bg-green-600 p-3 text-white rounded m-8 generate-stack">Generate Stack</button>
                      <button onClick={() => handlePop(arrayLength)} className="bg-green-600 p-3 text-white rounded m-8">POP</button>
                      <button onClick={() => handlePush(arrayLength)} className="bg-green-600 p-3 text-white rounded m-8">PUSH</button>
                      <button onClick={() => handlePeek(arrayLength)} className="bg-green-600 p-3 text-white rounded m-8">PEEK</button>
             
                 </div>

                 <div className="array-container w-screen flex justify-center items-center scroll-m-0">
                             <div className='flex w-screen h-full justify-center items-center scroll-m-0 arr-holder'>
                                  {array.map((num, index) => (
                                    <div
                                        className={`index-val h-24 text-white font-bold text-xl ${animated ? 'animated' : 'not-animated'} ${popAnimation && index === array.length - 1 ? 'pop-animation' : ''} ${pushAnimation && index === array.length - 1 ? 'push-animation' : ''} ${peekAnimation && index === array.length - 1 ? 'peek-animation' : ''}`}
                                          key={index} style={{ animationDelay: `${index * 0.5}s` }}
                                     >{num}</div>
                                     
                                     ))}
                               </div>
                 </div>

           </div>
        
    );
}

export default Stack;