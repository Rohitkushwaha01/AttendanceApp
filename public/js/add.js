const addbtn = document.querySelector(".add-btn");
const inputName = document.querySelector(".input-name");
const inputEmail = document.querySelector(".input-email");
const inputRoll = document.querySelector(".input-roll");
const addOrNot = document.querySelector(".faculty-nav");
console.log(addbtn);

addbtn.addEventListener("click", function (e) {
  if (
    inputName.value.length > 5 &&
    inputEmail.value.length > 10 &&
    inputName.value.length > 5
  ) {
    let html = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Student Added</strong> Click here to check <a href="/StudentList">Student Sheet</a>.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    addOrNot.insertAdjacentHTML("afterend", html);

    const alert = document.querySelector(".alert");
    setTimeout(function () {
        alert.classList.add('hide');
    }, 2000);
  }
});
