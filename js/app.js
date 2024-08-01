// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    // Cuando agregas un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCarrito);

    //Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reseteamos el carrito
        limpiarHTML();
    });
}

// Funciones
function agregarCurso(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = evt.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
}

// Eliminar un curso de un carrito
function eliminarCarrito(evt) {
    if (evt.target.classList.contains('borrar-curso')) {

        const cursoId = evt.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); // Iterar sobre el carrito y mostrar el htmls
    }
}

// Leer el contenido del HTML que le dimos click y extrae la informacion de curso
function leerDatosCursos(curso) {
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
}

// Muestra el carrito de comprar en el HTML
function carritoHTML() {
    limpiarHTML();
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
       <td> 
       <img src = "${imagen}" width = "100"/>
       </td>
       <td>${titulo}</td>
       <td>${precio}</td>
       <td>${cantidad}</td>
       <td>
       <a href="#" class="borrar-curso" data-id="${id}" > X 
       </a>
       </td>
       `;
        // Agrega el html de carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
