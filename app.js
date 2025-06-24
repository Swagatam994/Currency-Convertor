const baseurl = "https://economia.awesomeapi.com.br/last/"

const dropdown = document.querySelectorAll('.dropdown select');
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const btn = document.querySelector('button');
const msg = document.querySelector('.msg');

for (let select of dropdown) {
    for (code in countryList) {
        // console.log(code, countryList[code]);
        let newOption = document.createElement('option');
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === 'from' && code === 'INR') {
            newOption.selected = 'selected';
        }
        else if (select.name === 'to' && code === 'USD') {
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    let currcode = element.value;
    console.log(element);
    let countrycode = countryList[currcode];
    let newimg = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newimg;

};

async function updateExchangeRate() {
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    if (amtvalue == "" || amtvalue <= 1) {
        amount.value = 1;
    }
    console.log(fromcurr.value, tocurr.value);
    const url = `${baseurl}${fromcurr.value}-${tocurr.value}`;
    let response = await fetch(url);
    let info = await response.json();
    console.log(info)
    console.log(info[fromcurr.value + tocurr.value].ask)
    msg.innerText = `${amtvalue} ${fromcurr.value} = ${amtvalue * info[fromcurr.value + tocurr.value].ask} ${tocurr.value}`;

}


btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    updateExchangeRate();

});
window.addEventListener('load', () => {
    updateExchangeRate();
})