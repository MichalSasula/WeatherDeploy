import './style.css';
import './weather-icons-master/css/weather-icons-wind.min.css';
import './weather-icons-master/css/weather-icons.min.css'

import leftArrow from  './arrow-icons/arrow_left.png';
import rightArrow from  './arrow-icons/arrow_right.png';

import {themeDependsOnHour} from './theme.js';

import './functionalities.js';
import './main.js';

window.addEventListener('load', async function(e){
    themeDependsOnHour();
    document.getElementById("leftArrow").src = leftArrow;
    document.getElementById("rightArrow").src = rightArrow;
    
});