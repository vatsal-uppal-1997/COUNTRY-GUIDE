const req = new XMLHttpRequest();

/**
 * Add event listener to close the alert box
 */
document
.querySelector("button[aria-label='Close']")
.addEventListener("click", (element)=>{
    const parent = element.target.parentElement;
    parent.classList.add("hide");
})

/**
 * Queries server for information regarding a country :-
 *  
 *  case 1: Information found
 *          0. Display alert box with the countries name
 *          1. Unhide the card if not already un-hidden
 *          2. Fill the card with meta info about the country
 *  case 2: 404 Not fount
 *          0. Unhide and display the error message in the alert
 * 
 * @param {String} inputId id of the input box to get user input
 */
function process(inputId) {
    const search = document.getElementById(inputId).value;
    req.open("GET", "https://restcountries.eu/rest/v2/name/"+search);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            const parsed = JSON.parse(req.response);
            const alert = document.getElementById("alert");
            const alertContent = document.getElementById("response");
            if (alert.classList.contains("hide"))
                alert.classList.remove("hide");
            if (req.status === 404) {
                if (alert.classList.contains("alert-success"))
                    alert.classList.remove("alert-success");
                alert.classList.add("alert-danger");
                alertContent.innerHTML = "<b>oops!</b> " + parsed.message;
                return;
            }
            const countryDisc = parsed[0];
            alertContent.innerHTML = "<b>"+countryDisc.name+"</b>";
            const result = document.getElementById("result");
            if (result.classList.contains("hide"))
                result.classList.remove("hide");
            document.getElementById("flag").setAttribute("src", countryDisc.flag);
            document.getElementById("country").innerText=countryDisc.name;
            document.getElementById("capital").innerText=countryDisc.capital;
            document.getElementById("region").innerText=countryDisc.region;
            document.getElementById("subregion").innerText=countryDisc.subregion;
            document.getElementById("population").innerText=countryDisc.population;
            document.getElementById("timezones").innerText=countryDisc.timezones.join(", ");
            document.getElementById("nativename").innerText=countryDisc.nativeName;
            document.getElementById("currency").innerText=countryDisc.currencies[0].name;
            document.getElementById("languages").innerText=countryDisc.languages[0].name;
        }
    }
    return false;
} 