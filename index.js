async function getData() {
  let result = await fetch("https://jsonplaceholder.typicode.com/todos");
  return result.json();
}

function createPie(data) {
  const width = 450,
    height = 450,
    margin = 40;

  const radius = Math.min(width, height) / 2 - margin;

  const svg = d3
    .select("#piechart")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const pie = d3.pie().value((d) => d.value);

  svg
    .selectAll("element")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
    .attr("fill", (p) => p.data.color)
    .attr("stroke", "black")
    .attr("opacity", "0.6");
}

function onClickPieChart() {
  getData().then((data) => {
    let open = data.filter((d) => !d.completed).length,
      done = data.filter((d) => d.completed).length;

    let chartData = [
      { value: open, color: "red" },
      { value: done, color: "green" },
    ];

    createPie(chartData);
  });
}
