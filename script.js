const countries = document.querySelector(".countries")
const select = document.getElementById("select")
const searchInput = document.querySelector(".search")
const item = document.querySelectorAll(".item")
const actions = document.querySelector(".actions")
const backBtn = document.querySelector(".backBtn")
const borderCountries = document.querySelector(".borderCountries")
const darkMode = document.querySelector(".darkMode")
const lightMode = document.querySelector(".lightMode")
const header = document.querySelector("header")
const region = document.querySelector(".region")
const inputContainer = document.querySelector(".inputContainer")


function checkLightMode (){
  const mode = localStorage.getItem("Mode")
  if(mode === "Dark"){
    const items = document.querySelectorAll(".item")
    const borders = document.querySelectorAll(".countryBorder")
  document.body.style.backgroundColor = "hsl(207, 26%, 17%)"
  document.body.style.color = "white"
  header.style.backgroundColor = "hsl(209, 23%, 22%)"
  darkMode.classList.add("hidden")
  lightMode.classList.remove("hidden")
  region.style.backgroundColor = "hsl(209, 23%, 22%)"
  region.style.color = "white"
  inputContainer.style.backgroundColor = "hsl(209, 23%, 22%)"
  const i = inputContainer.querySelector("i")
  i.style.color = "white"
  searchInput.style.backgroundColor = "hsl(209, 23%, 22%)"
  searchInput.style.color = "white"
  items.forEach(element=>{
    element.style.backgroundColor = "hsl(209, 23%, 22%)"
  })
   borders.forEach(element => {
    element.style.backgroundColor  = "hsl(209, 23%, 22%)"
  });
  backBtn.style.backgroundColor = "hsl(209, 23%, 22%)"
  backBtn.style.color = "white"
  }else{
    const borders = document.querySelectorAll(".countryBorder")
    const items = document.querySelectorAll(".item")
  document.body.style.backgroundColor = "hsl(0, 0%, 99%)"
  document.body.style.color = "black"
  header.style.backgroundColor = "hsl(0, 100%, 100%)"
  darkMode.classList.remove("hidden")
  lightMode.classList.add("hidden")
  region.style.backgroundColor = "hsl(0, 100%, 100%)"
  region.style.color = "black"
  inputContainer.style.backgroundColor = "hsl(0, 100%, 100%)"
  const i = inputContainer.querySelector("i")
  i.style.color = "black"
  searchInput.style.backgroundColor = "hsl(0, 100%, 100%)"
  searchInput.style.color = "black"
  items.forEach(element=>{
    element.style.backgroundColor = "hsl(0, 100%, 100%)"
  })
  borders.forEach(element => {
    element.style.backgroundColor  = "hsl(0, 100%, 100%)"
  });
  backBtn.style.backgroundColor = "hsl(0, 100%, 100%)"
  backBtn.style.color = "black"
  }
}
window.addEventListener("load",function(){
  checkLightMode()
})
checkLightMode()


async function renderCountries() {
    try{
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags");
    if(!response.ok){
        console.log("error"+response.status)
    }
    const data =await response.json()
    data.forEach(element => {
        const div = document.createElement("div")
        div.classList.add("item")
        div.innerHTML = `<img src="${element.flags.png}" alt="">
                <h1 class="countryName">${element.name.official}</h1>
                <div class="details">
                    <p><span>Population: </span>${element.population}</p>
                    <p><span>Region: </span>${element.region}</p>
                    <p><span>Capital: </span>${element.capital}</p>
                </div>`
        countries.append(div)
    });

    }catch(error){
       console.log(error)
    }
    checkLightMode()
}
renderCountries()

