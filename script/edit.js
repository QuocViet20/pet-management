"use strict";

const sidebarTitle = document.getElementById("sidebar-title");
const sidebar = document.getElementById("sidebar");

sidebarTitle.addEventListener("click", function (e) {
  e.preventDefault();
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
const tableBody = document.getElementById("tbody");
const formHide = document.querySelector(".hide");
const btnSubmit = document.getElementById("submit-btn");

let petArr = JSON.parse(getFromStorage("petApp"));
let breedArr = JSON.parse(getFromStorage("breed-list"));
let d = new Date();
let date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
renderTableData(petArr);

// validate form
const validate = function () {
  if (!petName.value) {
    alert("Please input for Name");
    return false;
  }
  if (!petAge.value) {
    alert("Please input for Age");
    return false;
  }
  if (Number(petAge.value) < 1 || Number(petAge.value) > 15) {
    alert("Age must be between 1 and 15");
    return false;
  }
  if (petType.value === "Select Type") {
    alert("Please select Type");
    return false;
  }
  if (!petWeight.value) {
    alert("Please input for Weight");
    return false;
  }
  if (Number(petWeight.value) < 1 || Number(petWeight.value) > 15) {
    alert("Weight must be between 1 and 15");
    return false;
  }
  if (!petLength.value) {
    alert("Please input for Length");
    return false;
  }
  if (Number(petLength.value) < 1 || Number(petLength.value) > 100) {
    alert("Length must be between 1 and 100");
    return false;
  }
  if (!petColor.value) {
    alert("Please select Color");
    return false;
  }
  if (petBreed.value === "Select Breed") {
    alert("Please select Breed");
    return false;
  }
  {
    return true;
  }
};

//render ra man hinh
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
    <td>${petArr[i].date}</td>
    <td><button type="button" class="btn btn-danger" onclick="startEditPet('${
      petArr[i].id
    }')">Edit</button>
    </td>`;
    tableBody.appendChild(row);
  }
}

// reset form
const clearInput = function () {
  petId.value = "";
  petWeight.value = "";
  petName.value = "";
  petAge.value = "";
  petType.value = "Select Type";
  petWeight.value = "";
  petLength.value = "";
  petColor.value = "#131313";
  petBreed.value = "Select Breed";
  petVaccinated.checked = false;
  petDewormed.checked = false;
  petSterilized.checked = false;
};

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
    option.innerHTML = `<option>${breedArr[i].name}</option>`;
    petBreed.appendChild(option);
  }
};

// lọc breed
function filterBreed() {
  const optionValue = breedArr.filter(function (item) {
    if (petType.value === "Dog") return item.type === "Dog";
    if (petType.value === "Cat") return item.type === "Cat";
    if (petType.value === "Select Type") return [];
  });
  renderBreed(optionValue);
}

// su kien onchange inputtype

petType.addEventListener("change", filterBreed);

function startEditPet(id) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === id) {
      formHide.classList.remove("hide");
      petId.value = petArr[i].id;
      petName.value = petArr[i].name;
      petAge.value = petArr[i].age;
      petType.value = petArr[i].type;
      petWeight.value = petArr[i].weight;
      petLength.value = petArr[i].length;
      petColor.value = petArr[i].color;
      filterBreed();
      petBreed.value = petArr[i].breed;
      petVaccinated.checked = petArr[i].vaccinated;
      petDewormed.checked = petArr[i].dewormed;
      petSterilized.checked = petArr[i].sterilized;
    }
  }
}

btnSubmit.addEventListener("click", function () {
  if (validate() === true) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId.value) {
        petArr[i].id = petId.value;
        petArr[i].name = petName.value;
        petArr[i].age = petAge.value;
        petArr[i].type = petType.value;
        petArr[i].weight = Number(petWeight.value);
        petArr[i].length = Number(petLength.value);
        petArr[i].color = petColor.value;
        petArr[i].breed = petBreed.value;
        petArr[i].vaccinated = petVaccinated.checked;
        (petArr[i].dewormed = petDewormed.checked),
          (petArr[i].sterilized = petSterilized.checked);
        petArr[i].date = date;
      }
    }

    saveToStorage("petApp", JSON.stringify(petArr));
    renderTableData(petArr);
    clearInput();
    formHide.classList.add("hide");
  }
});
