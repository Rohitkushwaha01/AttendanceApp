const addbtn = document.querySelector('.add-btn');
const inputName = document.querySelector('.input-name');
const inputEmail= document.querySelector('.input-email');
const inputRoll= document.querySelector('.input-roll');
const addOrNot = document.querySelector('.faculty-nav');
console.log(addbtn);

addbtn.addEventListener('click', function(e){
    e.preventDefault();
    if((inputName.value.length > 5) && (inputEmail.value.length > 10) &&  (inputName.value.length > 5)){
        const time = function(){
            let html  = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Student Added</strong> Click here to check <a href="/StudentList">Student Sheet</a>.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
            addOrNot.insertAdjacentHTML("afterend", html);
        }
        const timeout = setInterval(time, 2000);

        setTimeout(() => {
            clearInterval(timeout)
        }, 2000);
    }
})