//Conditionally render Main page if not logged in or Game+Messager if logged in
import React from 'react';
import Auth from '../utils/auth';
import Game from '../components/Game';
import Messager from '../components/Messager';

const Body = () => {  
    // if (Auth.loggedIn()) {
      return (
        //When the user is logged in, render the stuff
        <div>
            <Game/>
            <Messager/>
        </div>
      )
    // } else {
    //     return (
    //         <div>
    //             <p>This the main page</p>
    //         </div>
    //         //Render Main page (Althea)
    //     );
    // }
  };
  
  export default Body;