// Objeto Libro
const Libro = {
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    anioPublicacion: 1954,
    genero: "Fantasía"
  };
  
  // Array biblioteca
  const biblioteca = [
    Libro,
    {
      titulo: "El Quijote",
      autor: "Miguel de Cervantes",
      anioPublicacion: 1605,
      genero: "Novela"
    },
    {
      titulo: "La Divina Comedia",
      autor: "Dante Alighieri",
      anioPublicacion: 1320,
      genero: "Poema épico"
    }
  ];

//uso de metodos array
// Listar Todos los Libros 
biblioteca.forEach((libro) => {
    console.log(libro.titulo, libro.autor, libro.anioPublicacion, libro.genero);
  });

//buscar libros por autor
Tolkien="J.R.R. Tolkien";
const librosDeTolkien = biblioteca.filter((libro) => libro.autor == Tolkien);
console.log("\nBuscamos los libros del autor: "+ Tolkien);
console.log(librosDeTolkien);


//encontrar el libro mas antiguo
const libroMasAntiguo = biblioteca.reduce((libroRespuesta, libroActual) => {
    if (libroRespuesta.anioPublicacion > libroActual.anioPublicacion) {
      return libroActual;
    } else {
      return libroRespuesta;
    }
  });
console.log("\nEl libro mas antiguo es: ");
console.log(libroMasAntiguo);

//uso de metodos de objetos
// Añadir un Método a un Objeto (lo cambie a todos los objetos en Biblioteca)
console.log("\nResumen de los libros:");
biblioteca.map((libro)=> libro.resumen = function() {
    console.log(`El libro "${this.titulo}" fue escrito por "${this.autor}" en el año ${this.anioPublicacion}. Es un libro de género "${this.genero}".\n`);
  } );
biblioteca.map((libro) => libro.resumen());// aqui se muestra el resultado

// Mostrar Información con Object.keys y Object.values
const titulosDeLosLibros = biblioteca.map((libro) => libro.titulo);
const autoresDeLosLibros = biblioteca.map((libro) => libro.autor);

console.log(titulosDeLosLibros);
console.log(autoresDeLosLibros);