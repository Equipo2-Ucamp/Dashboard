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
    .then(function (dataVaccine) {
        // Here put logic to parse data and get Vaccines chart
        //console.log(dataVaccine);
        const { administered, people_partially_vaccinated, people_vaccinated, population } = dataVaccine.All;
        let people_not_vaccinated = population*1 - people_partially_vaccinated*1 - people_vaccinated;
         
        const CHART_COLORS = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            blue: 'rgb(54, 162, 235)',
            green: 'rgb(218, 247, 166)',//'rgb(75, 192, 192)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };
           
        const data = {
            labels: [ 'Population',
                      'People Not Vaccinated',
                      'Administered',
                      'People Partially Vaccined',
                      'People Vaccinated' ],
            datasets: [
                {
                label: 'Dataset 1',
                data: [ population,
                        people_not_vaccinated,
                        administered,
                        people_partially_vaccinated,
                        people_vaccinated ],
                backgroundColor: Object.values(CHART_COLORS),
                }
            ]
        };
     
        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                            position: 'top',
                    },
                    title: {
                            display: true,
                            text: 'Vaccines COVID-19'
                    }
                }
            },
        };
     
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        ); 
        //---
    })
}

function addOptions() {
    let optionsList = '';
    
    let showSpinnerInitial = document.getElementById('show-spinner-initial');
    showSpinnerInitial.classList.add('spinner-4');
    setTimeout( () => showSpinnerInitial.classList.remove('spinner-4'), 700 );

    fetch('http://localhost:3000/hist?country=&status=Confirmed')    
    .then( function (response) {
        return response.json();
    })
    .then( function (data) {
        const container = document.querySelector('#data-country')
        for ( const [country] of Object.entries(data) ) {
              optionsList += `<option>${country}</option>`
        }
        container.innerHTML += optionsList
    })
}

addOptions();

