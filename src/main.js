
import { weatherTileClick } from './Forecast.js';
import { setSliderAfterTileClick } from './Forecast.js';
import { usingSlider } from './Forecast.js';
import { correctPolishLetters } from "./APICommunication.js";
import { Getdata } from "./APICommunication.js";
import { dataCode } from "./APICommunication.js";
import { createShortSection } from "./Forecast.js";
import { createDetailedSection } from "./Forecast";
import { CreateCharts } from "./chart.js";
import { dataIdfromSlider } from "./Forecast.js";

/*WALIDACJA*/
const placeInput=document.getElementById('placeInput');
const messageSection = document.getElementById('messages');
const sub=document.getElementById('submit');
let errorsTypes = []; // jeśli zawiera "1" to błąd w nazwie miasta, jeśli zawiera "2" to błąd w dacie

placeInput.addEventListener('input', function(e){
    let a= correctPolishLetters(this.value);
    const regW =/[^A-Za-z_\s]/ ;
    const matchError = regW.exec(a);
    if(matchError!==null){
        // document.getElementById('messagesBar').style.display="block";
        messageSection.style.display="block";
        document.getElementById('typingError').style.display="block";
        errorsTypes.includes(1) ? null : errorsTypes.push(1); //dodaj błąd jeśli go nie ma
        sub.setAttribute('disabled', 'disabled');
    }
    else{
        document.getElementById('typingError').style.display="none";     
        errorsTypes = errorsTypes.filter(err => err != 1);    // usun blad z tablicy    
        if(errorsTypes.length == 0)  
        {
            messageSection.style.display="none";
            sub.removeAttribute('disabled');
        }  
    }
});
//Przy loadowaniu strony
let slider = document.getElementById('hourSlider');

//Po kliknięciu submita
sub.addEventListener('click', async function(e){
        const datas = await Getdata(placeInput.value);
        const errorInfo = document.getElementById("error-info");
        const weatherInfo = document.getElementById("weather-info");
        errorInfo.style.display = "none";
        weatherInfo.style.display = "none";
        if(dataCode === "200")
        {
            await createShortSection(datas);
            createDetailedSection(placeInput.value, datas[0].dt);
            CreateCharts(datas);
            weatherInfo.style.display = "block";
        }
        else
        {
            errorInfo.style.display = "block";
            document.getElementById("error-type").innerHTML = dataCode;
            document.getElementById("error-message").innerHTML = datas;
        }
})
    
//Po kliknięciu kafelka

let weatherTiles = document.querySelectorAll('.short');
weatherTiles.forEach(tile=>{
    tile.addEventListener('click', weatherTileClick);
    tile.addEventListener('click', setSliderAfterTileClick);
})

//Obsługa slidera
slider.addEventListener('change', usingSlider)

//strzałki do slidera

let leftArrow = document.getElementById('leftArrow');
let rightArrow = document.getElementById('rightArrow');

leftArrow.addEventListener('click',(e)=>{
    if(slider.value>slider.min) {
        slider.value -= 3
    }
    let forecastHeader = document.getElementById('detailedHeader');
    forecastHeader.querySelector('b').innerHTML = `${slider.value}:00`
    createDetailedSection(placeInput.value, (dataIdfromSlider()));
})

rightArrow.addEventListener('click',e=>{
    if(slider.value<=21) slider.value = -1*(-1*slider.value-3);
    let forecastHeader = document.getElementById('detailedHeader');
    forecastHeader.querySelector('b').innerHTML = `${slider.value}:00`;
    createDetailedSection(placeInput.value, (dataIdfromSlider()));
})
