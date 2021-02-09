var data_url = "http://127.0.0.1:5000/api/v1.0/us-state-data";

/////////////////////////////////////////////////////////////////////////////////////////////////
// Median HH Income/Personal Income boxplot chart
/////////////////////////////////////////////////////////////////////////////////////////////////

d3.json(data_url).then(function(importedData) {

    // set variable x to the year values returned in the api call
    var x = importedData.map(row => row.year);

    // create a trace for median hh income by year boxplot
    var trace1 = {
    y: importedData.map(row => row.median_hh_income),
    x: x,
    name: 'Median HH Income',
    marker: {color: '#f39800'},
    type: 'box'
    };

    // create a trace for captia personal income by year boxplot
    var trace2 = {
        y: importedData.map(row => row.per_captia_personal_income),
        x: x,
        name: 'Per Capita Personal Income',
        marker: {
            color: '#95d8EB',
            outliercolor: '#F5F5F5'
        },
        type: 'box'
        };
    
    // create a data object including all traces we will pass to newplot()
    var data = [trace1,trace2];
    
    // define the plot layout
    var layout = {
    yaxis: {
        title: 'Dollars',
        zeroline: false,
        showline: true
    },
    xaxis : {
        showline: true, 
        color: "grey"
    },
    boxmode: 'group',
    paper_bgcolor: '#F5F5F5',
    plot_bgcolor: '#F5F5F5'
    };

    // generate the box plot
    Plotly.newPlot('boxDollars',data, layout);

})

/////////////////////////////////////////////////////////////////////////////////////////////////
// Total GDP boxplot chart
/////////////////////////////////////////////////////////////////////////////////////////////////

d3.json(data_url).then(function(importedData) {

    // set variable x to the year values returned in the api call
    var x = importedData.map(row => row.year);
    
    // create a trace for ttl gdp by year boxplot
    var trace1 = {
        y: importedData.map(row => row.ttl_gdp_by_state),
        x: x,
        name: 'Total GDP',
        marker: {
            color: '#f39800',
            outliercolor: '#F5F5F5'
        },
        type: 'box'
        
    };
    
    // create a data object including all traces we will pass to newplot()
    var data = [trace1];

    // define the plot layout
    var layout = {
    yaxis: {
        title: 'Total GDP (Millions)',
        zeroline: false,
        showline: true
    },
    xaxis : {
        showline: true, 
        color: "grey"
    },
    boxmode: 'group',
    paper_bgcolor: '#F5F5F5',
    plot_bgcolor: '#F5F5F5'
    };

    // generate the box plot
    Plotly.newPlot('boxGDP',data, layout);

})

/////////////////////////////////////////////////////////////////////////////////////////////////
// Homeownership Rate boxplot chart
/////////////////////////////////////////////////////////////////////////////////////////////////

d3.json(data_url).then(function(importedData) {

    // set variable x to the year values returned in the api call
    var x = importedData.map(row => row.year);

    // create a trace for homeownership rate by year boxplot
    var trace1 = {
        y: importedData.map(row => row.homeownership_rate),
        x: x,
        name: 'Homeownership Rate',
        marker: {
            color: '#f39800',
            outliercolor: '#F5F5F5'
        },
        type: 'box'
        
    };
    
    // create a data object including all traces we will pass to newplot()
    var data = [trace1];

    // define the plot layout
    var layout = {
    yaxis: {
        title: 'Homeownership Rate',
        zeroline: false,
        showline: true,
        color: "grey"
    },
    xaxis : {
        showline: true, 
        color: "grey"
    },
    boxmode: 'group',
    paper_bgcolor: '#F5F5F5',
    plot_bgcolor: '#F5F5F5'
    };

    // generate the box plot
    Plotly.newPlot('boxHome',data, layout);

})