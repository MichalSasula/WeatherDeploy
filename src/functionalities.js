const showHide = document.querySelectorAll('.showHide');
const content = document.querySelectorAll('.content');
const close = document.querySelector('.close');
const help = document.querySelector('#help');


for (let i=0; i<showHide.length; i++){
    showHide[i].onclick = function(){
        let content = this.parentElement.nextElementSibling;
        if(content.style.maxHeight){
            content.style.maxHeight = null;
            this.classList.remove('isOpen');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            this.classList.add('isOpen');
        }

    }
}


