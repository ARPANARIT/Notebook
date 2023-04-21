import './App.css';
import About from './components/About/About';
import Home from './components/Home/Home';
import Layout from './components/Layout';
import {Routes, Route} from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='/about' element={<About />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
