let search=document.getElementById("search")
let date=document.getElementById("date")
let city=document.getElementById("city")
let realfeel=document.getElementById("realfeel")
let humidity=document.getElementById("humidity")
let wind=document.getElementById("wind")
let pressure=document.getElementById("pressure")
let temp1=document.getElementById("temp1")
let min=document.getElementById("min")
let max=document.getElementById("max")
let demo=document.getElementById("demo")
let icon=document.getElementById("icon")
let c = document.getElementById("c")
let f = document.getElementById("f")
 let suggestions= document.getElementById("suggestions");
let units = "metric";   
  let currcity="shimla";
  getdata();
 

search.addEventListener("input", function () {

  if (search.value.length < 2) {
    suggestions.innerHTML = "";
    return;
  }

  axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${search.value}&limit=5&appid=0e33668eaac0aeb5dde669706f899685`)
    .then(response => {
console.log(response.data)
      suggestions.innerHTML = "";

      response.data.forEach(place => {

        let li = document.createElement("li");
        li.innerHTML=`${place.name}, ${place.state? ',' + place.state :'' }, ${place.country}`;

        li.addEventListener("click", function () {
           currcity = `${place.name}${place.state ? ',' + place.state : ''},${place.country}`;
  
           search.value = `${place.name}${place.state ? ', ' + place.state : ''}`;
          suggestions.innerHTML = "";
          getdata();
        });
        suggestions.appendChild(li);
      });
    });
});

function getdata(){
     if(search.value)
     currcity=search.value
  
axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${currcity}&appid=0e33668eaac0aeb5dde669706f899685&units=${units}`)
.then(result=>{

//      console.log(result.data);
// console.log(result.data.timezone);
     city.innerHTML=`${result.data.name},${result.data.sys.country}`
     realfeel.innerHTML=`${result.data.main.feels_like}&deg`;
     wind.innerHTML=`${result.data.wind.speed} mph`;
     humidity.innerHTML=`${result.data.main.humidity}%`;
     pressure.innerHTML=`${result.data.main.pressure} Pa`;
     min.innerHTML=`${result.data.main.temp_min}&deg`;
     max.innerHTML=`${result.data.main.temp_max}&deg`;
     temp1.innerHTML=`${result.data.main.temp}&deg`;
     demo.innerHTML=result.data.weather[0].main
 icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${result.data.weather[0].icon}@4x.png" />`

let cityDate = new Date((result.data.dt+result.data.timezone) * 1000);
let formattedDate = cityDate.toLocaleDateString("en-GB", {
   weekday: "short", 
   day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute:"2-digit",
  timeZone: "UTC"
});
date.innerHTML = formattedDate;
})
}

search.addEventListener("keydown",(data)=>{
     if((data).key=="Enter"){
          getdata();
          search.value="";
     }
})
  c.addEventListener("click",function(){
     units="metric";
     getdata();
  })
  f.addEventListener("click",function(){
     units="imperial";
     getdata();
  })


