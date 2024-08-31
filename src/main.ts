import './style.css'

document.addEventListener("DOMContentLoaded", () => {
    const element = document.querySelector(".fadeOut");
    if (element){
        element.addEventListener("animationend", () =>{
            element.remove();
        })
    }
})

