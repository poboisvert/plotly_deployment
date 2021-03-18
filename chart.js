function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);

    // Select first array to display
    var result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    let { samples } = data;
    //console.log(samples);

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let dataEachId = samples.filter((res) => res.id == sample);
    //console.log(dataEachId);

    //  5. Create a variable that holds the first sample in the array.
    if (dataEachId.length != 1) {
      throw new Error("Whoops! Brother take a step back");
      //console.log(dataEachId);
    }

    // let firstSample = dataEachId[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let { otu_ids, otu_labels, sample_values } = dataEachId[0];

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order
    //  so the otu_ids with the most bacteria are last.

    var yticks = otu_ids
      .slice(0, 10)
      .map((id) => "OTU " + id) // space " "
      .reverse(); // 0-11

    // console.log(yticks);

    // 8. Create the trace for the bar chart.
    //
    var data = [
      {
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        hovertemplate: "<br><b>Qtd</b>: %{x}<br>" + "<extra></extra>", // Clean the template  "<extra></extra>"
      },
    ];
    //
    // 9. Create the layout for the bar chart.
    var layoutHTML = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Quantity" },
      yaxis: {
        tickmode: "array",
        tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        ticktext: yticks,
      },
    };
    //
    // 10. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bar", data, layoutHTML, { responsive: true });
  });
}
