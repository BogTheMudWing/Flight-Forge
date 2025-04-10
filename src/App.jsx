import { useState } from 'react'
import { hiveNames } from './data/names/hive.jsx'
import './App.css'

function App() {
  const [index, setIndex] = useState(0);

  const tribes = [
    { id: 0, name: "Hive" },
    { id: 1, name: "Ice" },
    { id: 2, name: "Leaf" },
    { id: 3, name: "Mud" },
    { id: 4, name: "Night" },
    { id: 5, name: "Rain" },
    { id: 6, name: "Sand" },
    { id: 7, name: "Sea" },
    { id: 8, name: "Silk" },
    { id: 9, name: "Sky" }
  ]

  const allOptions = [
    [
      { id: 0, name: "Start" }
    ],
    tribes,
    hiveNames,
    []
  ];

  const allTitles = [
    { id: 0, title: "Welcome" },
    { id: 1, title: "Tribe" },
    { id: 2, title: "Step 3" },
    { id: 3, title: "The End" }
  ];

  const allDescriptions = [
    { id: 0, content: "This is an interactive web page. Click the button to begin." },
    { id: 1, content: "Choose an option." },
    { id: 2, content: "Choose another option." },
    { id: 3, content: "That's all!" }
  ];

  function next() {
    let next = index + 1;
    if (
      allOptions.length == next ||
      allTitles.length == next ||
      allDescriptions.length == next
    ) {
      console.log("Cannot continue. End of list.");
    } else {
      setIndex(next);
    }
  };

  function back() {
    let previous = index - 1;
    if (previous > -1) {
      setIndex(previous)
    }
  };

  return (
    <>
      <h1>{allTitles[index].title}</h1>
      <p>{allDescriptions[index].content}</p>
      <div className='navigation'>
        <button className='back-button' onClick={back}>Back</button>
      </div>
      <br></br>
      <div className='suggested-options'>
        {allOptions[index].map((option) => (
          <button onClick={next} key={option.id}>{option.name}</button>
        ))}
      </div>
    </>
  )
}

export default App
