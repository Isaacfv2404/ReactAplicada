import './App.css';
//import Navbar from './layout/Navbar';
import Lista from './pages/formsList';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddForm from './modulo/AddForm';
import DeleteForm from './modulo/DeleteForm';
import EditForm from './modulo/EditForm';
import ShowForm from './modulo/ShowForm';


function App() {
  return (
    <div className="App">

      <Router>

      <Routes>
        <Route exact path="/ShowForm" element={<ShowForm/>}/>
        <Route exact path="/" element={<Lista/>}/>
        <Route exact path="/AddForm" element={<AddForm/>}/>
        <Route exact path="/DeleteForm" element={<DeleteForm/>}/>
        <Route exact path="/EditForm" element={<EditForm/>}/>
        
      </Routes>

      </Router>
    </div>
  );
}

export default App;