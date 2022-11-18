const time = document.querySelector('.time');
setInterval(() => {
    let date = new Date();
    time.innerText = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}, 100);