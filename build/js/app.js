document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
    scrollNav();
    navegacionFija();
}
function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


}
function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');
    window.addEventListener('scroll', function() {
   
        if(sobreFestival.getBoundingClientRect().bottom<0){
            barra.classList.add("fijo");
            body.classList.add("body-scroll");
        }
        else{
            barra.classList.remove("fijo");
            body.classList.remove("body-scroll");

        }
    } )
}  

function crearGaleria(e) {
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i <= 12; i++ ) {
        const imagen = document.createElement('picture');

        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function()
        {
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
} 
//Crea el overlay con la imagen
function mostrarImagen(id){
    const imagen = document.createElement('picture');

    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${id}.jpg" alt="imagen galeria">
    `;

    const overlay= document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body  = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    
    //Añadirlo al HTML en el body
    const body  = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')
    //Boton para cerrar la ventana modal

    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    //Clase para cerrar al hacer click en la X
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        const body  = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    overlay.appendChild(cerrarModal);
  
}






