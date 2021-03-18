// Init
// Plotly.newPlot("plotArea", [{x: [1, 2, 3], y: [10, 20, 30]}]);

// Bar chart
/* var trace = [
  {
    x: ["burrito", "pizza", "chicken"],
    y: [10, 18, 5],
    type: "bar",
  },
];

Plotly.newPlot("plotArea", trace); */

/* // Interference
var trace = {
  // Date Prep
  x: ["burrito", "pizza", "chicken"],
  y: [10, 18, 5],
  type: "bar",
};

var layout = {
  title: "Luncheon Survey", // Title
  xaxis: { title: "Food Option" }, // Axis
  yaxis: { title: "Number of Respondents" }, // Axis
};

Plotly.newPlot("plotArea", [trace], layout); // Trace */

// 12.1.3
// Srt X, Y
/* var trace = {
  x: [
    "nonalcoholic beer",
    "nonalcoholic wine",
    "nonalcoholic martini",
    "nonalcoholic margarita",
    "ice tea",
    "nonalcoholic rum & coke",
    "nonalcoholic mai tai",
    "nonalcoholic gin & tonic",
  ],
  y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: "bar", // Type
};
// Set Data
var data = [trace];

// Text Layout
var layout = {
  title: "'Bar' Chart",
  xaxis: { title: "Drinks" },
  yaxis: { title: "% of Drinks Ordered" },
};

// Generate
Plotly.newPlot("plotArea", data, layout);
 */

// Pie chart -
// NO X and Y values
var trace = {
  labels: [
    "nonalcoholic beer",
    "nonalcoholic wine",
    "nonalcoholic martini",
    "nonalcoholic margarita",
    "ice tea",
    "nonalcoholic rum & coke",
    "nonalcoholic mai tai",
    "nonalcoholic gin & tonic",
  ],
  values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: "pie",
};
var data = [trace];
var layout = {
  title: "'Pie' Chart",
};
Plotly.newPlot("plotArea", data, layout);
