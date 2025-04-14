// script.js
let model;

async function loadModel() {
  model = await tf.loadLayersModel('model/model.json');
  console.log("Model załadowany!");
}

function normalizeInput(data) {
  // Zakładamy, że dane są już w podobnym zakresie jak przy treningu
  // W praktyce najlepiej byłoby zapisać scalery z treningu
  return tf.tensor2d([data]);
}

document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const pclass = parseInt(document.getElementById("pclass").value);
  const sex = parseInt(document.getElementById("sex").value);
  const age = parseFloat(document.getElementById("age").value);
  const sibsp = parseInt(document.getElementById("sibsp").value);
  const parch = parseInt(document.getElementById("parch").value);
  const fare = parseFloat(document.getElementById("fare").value);

  const input = [pclass, sex, age, sibsp, parch, fare];

  const tensor = normalizeInput(input);
  const prediction = await model.predict(tensor).data();
  const survived = prediction[0] > 0.5 ? "TAK ✅" : "NIE ❌";

  document.getElementById("result").innerText = `Czy pasażer przeżył? ${survived}`;
});

loadModel();
