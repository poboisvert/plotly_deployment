// Map
d3.json("samples.json").then(function (data) {
  console.log(data);
});

// Get WFREQ
d3.json("samples.json").then(function (data) {
  wfreq = data.metadata.map((person) => person.wfreq);
  console.log(wfreq);
});

// Filter null
d3.json("samples.json").then(function (data) {
  wfreq = data.metadata.map((person) => person.wfreq).sort((a, b) => b - a);
  filteredWfreq = wfreq.filter((element) => element != null);
  console.log(filteredWfreq);
});

// Object.entries() method returns key-value pairs of an object as arrays. Run the code in your browser console to see!

// display the metadata of any individual from the dataset:
d3.json("samples.json").then(function (data) {
  firstPerson = data.metadata[0];
  Object.entries(firstPerson).forEach(([key, value]) => {
    console.log(key + ": " + value);
  });
});
// CORS IMPORT CSV OR FILES: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
