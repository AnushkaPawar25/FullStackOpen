
/////development runtime environment
////brower gets the JavaScript from the React dev server 
///dev server transforms the javascript to the format understood by the browser
/// react app in browser fetches the json formatted data from json server 

//////////////Part 2 = Rendering Collection
import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App





//////////////Function that returns function + passing the event 
//////////////handler to child components


// component inside components don't work as react will define new component in every render
// import { useState } from "react"



// const Button = (props) =>{
//   return (
//   <button onClick={props.handleClick} > {props.text} </button>
// )
// }
// const App = () => {
//   const [value, setValue]= useState(10)
  
 
//   const hello = (who) => () => {
//       console.log('hello ', who)
//     }
  
//   const setToValue = (newValue) =>{
//     console.log('value now', newValue)
//     setValue(newValue)
//   }
  
//   return (
//     <div>
//       {value}

//       <Button handleClick = {() => setToValue(1000)} text = "thousand" />
//       <Button  handleClick = {() => setToValue(0)} text = "reset" />
//       <Button handleClick = {() => setToValue(value + 1)} text = "increment" />
      
//       {/* <button onClick={() => setToValue(1000) }>thousand</button>
//       <button onClick={() =>setToValue(0) }>reset</button>
//       <button onClick={() =>setToValue(value + 1) }>increment</button> */}
// {/*       
//       <button onClick ={hello('world')}> Button</button>
//       <button onClick ={hello('react')}> Button</button>
//       <button onClick ={hello('function')}> Button</button> */}
//     </div>
//   )
// }

// export default App






////////////////event handling

// Event handlers must always be a function or a reference to a function
//event handler is assign to return value from function, onClick = {console.log()}
//for onClick = {setValue(0)} when component is render this gets executed which in turn causes the component to be rerenderd
// import { useState } from "react"

// const App = () =>{
//   const [value, setValue] = useState(10)

//   const handleClick = () =>{
//     console.log('clicked')
//     setValue (0)
//   }
//   return (
//     <div>
//       {value}
//        {/* no function get called only reference of arrow function is set to event handler */}
//       <button onClick= {handleClick} >reset to zero</button>
//     </div>
//   )
// }

// export default App;



/////////////Conditional Rendering 

// import { useState } from "react"

// const History = (props) =>{
//   if (props.allClicks.length === 0){
//     return(
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )}
    
//     return (
//         <div>
//           button press history : {props.allClicks.join(' ')}
//         </div>
//     )
// }

// const Button = ({handleClick, text}) =>(
//   <button onClick={handleClick} >
//     {text}
//   </button>
// )

// const App = () =>{
//   const[left, setLeft] = useState(0)
//   const[right, setRight ] = useState(0)
//   const[allClicks, setAll] = useState([])
//   const [total, setTotal] = useState(0)

//   const handleLeftClick = () =>{
//     setAll(allClicks.concat("L"))
//     // console.lognchronouse update of total
//     const updatedLeft = left + 1
//     setLeft(updatedLeft)
//     setTotal(updatedLeft + right)
//   }

//   const handleRightClick = () =>{
//     setAll(allClicks.concat("R"))
//     const updatedRight = right + 1
//     setRight(updatedRight)
//     setTotal(left + updatedRight)
//   }
//   return (
//     <>
//       {left}
//       <Button handleClick={ handleLeftClick} text = "left"/>
//       <Button handleClick={ handleRightClick } text = "right"/>
      
//       {right}
      
//       <History allClicks = {allClicks} />
//       <p>total {total}</p>
//     </>
//   )
// }

// export default App




////////////////////Handling Arrays + update state is asynchronus

// import { useState } from "react"

// const App = () =>{
//   const[left, setLeft] = useState(0)
//   const[right, setRight ] = useState(0)
//   const[allClicks, setAll] = useState([])
//   const [total, setTotal] = useState(0)

//   const handleLeftClick = () =>{
//     // concat method don't mutate the existing array but returns new copy of array with item added to it
//     setAll(allClicks.concat("L"))
//     // console.log('left before', left)

//     // this is done to handle asynchronouse update of total
//     const updatedLeft = left + 1
//     setLeft(updatedLeft)
//     // console.log('left after', left)
//     setTotal(updatedLeft + right)
//   }

