var url = "http://127.0.0.1:5000/api/v1.0/us-state-data";
var drop_year_url = "http://127.0.0.1:5000/api/v1.0/distinct_year"

// data = d3.json(url);
// console.log(data);

function init() {

  // select the dropdown menu by selecting the id selDataset
  var dropdown = d3.select("#selDataset");

   // Use D3 fetch to read the JSON file
  d3.json(drop_year_url ).then((data)=> {
     // console.log(data)
      year = data

      for (i = 0; i < year.length; i++) {
          //console.log(state[i]);
          dropdown.append("option").text(year[i]).property("value");
        }

      buildPlot(year[1]);
  });   
}

init();

/////////////////////////////////////////////////////////////////////////////////////////////////
// function for change event handling
/////////////////////////////////////////////////////////////////////////////////////////////////

function optionChanged(yearSel) {

  buildPlot(yearSel);
}


function buildPlot(yearSel) {
  d3.json(url).then(function(data) {
    console.log(data)

    var filteredSample = data.filter(filteredSample => filteredSample.year === yearSel);

    console.log(filteredSample)

    var xValue = filteredSample.map(row => row.state);

    var yValue1 = filteredSample.map(row => row.high_school_grad_pcnt);
    var yValue2 = filteredSample.map(row => row.bachelor_degree_pcnt);
    var yValue3 = filteredSample.map(row => row.homeownership_rate);

    var trace1 = {
      x: xValue,
      y: yValue1,
      type: 'bar',
      text: yValue1.map(String),
      textposition: 'auto',
      hoverinfo: 'auto',
      name: "HS Grad %",
      opacity: 0.5,
      marker: {
        color: '#ffc72b',
        line: {
          color: '#000000',
          width: 1.5
        }
      }
    };

    var trace2 = {
      x: xValue,
      y: yValue2,
      type: 'bar',
      text: yValue2.map(String),
      textposition: 'auto',
      hoverinfo: 'auto',
      name: "Bachelor's Degree %",
      opacity: 0.5,
      marker: {
        color: '#00bf46',
        line: {
          color: '#000000',
          width: 1.5
        }
      }
    }

    var trace3 = {
      x: xValue,
      y: yValue3,
      type: 'line',
      text: yValue3.map(String),
      textposition: 'auto',
      hoverinfo: 'auto',
      name: "Homeowner %",
      // opacity: 0.5,
      line: {
        color: '#0c25c9',
        width: 1.5
      }
    }

    var data = [trace1, trace2, trace3];

    var layout = {
      title: "HS Diploma and Bachelor's Degree Rate by State",
      barmode: 'relative',
      paper_bgcolor: '#F5F5F5',
      plot_bgcolor: '#F5F5F5',
    };

    Plotly.newPlot('bar_ed', data, layout);


    //=======================================
    //Bubble chart
    
    var trace4 = {
      x: filteredSample.map(row => row.high_school_grad_pcnt),
      y: filteredSample.map(row => row.bachelor_degree_pcnt),
      text: filteredSample.map(row => row.state),
      mode: 'markers',
      marker: {
        size: filteredSample.map(row => row.homeownership_rate),
        color: filteredSample.map(row => row.per_captia_personal_income),
        colorscale: 'YlGnBu',
        reversescale: true,
        showscale: true,
      }
    };

    var bubbleData = [trace4];

    var layout = {
      title: "Educational attainment by state (bubble size is homeownership %, color is per capita personal income)",
      xaxis: {
        title: '% of population with a high school diploma',
      },
      yaxis: {
        title: "% of population with Bachelor's Degree"
      },
      showlegend: false,
      height: 600,
      // width: 800
      paper_bgcolor: '#F5F5F5',
      plot_bgcolor: '#F5F5F5',
    };

    Plotly.newPlot('bubble_ed', bubbleData, layout);

    //=======================================
    //Homeownership choropleth map
    var stateAbbrs = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

    var home_data = [{
      type: 'choropleth',
      locationmode: 'USA-states',
      locations: stateAbbrs,
      z: filteredSample.map(row => row.homeownership_rate),
      text: filteredSample.map(row => row.state),
      colorscale: 'YlGnBu',
      reversescale: true,
      // autocolorscale: true
    }];

    console.log(home_data);

    var home_layout = {
      title: 'Homeownership Rate by State',
      paper_bgcolor: '#F5F5F5',
      plot_bgcolor: '#F5F5F5',
      geo:{
            scope: 'usa',
            countrycolor: 'rgb(255, 255, 255)',
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            showlakes: true,
            lakecolor: 'rgb(255, 255, 255)',
            subunitcolor: 'rgb(255, 255, 255)',
            lonaxis: {},
            lataxis: {},
            bgcolor: '#F5F5F5',
            paper_bgcolor: '#F5F5F5',
            plot_bgcolor: '#F5F5F5',
          }
    };
      
    Plotly.newPlot("homeMap", home_data, home_layout, {showLink: false});

    //=======================================
    //Educational attainment choropleth map
    var edu_data = [{
      type: 'choropleth',
      locationmode: 'USA-states',
      locations: stateAbbrs,
      z: filteredSample.map(row => (row.bachelor_degree_pcnt+row.high_school_grad_pcnt)),
      text: filteredSample.map(row => row.state),
      colorscale: 'YlGnBu',
      reversescale: true,
      // autocolorscale: true
    }];

    console.log(edu_data);

    var edu_layout = {
      title: "Educational Attainment by State",
      paper_bgcolor: '#F5F5F5',
      plot_bgcolor: '#F5F5F5',
      geo:{
            scope: 'usa',
            countrycolor: 'rgb(255, 255, 255)',
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            showlakes: true,
            lakecolor: 'rgb(255, 255, 255)',
            subunitcolor: 'rgb(255, 255, 255)',
            lonaxis: {},
            lataxis: {},
            bgcolor: '#F5F5F5',
            paper_bgcolor: '#F5F5F5',
            plot_bgcolor: '#F5F5F5',
        }
    };
      
    Plotly.newPlot("eduMap", edu_data, edu_layout, {showLink: false});

    //=======================================
    //Median HH Income choropleth map
    var hhInc_data = [{
      type: 'choropleth',
      locationmode: 'USA-states',
      locations: stateAbbrs,
      z: filteredSample.map(row => row.median_hh_income),
      text: filteredSample.map(row => row.state),
      colorscale: 'YlGnBu',
      reversescale: true,
      // autocolorscale: true
    }];

    console.log(hhInc_data);

    var hhInc_layout = {
      title: "Median HH Income by State",
      paper_bgcolor: '#F5F5F5',
      plot_bgcolor: '#F5F5F5',
      geo:{
            scope: 'usa',
            countrycolor: 'rgb(255, 255, 255)',
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            showlakes: true,
            lakecolor: 'rgb(255, 255, 255)',
            subunitcolor: 'rgb(255, 255, 255)',
            lonaxis: {},
            lataxis: {},
            bgcolor: '#F5F5F5',
            paper_bgcolor: '#F5F5F5',
            plot_bgcolor: '#F5F5F5',
        }
    };
      
    Plotly.newPlot("hhIncMap", hhInc_data, hhInc_layout, {showLink: false});

  });
};

