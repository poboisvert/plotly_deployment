function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(`The data is ${data}`);
    // console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });
  });
}

init();

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    // Store call back
    var { metadata } = data;
    // Filter by id
    var resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
    // Return array
    var result = resultArray[0];
    // Display selected ID array
    console.log(result);
    // Pan to append
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");

    PANEL.append("h6").text(`ID: ${result.id}`);
    PANEL.append("h6").text(`ETHNICITY: ${result.ethnicity}`);
    PANEL.append("h6").text(`GENDER: ${result.gender}`);
    PANEL.append("h6").text(`LOCATION: ${result.location}`);
    PANEL.append("h6").text(`BBTYPE: ${result.bbtype}`);
    PANEL.append("h6").text(`WFREQ: ${result.wfreq}`);
  });
}

function optionChanged(newSample) {
  // console.log("changedOpt");
  buildMetadata(newSample);
}
