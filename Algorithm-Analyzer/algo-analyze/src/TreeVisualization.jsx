import React, { useState , useEffect} from 'react';
import './TreeVisualization.css';
import Header from './Header';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const TreeVisualization = () => {
  const [bfsVisitedNodes, setBfsVisitedNodes] = useState([]);
  const [dfsVisitedNodes, setDfsVisitedNodes] = useState([]);
  const [inorderVisitedNodes, setInorderVisitedNodes] = useState([]);
  const [postorderVisitedNodes, setPostorderVisitedNodes] = useState([]);
  const [idx, setIdx] = useState(0);
  const [root, setRoot] = useState([]);
  const [nodeNumber, setNodeNuumber]=useState(7);


  useEffect(() => {
    console.log(idx); // Log the updated value of idx
  }, [idx]);
  
const Tree = ({ root }) => {
  let level = -1;
  let levelNodes = [];
  const nodes = [];

  root.map((value, index) => {
    const nodeLevel = Math.floor(Math.log2(index + 1));
    if (nodeLevel > level) {
      level++;
      nodes.push(<div key={level} className="tree-level w-full flex justify-center items-center"idx={idx}  style={{ gap: `${36 - level*5}px` }} >{levelNodes}</div>);
      levelNodes = [];
    }
   
    levelNodes.push(
      <div className={`node bg-green-600 rounded-full ${index === idx ? 'idx' : ''} `}>
           { console.log(index, idx)}
      <div className="node-value  text-white h-full w-full">{value}</div>
    </div>
    );
  });

  nodes.push(<div key={level + 1} className="tree-level w-full flex justify-center items-center">{levelNodes}</div>);

  return <div className="tree flex flex-col justify-center items-center h-full">{nodes}</div>;
};

const handleNodes=(event)=>{
  if (event.target.value > 15)
  {
    setNodeNuumber(15);
    alert("Enter the node number maximum to 15");
  }
  else if (event.target.value< 0){
    setNodeNuumber(0);
    alert("Array length should be greater or equal to 0");
  }
  else {
    setNodeNuumber(Math.floor(event.target.value));
  }
}

function generateRandomArray(length) {
 
    let newArray = [];
    for (let i = 0; i < length; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1);
    }
    //setTimeout(() => setAnimated(false), newArray.length * 1000);
   setRoot(newArray)
    
  }



const inorder = async (root, setVisitedNodes, index) => {
  if (index >= root.length || root[index] === undefined) return;

  await inorder(root, setVisitedNodes, 2 * index + 1); // Traverse left subtree
  const visited = [root[index]];
 // setTimeout(()=> setIdx(index), 1000);
 //console.log(index);
 
 setIdx(index);
 //console.log(idx);
  await delay(1000);
 // setIdx(null);
  await setVisitedNodes(prevNodes => [...prevNodes, visited]); // Visit current node
  await inorder(root, setVisitedNodes, 2 * index + 2); // Traverse right subtree
};

