import React from 'react';
import './css/mlf.css';

function About(props) {
    return (
        <React.Fragment>
            <div className="w3-container w3-padding-32" id="about">
                <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">About</h3>
                <p>Micro loans and financing (MLF) aims to bridge the gap between lenders and borrowers. 
                    Leveraging on blockchain technology to provide trusted micro financing, and connecting people from all over the world.
                </p>
            </div>
        </React.Fragment>
    );
}

export default About;
