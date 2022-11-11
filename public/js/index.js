let checkbox = document.querySelectorAll("#check");
let presentAbsent = document.querySelectorAll(".present");

for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener("click", function () {
    presentAbsent[i].innerText = "Absent";
  });
}
