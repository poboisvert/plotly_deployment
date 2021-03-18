console.log(cityGrowths);

// Sort all datas
var sortedCities = cityGrowths
  .sort((a, b) => a.Increase_from_2016 - b.Increase_from_2016)
  .reverse();
console.log(sortedCities);

// Top 5
var topFiveCities = sortedCities.slice(0, 5);
console.log(topFiveCities);

// Top 7
var topSevenCities = sortedCities.slice(0, 7);
console.log(topSevenCities);

// Mapping
var topFiveCityNames = topFiveCities.map((city) => city.City);
var topFiveCityGrowths = topFiveCities.map((city) =>
  parseInt(city.Increase_from_2016)
);

// Plot
var trace = {
  x: topFiveCityNames,
  y: topFiveCityGrowths,
  type: "bar",
};
var data = [trace];
var layout = {
  title: "Most Rapidly Growing Cities",
  xaxis: { title: "City" },
  yaxis: { title: "Population Growth, 2016-2017" },
};
Plotly.newPlot("bar-plot", data, layout);