/*
const TreeNode = ({ key, value }) => (
  <div className={`node bg-green-600 rounded-full ${key === idx ? 'idx' : ''} `}>

    <div className="node-value bg-green-600 text-white h-full w-full">{value}</div>
  </div>
);
*/

  //const root = [1, 2, 3, 4, 5, 6, 7];



  const postorder = async (root, setVisitedNodes, index) => {
    if (index >= root.length || root[index] === undefined) return;
    await postorder(root, setVisitedNodes, 2 * index + 1); // Traverse left subtree
    await postorder(root, setVisitedNodes, 2 * index + 2); // Traverse right subtree
    const visited = [root[index]];
    setIdx(index);
    await delay(1000);
    await setVisitedNodes(prevNodes => [...prevNodes, visited]); // Visit current node
    
  };
  

  const bfs = async (root, setVisitedNodes) => {
    const queue = [root[0]];
    const visited = [];
  
    while (queue.length > 0) {
      const node = queue.shift();
      visited.push(node);
      setVisitedNodes([...visited]);
  
      // Simulate delay for visualization
      await delay(1000);
  
      const index = root.indexOf(node);
      setIdx(index);
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
  
      if (leftChildIndex < root.length) {
        queue.push(root[leftChildIndex]);
      }
      if (rightChildIndex < root.length) {
        queue.push(root[rightChildIndex]);
      }
    }
    setIdx(root.length-1);
  };
  
  
  
  const dfs = async (root, setVisitedNodes) => {
    const stack = [root[0]];
    const visited = [];
  
    while (stack.length > 0) {
      const node = stack.pop();
      visited.push(node);
      setVisitedNodes([...visited]);
  
      // Simulate delay for visualization
      
      await delay(1000);
  
      const index = root.indexOf(node);
      setIdx(index);
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
  
      if (rightChildIndex < root.length) {
        stack.push(root[rightChildIndex]);
      }
      if (leftChildIndex < root.length) {
        stack.push(root[leftChildIndex]);
      }
    }
    setIdx(root.length-1);
  };
  
  
  const visualizeBFS = async () => {
    setBfsVisitedNodes([]);
    await bfs(root, setBfsVisitedNodes);
    await setIdx(root.length-1);
    setIdx(null);
  };

  const visualizeDFS = async () => {
    setDfsVisitedNodes([]);
    await dfs(root, setDfsVisitedNodes);
    setIdx(null);
  };
   
  const visualizeInorder = async () => {
    setInorderVisitedNodes([]);
    await inorder(root, setInorderVisitedNodes,0);
    setIdx(null);
  };

  const visualizePostorder = async () => {
    setPostorderVisitedNodes([]);
    await postorder(root, setPostorderVisitedNodes, 0);
    setIdx(null);
  };

  return (
    <>
   
    <div className='w-full h-screen bg-black flex justify-center items-center flex-col-reverse tree-container'>
    
      <div className='w-full flex justify-center items-center gap-9 p-8 flex-col'>
            
            <div className='w-full h-auto flex justify-center items-center'> 
                  <div className="w-auto flex justify-center items-center flex-col flex-wrap p-5">
                       <h6 className="text-white font-medium p-3">Enter the number of nodes :</h6>
                       <input type="number" className="bg-green-100 w-full input-btn" onChange={handleNodes}></input>
                      
                  </div>
                <button onClick={() => generateRandomArray(nodeNumber)} className="bg-green-600 p-3 text-white rounded "id="generate-tree">Generate Tree</button>
            </div>
           <div className='w-full h-auto flex justify-center items-center gap-11 tree-btn-container'>
               <button onClick={visualizeBFS} className='bg-green-600 p-3 text-white font-bold'>Level-order-traversal</button>
               <button onClick={visualizeDFS} className='bg-green-600 p-3 text-white font-bold'>Preorder Traversal</button>
               <button onClick={visualizeInorder} className='bg-green-600 p-3 text-white font-bold'>Inorder Traversal</button>
              <button onClick={visualizePostorder} className='bg-green-600 p-3 text-white font-bold'>Postorder Traversal</button>
           </div>
      </div>
      <div className="tree-container w-full h-auto flex justify-center items-center">
        <Tree root={root} />
      </div>
      <div className='w-full h-auto flex justify-center items gap-9 display-container'>
        <div className='p-2 bg-green-600 text-white font-bold'>Level order traversal: {bfsVisitedNodes.join(', ')}</div>
        <div className='p-2 bg-green-600 text-white font-bold'>Preorder Traversal: {dfsVisitedNodes.join(', ')}</div>
        <div className='p-2 bg-green-600 text-white font-bold'>Postorder traversal: {postorderVisitedNodes.join(', ')}</div>
        <div className='p-2 bg-green-600 text-white font-bold'>Inorder Traversal: {inorderVisitedNodes.join(', ')}</div>
      </div>
    </div>
    </>
  );
};

export default TreeVisualization;