import React from 'react';
import './css/mlf.css';

function SetAdminPage(props) {
	
	 const MaxWidth1564 = {
        "maxWidth": "1564 px"
    }
	
  return (

    <React.Fragment>

	<div className="w3-content w3-padding" style={MaxWidth1564}>
	
      <div className="w3-container w3-padding-32" id="borrow">

        <div className="w3-col l8 m6 w3-margin-bottom">

         

        <div className="w3-col l12 m6 w3-margin-bottom">
          <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Set Admin</h3>
          <form action="/LoanConfirmationPage"  >
            <input className="w3-input w3-section w3-border" type="text" placeholder="index" required name="index" />
            <input className="w3-input w3-section w3-border" type="text" placeholder="Address" required name="address" />
            <button className="w3-button w3-black w3-section" type="submit">
              <i className="fa fa-paper-plane"></i> Set Admin </button>
          </form>
        </div>

	</div>

      </div>
	</div>

    </React.Fragment>
  );
}

export default SetAdminPage;
