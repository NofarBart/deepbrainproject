import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home.jsx';
import CreateParadigm from './pages/createParadigm.jsx';
import CreateAnimal from './pages/createAnimal.jsx';
import DeleteParadigm from './pages/deleteParadigm.jsx';
import DeleteAnimal from './pages/deleteAnimal.jsx';
import Graphs from './pages/graphs.jsx';
import {Routes, Route} from 'react-router-dom';

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createParadigm" element={<CreateParadigm />} />
        <Route path="/createAnimal" element={<CreateAnimal />} />
        <Route path="/deleteParadigm" element={<DeleteParadigm />} />
        <Route path="/deleteAnimal" element={<DeleteAnimal />} />
        <Route path="/graphs" element={<Graphs />} />
      </Routes>
    </div>
  );
};


export default App
