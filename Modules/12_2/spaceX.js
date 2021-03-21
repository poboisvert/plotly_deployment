const url = "https://api.spacexdata.com/v2/launchpads";

/* d3.json(url).then((receivedData) => console.log(receivedData));
 */
d3.json(url).then((res) =>
  console.log(
    `The lat is ${res[0].location.latitude} and lng is ${res[0].location.longitude} `
  )
);