buildPlot();


//=======================================
//An attempt at an animated Bubble chart....
var allYrsUrl = "http://127.0.0.1:5000/api/v1.0/us-state-data";

Plotly.d3.json(allYrsUrl, function (err, data) {
  console.log(data)
  // Create a lookup table to sort and regroup the data,
  // first by year, then by state:
  var lookup = {};
  function getData(year, state) {
    var byYear, trace;
    if (!(byYear = lookup[year])) {;
      byYear = lookup[year] = {};
    }
	 // Set up an empty trace container for each year
    if (!(trace = byYear[state])) {
      trace = byYear[state] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []}
      };
    }
    return trace;
  }

  // Go through each document, get the right trace, and append the data:
  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.year, datum.state);
    trace.text.push(datum.state);
    trace.id.push(datum.state);
    trace.x.push(datum.high_school_grad_pcnt);
    trace.y.push(datum.bachelor_degree_pcnt);
    trace.marker.size.push(Math.pow(datum.homeownership_rate, 1.3));
    // trace.marker.size.push(datum.per_captia_personal_income/100);
  }

  // Get the group names:
  var years = Object.keys(lookup);
  // Get the list of states from the firstYear in the dataset
  var firstYear = lookup[years[0]];
  var states = Object.keys(firstYear);

  // Create the main traces, one for each state:
  var traces = [];
  for (i = 0; i < states.length; i++) {
    var data = firstYear[states[i]];

    traces.push({
      name: states[i],
      x: data.x.slice(),
      y: data.y.slice(),
      id: data.id.slice(),
      text: data.text.slice(),
      mode: 'markers',
      marker: {
        size: data.marker.size.slice(),
        sizemode: 'area',
        // sizeref: 200000
      }
    });
  }

  console.log(traces);

  // Create a frame for each year
  var frames = [];
  for (i = 0; i < years.length; i++) {
    frames.push({
      name: years[i],
      data: states.map(function (state) {
        return getData(years[i], state);
      })
    })
  }

  console.log(frames);

  // Create the steps for the slider, one for each year, and set up the transitions
  var sliderSteps = [];
  for (i = 0; i < years.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: years[i],
      args: [[years[i]], {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      }]
    });
  }

  var layout = {
    title: "How education rates have improved over time",
    xaxis: {
      title: '% of population with a high school diploma',
      range: [75, 95]
    },
    yaxis: {
      title: "% of population with Bachelor's Degree",
      range: [10, 62]
      // type: 'log'
    },
    height: 600,
    paper_bgcolor: '#F5F5F5',
    plot_bgcolor: '#F5F5F5',
    hovermode: 'closest',
	 //Set up the play and pause buttons for the animation
    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 10},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 300},
          frame: {duration: 500, redraw: false}
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: {duration: 0},
          frame: {duration: 0, redraw: false}
        }],
        label: 'Pause'
      }]
    }],
	 // Put the slider in place next to the buttons
    sliders: [{
      pad: {l: 130, t: 55},
      currentvalue: {
        visible: true,
        prefix: 'Year:',
        xanchor: 'right',
        font: {size: 20, color: '#666'}
      },
      steps: sliderSteps
    }]
  };

  // Create the plot:
  Plotly.newPlot('bubble_anim', {
    data: traces,
    layout: layout,
    frames: frames,
  });
});

