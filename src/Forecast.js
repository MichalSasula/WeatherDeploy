import { theme } from "./theme";
import { data } from "./APICommunication";

let shortMarked; // zaznaczony dzieńw prognozie na najb. dni 

//funkcje pomocnicze

const dayName = (dayNr)=>{
    switch(dayNr){
        case 0:
            return 'Niedziela';
        case 1:
            return 'Poniedziałek';
        case 2:
            return 'Wtorek';
        case 3:
            return 'Środa';
        case 4:
            return 'Czwartek';
        case 5:
            return 'Piątek';
        case 6:
            return 'Sobota';
    }
}

const iconUrlfromId = (iconId)=>{
   return `https://openweathermap.org/img/wn/${iconId}@2x.png`
}

//slider functions

export const setSliderAfterTileClick = (e)=>{
    let weatherSlider = document.getElementById('hourSlider');
    let currentDate = new Date(data[0].dt_txt)
    let currentHour = currentDate.getHours();
    weatherSlider.value = currentHour;
    let tileNumber = e.currentTarget.dataset.shortindex;
    if (tileNumber == 0){
        weatherSlider.min = currentHour;
    }
    else{
        weatherSlider.min = 0;
    }
    weatherSlider.dataset.tilenumber = tileNumber;
}

export const dataIdfromSlider = ()=>{
    let slider = document.getElementById('hourSlider');
    let tileNumer = slider.dataset.tilenumber;
    let currentHour = (new Date(data[0].dt_txt)).getHours();
    return data[tileNumer*8+(slider.value-currentHour)/3].dt;
}

export const usingSlider = function(e){
    let forecastHeader = document.getElementById('detailedHeader');
    forecastHeader.querySelector('b').innerHTML = `${e.target.value}:00`;
    createDetailedSection(placeInput.value, dataIdfromSlider());
}

//utworzenie sekcji DetailedSection

export const createDetailedSection = (cityName, dataId)=>{
    if (cityName === ''){cityName = 'Wrocław'};
    let moment = data.find(el => el.dt === dataId);

    let detailedForecast = {
        weatherDescription: moment.weather[0].description,
        weatherIcon: moment.weather[0].icon,
        temperature: moment.main.temp,
        pressure: moment.main.pressure,
        humidity: moment.main.humidity,
        windSpeed: moment.wind.speed,
        clouds: moment.clouds.all,
    }

    let detailDivs = document.querySelectorAll('.detail');
    
    detailDivs[0].innerHTML = `
    <figure>
        <img src="${iconUrlfromId(detailedForecast.weatherIcon)}"></img>
        <figcaption><b>${detailedForecast.weatherDescription}</b></figcaption>
        </figure>
        `
    detailDivs[1].innerHTML = `
    <figure>
        <i class="wi wi-thermometer"></i>
        <figcaption><b>Temperatura</b> ${detailedForecast.temperature}°C</figcaption>
    </figure>
    `
    detailDivs[2].innerHTML = `
    <figure>
    <i class="wi wi-barometer"></i>
        <figcaption><b>Ciśnienie</b> ${detailedForecast.pressure}hPa</figcaption>
    </figure>
    `
    detailDivs[3].innerHTML = `
    <figure>
    <i class="wi wi-humidity"></i>
        <figcaption><b>Wilgotność</b> ${detailedForecast.humidity}%</figcaption>
    </figure>
    `
    detailDivs[4].innerHTML = `
    <figure>
    <i class="wi wi-strong-wind"></i>
        <figcaption><b>Wiatr</b> ${detailedForecast.windSpeed}m/s</figcaption>
    </figure>
    `
    detailDivs[5].innerHTML = `
    <figure>
        <i class="wi wi-day-cloudy"></i>
        <figcaption><b>Zachmurzenie</b> ${detailedForecast.clouds}%</figcaption>
    </figure>
    `
    let forecastHeader = document.getElementById('detailedHeader');

    let date = new Date(moment.dt_txt);
    let hour = date.getHours();
    let day = date.getDate();
    let month =date.getMonth()+1;
    if(day<10){day = '0' + day};
    if(month<10){month = '0' + month}; 
    forecastHeader.innerHTML = `${cityName}     ${day}.${month}<br>Godzina: <b>${hour}:00</br>`;
}

