let firstChart = '';
let secondChart = '';
let thirdChart = '';

// Function to get data and print charts
function getData() {
    // get dat from all input elements
    const status = document.getElementById('data-status').value;
    const country = document.getElementById('data-country').value;
    
    // show spinner before load data 
    let showSpinner = document.getElementById('show-spinner');
    showSpinner.classList.add('spinner-4');
    setTimeout( () => showSpinner.classList.remove('spinner-4'), 5000 );  

    // Chart by Country - Status - This chart should be used as History
    // Status Recovered was depreciated
    if ( status.length < 1 )
         status = 'Confirmed';

    // console.log('http://localhost:3000/hist?country=' + country+'&status='+ status);
    fetch('http://covid-api.mmediagroup.fr/v1/history?country=' + country+'&status='+ status)
    .then( (response) => {
        return response.json();
    })
    .then(function (dataStatus) {
        let datesList = dataStatus.All.dates;
        let dateList= [];
        let valueList= [];
    
        let fInit = document.getElementById('data-initial-date').value;
        let fFinal = document.getElementById('data-final-date').value;
        
        // Filtra solo las fechas indicadas   
        for ( const [nDate, nValue] of Object.entries(datesList) ) {
            if (fInit <= `${nDate}` && fFinal>= `${nDate}`){
                dateList.push (`${nDate}`)
                valueList.push (`${nValue}`)
            }
        }
        
        const chartStatus = document.querySelector("#myChart2");
        const chartLabels = dateList;
        
        const defineStatus = {
                label: status,
                data: valueList,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
                ],
                borderWidth: 1,
        };

        if ( secondChart ) {
             secondChart.clear();
             secondChart.destroy();
        }
        
        secondChart = new Chart(chartStatus, {
            type: 'bar',// Tipo de gráfica
            data: {
                labels: chartLabels,
                datasets: [
                    defineStatus,
                ]
            },
            options: {
                scales: {
                    y :{
                            beginAtZero: false
                    }
                },
            }
        });
    })  

    // Chart per Country
    // console.log('http://localhost:3000/stats?country=' + country) 
    fetch('https://covid-api.mmediagroup.fr/v1/cases?country=' + country)
    .then( (response) => {
        return response.json();
    })
    .then(function (dataHist) {
        let stateList = [];
        let recoveredList = [];
        let confirmedList = [];
        let deathsList = [];
        
        // Filtra solo las fechas indicadas
        // console.log(dataHist)
        for ( const [nState, nRecovered] of Object.entries(dataHist) ) {
            if(`${nState}` !== 'All'){
                stateList.push (`${nState}`)
                recoveredList.push (`${nRecovered.recovered}`)
                confirmedList.push (`${nRecovered.confirmed}`)
                deathsList.push (`${nRecovered.deaths}`)
            }
        }

        //console.log('State ' + stateList)
        //console.log('Confirmed ' + confirmedList)
        //console.log('Deaths ' + deathsList)
        //console.log('Recovered ' + recoveredList)

        const chartStatus = document.querySelector("#myChart3");
        const chartLabels = stateList;
        
        const defineStatus = {
                label: status,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
                ],
                borderWidth: 1,
        };

        const CHART_COLORS = {
            red: 'rgb(255, 99, 132)',
            purple: 'rgb(153, 102, 255)',
            blue: 'rgb(54, 162, 235)',
            green: 'rgb(218, 247, 166)',//'rgb(75, 192, 192)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            grey: 'rgb(201, 203, 207)'
        };

        if ( thirdChart ) {
             thirdChart.clear();
             thirdChart.destroy();
        }
        
        const data = {
            labels: stateList,
            datasets: [{
                label: 'Confirmed',
                backgroundColor: '#42a5f5',
                borderColor: 'gray',
                data:confirmedList,
            },{
                label: 'Recovered',
                backgroundColor: 'green',
                borderColor: 'green',
                data: recoveredList,
            },{
                label: 'Deaths',
                backgroundColor: '#ffab91',
                borderColor: 'yellow',
                data: deathsList,
            }			
            ]
        };

        thirdChart = new Chart(chartStatus, {
            type: 'line',// Tipo de gráfica
            data: data,
            options: {
                scales: {
                    y :{
                            beginAtZero: false
                    }
                },
            }
        });

    })
    
    // Chart of Vaccines per Country
    // console.log('http://localhost:3000/vac?country=' + country);
    fetch('https://covid-api.mmediagroup.fr/v1/vaccines?country=' + country)
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
            blue: 'rgb(54, 162, 235)',
            green: 'rgb(218, 247, 166)',//'rgb(75, 192, 192)',
            purple: 'rgb(153, 102, 255)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            grey: 'rgb(201, 203, 207)'
        };
           
        const data = {
            labels: [ 'People Not Vaccinated',
                      'People Partially Vaccined',
                      'People Vaccinated' ],
            datasets: [
                {
                label: 'Dataset 1',
                data: [ people_not_vaccinated,
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
                            text: `Vaccines COVID-19    Population ${population}    Administered ${administered}`
                    }
                }
            },
        };

        if ( firstChart ) {
             firstChart.clear();
             firstChart.destroy();
        }
     
        firstChart = new Chart(
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

    fetch('https://covid-api.mmediagroup.fr/v1/history?country=&status=Confirmed')    
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

function dateFormat(days = 0) {
    const tDate = new Date();
    let dd = tDate.getDate() - days;
    let mm = tDate.getMonth() + 1;
    const yyyy = tDate.getFullYear();

    if ( mm <= 9 ) {
         mm = "0" + mm
    }
    if ( dd <= 9 ) {
         dd = "0" + dd
    }
    return yyyy + "-" + mm + "-" + dd
}

let dInitial = document.getElementById('data-initial-date');
dInitial.value = dateFormat(1);

let dFinal = document.getElementById('data-final-date');
dFinal.value = dateFormat(0);

addOptions();
