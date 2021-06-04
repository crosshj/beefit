// TODO:

let open = false;
const menuDiv = document.querySelector('.nav');
const datContain = document.querySelector('.dat-contain');
function toggleMenu(){
    open = !open;
    if(open){
        menuDiv.classList.add('open');
        datContain.classList.add('pushed')
    } else {
        menuDiv.classList.remove('open');
        datContain.classList.remove('pushed')
    }
}
