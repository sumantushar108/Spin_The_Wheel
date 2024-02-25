const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");

const startConfetti = () => {
  setTimeout(() => {
      confetti.start();
  }, 100);
};

const stopConfetti = () => {
  setTimeout(() => {
      confetti.stop();
  }, 2000);
};

const spinValues = [
  { minDegree: 61, maxDegree: 90, reward: "+20 diamonds" },
  { minDegree: 31, maxDegree: 60, reward: "+50 diamonds" },
  { minDegree: 0, maxDegree: 30, reward: "+100 diamonds" },
  { minDegree: 331, maxDegree: 360, reward: "+150 diamonds" },
  { minDegree: 301, maxDegree: 330, reward: "+130 diamonds" },
  { minDegree: 271, maxDegree: 300, reward: "+10 diamonds" },
  { minDegree: 241, maxDegree: 270, reward: "+70 diamonds" },
  { minDegree: 211, maxDegree: 240, reward: "+140 diamonds" },
  { minDegree: 181, maxDegree: 210, reward: "+190 diamonds" },
  { minDegree: 151, maxDegree: 180, reward: "+60 diamonds" },
  { minDegree: 121, maxDegree: 150, reward: "+90 diamonds" },
  { minDegree: 91, maxDegree: 120, reward: "+110 diamonds" },
];
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
  "#E74C3C",
  "#7D3C98",
  "#138D75",
];
const diamondRewards = ["+20", "+50", "+100", "+150", "+130","+10","+70","+140","+190","+60","+90","+110"];
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    // labels1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    labels2:diamondRewards,
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        // formatter: (_, context) => context.chart.data.labels1[context.dataIndex],
        // font: { size: 24 },
        formatter: (_, context) => context.chart.data.labels2[context.dataIndex],
        font: {size: 18},
      },
    },
  },
});
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      const popup = document.createElement("div");
      popup.classList.add("popup");
      const content = document.createElement("div");
      content.classList.add("popup-content");
      content.innerHTML = `
        <h2>Congratulations, You Have Won ${i.reward} Diamonds!</h2>
        <button id="playAgainBtn">Play Again</button>
      `;
      popup.appendChild(content);
      document.body.appendChild(popup);
      document.querySelector('.content-container').style.filter = "blur(10px)";
      spinBtn.disabled = false;
      text.innerHTML = "<p>Best Of Luck!</p>";
      const playAgainBtn = document.getElementById("playAgainBtn");
      playAgainBtn.addEventListener("click", () => {
        document.body.removeChild(popup);
        document.querySelector('.content-container').style.filter = "none";
      });
      startConfetti();
      stopConfetti();
      break;
    }
  }
};
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Best Of Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
      spinChart.options.rotation = spinChart.options.rotation + resultValue;
      spinChart.update();
      if (spinChart.options.rotation >= 360) {
          count += 1;
          resultValue -= 5;
          spinChart.options.rotation = 0;
      } else if (count > 15 && spinChart.options.rotation == randomDegree) {
          generateValue(randomDegree);
          clearInterval(rotationInterval);
          count = 0;
          resultValue = 101;
      }
  }, 10);
});