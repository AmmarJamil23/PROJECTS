import React from 'react'
import RenderCounter from './RenderCounter'
import { useState, useCallback, useEffect } from "react"
import Child from './Child';

const App = () => {


  const [count, setCount] = useState(0);

  const doubleCount = count * 2;

  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", done: false },
    { id: 2, title: "Practice hooks", done: true},
    { id: 3, title: "Build project", done: false}
  ]);

  const [showDone, setShowDone] = useState(false);

  const visibleTasks = showDone ? tasks.filter((t) => t.done) : tasks;





  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);


  useEffect(() => {
  console.log("effect ran");
  }, [count]);


  useEffect(() => {
    const onResize = () => {
      console.log("windows resized");
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])


  return (
    <div className='min-h-screen bg-gray-900 text-white p-6 space-y-4'>
      <h1 className='text-2xl font-bold'>React Render Lab</h1>

      <button className='px-4 py-2 bg-green-400 rounded font-bold'
      onClick={() => {
        setCount(count + 1);

      }}
      >
        Increment 
      </button>

      <button
      className='mt-2 px-4 py-2 bg-orange-600 rounded'
      onClick={() => setCount(count + 1)}
      >
        Increment Count Only
      </button>

      <p className='mt-2'>Count value: {count}</p>

      <p>Double Count: {doubleCount}</p>

      <RenderCounter label="App Component" />

      <Child onClick={handleClick} />

      <ul className='mt-2 space-y-2'>
        {visibleTasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.done ? "(done)" : ""}

          </li>
        ))}
      </ul>

      <button className='mt-4 px-4 py-2 bg-blue-600 rounded'
      onClick={() => {
        setShowDone(!showDone);
      }}
      >
        Toggle Done Tasks
      </button>

    <button
        className='mt-2 px-4 py-2 bg-green-400 rounded'
        onClick={() => {
          // 1. Add the new task as usual
          setTasks([
            ...tasks,
            { id: Date.now(), title: "New Task", done: false },
          ]);

         
          setShowDone(false);
        }}
      >
        Add Task
      </button>
      
      </div>
  )
}

export default App