import dayImg from './background_sky/dzien.jpg';
import nightImg from './background_sky/noc.jpg';

const dayTheme = {
    image: `url(${dayImg})`,
    dimness: "rgba(220,170,200, 0.3)"
}
const nightTheme = {
    image: `url(${nightImg})`,
    dimness: "rgba(15,15,36,0.3)"
}
export let theme;

function isNight(){
    const actualHour = new Date().getHours();
    if(actualHour >= 21 || actualHour <=6) 
        return true;
    return false;
}

export function themeDependsOnHour(){
    isNight() ? theme = nightTheme : theme = dayTheme;
    const backgound = document.getElementById("background");
    backgound.style.backgroundImage = theme.image;
}

// exports.themeDependsOnHour = themeDependsOnHour;