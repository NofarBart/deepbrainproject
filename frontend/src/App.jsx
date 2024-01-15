// import { useState } from 'react'
// import { Routes, Route } from 'react-router-dom'


// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import './App.css'
// import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ParadigmList from './components/paradigmList';
// import CreateParadigm from './pages/createParadigm.jsx'
// import DeleteParadigm from './pages/deleteParadigm'
// import EditParadigm from './pages/editParadigm'
// import ShowParadigm from './pages/showParadigm'
// import Home from './pages/home'

import React, { useEffect, useState } from "react";
import Axios from 'axios';

const App = () => {
  // const [count, setCount] = useState(0)
  // will update list as database updates on refreshing the site
  const [paradigms, setParadigms] = useState([])
  // const [animalsNumber, setNumAnimals] = useState("")

  // const handleSubmit = (e) => {
  //     e.preventDefault();

  //     Axios.post('http://localhost:5555/paradigms/create', {
  //         name: name,
  //         animalsNumber:animalsNumber
  //     })
  // }


  // // will be run once 
  useEffect(()=> {  
      // here we get the data by requesting data from this link
      // to our nodejs server
      Axios.get('http://localhost:5555/getParadigms')
      .then(paradigms => setParadigms(paradigms.data))
      .catch(err => console.log(err))
  }, []);

  // // creating list of shoes
  // let val = list.map((item)=>{
  //     return <li key={item.id}>{item.name}</li>
  // });
  
  // return (

  //   //working fetching from DB
  //   <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
  //     <div className='w-50'>
  //     <table className='table'>
  //       <thead>
  //         <tr>
  //           <th>
  //             Name
  //           </th>
  //           <th>
  //             Number of animals
  //           </th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {paradigms.map(paradigm => {
  //           return <tr>
  //             <td>
  //               {paradigm.name}
  //             </td>
  //             <td>
  //               {paradigm.animalsNumber}
  //             </td>
  //           </tr>
  //         })}
  //       </tbody>
  //     </table>
  //     </div>
  //   </div>
  // //   <div className="App">
  // //   <header className="App-header"> 
  // //     <div className="logIn-form">
  // //         <form onSubmit={handleSubmit}>
  // //             <p>First Name</p>

  // //             <input
  // //               className = "Name" 
  // //               type="text"
  // //               placeholder="First name ..."
  // //               onChange={(e) => {setName(e.target.value)}}
  // //             />

  // //             <p> Number of animals </p>

  // //             <input 
  // //               className = "Animals"
  // //               type="text"
  // //               placeholder = "Animals num...." 
  // //               onChange={(e) => {setNumAnimals(e.target.value)}}
  // //             />

  // //             <button type="submit">Submit</button>
  // //         </form>
  // //     </div>
  // //   </header>
  // // </div>
  // )
  return (
    // <Routes>
    //   {/* <Route path='/' element={<Home/>}/> */}
    //   <Route path='/paradigms/create' element={<CreateParadigm/>}/>
    //   {/* <Route path='/paradigms/delete/:id' element={<DeleteParadigm/>}/>
    //   <Route path='/paradigms/edit/:id' element={<EditParadigm/>}/>
    //   <Route path='/paradigms/details/:id' element={<ShowParadigm/>}/> */}
    // </Routes>
    
    <div className="index">
      <Routes>
        <Route path="/paradigms" component={ParadigmList} />
      </Routes>
      <div className="div-3">
        <div className="overlap">
          <div className="a-mouse-from-th-wrapper">
            <img
              className="a-mouse-from-th"
              alt="A mouse from th"
              src={require('./images/a-mouse-from-th.png')}
              // src="https://cdn.animaapp.com/projects/65720f3d965b11a5aed5a18f/releases/65722649cd9388f80f7868d7/img/a-mouse-from-th-6d2bdcf3-6c9c-4ee8-8fed-d79017113343-1.png"
            />
          </div>
          {/* <BodyParts className="body-parts-instance" noOfOptions="zero" /> */}
          {/* <Component className="component-1" property1="default" />
          <Component className="component-instance" property1="default" text="Videos locations:" /> */}
          <div className="text-wrapper-4">Subject:</div>
          <div className="text-wrapper-5">Attempt:</div>
          <div className="text-wrapper-6">Directory (save at):</div>
          <div className="text-wrapper-7">Experimental Paradigm:
            <select>
              {paradigms.map(paradigm => {
                return <option>
                  {paradigm.name}
                </option>
                })} 
            </select>
          </div>
          <div className="text-wrapper-8">Parts:</div>
          <div className="frame-2">
            <div className="text-wrapper-9">Run</div>
          </div>
          <div className="frame-3">
            <div className="text-wrapper-9">Restart</div>
          </div>
          {/* <Options className="options-instance" options="default" visibleOptions="noooo" />
          <Options className="design-component-instance-node" options="default" visibleOptions="noooo" />
          <Options className="options-2" options="default" visibleOptions="noooo" /> */}
          <div className="frame-4">
            <div className="text-wrapper-9">Choose location</div>
          </div>
        </div>
        <img
          className="deepbrain-logo"
          alt="Deepbrain logo"
          // src="https://cdn.animaapp.com/projects/65720f3d965b11a5aed5a18f/releases/65722649cd9388f80f7868d7/img/deepbrain-logo-1.png"
          src={require('./images/deepbrain-logo.jpg')}
        />
        {/* <li>
            <Link to="/create">Contact</Link>
        </li> */}
      </div>
    </div>
  );
};


export default App
