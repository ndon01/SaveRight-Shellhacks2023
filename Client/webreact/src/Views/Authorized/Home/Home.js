import Table from "react-bootstrap/Table";

import React, {useState} from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Style.css";

import axios from 'axios';

function Home() {

  const [TransactionLogState, SetTransactionLog] = useState({});

  function createDeposit() {
    const DepositNameElement = document.getElementById("DepositNameValue");
    const DepositAmountElement = document.getElementById("DepositAmountValue");
    const DepositeDateElement = document.getElementById("DepositDateValue")

    const DepositNameValue = DepositNameElement.value
    const DepositAmountValue = parseInt(DepositAmountElement.value)
    const DepositDateValue = DepositeDateElement.value

    // Verify Inputs
    let errored = false;
    if (DepositNameValue == "") {
      DepositNameElement.classList.add("InvalidField")
      errored = true
    }

    if (DepositAmountValue == "") {
      DepositAmountElement.classList.add("InvalidField")
      errored = true
    }

    if (DepositDateValue == "") {
      DepositeDateElement.classList.add("InvalidField")
      errored = true
    }
    
      // Error if incorrect
    if (errored) {
      alert("Enter all fields")
      return
    }

    // Post if correct

    let postData = {
      "name": DepositNameValue,
      "amount": DepositAmountValue,
      "date": DepositDateValue
    }

    axios.post("http://127.0.0.1:8000/incomes/", postData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  function createWithdrawl() {
    const WithdrawlNameElement = document.getElementById("WithdrawlNameValue");
    const WithdrawlAmountElement = document.getElementById("WithdrawlAmountValue");
    const WithdrawlDateElement = document.getElementById("WithdrawlDateValue")
    const WithdrawlBudgetTypeElement = document.getElementById("WithdrawlBudgetTypeValue");


    const WithdrawlNameValue = WithdrawlNameElement.value
    const WithdrawlAmountValue = parseInt(WithdrawlAmountElement.value) 
    const WithdrawlDateValue = WithdrawlDateElement.value
    const WithdrawlBudgetTypeValue = WithdrawlBudgetTypeElement.value
  
    
    // Verify Inputs
    let errored = false;
    if (WithdrawlNameValue == "") {
      WithdrawlNameElement.classList.add("InvalidField")
      errored = true
    }

    if (WithdrawlAmountValue == "") {
      WithdrawlAmountElement.classList.add("InvalidField")
      errored = true
    }

    if (WithdrawlDateValue == "") {
      WithdrawlDateElement.classList.add("InvalidField")
      errored = true
    }

    if (WithdrawlBudgetTypeValue == "") {
      WithdrawlBudgetTypeElement.classList.add("InvalidField")
      errored = true
    }
    
      // Error if incorrect
    if (errored) {
      alert("Enter all fields")
      return
    }
    
    // Post if correct

    let postData = {
      "Name": WithdrawlNameValue,
      "Amount": WithdrawlAmountValue,
      "Date": WithdrawlDateValue,
      "BudgetType": WithdrawlBudgetTypeValue
    }

    postData = JSON.stringify(postData)
    alert(postData)

  }

  function createBudget() {
    const BudgetNameElement = document.getElementById("BudgetNameValue");
    const BudgetAmountElement = document.getElementById("BudgetAmountValue");
    const BudgetColorElement = document.getElementById("BudgetColorValue")
  
    const BudgetNameValue = BudgetNameElement.value
    const BudgetAmountValue = BudgetAmountElement.value
    const BudgetColorValue = BudgetColorElement.value

    
    // Verify Inputs
    let errored = false;
    if (BudgetNameValue === "") {
      BudgetNameElement.classList.add("InvalidField")
      errored = true
    }

    if (BudgetAmountValue === "") {
      BudgetAmountElement.classList.add("InvalidField")
      errored = true
    }

    if (BudgetColorValue === "") {
      BudgetColorElement.classList.add("InvalidField")
      errored = true
    }
    
      // Error if incorrect
    if (errored) {
      alert("Enter all fields")
      return;
    }
    
    // Post if correct

    let postData = {
      "Name": BudgetNameValue,
      "Amount": BudgetAmountValue,
      "Color": BudgetColorValue
    }

    postData = JSON.stringify(postData)
    alert(postData)

  }

  return (
    <>
      <Navbar />
      {/*Tracking Input Area*/}
      <div className="TrackingAreaWrapper">
        <div className="TrackingAreaTitleWrapper">
          <h1>Track Yourself</h1>
        </div>

        <div className="TrackingAreaInputsWrapper">
          {/* Deposit Area */}
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
                  <input id="DepositNameValue" className="InputQuestionTypeText" placeholder="ex: Won the Lotto"></input>
                </div>
              </div>
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Deposit Amount</p>
                </div>
                <div className="InputQuestionValue">
                  <input type="number" id="DepositAmountValue" className="InputQuestionTypeText" placeholder="10000"></input>
                </div>
              </div>
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Deposit Date</p>
                </div>
                <div className="InputQuestionValue">
                  <input type="date" id="DepositDateValue" className="InputQuestionTypeText" placeholder="10000"></input>
                </div>
              </div>
            </div>
            <div className="InputAreaSubmitContainer">
              <button className="ButtonRoundedStyle ButtonHoverEffect" onClick={createDeposit}>Create Deposit</button>
            </div>
          </div>
          {/* Withdrawl Area */}
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
                  <input id="WithdrawlNameValue" className="InputQuestionTypeText" placeholder="ex: Won the Lotto"></input>
                </div>
              </div>
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Withdrawl Amount</p>
                </div>
                <div className="InputQuestionValue">
                  <input type="number" id="WithdrawlAmountValue" className="InputQuestionTypeText" placeholder="10000"></input>
                </div>
              </div>
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Withdrawl Date</p>
                </div>
                <div className="InputQuestionValue">
                  <input type="date" id="WithdrawlDateValue" className="InputQuestionTypeText" placeholder="10000"></input>
                </div>
              </div>
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Budget Type</p>
                </div>
                <div className="InputQuestionValue">
                  <select id="WithdrawlBudgetTypeValue" className="InputQuestionTypeSelect">
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
            
            </div>
            <div className="InputAreaSubmitContainer">
              <button className="ButtonRoundedStyle ButtonHoverEffect" onClick={createWithdrawl}>Create Withdrawl</button>
            </div>
          </div>
          {/* Budget Area */}
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
                  <input id="BudgetNameValue" className="InputQuestionTypeText" placeholder="ex: Food, Entertainment, Housing"></input>
                </div>
              </div>
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Budget Amount</p>
                </div>
                <div className="InputQuestionValue">
                  <input id="BudgetAmountValue" className="InputQuestionTypeText" placeholder="10000"></input>
                </div>
              </div>
              <div className="InputQuestion">
                <div className="InputQuestionTitle">
                  <p>Budget Color</p>
                </div>
                <div className="InputQuestionValue">
                  <select id="BudgetColorValue" className="InputQuestionTypeSelect">
                    <option value="Blue">Blue</option>
                    <option value="Red">Red</option>
                    <option value="Green">Green</option>
                    <option value="Purple">Purple</option>
                    <option value="Orange">Orange</option>
                    <option value="Yellow">Yellow</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="InputAreaSubmitContainer">
              <button className="ButtonRoundedStyle ButtonHoverEffect" onClick={createBudget}>Create Budget</button>
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
          <Table
            striped
            bordered
            hover
            variant="dark"
            className="TransactionsTable"
          >
            <thead>
              <tr className="TransactionTableRowWrapper">
                <th className="DataColumnHeader">Title</th>
                <th className="DataColumnHeader">Type</th>
                <th className="DataColumnHeader">Amount</th>
                <th className="DataColumnHeader">Budget</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr className="TransactionTableRowWrapper">
                <td className="DataFieldClass">Job</td>
                <td className="DataFieldClass">Deposit</td>
                <td className="DataFieldClass">+10000</td>
                <td className="BudgetColumnDataField">-</td>
                <td><img src="remove.png" className="RemoveTTableItemImage ButtonHoverEffect"/></td>
              </tr>
              <tr className="TransactionTableRowWrapper">
                <td className="DataFieldClass">Club</td>
                <td className="DataFieldClass">Withdrawl</td>
                <td className="DataFieldClass">-1200</td>
                <td className="BudgetColumnDataField">
                  <div className="BudgetStickerContainer">Social</div>
                </td>
                <td><img src="remove.png" className="RemoveTTableItemImage ButtonHoverEffect"/></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Home;
