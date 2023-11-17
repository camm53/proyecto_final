// function funcion(nombre){
//     console.log('hola '+ nombre);
// }

// funcion('carlo')

function saludar(){
    console.log("¡Bienveni@ a la tienda de Helados!")
}

function Precio(helados){
    resultado= helados*2
    console.log("\nEl precio de "+helados+" helado(s) es: "+resultado)
    return resultado
}

function aplicarDescuentos(helados,precio){
    if(helados>5){
        console.log("\n¡Obtubiste un descuento del 10% por comprar mas de 5 helados :D!")
        precio = precio*.9
        console.log("\nEl precio a pagar por "+helados+" helado(s) con descuento del 10% es de: "+precio )
    } else{
        console.log("\n¡Lo siento :c , la cantidad de helados requeridos para un descuento es de almenos 5 helados!\n")
    }
    return  precio;
}

saludar();
helados=6;
precio=Precio(helados);
aplicarDescuentos(helados, precio);