//   const handleRightClick = () =>{
//     setAll(allClicks.concat("R"))
//     const updatedRight = right + 1
//     setRight(updatedRight)
//     setTotal(left + updatedRight)
//   }
//   return (
//     <>
//       {left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>

//       {right}
//       <p>{allClicks.join(' ')} </p>
//       <p>total {total}</p>
//     </>
//   )
// }

// export default App







/////////////////// Complex State 

// import { useState } from "react"

// const App = () =>{
//   // const[left, setLeft] = useState(0)
//   // const[right, setRight ] = useState(0)

//   const[clicks, setClicks] = useState({
//     left: 0, right: 0
//   })

//   const handleLeftClick = () =>{
//     // const newClicks = {
//     //   ...clicks,
//     //   left : clicks.left + 1,
      
//     // }
//     // setClicks(newClicks)
//     setClicks({...clicks, left: clicks.left + 1})
//   }

//   const handleRightClick = () =>{
//     // const newClicks = {
//     //   ...clicks,
//     //   right: clicks.right + 1
//     // }
//     // setClicks(newClicks)
//     setClicks({...clicks, right:clicks.right + 1})
//   }
//   return (
//     <>
//       {clicks.left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>

//       {clicks.right}
//     </>
//   )
// }

// export default App












////////////// Stateful component

// even handler is supposed to be function or function reference
// import {useState} from 'react'

// const App = () =>{

//   // function call adds state to component and renders it with value 0
//   // fun returns an array that contains two items
//   // reRender means functions body get executed again
//   const[counter, setCounter ] = useState(0)

//   // Calling a function that changes the state causes the component to re-render.
//   console.log('rendering with counter value', counter)
//   const Display = ({counter}) => <div>{counter} </div>


//   const Button = ({onClick, text}) => (
//       <button onClick={onClick}>
//         {text}
//       </button>
//     )
  
  
//   const increaseByOne = () =>{ 
//     console.log("increase, value before", counter)
//     setCounter(counter + 1)
//   }
//   const decreaseByOne = () => {
//     console.log('decrease, value before', counter)
//     setCounter(counter - 1)
// }  
// const setToZero = () => {
//   console.log('resetting to zero, value before', counter)
//   setCounter(0)}


//   // const handleClick = () =>{
//   //   console.log('clicked')
//   // }

//   // console.log('rendering...', counter)
//   return (
//     <>
//     <Display counter =  {counter} />
//     <Button 
//     onClick = {increaseByOne}
//     text = 'plus'
//     />
//     <Button
//         onClick={setToZero}
//         text='zero'
//       /> 
//     <Button 
//     onClick = {decreaseByOne}
//     text = "minus"
//     />

//     </>
//   )
// }

// export default App









///////////Page re-rendering

// const App = (props) =>{
//   const {counter} = props
//   return(
//     <div>{counter } </div>
//   )
// }

// export default App







// import React from 'react';

// const Hello = ({name, age}) =>{

//   // const {name, age} = props
//   // console.log(props)
//   const bornYear  = () =>new Date().getFullYear() - age
  
//   return (
//     <div>
//       <p> Hello  {name}, you are {age} years old</p>
//       <p>So you are born in {bornYear()} </p>
//     </div>
//   )
// }

// React components needs to contain one root element
// Array of component is also a valid solution for this error
// instead of defining root as div we can use empty element
// in react the individual things rendered in braces must be primitive  value like num or strings

// const App = () =>{
//   const name = "Peter"
//   const age = 21

//   return (
//     <div>
//       <h1>Geetings</h1>
//       <Hello name = "Maya" age ={26 + 10} />

//       < Hello name = {name} age = {age} />
     
//     </div>

//   )
// }

// export default App;





////////////////// use of props
// const App = () =>{


//   const name = "Satyam"
//   const age = 20
//   const friends = [
    
//   ]
//   return (
//     <>
//       <h1> Greetings</h1>
//       <Hello name = "Anushka" age = {21}/>
//       <Hello name = {name} age = {age} />
      
//     </>
//   )
// }



////////////////// with using react
// const App = () =>{
 
//   const now = new Date()
//   const a = 10
//   const b = 20

//   console.log(now," " ,a + b)
//   return React.createElement(
//     'div',
//     null, 
//     React.createElement(
//       'p', null, 'Hello world, it is ', now.toString()
//     ),
//     React.createElement(
//       'p', null, a, ' plus  ', b, ' is ', a + b
//     )
     
//   )
// }

// export default App