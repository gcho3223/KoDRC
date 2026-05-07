let allRuns = [];

async function loadRuns() {

  const response = await fetch("data/runs.json");

  allRuns = await response.json();

  showRunCategory("calib");
}

function showRunCategory(categoryId) {

  const tbody = document.getElementById("run-table-body");

  tbody.innerHTML = "";

  const filteredRuns = allRuns.filter(
    run => run.category === categoryId
  );

  filteredRuns.forEach(run => {

    const row = `
      <tr>
        <td>${run.runNumber}</td>
        <td>${run.energy}</td>
        <td>${run.particle}</td>
        <td>${run.angle}</td>
        <td>${run.note}</td>
      </tr>
    `;

    tbody.innerHTML += row;
  });
}

function toggleHadronMenu() {

  const subMenu = document.getElementById("hadron-sub-menu");

  subMenu.classList.toggle("is-hidden");
}

loadRuns();
