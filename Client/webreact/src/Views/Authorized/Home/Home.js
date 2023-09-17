import Table from "react-bootstrap/Table";

import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Style.css";

import GlobalConfig from "../../../Util/Config"

import axios from 'axios';

function Home() {

  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])


  useEffect(() => {
    axios.get(GlobalConfig.SaveRightAPIURL + "/transactions/", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((data) => {
      if(data.status === 200) {
        let expenses = data.data.expenses
        let incomes = data.data.incomes
        let newData = []
        for (let i = 0; i < expenses.length; i++) {
          let data = expenses[i]
          data["transactionType"] = "expense"
          newData[newData.length] = data
        }
        for (let i = 0; i < incomes.length; i++) {
          let data = incomes[i]
          data["transactionType"] = "income"
          newData[newData.length] = data
        
        }
        setTransactions(newData)
        console.log(newData)
      }
    }).catch(console.log)
    axios.get(GlobalConfig.SaveRightAPIURL + "/budgets/user/", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((data) => {
      if(data.status === 200) {
        let newData = []
        
        for (let i = 0; i < data.data.length; i++) {
          let data = data.data[i]
          newData[newData.length] = data
        }
        setBudgets(newData)
        console.log(newData)
      }
    }).catch(console.log)
  }, [])

  useEffect(()=>{
    console.log(transactions)
  }, [transactions])

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

    axios.post(GlobalConfig.SaveRightAPIURL + "/incomes/", postData, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(function (response) {
      if (response.status === 201) {
        let data = response.data
        data["transactionType"] = "income"
        
        setTransactions(transactions.concat(data))
        console.log(transactions)
      }
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
      "budget": WithdrawlBudgetTypeValue,
      "name": WithdrawlNameValue,
      "amount": WithdrawlAmountValue,
      "date": WithdrawlDateValue,
      
    }

    axios.post(GlobalConfig.SaveRightAPIURL + "/expenses/", postData, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(function (response) {
      if (response.status === 201) {
        let data = response.data
        data["transactionType"] = "expense"
        
        setTransactions(transactions.concat(data))
        console.log(transactions)
      }
    })
    .catch(function (error) {
      console.log(error);
    });

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
      "name": BudgetNameValue,
      "amount": BudgetAmountValue,
      "color": BudgetColorValue
    }

    axios.post(GlobalConfig.SaveRightAPIURL + "/budgets/", postData, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(function (response) {
      if (response.status === 201) {
        let data = response.data
        
        setBudgets(budgets.concat(data))
        console.log(transactions)
      }
    })
    .catch(function (error) {
      console.log(error);
    });

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
                    {budgets.map(function(v, i){
                      return <option key={i} value={v.id}>{v.name}</option>
                    })}
                    
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
                <th className="DataColumnHeader">Date</th>
                <th className="DataColumnHeader">Title</th>
                <th className="DataColumnHeader">Type</th>
                <th className="DataColumnHeader">Amount</th>
                <th className="DataColumnHeader">Budget</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(function(transaction, i) {
                console.log(transaction)

                let budgetName = ""
                let budgetColor = ""

                if (transaction["budget"]) {
                  for (let i = 0; i < budgets.length; i++) {
                    if (budgets[i].id == transaction.budget) {
                      
                      budgetName = budgets[i].name
                      budgetColor = budgets[i].color
                    }
                  }
                }

                return <>
                  <tr key={i} className="TransactionTableRowWrapper">
                    <td className="DataFieldClass">{transaction.date}</td>
                    <td className="DataFieldClass">{transaction.name}</td>
                    <td  className="DataFieldClass">{transaction.transactionType}</td>
                    <td  className="DataFieldClass">{transaction.transactionType === "income" ? "+" : "-"}{transaction.amount}</td>
                    <td className="BudgetColumnDataField">
                      {budgetName !== "" ? <div style={{backgroundColor:budgetColor.toLocaleLowerCase()}} className="BudgetStickerContainer">{budgetName}</div> : "-"}
                    </td>
                    <td ><img  src="remove.png" className="RemoveTTableItemImage ButtonHoverEffect" onClick={function(){
                      if(transaction.transactionType === "income") {
                        axios.delete(GlobalConfig.SaveRightAPIURL + "/incomes/" + transaction.id + "/", {
                          headers: {
                            Authorization: localStorage.getItem("token")
                          }
                        }).then((data) => {
                          if (data.status === 204) {
                            
                            setTransactions(transactions.filter((value) => {
                              return value.id !== transaction.id
                            }))
                            console.log(transactions)
                          }
                        }).catch(console.log)
                      } else {
                        // expense
                        axios.delete(GlobalConfig.SaveRightAPIURL + "/expenses/" + transaction.id + "/", {
                          headers: {
                            Authorization: localStorage.getItem("token")
                          }
                        }).then((data) => {
                          if (data.status === 204) {
                            
                            setTransactions(transactions.filter((value) => {
                              return value.id !== transaction.id
                            }))
                            console.log(transactions)
                          }
                        }).catch(console.log)
                      }
                    }}/></td>
                  </tr>
                </>
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Home;
