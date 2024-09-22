$(document).ready(function () {
  var state_id = [];
  var state_obj = {
    AN: "Andaman and Nicobar Islands",
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CH: "Chandigarh",
    CT: "Chhattisgarh",
    DN: "Dadra and Nagar Haveli",
    DD: "Daman and Diu",
    DL: "Delhi",
    GA: "Goa",
    GJ: "Gujarat",
    HR: "Haryana",
    HP: "Himachal Pradesh",
    JK: "Jammu and Kashmir",
    JH: "Jharkhand",
    KA: "Karnataka",
    KL: "Kerala",
    LA: "Ladakh",
    LD: "Lakshadweep",
    MP: "Madhya Pradesh",
    MH: "Maharashtra",
    MN: "Manipur",
    ML: "Meghalaya",
    MZ: "Mizoram",
    NL: "Nagaland",
    OR: "Odisha",
    PY: "Puducherry",
    PB: "Punjab",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TN: "Tamil Nadu",
    TG: "Telangana",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UT: "Uttarakhand",
    WB: "West Bengal",
  };
  var confirmed = [];
  var recovered = [];
  var deaths = [];
  var states = [];

  var dates = [];
  var confirmed_date = [];
  var active_date = [];
  var recovered_date = [];
  var deaths_date = [];

  var data_url = "https://data.incovid19.org/v4/min/data.min.json";
  var timeSeries_url = "https://data.incovid19.org/v4/min/timeseries.min.json";

  function date_formatting(key) {
    var date = new Date(key);
    var month = date.toLocaleString("default", {
      month: "short",
    });
    var date_f = date.getDate() + " " + month + ", " + date.getFullYear();
    return date_f;
  }

  fetch(data_url)
    .then((response) => response.json())
    .then((data) => {
      var total_confirmed = 0,
        total_recovered = 0,
        total_deaths = 0,
        total_tested = 0,
        total_vaccinatedDose1 = 0,
        total_vaccinatedDose2 = 0;
      total_confirmed = Number(data.TT.total.confirmed);
      total_recovered = Number(data.TT.total.recovered);
      total_deaths = Number(data.TT.total.deceased);
      total_tested = Number(data.TT.total.tested);
      total_vaccinatedDose1 = Number(data.TT.total.vaccinated1);
      total_vaccinatedDose2 = Number(data.TT.total.vaccinated2);

      function nFormatter(num, digits) {
        const lookup = [
          {
            value: 1,
            symbol: "",
          },
          {
            value: 1e3,
            symbol: "k",
          },
          {
            value: 1e6,
            symbol: "M",
          },
          {
            value: 1e12,
            symbol: "T",
          },
          {
            value: 1e15,
            symbol: "P",
          },
          {
            value: 1e18,
            symbol: "E",
          },
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup
          .slice()
          .reverse()
          .find(function (item) {
            return num >= item.value;
          });
        return item
          ? (num / item.value).toFixed(2).replace(rx, "$1") + item.symbol
          : "0";
      }

      $("#confirmed").append(
        nFormatter(total_confirmed, total_confirmed.toString().length)
      );
      $("#recovered").append(
        nFormatter(total_recovered, total_recovered.toString().length)
      );
      $("#deaths").append(
        nFormatter(total_deaths, total_deaths.toString().length)
      );
      $("#tested").append(
        nFormatter(total_tested, total_tested.toString().length)
      );
      $("#vaccinated1").append(
        nFormatter(
          total_vaccinatedDose1,
          total_vaccinatedDose1.toString().length
        )
      );
      $("#vaccinated2").append(
        nFormatter(
          total_vaccinatedDose2,
          total_vaccinatedDose2.toString().length
        )
      );

      for (var key of Object.keys(data)) {
        if (key != "TT") {
          state_id.push(key);

          states.push(state_obj[key]);
          confirmed.push(data[key].total.confirmed);
          recovered.push(data[key].total.recovered);
          deaths.push(data[key].total.deceased);
          //       $("#active").append(total_active)
          //       $("#recovered").append(total_recovered)
          //       $("#deaths").append(total_deaths)
        }
      }
      for (var c in states) {
        var newElement = document.querySelector(".state-data");

        newElement.innerHTML += ` 
  
    <div class="col-xs-12 col-md-6 col-lg-3">
       <div class="card my-3"> 
       <div>                             
          <div class="card-block">
             <h3 class="card-title">${
               states[c]
             }</h3>                                                      
             <p class="card-text">
                <div class="row text-center" style="color:#ffaa21">                        
                   <h5 class="col-7">Confirmed</h5>
                   <h5 class="col-5" id="stateconfirmed">${nFormatter(
                     Number(data[key].total.confirmed),
                     Number(data[key].total.confirmed).toString().length
                   )}</h5>                        
                </div>
                <div class="row text-center text-success">                        
                   <h5 class="col-7">Recovered</h5>
                   <h5 class="col-5" id="staterecovered">${nFormatter(
                     Number(data[key].total.recovered),
                     Number(data[key].total.recovered).toString().length
                   )}</h5>                        
                </div>
                <div class="row text-center text-danger">                        
                   <h5 class="col-7">Deceased</h5>
                   <h5 class="col-5" id="statedeaths">${nFormatter(
                     Number(data[key].total.deceased),
                     Number(data[key].total.deceased).toString().length
                   )}</h5>                        
                </div>   
                <div class="row text-center" style="color: yellowgreen;">                        
                   <h5 class="col-7">Tests</h5>
                   <h5 class="col-5" id="statetests">${nFormatter(
                     Number(data[key].total.tested),
                     Number(data[key].total.tested).toString().length
                   )}</h5>                        
                </div>
                <div class="row text-center text-info">                        
                   <h5 class="col-7">Dose 1</h5>
                   <h5 class="col-5" id="dose1">${nFormatter(
                     Number(data[key].total.vaccinated1),
                     Number(data[key].total.vaccinated1).toString().length
                   )}</h5>                        
                </div>
                <div class="row text-center text-info">                        
                   <h5 class="col-7">Dose 2</h5>
                   <h5 class="col-5" id="dose2">${nFormatter(
                     Number(data[key].total.vaccinated2),
                     Number(data[key].total.vaccinated2).toString().length
                   )}</h5>                        
                </div>                                     
             </p>
          </div>
          <div class="card-footer">
             <small class="text-muted">Last updated at ${date_formatting(
               data[key].meta.last_updated
             )}</small>
          </div>                                    
          </div>
       </div>
    </div>  `;
      }

      var myChart = document
        .getElementById("myChartstatewise")
        .getContext("2d");

      var chart = new Chart(myChart, {
        type: "line",
        data: {
          labels: states,
          datasets: [
            {
              label: "Confirmed Cases",
              data: confirmed,
              backgroundColor: "#ffaa21",
              minBarLength: 100,
            },
            {
              label: "Recovered Cases",
              data: recovered,
              backgroundColor: "#2ecc71",
              minBarLength: 100,
            },
            {
              label: "Deceased",
              data: deaths,
              backgroundColor: "#e74c3c",
              minBarLength: 100,
            },
          ],
        },
        options: {
          title: {
            display: true,
            fontSize: 20,
            fontColor: "#000",
            text: "State Wise Total Count",
          },
        },
      });
    });

  fetch(timeSeries_url)
    .then((response) => response.json())
    .then((data) => {
      for (var key of Object.keys(data.TT.dates)) {
        // console.log(Number(data.TT.dates[key].total.confirmed)-(Number(data.TT.dates[key].total.recovered)+Number(data.TT.dates[key].total.deceased)))

        dates.push(date_formatting(key));
        confirmed_date.push(data.TT.dates[key].total.confirmed);
        // active_date.push(Number(data.TT.dates[key].total.confirmed)-(Number(data.TT.dates[key].total.recovered)+Number(data.TT.dates[key].total.deceased)))
        recovered_date.push(data.TT.dates[key].total.recovered);
        deaths_date.push(data.TT.dates[key].total.deceased);
      }

      dates = dates.slice(309);
      confirmed_date = confirmed_date.slice(309);
      recovered_date = recovered_date.slice(309);
      deaths_date = deaths_date.slice(309);

      var myChart = document.getElementById("myChartdatewise").getContext("2d");

      var chart = new Chart(myChart, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Confirmed Cases",
              data: confirmed_date,
              backgroundColor: "#ffaa21",
              minBarLength: 100,
            },
            {
              label: "Recovered Cases",
              data: recovered_date,
              backgroundColor: "#2ecc71",
              minBarLength: 100,
            },
            {
              label: "Deceased",
              data: deaths_date,
              backgroundColor: "#e74c3c",
              minBarLength: 100,
            },
          ],
        },
        options: {
          responsive: true,
          title: {
            display: true,
            fontSize: 20,
            fontColor: "#000",
            text: "Date Wise Per Day Count",
          },
        },
      });
    });
});
