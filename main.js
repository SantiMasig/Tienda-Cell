//DOM
const divProd = document.querySelector(`#divProd`);
const lista = document.querySelector(`#lista`);
const btnFiltrar = document.querySelector(`#filtrar`);

//Funcion para mostrar todos los productos en productos.json
const buscarProd = async () => {
  const prodFetch = await fetch(`./JSON/productos.json`);
  const prodJson = await prodFetch.json();

  prodJson.forEach((prod) => {
    divProd.innerHTML += `
    <div id="${prod.id}" class="card" style="width: 18rem">
        <img src="${prod.img}" class="card-img-top" alt="Imagen de Iphone 13 Pro" />
        <div class="card-body">
          <h4 class="card-title text-center">${prod.nombre}</h4>
          <p class="card-text">${prod.precio}</p>
          <a href="${prod.direccion}" class="btn btn-primary">Ir al Producto</a>
          <button id="${prod.id}" class="sumarCar btn btn-primary">Comprar</button>
        </div>
      </div>
    `;
  });

  const carrito = [];
  const botonAgregar = document.querySelectorAll(".sumarCar");

  //Boton comprar
  botonAgregar.forEach((boton) => {
    boton.onclick = () => {
      const producto = prodJson.find((prod) => prod.id === parseInt(boton.id));

      Toastify({
        text: `Se añadio ${producto.nombre} con un precio de:${producto.precio}`,
        className: `info`,
        style: { background: `#21415E` },
      }).showToast();

      const productoCarrito = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      };

      const indexCarrito = carrito.findIndex((prod) => prod.id === producto.id);

      if (indexCarrito === -1) {
        carrito.push(productoCarrito);
      } else {
        carrito[indexCarrito].cantidad += 1;
      }
    };
  });

  //Luxon
  const { DateTime } = luxon;
  const ahora = DateTime.now().toLocaleString();

  //Boton finalizar compra
  const bttnFin = document.querySelector(`#finalizar`);

  bttnFin.onclick = () => {
    const totalCompra = carrito
      .map((prod) => prod.precio * prod.cantidad)
      .reduce((elem1, elem2) => elem1 + elem2);
    Swal.fire(`El total de tu compra es: ${totalCompra}\nDia:${ahora}`);
  };
};
//Funcion para mostrar las categorias en el select
const mostrarCat = async () => {
  const catFetch = await fetch(`./JSON/categorias.json`);
  const catJson = await catFetch.json();

  catJson.forEach((cat) => {
    const option = document.createElement(`option`);
    option.innerText = `${cat}`;
    lista.append(option);
  });
};

//Funciones para mostrar los productos por categoria a la hora de filtrar
const mostrarProdCat = async () => {
  divProd.innerHTML = ``;
  const catSelec = lista.value;
  console.log(catSelec);

  const prodFetch = await fetch(`./JSON/productos.json`);
  const prodJson = await prodFetch.json();

  const prodFilt = prodJson.filter((prod) => prod.categoria === catSelec);

  prodFilt.forEach((prod) => {
    divProd.innerHTML += `
    <div id="${prod.id}" class="card" style="width: 18rem">
        <img src="${prod.img}" class="card-img-top" alt="Imagen de Iphone 13 Pro" />
        <div class="card-body">
          <h4 class="card-title text-center">${prod.nombre}</h4>
          <p class="card-text">${prod.precio}</p>
          <a href="${prod.direccion}" class="btn btn-primary">Ir al Producto</a>
          <button id="${prod.id}" class="sumarCar btn btn-primary">Comprar</button>
        </div>
      </div>
    `;
  });

  const carrito = [];
  const botonAgregar = document.querySelectorAll(".sumarCar");

  //Boton comprar
  botonAgregar.forEach((boton) => {
    boton.onclick = () => {
      const producto = prodJson.find((prod) => prod.id === parseInt(boton.id));

      Toastify({
        text: `Se añadio ${producto.nombre} con un precio de:${producto.precio}`,
        className: `info`,
        style: { background: `#21415E` },
      }).showToast();

      const productoCarrito = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      };

      const indexCarrito = carrito.findIndex((prod) => prod.id === producto.id);

      if (indexCarrito === -1) {
        carrito.push(productoCarrito);
      } else {
        carrito[indexCarrito].cantidad += 1;
      }
    };
  });

  //Luxon
  const { DateTime } = luxon;
  const ahora = DateTime.now().toLocaleString();

  //Boton finalizar compra

  const bttnFin = document.querySelector(`#finalizar`);

  bttnFin.onclick = () => {
    const totalCompra = carrito
      .map((prod) => prod.precio * prod.cantidad)
      .reduce((elem1, elem2) => elem1 + elem2);
    Swal.fire(`El total de tu compra es: ${totalCompra}\nDia:${ahora}`);
  };
};

buscarProd();
mostrarCat();
btnFiltrar.onclick = mostrarProdCat;
