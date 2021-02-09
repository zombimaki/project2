var url = "./api/v1.0/year/2019"

// function markerSize ()

// var hsGrads = [];
// var collGrads = [];

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
}

d3.json(url).then(function(data) {
    var hsGrads = unpack(data.high_school_grad_pcnt, 0);
    var collGrads = unpack(data.bachelor_degree_pcnt, 0);

    console.log(hsGrads);
    console.log(collGrads);

})