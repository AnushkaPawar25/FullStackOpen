import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// import axios from 'axios'

// // promise is an object representting status of asynchronus operations
// axios
//     .get('http://localhost:3001/notes')
//     .then(response => {
//         const notes = response.data
//         ReactDOM.createRoot(document.getElementById('root').render(<App notes = {notes} />))
//         console.log(notes)
// })

// const notes = [
//     {
//         id: 1,
//         content: 'HTML is easy', 
//         importance: true
//     },
//     {
//         id: 2,
//         content : "Browser can execute only JavaScript",
//         important: false
//     },
//     {
//         id: 3,
//         content: 'GET and POST are the most important methods of HTTP protocol',
//         important: true
//       }
// ]

ReactDOM.createRoot(document.getElementById('root')).render(<App /> )

// const refresh = () => {
// ReactDOM.createRoot(document.getElementById('root')).render(
// <App counter ={counter} />)
// }

// refresh()
// counter += 1
// refresh()
// counter += 1
// refresh()

// setInterval(() => {
//   refresh()
//   counter += 1
// }, 1000)