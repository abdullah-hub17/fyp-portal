import React from 'react';
import {FadeLoader} from "react-spinners";
import "../styles/loader.css";


const Loader = () => {
  return (
    <div className='loader__parent'>
      <div className='loader__secondary'>
        <div className='loader__child'>
        <FadeLoader color="#36d7b7" />
        </div>
      </div>
    </div>
  )
}

export default Loader;
