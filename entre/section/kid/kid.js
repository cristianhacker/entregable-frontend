document.addEventListener("DOMContentLoaded", () => {
    // 1. Lógica del Slider automático
    const slideImages = document.querySelectorAll('.slides img');
    let currentSlide = 0;

    if (slideImages.length > 0) {
        setInterval(() => {
            slideImages[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slideImages.length;
            slideImages[currentSlide].classList.add('active');
        }, 3000);
    }

    // 2. Lógica del Modal y Compra (Guardar en LocalStorage)
    const modalCompra = document.querySelector("#modalCompra");
    const btnCancelar = document.querySelector("#btnCancelar");
    const formCompra = document.querySelector("#formCompra");
    const btnComprar = document.querySelectorAll(".btnComprar");

    const modalNombreProd = document.querySelector("#modalNombreProd");
    const modalPrecioProd = document.querySelector("#modalPrecioProd");

    let productoSeleccionado = "";
    let precioSeleccionado = 0;

    btnComprar.forEach((boton) => {
        boton.addEventListener("click", (event) => {
            productoSeleccionado = event.target.getAttribute("data-nombre");
            precioSeleccionado = parseFloat(event.target.getAttribute("data-precio"));

            modalNombreProd.textContent = productoSeleccionado;
            modalPrecioProd.textContent = precioSeleccionado.toFixed(2);

            if (modalCompra) {
                modalCompra.showModal();
            }
        });
    });

    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            modalCompra.close();
        });
    }

    if (formCompra) {
        formCompra.addEventListener("submit", (event) => {
            event.preventDefault();

            const nuevaOrden = {
                producto: productoSeleccionado,
                precio: precioSeleccionado,
                cliente: document.querySelector("#nombre").value,
                email: document.querySelector("#correo").value
            };

            const comprasPrevias = JSON.parse(localStorage.getItem("compras")) || [];
            comprasPrevias.push(nuevaOrden);

            localStorage.setItem("compras", JSON.stringify(comprasPrevias));

            alert("¡Compra guardada con éxito!");

            formCompra.reset();
            modalCompra.close();
        });
    }
});