select.addEventListener("change",async function(e){
    countries.innerHTML = ""
    try{
       const response = await fetch(`https://restcountries.com/v3.1/region/${e.target.value}?fields=name,region,population,flags`)
       if(!response.ok){
        console.log("error"+response.status)
       }
       const data =await response.json()
       data.forEach(element=>{
         const div = document.createElement("div")
        div.classList.add("item")
        div.innerHTML = `<img src="${element.flags.png}" alt="">
                <h1 class="countryName">${element.name.official}</h1>
                <div class="details">
                    <p><span>Population: </span>${element.population}</p>
                    <p><span>Region: </span>${element.region}</p>
                    <p><span>Capital: </span>${element.capital}</p>
                </div>`
        countries.append(div)
       })
    }catch(error){
        console.log(error)
    }
    
  checkLightMode()
})

searchInput.addEventListener("input",async function(e) {
    countries.innerHTML=""
    if(searchInput.value ===""){
       await renderCountries()
    }
    try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchInput.value}`)
        if(!response.ok){
            console.log("error"+response.status)
        }
        const data = await response.json()
         data.forEach(element=>{
         const div = document.createElement("div")
        div.classList.add("item")
        div.innerHTML = `<img src="${element.flags.png}" alt="">
                <h1 class="countryName">${element.name.official}</h1>
                <div class="details">
                    <p><span>Population: </span>${element.population}</p>
                    <p><span>Region: </span>${element.region}</p>
                    <p><span>Capital: </span>${element.capital}</p>
                </div>`
        countries.append(div)
       })
    }catch(error){
        console.log("error :"+error)
    }  
    checkLightMode()
})

document.addEventListener("click", async (e) => {
  const item = e.target.closest(".item");
  if (!item) return;

  const countryName = item.querySelector(".countryName").textContent;

  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,region,subregion,population,capital,tld,currencies,languages,flags,borders`
  );

  const data = await response.json();
  const country = data[0];

  // Fill UI
  document.querySelector(".cntryName").textContent = country.name.common;
  document.querySelector(".flagValue").src = country.flags.svg;

  document.querySelector(".nativeNameValue").textContent =
    Object.values(country.name.nativeName || {})[0]?.common || "N/A";

  document.querySelector(".populationValue").textContent =
    country.population.toLocaleString();

  document.querySelector(".regionValue").textContent = country.region;
  document.querySelector(".subRegionValue").textContent = country.subregion || "N/A";
  document.querySelector(".capitalValue").textContent =
    country.capital?.[0] || "N/A";

  document.querySelector(".domainValue").textContent =
    country.tld?.join(", ") || "N/A";

  document.querySelector(".currenciesValue").textContent =
    country.currencies
      ? Object.values(country.currencies).map(c => c.name).join(", ")
      : "N/A";

  document.querySelector(".languagesValue").textContent =
    country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";
      borderCountries.innerHTML =""
      const p = document.createElement("p")
      p.textContent = "Border Countries:"
      p.style.fontWeight = "bold"
      borderCountries.append(p)
      country.borders.forEach(element=>{
        const div = document.createElement("div")
        div.classList.add("countryBorder")
        div.innerHTML = element;
        borderCountries.append(div)
      })
         checkLightMode()
  // Show details page
  document.querySelector(".selectedCountry").classList.remove("hidden");
  document.querySelector(".countries").classList.add("hidden");
  document.querySelector(".actions").classList.add("hidden");
});

backBtn.addEventListener("click",function(){
  checkLightMode()
    actions.classList.remove("hidden")
    countries.classList.remove("hidden")
    document.querySelector(".selectedCountry").classList.add("hidden");
})


darkMode.addEventListener("click",function(){
  localStorage.setItem("Mode","Dark")
  checkLightMode()
})

lightMode.addEventListener("click",function(){
  localStorage.setItem("Mode","Light")
  checkLightMode()
})


// async function renderSpecificCountry(name){
//   try{
//      const response =await fetch(`https://restcountries.com/v3.1/name/${name}`)
//      if(!response.ok){
//       console.log(response.status)
//      }
//      const data = await response.json()
//      console.log(data)
//   }catch(error){
//     console.log(error)
//   }
// }