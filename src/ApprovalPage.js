import React from 'react';
import './css/mlf.css';


function LoanPage(props) {

  const MaxWidth1564 = {
    "maxWidth": "1564 px"
  }

  const requests = [
    // {
    //   address: "0xfowenfnweifurijenf93fh943fn394f349d",
    //   loanAmount: "10 eth",
    //   interest: "0.05",
    //   loanDate: "11/1/2021"
    // },
    {
      address: "0xfowenfnweifurijenf93fh943fn394f349e",
      loanAmount: "20 eth",
      interest: "0.06",
      loanDate: "22/1/2021"
    },
    {
      address: "0xfowenfnweifurijenf93fh943fn394f349f",
      loanAmount: "30 eth",
      interest: "0.07",
      loanDate: "23/1/2021"
    }
  ];

  return (

    <React.Fragment>

      <div className="w3-content w3-padding" style={MaxWidth1564}>

        <div className="w3-container w3-padding-32" id="borrow">



          <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Loan Requests</h3>



          <div className="requests">

            <form action="/LoanConfirmationPage">

              <table id='requests' class="w3-col l12 m6 w3-margin-bottom ">

                <tr>
                  <th>Address</th>
                  <th>Loan Amount</th>
                  <th>Interest</th>
                  <th>Loan Date</th>
                  <th>Approve</th>
                </tr>



                {requests.map((request, index) => (
                  <tr key={index}>
                    <td className="w3-center">{request.address}</td>
                    <td className="w3-center">{request.loanAmount}</td>
                    <td className="w3-center">{request.interest}</td>
                    <td className="w3-center">{request.loanDate}</td>
                    <td className="w3-center"> <input type="checkbox" /></td>
                  </tr>
                ))}

                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="w3-center"><input type="submit" value="Approve" /></td>

              </table>

            </form>




          </div>

        </div>

      </div>




    </React.Fragment>


  );
}

export default LoanPage;
