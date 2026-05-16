let allRuns = [];
let currentRunCategory = null;

const categoryTitles = {
  "calibration": "Calibration Runs",
  "em": "EM Runs",

  "hadronic-pion-interaction-target": "Hadronic: Pion w/ Interaction Target Runs",
  "hadronic-proton-no-interaction-target": "Hadronic: Proton w/o Interaction Target Runs",

  "additional-position-resolution": "Additional: Position Resolution Runs",
  "additional-pid": "Additional: PID Runs",
  "additional-time-resolution": "Additional: Time Resolution Runs",
  "additional-lateral-shower": "Additional: Lateral Shower Runs",
  "additional-light-attenuation": "Additional: Light Attenuation Runs"
};

async function loadRuns() {

  const response = await fetch("data/runs.json");
  allRuns = await response.json();

  const title = document.getElementById("run-category-title");
  const tbody = document.getElementById("run-table-body");
  const tableWrapper = document.querySelector(".run-table-wrapper");

  title.textContent = "Select a run category";
  tbody.innerHTML = "";

  tableWrapper.classList.add("is-hidden");
}

function showRunCategory(categoryId) {

  const tbody = document.getElementById("run-table-body");
  const title = document.getElementById("run-category-title");
  const tableWrapper = document.querySelector(".run-table-wrapper");

  if (
    currentRunCategory === categoryId &&
    !tableWrapper.classList.contains("is-hidden")
  ) {

    currentRunCategory = null;

    title.textContent = "Select a run category";
    tbody.innerHTML = "";

    tableWrapper.classList.add("is-hidden");

    return;
  }

  currentRunCategory = categoryId;

  title.textContent =
    categoryTitles[categoryId] || "Run List";

  tbody.innerHTML = "";

  const filteredRuns =
    allRuns.filter(run => run.category === categoryId);

  if (filteredRuns.length === 0) {

    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="has-text-centered has-text-grey">
          No runs found.
        </td>
      </tr>
    `;

    tableWrapper.classList.remove("is-hidden");

    return;
  }

  filteredRuns.forEach(run => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${run.date || ""}</td>
      <td>${run.runNumber || ""}</td>
      <td>${run.events || ""}</td>
      <td>${run.energy || ""}</td>
      <td>${run.particle || ""}</td>
      <td>${run.angle || ""}</td>
      <td>${run.configuration || ""}</td>
      <td>${run.note || ""}</td>
    `;

    tbody.appendChild(row);
  });

  tableWrapper.classList.remove("is-hidden");
}

function toggleHadronicMenu() {

  const subMenu =
    document.getElementById("hadronic-sub-menu");

  if (subMenu) {
    subMenu.classList.toggle("is-hidden");
  }
}

function toggleAdditionalMenu() {

  const subMenu =
    document.getElementById("additional-sub-menu");

  if (subMenu) {
    subMenu.classList.toggle("is-hidden");
  }
}

document.addEventListener(
  "DOMContentLoaded",
  loadRuns
);
