const logger = {};
let date_time = new Date();

export function addTransaction(username,id,value) {
    const transactionKey = 'tr' + Date.now();
    let dateAndTime = "[" + date_time.getDate()+"/"+("0"+(date_time.getMonth() +1))+"/"+date_time.getFullYear() + " " + date_time.getHours()+":"+date_time.getMinutes()+":"+date_time.getSeconds() + "]"
    if(id === 1){
        var transaction = dateAndTime + " " + username + " deposited $" + value;
    }
    else if(id === 0){
        var transaction = dateAndTime + " " + username + " withdrawn $" + value;
    }
    
    logger[transactionKey] = transaction;
}

export function getTransactions() {
    return Object.values(logger);
}


