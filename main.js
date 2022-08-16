

const initSite = () => {
eventListeners()
}


async function makeRequest(url) {

    const response = await fetch(url);
    const result = await response.json();

    return result;

}


async function geoNames(city) {

    let url = "http://api.geonames.org/searchJSON?username=12oguh&featureClass=P&country=SE&maxRows=5&name_startsWith=" + city;

    let result = await makeRequest(url)

    let renderDiv = document.querySelector("#render");

    renderDiv.innerHTML = ""

    result.geonames.map(city => {

        let resultContainer = document.createElement("div");
        resultContainer.className = "resultContainer";

        let cityP = document.createElement("p");
        cityP.innerText = city.toponymName + ",";
        cityP.addEventListener("click", () => {
            SMHI(city)
        })

        let regionP = document.createElement("p");
        regionP.innerText = city.adminName1


        resultContainer.append(cityP, regionP)
        renderDiv.append(resultContainer)

    })


}

async function SMHI(city) {

    let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${city.lng}/lat/${city.lat}/data.json`

    let result = await makeRequest(url)

    console.log(result)



}




function eventListeners() {

    document.getElementById("input").addEventListener("change", (e) => {
        geoNames(e.target.value)
    })



}




window.addEventListener("load", initSite);