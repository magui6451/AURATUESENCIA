document.documentElement.classList.add('js');

/* Revelar secciones al hacer scroll */
const secciones = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    secciones.forEach((seccion) => observador.observe(seccion));
} else {
    secciones.forEach((seccion) => seccion.classList.add('visible'));
}

/* Barra de progreso y botón volver arriba */
const barra = document.querySelector('.barra-progreso');
const botonArriba = document.querySelector('.volver-arriba');

function actualizarScroll() {
    const alto = document.documentElement.scrollHeight - window.innerHeight;
    const progreso = alto > 0 ? (window.scrollY / alto) * 100 : 0;
    barra.style.width = progreso + '%';
    botonArriba.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', actualizarScroll, { passive: true });
window.addEventListener('resize', actualizarScroll);
actualizarScroll();

botonArriba.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Visor de imágenes de promociones */
const visor = document.getElementById('visor');
const imagenVisor = visor.querySelector('img');
const botonCerrar = visor.querySelector('.cerrar');

document.querySelectorAll('.promo img').forEach((img) => {
    img.addEventListener('click', () => {
        imagenVisor.src = img.src;
        imagenVisor.alt = img.alt;
        visor.showModal();
    });
});

botonCerrar.addEventListener('click', () => visor.close());

/* Cerrar al tocar fuera de la imagen */
visor.addEventListener('click', (evento) => {
    const rect = imagenVisor.getBoundingClientRect();
    const fueraDeImagen =
        evento.clientX < rect.left || evento.clientX > rect.right ||
        evento.clientY < rect.top || evento.clientY > rect.bottom;
    if (fueraDeImagen) visor.close();
});
