import React from 'react';
import './css/mlf.css';
import T1Image from "./images/t1.jfif";
import T2Image from "./images/t2.jfif";
import T3Image from "./images/t3.jfif";
import T4Image from "./images/t4.jfif";

function Testimonial(props) {
    const Width100 = {
        "width": "100%"
    }
    return (
        <React.Fragment>
            <div className="w3-container w3-padding-32" id="testimonials">
                <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Testimonials</h3>
            </div>
            <div className="w3-row-padding w3-grayscale">
                <div className="w3-col l3 m6 w3-margin-bottom">
                    <img src={T1Image} alt="Jane" style={Width100} />
                    <h3>Jane</h3>
                    <p className="w3-opacity">China</p>
                    <p>MLF kept my farming business alive!</p>
                </div>
                <div className="w3-col l3 m6 w3-margin-bottom">
                    <img src={T2Image} alt="Ava" style={Width100} />
                    <h3>Ava</h3>
                    <p className="w3-opacity">Philippines</p>
                    <p>MLF helped me to grow my money.</p>
                </div>
                <div className="w3-col l3 m6 w3-margin-bottom">
                    <img src={T3Image} alt="Nguyễn" style={Width100} />
                    <h3>Nguyễn</h3>
                    <p className="w3-opacity">Vietnam</p>
                    <p>I've gotten much needed help in times of crisis. Thanks!</p>
                </div>
                <div className="w3-col l3 m6 w3-margin-bottom">
                    <img src={T4Image} alt="Annisa" style={Width100} />
                    <h3>Annisa</h3>
                    <p className="w3-opacity">Indonesia</p>
                    <p>Now I am worry free.</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Testimonial;
