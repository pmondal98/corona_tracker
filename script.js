$(document).ready(function () {

   var state_id = []
   var states = []
   var confirmed = []
   var recovered = []
   var deaths = []

   var u_state_code = []
   var du_state_code = []
   var district = []

  var proxy_url = 'https://cors-anywhere.herokuapp.com/';
  var main_url = 'http://api.covid19india.org/data.json';

    fetch(proxy_url + main_url)
    .then(response => response.text())
    .then(rawData => {
        const data = JSON.parse(rawData); 
              var total_confirmed, total_active, total_recovered, total_deaths;

      total_confirmed = data.statewise[0].confirmed
      total_active = data.statewise[0].active
      total_recovered = data.statewise[0].recovered
      total_deaths = data.statewise[0].deaths

      $("#confirmed").append(total_confirmed)
      $("#active").append(total_active)
      $("#recovered").append(total_recovered)
      $("#deaths").append(total_deaths)

      $.each(data.statewise, function (id, obj) {
         state_id.push(id)
         states.push(obj.state)
         u_state_code.push(obj.statecode)
         confirmed.push(obj.confirmed)
         recovered.push(obj.recovered)
         deaths.push(obj.deaths)
      })

      state_id.shift()
      states.shift()
      u_state_code.shift()
      confirmed.shift()
      recovered.shift()
      deaths.shift()

      var myChart = document.getElementById('myChart').getContext('2d')

      var chart = new Chart(myChart, {
         type: 'line',
         data: {
            labels: states,
            datasets: [
               {
                  label: "Confirmed Cases",
                  data: confirmed,
                  backgroundColor: "#ffaa21",            
                  minBarLength: 100
               },
               {
                  label: "Recovered Cases",
                  data: recovered,
                  backgroundColor: "#2ecc71",               
                  minBarLength: 100
               },
               {
                  label: "Deceased",
                  data: deaths,
                  backgroundColor: "#e74c3c",         
                  minBarLength: 100
               }
            ]
         },
         options: {
            title: {
               display: true,
               fontSize: 20,
               fontColor: '#000',
               text: 'State Wise Total Count'
            }
         }
      })

      var date_wise_confirmed = []
      var date_wise_recovered = []
      var date_wise_deaths = []
      var date_wise_date = []

      $.each(data.cases_time_series, function (id, obj) {
         date_wise_date.push(obj.date)
         date_wise_confirmed.push(obj.dailyconfirmed)
         date_wise_recovered.push(obj.dailyrecovered)
         date_wise_deaths.push(obj.dailydeceased)
      })

      date_wise_date = date_wise_date.slice(337)
      date_wise_confirmed = date_wise_confirmed.slice(337)
      date_wise_recovered = date_wise_recovered.slice(337)
      date_wise_deaths = date_wise_deaths.slice(337)

      var myChart = document.getElementById('myChartdatewise').getContext('2d')

      var chart = new Chart(myChart, {
         type: 'line',
         data: {
            labels: date_wise_date,
            datasets: [
               {
                  label: "Confirmed Cases",
                  data: date_wise_confirmed,
                  backgroundColor: "#ffaa21",                   
                  minBarLength: 100,                                
               },
               {
                  label: "Recovered Cases",
                  data: date_wise_recovered,
                  backgroundColor: "#2ecc71",                   
                  minBarLength: 100,                                    
               },
               {
                  label: "Deceased",
                  data: date_wise_deaths,
                  backgroundColor: "#e74c3c",             
                  minBarLength: 100,                               
               },
            ]
         },
         options: {
            responsive: true,
            title: {
               display: true,
               fontSize: 20,
               fontColor: '#000',
               text: 'Date Wise Per Day Count'
            }         
         }
      })

      for (var c in state_id) {
         var newElement = document.querySelector(".state-data");

         if(data.statewise[state_id[c]].statecode != "UN")
         {      
         newElement.innerHTML += ` 

         <div class="col-xs-12 col-md-6 col-lg-3">
            <div class="card my-3"> 
            <div>                             
               <div class="card-block">
                  <h3 class="card-title">${data.statewise[state_id[c]].state} 
                    <sup> <i id="${data.statewise[state_id[c]].state}" class="fas fa-info-circle tooltip">
                        <span class="tooltiptext" style="width:800%">${data.statewise[state_id[c]].statenotes}</span>
                     </i> </sup>
                  </h3>                                                      
                  <p class="card-text">
                     <div class="row text-center" style="color:#ffaa21">                        
                        <h5 class="col-7">Confirmed</h5>
                        <h5 class="col-5" id="stateconfirmed">${data.statewise[state_id[c]].confirmed}</h5>                        
                     </div>
                     <div class="row text-center text-info">                        
                        <h5 class="col-7">Active</h5>
                        <h5 class="col-5" id="stateactive">${data.statewise[state_id[c]].active}</h5>                        
                     </div>
                     <div class="row text-center text-success">                        
                        <h5 class="col-7">Recovered</h5>
                        <h5 class="col-5" id="staterecovered">${data.statewise[state_id[c]].recovered}</h5>                        
                     </div>
                     <div class="row text-center text-danger">                        
                        <h5 class="col-7">Deceased</h5>
                        <h5 class="col-5" id="statedeaths">${data.statewise[state_id[c]].deaths}</h5>                        
                     </div>                                          
                  </p>
               </div>
               <div class="card-footer">
                  <small class="text-muted">Last updated at ${data.statewise[state_id[c]].lastupdatedtime}</small>
               </div>                                    
               </div>
            </div>
         </div>  `
         }

         if ((data.statewise[state_id[c]].statenotes)?.trim().length === 0) {
            document.getElementById(data.statewise[state_id[c]].state).remove()
         } 

         }              
    
   })
    });