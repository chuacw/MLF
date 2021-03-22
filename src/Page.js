import React from 'react';
import './css/mlf.css';
import About from './About';
import Services from './Services';
import Testimonial from './Testimonial';

function Page(props) {
    const MaxWidth1564 = {
        "maxWidth": "1564 px"
    }
    return (
        <React.Fragment>
            <div className="w3-content w3-padding" style={MaxWidth1564} >
                <About />
                <Services />
                <Testimonial />
            </div>
        </React.Fragment>
    );
}

export default Page;
