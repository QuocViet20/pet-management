"use strict";
const sidebarTitle = document.getElementById("sidebar-title");
const sidebar = document.getElementById("sidebar");

sidebarTitle.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

const petId = document.getElementById("input-id");
const petName = document.getElementById("input-name");
const petAge = document.getElementById("input-age");
const petType = document.getElementById("input-type");
const petWeight = document.getElementById("input-weight");
const petLength = document.getElementById("input-length");
const petColor = document.getElementById("input-color-1");
const petBreed = document.getElementById("input-breed");
const petDewormed = document.getElementById("input-dewormed");
const petSterilized = document.getElementById("input-sterilized");
const petVaccinated = document.getElementById("input-vaccinated");
const btnFind = document.getElementById("find-btn");
const tableBody = document.getElementById("tbody");

let petArr = JSON.parse(getFromStorage("petApp")) || [];
let breedArr = JSON.parse(getFromStorage("breed-list"));
let filterArr = [];

function renderTableData(petArr) {
  tableBody.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    let row = document.createElement("tr");
    row.innerHTML = `<th>${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td>${checkBox(petArr[i].vaccinated)}</td>
    <td>${checkBox(petArr[i].dewormed)}</td>
    <td>${checkBox(petArr[i].sterilized)}</td>
    <td>${petArr[i].date}</td>`;
    tableBody.appendChild(row);
  }
}

// ham checkbox kiem tra
function checkBox(check) {
  return check
    ? '<i class="bi bi-check-circle-fill"></i>'
    : '<i class="bi bi-x-circle-fill"></i>';
}

//ham renderBreed
const renderBreed = function (breedArr) {
  petBreed.innerHTML = "<option>Select Breed</option>";
  for (let i = 0; i < breedArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breedArr[i].name}</option> `;
    petBreed.appendChild(option);
  }
};

renderBreed(breedArr);

// su kien onchange inputtype

petType.addEventListener("change", function () {
  const optionValue = breedArr.filter(function (item) {
    if (petType.value === "Dog") return item.type === "Dog";
    if (petType.value === "Cat") return item.type === "Cat";
    if (petType.value === "Select Type") return [];
  });
  renderBreed(optionValue);
});

function findPet() {
  if (
    petId.value == "" &&
    petName.value == "" &&
    petType.value == "Select Type" &&
    petBreed.value == "Select Breed" &&
    petVaccinated.checked == false &&
    petDewormed.checked == false &&
    petSterilized.checked == false
  ) {
    alert("Please fill in the field");
  } else {
    filterArr = petArr.filter(
      (item) =>
        (item.id.includes(petId.value) || petId.value == "") &&
        (item.name.includes(petName.value) || petName.value == "") &&
        (item.type == petType.value || petType.value == "Select Type") &&
        (item.breed == petBreed.value || petBreed.value == "Select Breed") &&
        ((item.vaccinated === petVaccinated.checked) === true ||
          petVaccinated.checked == false) &&
        (item.dewormed == petDewormed.checked ||
          petDewormed.checked == false) &&
        (item.sterilized == petSterilized.checked ||
          petSterilized.checked == false)
    );
  }
  renderTableData(filterArr);
}

btnFind.addEventListener("click", findPet);
