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
      .attr("width", width)
      .attr("height", height)
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
      let open = 0,
        done = 0;
  
      for (let i = 0; i < data.length; i++) {
        if (data[i].completed) {
          done += 1;
        } else {
          open += 1;
        }
      }
  
      let chartData = [
        { value: open, color: "red" },
        { value: done, color: "green" },
      ];
  
      createPie(chartData);
    });
  }