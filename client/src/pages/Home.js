//Conditionally render Main page if not logged in or Game+Messager if logged in
import React, { useState } from 'react';
import Auth from '../utils/auth';
import Game from '../components/Game';
import Messager from '../components/Messager';
import Mindoro from 'react-explode/Mindoro';
import Corregidor from 'react-explode/Corregidor';

const Body = () => {  
  const [isMindoro, setIsMindoro]= useState(false);
  const [isCorregidor, setIsCorregidor] = useState(false);
    // if (Auth.loggedIn()) {
      return (
        //When the user is logged in, render the stuff
        <div>
            <Game mindoroHandler={setIsMindoro} corregidorHandler={setIsCorregidor}/>
            {isMindoro && <Mindoro size={500} delay={0} repeatDelay={0} repeat={0} />}
            {isCorregidor && <Corregidor size={500} color="blue" delay={0} repeatDelay={0} repeat={0} />}
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