export let data = [];
export let dataCode = 0;
export function correctPolishLetters (string) {
    var dict = {'ą':'a','ć':'c','ę':'e','ł':'l','ń':'n','ó':'o','ś':'s','ź':'z','ż':'z', 'Ą':'A','Ć':'C','Ę':'E','Ł':'L','Ń':'N','Ó':'O', 'Ś':'S','Ź':'Z', 'Ż':'Z'};
    return string.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, match => dict[match]);
  }

function APIRequestByCityName(city)
{
    city=correctPolishLetters(city);
    return `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang={pl}&APPID=aa89918a50010961a10dfbbee0781cb1`
}
/*Język przestawiony w api na polski (&lang={pl}), ale nie zawuażyłam zmiany */

export async function Getdata(city){
    let APIpromise = APIRequestByCityName(city);
    let errorMessage = "";
    dataCode = 0;
    data = [];
    const body = document.querySelector('body');
    await fetch(APIpromise)
        .then( response => response.json())
        .then (APIdata => {
            dataCode = APIdata.cod;
            if(dataCode !== "200")
            {
                errorMessage = APIdata.message;
                return;   
            }
            if(APIdata !== undefined)
                data.push(...APIdata.list);
        })
        if(dataCode !== "200")
            return errorMessage;
        return data;
}