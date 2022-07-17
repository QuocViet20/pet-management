"use strict";

// Animation cho Sidebar
const sidebarTitle = document.getElementById("sidebar-title");
const sidebar = document.getElementById("sidebar");

sidebarTitle.addEventListener("click", function (e) {
  e.preventDefault();
  sidebar.classList.toggle("active");
});

const petBreed = document.getElementById("input-breed");
const petType = document.getElementById("input-type");
const btnSubmitBreed = document.getElementById("submit-btn");
const tableBody = document.getElementById("tbody");

let breedArr = JSON.parse(getFromStorage("breed-list")) || [];
renderTableBreed(breedArr);

const validate = function () {
  if (!petBreed.value) {
    alert("Please input for Breed");
    return false;
  }
  if (petType.value === "Select Type") {
    alert("Please select Type");
    return false;
  }
  {
    return true;
  }
};

// reset form
const clearInput = function () {
  petBreed.value = "";
  petType.value = "Select Type";
};

function deleteBreed(id) {
  if (confirm("Are you sure?") === true) {
    for (let i = 0; i < breedArr.length; i++) {
      if (id == i) {
        breedArr.splice(i, 1);
        saveToStorage("breed-list", JSON.stringify(breedArr));
        renderTableBreed(breedArr);
      }
    }
  }
}

function renderTableBreed(breedArr) {
  tableBody.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    let row = document.createElement("tr");
    row.innerHTML = `<td scope="col">${i + 1}</td>
    <td scope="col">${breedArr[i].name}</td>
    <td scope="col">${breedArr[i].type}</td>
    <td scope="col"><button type="button" class="btn btn-danger" onclick="deleteBreed('${i}')"> Delete</button></td>`;
    tableBody.appendChild(row);
  }
}

btnSubmitBreed.addEventListener("click", function () {
  let breed = {
    name: petBreed.value,
    type: petType.value,
  };
  console.log(breed);
  if (validate() === true) {
    breedArr.push(breed);
    console.log(breedArr);
    saveToStorage("breed-list", JSON.stringify(breedArr));
    renderTableBreed(breedArr);
  }
  clearInput();
});
