import Table from "react-bootstrap/Table";

import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Style.css";

function Home() {
  return (
    <>
      <Navbar />
      {/*Tracking Input Area*/}
      <div className="TrackingAreaWrapper">
        <div className="TrackingAreaTitleWrapper">
          <h1>Track Yourself</h1>
        </div>

        <div className="TrackingAreaInputsWrapper">
          <div className="InputAreaContainer">
            <div className="InputAreaContainerTitle">
              <h2>Track a Deposit</h2>
            </div>
            <div className="InputFields">
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Deposit Name</p>
                </div>
                <div className="InputQuestionValue">
                  <input placeholder="ex: Won the Lotto"></input>
                </div>
              </div>
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Deposit Amount</p>
                </div>
                <div className="InputQuestionValue">
                  <input placeholder="10000"></input>
                </div>
              </div>
            </div>
            <div className="InputAreaSubmitContainer">
              <button>Create Deposit</button>
            </div>
          </div>

          <div className="InputAreaContainer">
            <div className="InputAreaContainerTitle">
              <h2>Track a Withdrawl</h2>
            </div>
            <div className="InputFields">
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Withdrawl Name</p>
                </div>
                <div className="InputQuestionValue">
                  <input placeholder="ex: Won the Lotto"></input>
                </div>
              </div>
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Withdrawl Amount</p>
                </div>
                <div className="InputQuestionValue">
                  <input placeholder="10000"></input>
                </div>
              </div>
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Withdrawl Type</p>
                </div>
                <div className="InputQuestionValue">
                  <input placeholder="No Type"></input>
                </div>
              </div>
            </div>
            <div className="InputAreaSubmitContainer">
              <button>Create Withdrawl</button>
            </div>
          </div>

          <div className="InputAreaContainer">
            <div className="InputAreaContainerTitle">
              <h2>Create a Budget</h2>
            </div>
            <div className="InputFields">
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Budget Name</p>
                </div>
                <div className="InputQuestionValue">
                  <input placeholder="ex: Won the Lotto"></input>
                </div>
              </div>
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Budget Amount</p>
                </div>
                <div className="InputQuestionValue">
                  <input placeholder="10000"></input>
                </div>
              </div>
            </div>
            <div className="InputAreaSubmitContainer">
              <button>Create Budget</button>
            </div>
          </div>
        </div>
      </div>

      {/*Transaction Area*/}
      <div className="TransactionLogArea">
        <div className="TransactionLogAreaTitleWrapper">
          <h1>View your Transactions</h1>
        </div>

        {/*Transactions Table*/}
        <div className="TransactionsTableContainer">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Budget</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Home;
