let allRuns = [];
let currentRunCategory = null;

const categoryTitles = {
  "calibration": "Calibration Runs",
  "resolution": "Resolution Runs",
  "3d-reconstruction": "3D Reconstruction Runs",
  "mcp-pmt": "MCP-PMT Runs",
  "3d-printing-module-test": "3D Printing Module Test Runs"
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
        <td colspan="6" class="has-text-centered has-text-grey">
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
      <td>${run.energy || ""}</td>
      <td>${run.particle || ""}</td>
      <td>${run.angle || ""}</td>
      <td>${run.note || ""}</td>
    `;

    tbody.appendChild(row);
  });

  tableWrapper.classList.remove("is-hidden");
}

document.addEventListener(
  "DOMContentLoaded",
  loadRuns
);