//utworzenie sekcji ShortSection
export const createShortSection = (data)=>{

    let next5days = [];
    let dayNr = -1;
    let previousMomentDay = -1;

    for(let i=0; i<data.length; i++){
        let currentMomentDay = new Date(data[i].dt_txt).getDate();
        if(currentMomentDay !== previousMomentDay){
            dayNr ++;
            next5days[dayNr] = [data[i]];
        }
        else{
            next5days[dayNr].push(data[i]);
        }
        previousMomentDay = currentMomentDay;
    }
    let shortData = {
        temperature: [],
        pressure: [],
        humidity: [],
        dayDate:[],
    }
    for(let day of next5days){
        
        shortData.temperature.push(day.reduce((a,b)=>{return a+b.main.temp},0)/day.length);
        shortData.pressure.push(day.reduce((a,b)=>{return a+b.main.pressure},0)/day.length);
        shortData.humidity.push(day.reduce((a,b)=>{return a+b.main.humidity},0)/day.length);

        let dayWeek = new Date(day[0].dt_txt).getDay();
        let dayMonth = new Date(day[0].dt_txt).getDate();
        if(dayMonth<10) dayMonth = '0' + dayMonth;
        let month = new Date(day[0].dt_txt).getMonth()+1;
        if(month<10) month = '0' + month;
        
        shortData.dayDate.push(`${dayName(dayWeek)}<br>${dayMonth}.${month}`);        
    }

    for(let factor in shortData){
        if (factor !== 'dayDate') shortData[factor] = shortData[factor].map(el=>el.toFixed(1));
    }
    let shortTemperatureTags = document.querySelectorAll('.shortTemperature');
    let shortPressureTags = document.querySelectorAll('.shortPressure');
    let shortHumidityTags = document.querySelectorAll('.shortHumidity');
    let shortImages = document.querySelectorAll('.shortImg');
    let shortHeaders = document.querySelectorAll('.shortHeader');
    let shortFigCaptions = document.querySelectorAll('.short figcaption')

    const middleArrEl = (arr)=>{
        if (arr.length%2 === 0) return arr[arr.length/2-1];
        if (arr.length%2 === 1) return arr[(arr.length+1)/2-1];
    }

    let imgIds = [];
    let weatherDescriptions = [];
    for (let i=0; i<data.length;i+=8){
        imgIds.push(data[i].weather[0].icon);
        weatherDescriptions.push(data[i].weather[0].description);
    }

    for(let i=0; i<shortTemperatureTags.length; i++){
        shortTemperatureTags[i].innerHTML = `${shortData.temperature[i]}°C`;
        shortPressureTags[i].innerHTML = `${shortData.pressure[i]}hPa`;
        shortHumidityTags[i].innerHTML = `${shortData.humidity[i]}%`;
        shortHeaders[i].innerHTML = shortData.dayDate[i];
        
        shortImages[i].src = iconUrlfromId(imgIds[i]);
        shortFigCaptions[i].innerHTML = weatherDescriptions[i];
    }
    shortMarked = document.querySelector(".short");
    shortMarked.style.backgroundColor = theme.dimness;
}

//Kliknięcie na kafelek short

export const weatherTileClick = function(e){
    shortMarked.style.backgroundColor = "rgba(220,170,200, 0.0)";
    let tNumber = e.currentTarget.dataset.shortindex;
    let dataId = data[tNumber*8].dt;
    let placeCity=document.getElementById('placeInput').value;
    e.currentTarget.style.backgroundColor = theme.dimness;
    shortMarked = e.currentTarget;
    createDetailedSection(placeCity, dataId);    
}




