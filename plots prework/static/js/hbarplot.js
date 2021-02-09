// Get the data into variables for the plot

// Set up the trace(s)
var trace1 =  {
    x: ,
    y: ,
    text: ,
    type: 'bar',
    orientation: 'h',
};

var hbarData = [trace1];

var hbarLayout = {
    title: "Top 10 OTUs Present",
}

//Display the h-bar plot
Plotly.newPlot("bar", hbarData, hbarLayout);