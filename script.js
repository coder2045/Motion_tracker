function simulate() {
  const v0 = parseFloat(document.getElementById("velocity").value);
  const a = parseFloat(document.getElementById("acceleration").value);
  const tMax = parseFloat(document.getElementById("time").value);
  const dt = 0.1;

  let times = [], positions = [], velocities = [], accelerations = [];

  for (let t = 0; t <= tMax; t += dt) {
    times.push(t.toFixed(1));
    velocities.push((v0 + a * t).toFixed(2));
    positions.push((v0 * t + 0.5 * a * t * t).toFixed(2));
    accelerations.push(a.toFixed(2));
  }

  const createChart = (ctx, label, data, color) => {
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: times,
        datasets: [{
          label: label,
          data: data,
          fill: false,
          borderColor: color,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Time (s)" } },
          y: { title: { display: true, text: label } }
        }
      }
    });
  };

  if (window.positionChartObj) positionChartObj.destroy();
  if (window.velocityChartObj) velocityChartObj.destroy();
  if (window.accelerationChartObj) accelerationChartObj.destroy();

  window.positionChartObj = createChart(document.getElementById("positionChart"), "Position (m)", positions, "blue");
  window.velocityChartObj = createChart(document.getElementById("velocityChart"), "Velocity (m/s)", velocities, "green");
  window.accelerationChartObj = createChart(document.getElementById("accelerationChart"), "Acceleration (m/s²)", accelerations, "red");
}
