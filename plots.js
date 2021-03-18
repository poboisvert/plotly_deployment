// Init
// Plotly.newPlot("plotArea", [{x: [1, 2, 3], y: [10, 20, 30]}]);

var trace = [
  {
    x: ["burrito", "pizza", "chicken"],
    y: [10, 18, 5],
    type: "bar",
  },
];

Plotly.newPlot("plotArea", trace);
