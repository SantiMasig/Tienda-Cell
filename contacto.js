const formUser = document.getElementById("formulario");
const titulo = document.getElementById("titulo");
const nombreUser = document.getElementById("nombre");
const apellidoUser = document.getElementById("apellido");
const correoUser = document.getElementById("correo");
const confirmacionDatos = document.getElementById("confDatos");

//Guardo inf user en obj
const infUser = {};

formUser.onsubmit = (e) => {
    e.preventDefault();
    Swal.fire("Hey " + nombreUser.value + " tus datos se enviaron con exito ;)");
    infUser.nombre = nombreUser.value;
    infUser.apellido = apellidoUser.value;
    infUser.correo = correoUser.value;
    console.log(infUser);
    localStorage.setItem("infUser", JSON.stringify(infUser));
    
   
    infUser.reset;   
    
    
     
}

const infUserStorage = JSON.parse(localStorage.getItem("infUser"));
console.log(infUserStorage);
if (infUserStorage.nombre != "" || infUserStorage !== "") {
    titulo.innerText = "Hola " +
      infUserStorage.nombre + " ya dejaste tus datos anteriormente.\n¿Quieres ingresar nuevos? no hay problema! Hazlo! ;)";}


  
