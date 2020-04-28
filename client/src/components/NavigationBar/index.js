import React from 'react';
import './index.scss';
import { useSpring, animated } from 'react-spring'

function Navigationbar(props) {
    console.log("FROM NAGIVATION", props); 

    
    const styles = useSpring({ opacity: (props.state === true? '1' : '0') })

    return (
        <div>
            {
                props.state === true? 
                    <animated.nav style={styles}></animated.nav> : <div> No nav</div>
            }
        </div>
    )
}


export default Navigationbar
