// This function could be used to get values for Country and Status drop list
// Call this function with un event onload in html
function initCharts() {
    // Show spinner before load data
    let showSpinner = document.getElementById('show-spinner');
    showSpinner.classList.add('spinner-4');
    setTimeout( () => showSpinner.classList.remove('spinner-4'), 2300 );

    // Query to get default values for Mexico
    const country = 'Mexico';
    console.log('http://localhost:3000/stats?country=' + country) 
    fetch('http://localhost:3000/stats?country=' + country)
    .then( (response) => {
        return response.json()
    })
    .then(function (data) {
        // Here put logic to parse data and return catalogs from Country and Status and fisrt chart
        console.log(data)
    })
}

// Function to get data and print charts
function getData() {
    // get dat from all input elements
    const inputFields = document.querySelectorAll('.input');
    const inputList = document.getElementById('data-country').value;
    // We need to check that all inputs have values, in other case add warnings and show alerts

    // show spinner before load data 
    let showSpinner = document.getElementById('show-spinner');
    showSpinner.classList.add('spinner-4');
    setTimeout( () => showSpinner.classList.remove('spinner-4'), 2300 );

    let country = '';
    let status = '';
    let initialDate = '';
    let finalDate = '';

    country = inputList;
    
    for ( const inputItem of inputFields ) {
        if ( inputItem.name === 'data-status') {
                  status = inputItem.value;
        }
        else if ( inputItem.name === 'data-initial-date') {
                  initialDate = inputItem.value;
        }
        else if ( inputItem.name === 'data-final-date') {
                  finalDate = inputItem.value;
        }
    }

    // Chart per Country
    console.log('http://localhost:3000/stats?country=' + country) 
    fetch('http://localhost:3000/stats?country=' + country)
    .then( (response) => {
        return response.json();
    })
    .then(function (data) {
        // Here put logic to parse data and get first/Second Chart
        console.log(data);
    })
    
    // Chart by Country - Status - This chart should be used as History
    // Status Recovered was depreciated
    if ( status.length < 1 )
         status = 'Confirmed';

    console.log('http://localhost:3000/hist?country=' + country+'&status='+ status); 
    fetch('http://localhost:3000/hist?country=' + country+'&status='+ status)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Here put logic to parse data and get first History
        console.log(data);
    })

    // Chart of Vaccines per Country
    console.log('http://localhost:3000/vac?country=' + country);
    fetch('http://localhost:3000/vac?country=' + country)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Here put logic to parse data and get Vaccines chart
        console.log(data);
    })
}

function addOptions() {
    let optionsList = '';

    let showSpinner = document.getElementById('show-spinner');
    showSpinner.classList.add('spinner-4');
    setTimeout( () => showSpinner.classList.remove('spinner-4'), 2500 );
    
    fetch('http://localhost:3000/hist?country=&status=Confirmed')
    
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const container = document.querySelector('#data-country')
        
        for (const [country] of Object.entries(data)) {
        optionsList += `<option>${country}</option>`
        }

        container.innerHTML += optionsList
    })
}

addOptions();

