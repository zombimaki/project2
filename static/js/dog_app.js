var data_url = "http://127.0.0.1:5000/api/v1.0/us-state-data";
var drop_year_url = "http://127.0.0.1:5000/api/v1.0/distinct_year"

/////////////////////////////////////////////////////////////////////////////////////////////////
// function to Initializes the page
/////////////////////////////////////////////////////////////////////////////////////////////////

function init() {

  // select the dropdown menu by selecting the id selDataset
  var dropdown = d3.select("#selDataset");

   // Use D3 fetch to read the JSON file
  d3.json(drop_year_url).then((data)=> {
     // console.log(data)
      year = data

      for (i = 0; i < year.length; i++) {
          dropdown.append("option").text(year[i]).property("value");
        }

      plotPairs(year[0]);
  });   
}

init();

/////////////////////////////////////////////////////////////////////////////////////////////////
// function for change event handling
/////////////////////////////////////////////////////////////////////////////////////////////////

function yearChanged(year) {

  plotPairs(year);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// pair plots
/////////////////////////////////////////////////////////////////////////////////////////////////

function plotPairs(year) {
  d3.json(data_url).then(function(data) {

    var d = data.filter(filtersample => filtersample.year === year);
    
    var bs_degrees =[];
    var hs_degrees = [];
    var ownership_rts = [];
    var med_hh_incomes = [];
    var personal_incomes = [];
    var gdp_states = [];
    var state_list = [];
    
    for (var i = 0; i < d.length; i++) {
      var bs_degree = d[i].bachelor_degree_pcnt;
      bs_degrees.push(bs_degree);
      var hs_degree = d[i].high_school_grad_pcnt;
      hs_degrees.push(hs_degree);
      var ownership_rt = d[i].homeownership_rate;
      ownership_rts.push(ownership_rt);
      var med_hh_income = d[i].median_hh_income;
      med_hh_incomes.push(med_hh_income);
      var personal_income = d[i].per_captia_personal_income;
      personal_incomes.push(personal_income);
      var gdp_state = d[i].ttl_gdp_by_state;
      gdp_states.push(gdp_state);
      var state = d[i].state;
      state_list.push(state);
      // console.log(state)
    };
    console.log(med_hh_incomes)

    var axis =() => ({
      showline: true,
      zeroline: false,
      gridcolor:'#ffff',
      ticklen:6
    });

    var data = [{
      type: 'splom',
      dimensions: [
        {label: 'Bachelor<br>Degree', values: bs_degrees},
        {label: 'High School<br>Degree', values: hs_degrees},
        {label: '<b>Ownership<br> Rate', values: ownership_rts},
        {label: 'Household<br>Income', values: med_hh_incomes},
        {label: 'Personal<br>Income', values: personal_incomes},
        {label: 'State GDP', values: gdp_states}
      ],
      text: state_list,
      marker: {
        color: "#4db4d7",
        size: 7,
        line: {
          color: 'white',
          width: 0.5
        }
      }
    }];
    

    var layout = {
      title: '<b>Scatterplot Matrix for Home Ownership Study',
      height: 850,
      width: 1000,
      autosize: false,
      hovermode: 'closest',
      dragmode: 'select',
      plot_bgcolor: 'rgba(240,240,240, 0.95)',
      xaxis:axis(),
      yaxis:axis(),
      xaxis2:axis(),
      xaxis3:axis(),
      xaxis4:axis(),
      xaxis5:axis(),
      xaxis6:axis(),
      yaxis2:axis(),
      yaxis3:axis(),
      yaxis4:axis(),
      yaxis5:axis(),
      yaxis6:axis()
    }

    Plotly.react('pairplot', data, layout)
  })
}
