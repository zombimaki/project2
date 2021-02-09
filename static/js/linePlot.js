var data_url = "http://127.0.0.1:5000/api/v1.0/us-state-data";
var drop_state_url = "http://127.0.0.1:5000/api/v1.0/distinct_state"

/////////////////////////////////////////////////////////////////////////////////////////////////
// function to Initializes the page
/////////////////////////////////////////////////////////////////////////////////////////////////

function init() {

    // select the dropdown menu by selecting the id selDataset
    var dropdown = d3.select("#selDataset");

     // Use D3 fetch to read the JSON file
    d3.json(drop_state_url ).then((data)=> {
       // console.log(data)
        state = data

        for (i = 0; i < state.length; i++) {
            //console.log(state[i]);
            dropdown.append("option").text(state[i]).property("value");
          }
        
        // generate box plots using the first state in the dataset
        plotBarLine(state[0]);
        plotBarLine2(state[0]);
        plotBarLine3(state[0]);
    });   
}
  
init();

/////////////////////////////////////////////////////////////////////////////////////////////////
// function for change event handling
/////////////////////////////////////////////////////////////////////////////////////////////////

function optionChanged(stateName) {

    plotBarLine(stateName);
    plotBarLine2(stateName);
    plotBarLine3(stateName);
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// bar line chart - State GDP vs. Home Ownership Percentage
/////////////////////////////////////////////////////////////////////////////////////////////////

function plotBarLine(stateName) {
d3.json(data_url).then(function(importedData) {

    var data = importedData.filter(filtersample => filtersample.state === stateName);

    var years = [];
    var stateList = [];
    var hsGradPcnts = [];
    var collGradPcnts = [];
    var homeOwnerPcnts = [];
    var gdplist = [];
    for (var i = 0; i < data.length; i++) {
      var year = data[i].year
      years.push(year);
      var state = data[i].state
      stateList.push(state)
      var hsGrads = data[i].high_school_grad_pcnt
      hsGradPcnts.push(hsGrads);
      var collGrads = data[i].bachelor_degree_pcnt
      collGradPcnts.push(collGrads);
      var homeRate = data[i].homeownership_rate
      homeOwnerPcnts.push(homeRate);
      var gpd = data[i].ttl_gdp_by_state
      gdplist.push(gpd);

    };


    // GDP & Ownership Rates over time - Line Graph
    var trace1 = {
        x: years,
        y: gdplist,
        name: 'State GDP $',
        type: 'bar',
        marker: {color: "#95d8EB"}
    };

    var trace2 = {
        x: years,
        y: homeOwnerPcnts,
        name: 'Home Ownership %',
        yaxis: 'y2',
        mode: 'lines+markers',
        type: 'scatter',
        marker: {color: '#f39800'}

    };

    var layout = {
        paper_bgcolor: '#F5F5F5',
        plot_bgcolor: '#F5F5F5',
        title: 'State GDP vs. Home Ownership Percentage',
        yaxis: {title: 'State GDP ($ Millions)'},
        yaxis2: {
          title: 'Home Ownership (%)',
          overlaying: 'y',
          side: 'right',
          showgrid: false,
          showline: true
        }
      };

    var array_scat = [trace1, trace2]
    Plotly.newPlot("chart_one", array_scat, layout);
})
}



/////////////////////////////////////////////////////////////////////////////////////////////////
// bar line chart - Median Household Income vs. Home Ownership Percentage
/////////////////////////////////////////////////////////////////////////////////////////////////

function plotBarLine2(stateName) {
d3.json(data_url).then(function(importedData) {


    var data = importedData.filter(filtersample => filtersample.state === stateName);

    var years = [];
    var stateList = [];
    var hsGradPcnts = [];
    var collGradPcnts = [];
    var homeOwnerPcnts = [];
    var gdplist = [];
    var med_income_list = [];
    for (var i = 0; i < data.length; i++) {
      var year = data[i].year
      years.push(year);
      var state = data[i].state
      stateList.push(state)
      var hsGrads = data[i].high_school_grad_pcnt
      hsGradPcnts.push(hsGrads);
      var collGrads = data[i].bachelor_degree_pcnt
      collGradPcnts.push(collGrads);
      var homeRate = data[i].homeownership_rate
      homeOwnerPcnts.push(homeRate);
      var gpd = data[i].ttl_gdp_by_state
      gdplist.push(gpd);
      var med_inc = data[i].median_hh_income
      med_income_list.push(med_inc);

    };


    // GDP & Ownership Rates over time - Line Graph
    var trace1 = {
        x: years,
        y: med_income_list,
        name: 'State Median Household Income $',
        type: 'bar',
        marker: {color: "#95d8EB"}
    };

    var trace2 = {
        x: years,
        y: homeOwnerPcnts,
        name: 'Home Ownership %',
        yaxis: 'y2',
        mode: 'lines+markers',
        type: 'scatter',
        marker: {color: '#f39800'}

    };

    var layout = {
        paper_bgcolor: '#F5F5F5',
        plot_bgcolor: '#F5F5F5',
        title: 'Median Household Income vs. Home Ownership Percentage',
        yaxis: {title: 'Median Household Income ($)'},
        yaxis2: {
          title: 'Home Ownership (%)',
          overlaying: 'y',
          side: 'right',
          showgrid: false,
          showline: true
        }
      };

    var array_scat = [trace1, trace2]
    Plotly.newPlot("chart_two", array_scat, layout);
})
}


/////////////////////////////////////////////////////////////////////////////////////////////////
// bar line chart - Per Capitia Income vs. Home Ownership Percentage
/////////////////////////////////////////////////////////////////////////////////////////////////

function plotBarLine3(stateName) {
    d3.json(data_url).then(function(importedData) {
    
    
        var data = importedData.filter(filtersample => filtersample.state === stateName);
    
        var years = [];
        var stateList = [];
        var percapinclist = [];
        var collGradPcnts = [];
        var homeOwnerPcnts = [];
        var gdplist = [];
        for (var i = 0; i < data.length; i++) {
          var year = data[i].year
          years.push(year);
          var state = data[i].state
          stateList.push(state)
          var percap = data[i].per_captia_personal_income
          percapinclist.push(percap);
          var collGrads = data[i].bachelor_degree_pcnt
          collGradPcnts.push(collGrads);
          var homeRate = data[i].homeownership_rate
          homeOwnerPcnts.push(homeRate);
          var gpd = data[i].ttl_gdp_by_state
          gdplist.push(gpd);
    
        };
    
    
        // GDP & Ownership Rates over time - Line Graph
        var trace1 = {
            x: years,
            y: percapinclist,
            name: 'Per Capitia Income ($)',
            type: 'bar',
            marker: {color:'#95d8EB'}
            
        };
    
        var trace2 = {
            x: years,
            y: homeOwnerPcnts,
            name: 'Home Ownership %',
            yaxis: 'y2',
            mode: 'lines+markers',
            type: 'scatter',
            marker: {color:'#f39800'}
    
        };
    
        var layout = {
            paper_bgcolor: '#F5F5F5',
            plot_bgcolor: '#F5F5F5',
            title: 'Per Capitia Income vs. Home Ownership Percentage',
            yaxis: {title: 'Home Ownership (%)'},
            yaxis2: {
              title: 'Home Ownership (%)',
              overlaying: 'y',
              side: 'right',
              showgrid: false,
              showline: true
            }
          };
    
        var array_scat = [trace1, trace2]
        Plotly.newPlot("chart_three", array_scat, layout);
    })
    }