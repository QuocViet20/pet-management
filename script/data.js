"use strict";

// Animation cho Sidebar
const sidebarTitle = document.getElementById("sidebar-title");
const sidebar = document.getElementById("sidebar");

sidebarTitle.addEventListener("click", function (e) {
  e.preventDefault();
  sidebar.classList.toggle("active");
});

const inputFile = document.getElementById("input-file");
const btnImport = document.getElementById("import-btn");
const btnExport = document.getElementById("export-btn");

btnImport.addEventListener("click", upload);
btnExport.addEventListener("click", download);
// hàm upload
function upload() {
  // let fileUpLoader = document.getElementById("input-file");
  // fileUpLoader.addEventListener("change", (event) => {
  //   const files = event.target.files;
  //   console.log(files, files);
  // });
  if (inputFile.value === "") {
    alert("please input a file");
  } else {
    let file = inputFile.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      let load = JSON.parse(reader.result);
      localStorage.setItem("petApp", JSON.stringify(load));
      console.log(load);
      alert("import data successfully");
    };
    reader.readAsText(file);
  }
  inputFile.value === "";
}

// hàm download
function download() {
  let data = localStorage.getItem("petApp");
  let file = new Blob([data], { type: "text/plain;charset=utf-8" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "petApp.json";
  a.click();
}
