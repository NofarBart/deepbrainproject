import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios to make HTTP requests

const ParadigmList = () => {
  const [paradigms, setParadigms] = useState([]); // State to store our users

  useEffect(() => {
    const fetchParadigms = async () => {
      try {
        const response = await axios.get('/paradigms'); // Fetch users from our API
        setParadigms(response.data); // Update state with fetched users
      } catch (error) {
        console.error('Error fetching paradigms:', error);
      }
    };

    fetchParadigms();
  }, []); // The empty array ensures this effect runs once on component mount

  return (
    <div className="wrapper">
      <h1>My Paradigm List</h1>
      <ul>
        {paradigms.map(paradigm => <li key={paradigm._id}>{paradigm.name}</li>)}
      </ul>
      <form>
       <label>
         <p>New Item</p>
         <input type="text" />
       </label>
       <button type="submit">Submit</button>
     </form>
    </div>
    // <div>
    //   <h2>Paradigm List</h2>
    //   <ul>
    //     {paradigms.map(paradigm => (
    //       <li key={paradigm._id}>{paradigm.name}</li> // Display each user's name
    //     ))}
    //   </ul>
    // </div>
  );
};

export default ParadigmList;