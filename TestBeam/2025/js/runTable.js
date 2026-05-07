let allRuns = [];

const categoryTitles = {
  "calib": "Calibration Runs",
  "unif": "Uniformity Runs",
  "em": "EM Runs",
  "double-peak": "Double Peak Runs",
  "timing": "Timing Resolution Runs",
  "lc-calib": "LC Calibration Runs",
  "h-pion": "Hadron: Pion Runs",
  "h-pk": "Hadron: Proton/Kaon Runs",
  "h-pion-rot": "Hadron: Pion w/ Rotation Runs",
  "h-pk-rot": "Hadron: Proton/Kaon w/ Rotation Runs",
  "h-target": "Hadron: Pion w/ Interaction Target Runs"
};

async function loadRuns() {
  const response = await fetch("data/runs.json");
  allRuns = await response.json();

  showRunCategory("calib");
}

function showRunCategory(categoryId) {
  const tbody = document.getElementById("run-table-body");
  const title = document.getElementById("run-category-title");

  title.textContent = categoryTitles[categoryId] || "Run List";

  tbody.innerHTML = "";

  const filteredRuns = allRuns.filter(run => run.category === categoryId);

  if (filteredRuns.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="has-text-centered has-text-grey">
          No runs found.
        </td>
      </tr>
    `;
    return;
  }

  filteredRuns.forEach(run => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${run.runNumber || ""}</td>
      <td>${run.energy || ""}</td>
      <td>${run.particle || ""}</td>
      <td>${run.angle || ""}</td>
      <td>${run.note || ""}</td>
    `;

    tbody.appendChild(row);
  });
}

function toggleHadronMenu() {
  const subMenu = document.getElementById("hadron-sub-menu");
  subMenu.classList.toggle("is-hidden");
}

document.addEventListener("DOMContentLoaded", loadRuns);
