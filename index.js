/* Your Code Here */
let createEmployeeRecord = function(employeeArray){
    return { //returning an object with {} here
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeesRow){
    return employeesRow.map(function(employee){
        return createEmployeeRecord(employee)
    })
}

let createTimeInEvent = function(dateStamp){ //have to assume this will be called on an employee and that will be 'this'
    let [date, hour] = dateStamp.split(' ')  
    
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

let createTimeOutEvent = function(dateStamp){ //have to assume this will be called on an employee and that will be 'this'
    let [date, hour] = dateStamp.split(' ')   
    
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

let hoursWorkedOnDate = function(dateSought){
    let timeIn = this.timeInEvents.find(function(e){
        return e.date === dateSought
    })

    let timeOut = this.timeOutEvents.find(function(e){
        return e.date === dateSought
    })

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(date){
    // have to use .call() here to explicity call this; won't work implicitly
    let hours = hoursWorkedOnDate.call(this, date) 
    let amtOwed = hours * this.payPerHour
    
    return parseFloat(amtOwed.toString())
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(employee){
        return employee.firstName = firstName
    })
}

let calculatePayroll = function(employees){
    return employees.reduce(function(aggregator, employee){
        return aggregator + allWagesFor.call(employee)
    }, 0)
}