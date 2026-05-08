let allRuns = [];
let currentRunCategory = null;

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

  const title = document.getElementById("run-category-title");
  const tbody = document.getElementById("run-table-body");
  const tableWrapper = document.querySelector(".run-table-wrapper");

  // 처음에는 아무것도 안보이게
  title.textContent = "Select a run category";
  tbody.innerHTML = "";

  tableWrapper.classList.add("is-hidden");
}

function showRunCategory(categoryId) {

  const tbody = document.getElementById("run-table-body");
  const title = document.getElementById("run-category-title");
  const tableWrapper = document.querySelector(".run-table-wrapper");

  // 같은 버튼 다시 누르면 접기
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
        <td colspan="5" class="has-text-centered has-text-grey">
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
      <td>${run.runNumber || ""}</td>
      <td>${run.energy || ""}</td>
      <td>${run.particle || ""}</td>
      <td>${run.angle || ""}</td>
      <td>${run.note || ""}</td>
    `;

    tbody.appendChild(row);
  });

  tableWrapper.classList.remove("is-hidden");
}

function toggleHadronMenu() {

  const subMenu =
    document.getElementById("hadron-sub-menu");

  subMenu.classList.toggle("is-hidden");
}

document.addEventListener(
  "DOMContentLoaded",
  loadRuns
);
