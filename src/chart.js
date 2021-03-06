function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("src/samples.json").then((data) => {
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

function reset(newSample) {
  document.getElementById("selDataset").value = 940;
  buildMetadata(newSample);
  buildCharts(newSample);
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel
function buildMetadata(sample) {
  d3.json("src/samples.json").then((data) => {
    var metadata = data.metadata;
    console.log(data);
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
  d3.json("src/samples.json").then((data) => {
    //console.log(data);
    // 3. Create a variable that holds the samples array.
    let { samples, metadata } = data;
    //    console.log(metadata);

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
    //
    //
    // Bar Chart
    //
    //

    /*     var yticks = otu_ids
      .slice(0, 10)
      .sort((a, b) => a.otu_ids - b.otu_ids)
      .map((id) => "OTU " + id)
      .reverse(); */
    // console.log(yticks); // 12.2

    // sample_values is already in DESC order but not the labels
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
      showlegend: false,
    };
    //
    // 10. Use Plotly to plot the data with the layout.
    // Plotly.newPlot('myDiv', data, layout, config );
    Plotly.newPlot("bar", data, layoutHTML, { responsive: true });

    // Use Plotly to plot the data with the layout.
    //
    //
    // Bubble Chart
    //
    //
    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      {
        x: otu_ids,
        // From Bootcamp
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          // Bubble settings
          size: sample_values,
          color: otu_ids,
          colorscale: "contour",
          // https://plotly.com/javascript/colorscales/#electric-colorscale
        },
      },
    ];
    //console.log(bubbleData);

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID", automargin: true },
      yaxis: { automargin: true },
      showlegend: false,
      hovermode: "closest",
    };

    // 3. Use Plotly to plot the data with the layout.
    // Plotly.newPlot('myDiv', data, layout, config );
    Plotly.newPlot("bubble", bubbleData, bubbleLayout, { responsive: true });
    //
    //
    // Gauge Chart
    //
    //
    // D2: 3. Use Plotly to plot the data with the layout.

    // 1. create a variable that filters the metadata array for an object in the array whose id property matche 12.4

    // Select first array to display
    var metadataId = metadata.filter((data) => data.id == sample);
    //console.log(metadataId[0].wfreq);

    // 5. The washing frequency.
    var [metaObj] = metadataId;
    //console.log(metaObj);
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: metaObj.wfreq,
        title: {
          text: "<b>Belly Button Washing Frequency</b><br>Scrubs per week",
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {
            range: [null, 10],
            tickvals: [0, 2, 4, 6, 8, 10],
            ticktext: [0, 2, 4, 6, 8, 10],
            // https://plotly.com/python-api-reference/generated/plotly.graph_objects.indicator.gauge.html
          },
          bar: { color: "black" },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lime" },
            { range: [8, 10], color: "green" },
          ],
        },
      },
    ];

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      autosize: true,
      margin: { t: 10, b: 10 },
      annotations: [
        {
          xanchor: "center",
          yanchor: "center",
          showarrow: false,
          text: "",
          x: 0,
          y: 0,
        },
      ],
    };

    // 6. Use Plotly to plot the gauge data and layout.
    // Plotly.newPlot('myDiv', data, layout, config );
    Plotly.newPlot("gauge", gaugeData, gaugeLayout, { responsive: true });
  });
}
