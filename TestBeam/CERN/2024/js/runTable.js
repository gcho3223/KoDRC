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

// 각 서브메뉴에 속하는 카테고리 ID
const hadronicItems = [
  "hadronic-pion-interaction-target",
  "hadronic-proton-no-interaction-target"
];
const additionalItems = [
  "additional-position-resolution",
  "additional-pid",
  "additional-time-resolution",
  "additional-lateral-shower",
  "additional-light-attenuation"
];

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

  // 다른 그룹 버튼 누르면 해당 서브메뉴 닫기
  if (!hadronicItems.includes(categoryId)) {
    document.getElementById("hadronic-sub-menu").classList.add("is-hidden");
  }
  if (!additionalItems.includes(categoryId)) {
    document.getElementById("additional-sub-menu").classList.add("is-hidden");
  }

  // 같은 카테고리 다시 누르면 토글
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
  title.textContent = categoryTitles[categoryId] || "Run List";
  tbody.innerHTML = "";

  const filteredRuns = allRuns.filter(run => run.category === categoryId);

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
  // Additional 서브메뉴 닫기
  document.getElementById("additional-sub-menu").classList.add("is-hidden");

  const menu = document.getElementById("hadronic-sub-menu");
  const isAlreadyOpen = !menu.classList.contains("is-hidden");
  menu.classList.toggle("is-hidden");

  if (isAlreadyOpen) {
    const tableWrapper = document.querySelector(".run-table-wrapper");
    document.getElementById("run-table-body").innerHTML = "";
    document.getElementById("run-category-title").textContent = "Select a run category";
    tableWrapper.classList.add("is-hidden");
    currentRunCategory = null;
  }
}

function toggleAdditionalMenu() {
  // Hadronic 서브메뉴 닫기
  document.getElementById("hadronic-sub-menu").classList.add("is-hidden");

  const menu = document.getElementById("additional-sub-menu");
  const isAlreadyOpen = !menu.classList.contains("is-hidden");
  menu.classList.toggle("is-hidden");

  if (isAlreadyOpen) {
    const tableWrapper = document.querySelector(".run-table-wrapper");
    document.getElementById("run-table-body").innerHTML = "";
    document.getElementById("run-category-title").textContent = "Select a run category";
    tableWrapper.classList.add("is-hidden");
    currentRunCategory = null;
  }
}

document.addEventListener("DOMContentLoaded", loadRuns);
