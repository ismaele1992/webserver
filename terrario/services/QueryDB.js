export async function getTemperature() {

    const response = await fetch('http://localhost:80');
    return await response.json();
}

export async function get24HTemperature() {
    let startdate = DateToString(GetPreviousDay());
    let enddate = DateToString(new Date);
    console.log(`http://localhost/24hours?startdate=${startdate}&enddate=${enddate}`);
    const response = await fetch(`http://localhost/24hours?startdate=${startdate}&enddate=${enddate}`);
    return await response.json();
}

function GetPreviousDay(date = new Date()) {
    var previousday = new Date(date.getTime());
    previousday.setDate(date.getDate() - 1);
    return previousday;
}

function DateToString(date) {
    let day = (date.getDate()).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    let month = (date.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    let year = date.getFullYear();
    let hour = date.getHours().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    let minutes = date.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    let seconds = date.getSeconds().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    let dateFormated = day + "-" + month + "-" + year + " " + 
        hour + ":" + minutes + ":" + seconds;
    return dateFormated
}