const modalCompra = document.querySelector("#modalCompra");
const btnCancelar = document.querySelector("#btnCancelar");
const formCompra = document.querySelector("#formCompra");

const btnComprar = document.querySelectorAll(".btnComprar");

const modalNombreProd = document.querySelector("#modalNombreProd");
const modalPrecioProd = document.querySelector("#modalPrecioProd");

let productoSeleccionado = "";
let precioSeleccionado = 0;

btnComprar.forEach(function(boton) {

    boton.addEventListener("click", function(event) {

        productoSeleccionado =event.target.getAttribute("data-nombre");
        precioSeleccionado =parseFloat(event.target.getAttribute("data-precio"));
            

        modalNombreProd.textContent = productoSeleccionado;
        modalPrecioProd.textContent = precioSeleccionado.toFixed(2);

        modalCompra.showModal();
    });

});

btnCancelar.addEventListener("click", function() {
    modalCompra.close();
});

formCompra.addEventListener("submit", function(event) {

    event.preventDefault();

    const nuevaOrden = {
        producto: productoSeleccionado,
        precio: precioSeleccionado,
        cliente: document.querySelector("#nombre").value,
        email: document.querySelector("#correo").value
    };

    const comprasPrevias =
        JSON.parse(localStorage.getItem("compras")) || [];

    comprasPrevias.push(nuevaOrden);

    localStorage.setItem(
        "compras",
        JSON.stringify(comprasPrevias)
    );

    formCompra.reset();
    modalCompra.close();
});