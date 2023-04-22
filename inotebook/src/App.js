import './App.css';
import About from './components/About/About';
import Home from './components/Home/Home';
import Layout from './components/Layout';
import {Routes, Route} from "react-router-dom";
import NoteState from './context/notes/NoteState';
function App() {
  return (
    <>

   
       
   <NoteState>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='/about' element={<About />}/>
        </Route>
      </Routes>
     
   </NoteState>
         
 
    {/* wrap the app so that context is available to every app */}
    </>
  );
}

export default App;
