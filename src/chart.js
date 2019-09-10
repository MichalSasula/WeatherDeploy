let x =[];
let y =[];
let x2 =[];
let y2=[];
let x3 =[];
let y3 =[];
const chartColor = 'black';
function getChart(){
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',    
        data: {
            labels: x,
            datasets: [{
                label: 'Temperatura',
                fill: false,
                backgroundColor: '#bbb',
                borderColor: chartColor,
                data: y 
            }]
        },    
        options: {
           title:{
               display: true,
               text: 'Temperatura godzinowa [°C]',
               fontSize: 20
           },
           legend: {
            display: false           
            }
        }
    });
}

function getChart2(){
    const ctx = document.getElementById('chart2').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',    
        data: {
            labels: x2,
            datasets: [{
                label: 'Ciśnienie',
                fill: false,
                backgroundColor: '#bbb',
                borderColor: chartColor,
                data: y2 
            }]
        },    
        options: {
            title:{
                display: true,
                text: 'Ciśnienie [hPa]',
                fontSize: 20
            },
            legend: {
            display: false            
            }
        }
    });
}    
function getChart3(){
    const ctx = document.getElementById('chart3').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',    
        data: {
            labels: x3,
            datasets: [{
                label: 'Wilgotność',
                fill: false,
                backgroundColor: '#bbb',
                borderColor: chartColor,
                data: y3 
            }]
        },    
        options: {
            title:{
                display: true,
                text: 'Wilgotność [%]',
                fontSize: 20
            },
            legend: {
                display: false            
            }
        }
    });
}
export function CreateCharts(dataList){
    x=[];
    y=[];
    for(let i=0; i<9; i++){
        x.push(dataList[i].dt_txt.substr(5,11));
        y.push(dataList[i].main.temp);
    };
    getChart();

    x2=[];
    y2=[];
    for(let i=0; i<9; i++){
        x2.push(dataList[i].dt_txt.substr(5,11));
        y2.push(dataList[i].main.pressure);
    };
    getChart2();

    x3=[];
    y3=[];
    for(let i=0; i<9; i++){
        x3.push(dataList[i].dt_txt.substr(5,11));
        y3.push(dataList[i].main.humidity);
    };
    getChart3();
}
