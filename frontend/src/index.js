//main page frontend
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { BrowserRouter } from 'react-router-dom'

import CreateParadigm from './pages/createParadigm.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

// export default function App() {
//     return (
//       <BrowserRouter>
//         <Routes>
//             <Route path='create' element={<CreateParadigm/>}/>
//         </Routes>
//       </BrowserRouter>
//     );
//   }
  
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(<App />);
