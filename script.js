"use strict";

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
const btnSubmit = document.getElementById("submit-btn");
const btnShowHealthy = document.getElementById("healthy-btn");
const btnCalcBmi = document.getElementById("calcBMI-btn");
const tableBody = document.getElementById("tbody");
const sidebarTitle = document.getElementById("sidebar-title");
const sidebar = document.getElementById("sidebar");

// khai bao mang luu tru thu cung,mang luu tru thu cung khoe manh,bien ngay gio
let petArr = JSON.parse(getFromStorage("petApp")) || [];
renderTableData(petArr);

let breedArr = JSON.parse(getFromStorage("breed-list"));
let healthyPets = [];
let d = new Date();
let date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
let healthyCheck = false;

sidebarTitle.addEventListener("click", function (e) {
  e.preventDefault();
  sidebar.classList.toggle("active");
});

// validate form
const validate = function () {
  if (petArr.length > 0) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId.value) {
        alert("id has already exists");
        return false;
      }
    }
  }

  if (!petId.value) {
    alert("Please input for ID");
    return false;
  }
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

// ham checkbox kiem tra
function checkBox(check) {
  return check
    ? '<i class="bi bi-check-circle-fill"></i>'
    : '<i class="bi bi-x-circle-fill"></i>';
}

// xoa thu cung
function deletePet(idPet) {
  if (confirm("Are you sure?") === true) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === idPet) {
        petArr.splice(i, 1);
        saveToStorage("petApp", JSON.stringify(petArr));
        renderTableData(petArr);
      }
    }
    for (let i = 0; i < healthyPets.length; i++) {
      if (healthyPets[i].id === idPet) {
        healthyPets.splice(i, 1);
        renderTableData(healthyPets);
      }
    }
  }
}

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
    <td>${petArr[i].bmi}</td>
    <td>${petArr[i].date}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
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

// hàm check healthy
const checkHealthy = function (pet) {
  return pet.vaccinated === true &&
    pet.dewormed === true &&
    pet.sterilized === true
    ? true
    : false;
};

//hàm tính chỉ số BMI
function calcBMI(pet) {
  if (pet.type === "Dog") {
    return ((pet.weight * 703) / (pet.length * pet.length)).toFixed(2);
  }
  if (pet.type === "Cat") {
    return ((pet.weight * 886) / (pet.length * pet.length)).toFixed(2);
  }
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

// su kien onchange inputtype

petType.addEventListener("change", function () {
  const optionValue = breedArr.filter(function (item) {
    if (petType.value === "Dog") return item.type === "Dog";
    if (petType.value === "Cat") return item.type === "Cat";
    if (petType.value === "Select Type") return [];
  });
  renderBreed(optionValue);
});

btnSubmit.addEventListener("click", function () {
  const pet = {
    id: petId.value,
    name: petName.value,
    age: petAge.value,
    type: petType.value,
    weight: Number(petWeight.value),
    length: Number(petLength.value),
    color: petColor.value,
    breed: petBreed.value,
    vaccinated: petVaccinated.checked,
    dewormed: petDewormed.checked,
    sterilized: petSterilized.checked,
    date: date,
    bmi: "?",
  };

  if (validate() === true) {
    petArr.push(pet);
    saveToStorage("petApp", JSON.stringify(petArr));
    renderTableData(petArr);
    clearInput();
  }
});

btnShowHealthy.addEventListener("click", function () {
  healthyPets = petArr.filter(checkHealthy);
  if (petArr.length === 0) {
    alert("you have not created a pet list");
  } else {
    if (!healthyCheck) {
      healthyCheck = true;
      // switch to show healthy pets
      btnShowHealthy.textContent = "Show All Pets ";
      renderTableData(healthyPets);
    } else {
      healthyCheck = false;
      // Switch to show all pets
      btnShowHealthy.textContent = "Show Healthy Pets";
      saveToStorage("petApp", JSON.stringify(petArr));
      renderTableData(petArr);
    }
  }
});

btnCalcBmi.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi = calcBMI(petArr[i]);
  }
  saveToStorage("petApp", JSON.stringify(petArr));
  renderTableData(petArr);
});
