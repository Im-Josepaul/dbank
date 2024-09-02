import {dbank_backend} from "../../declarations/dbank_backend";
import {addTransaction,getTransactions} from "./logger.js"
var currentAmount;
var submitPressed = 0;
var viewPressed = 0;

function errorHandler(errorText) {
    document.getElementById("message").innerHTML = errorText
    document.getElementById("error").classList.remove("hidden")
    document.getElementById("error").classList.add("show");
}

function transactionListUpdater() {
    const transactions = getTransactions();
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = ""; 

    transactions.forEach(transaction => {
        const li = document.createElement("li");
        li.textContent = transaction;
        transactionList.appendChild(li);
    });
}

window.addEventListener("load",async function () {
    currentAmount = await dbank_backend.balance();
    this.document.getElementById("value").innerHTML = Math.round(currentAmount*100)/100;
    this.document.getElementById("transactions").classList.add("hidden");
});

document.querySelector("form").addEventListener("submit",async function(event) {
    event.preventDefault();
    submitPressed += 1;

    if(submitPressed == 5){
        document.getElementById("error").classList.add("warning");
        errorHandler("This dApp works on test coins.<br>  Don't make me bankrupt :)");
        submitPressed = 0;
        document.getElementById("input-amount").value = "";
        document.getElementById("withdrawal-amount").value = "";
        document.getElementById("user-name").value = "";   
    }
    else{
        const button = document.getElementById('submit-btn');
        var topupVal = document.getElementById("input-amount").value;
        var topdownVal = document.getElementById("withdrawal-amount").value;
        var username = document.getElementById("user-name").value

        button.innerHTML = "<div class='loader'></div>";
        button.setAttribute("disabled",true);

        if(username === ""){
            errorHandler("Warning: Username is required");
        }
        else if(topdownVal === "" && topupVal !== ""){
            topupVal = parseFloat(topupVal);
            await dbank_backend.topUp(topupVal);
            addTransaction(username,1,topupVal);
        }
        else if(topupVal === "" && topdownVal !== ""){
            topdownVal = parseFloat(topdownVal);
            if(topdownVal <= currentAmount){
                await dbank_backend.topDown(topdownVal);
                addTransaction(username,0,topdownVal);
            }
            else{
                errorHandler("Insufficient Balance")
            }
        }
        else if(topdownVal !== "" && topupVal !== ""){
            errorHandler("Only do one operation at a time");            
        }
        else{
            errorHandler("Warning: Enter a valid Element")
        }

        button.innerHTML = "Finalise Transaction"
        button.removeAttribute("disabled");

        currentAmount = await dbank_backend.balance();
        document.getElementById("value").innerHTML = Math.round(currentAmount*100)/100;

        document.getElementById("input-amount").value = "";
        document.getElementById("withdrawal-amount").value = "";
        transactionListUpdater();
    }
});

document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("error").classList.remove("show")
    document.getElementById("error").classList.add("hidden");
    document.getElementById("error").classList.remove("warning");
})

document.getElementById("view-transaction").addEventListener("click",function() {
    const list = document.getElementById("transactions");
    viewPressed +=1;
    console.log(viewPressed);
    if(viewPressed%2 === 0){
        list.classList.add("hidden");
    }
    else{
        transactionListUpdater();
        list.classList.remove("hidden");
    }
});



