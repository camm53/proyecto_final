

let x = 1;
const y = 2;
var z = 3;


//let
console.log("\nprueba con la variable let")
if (true){
    let x = 0
    console.log(x)
}
console.log(x)
//------------------------------------------------
//const
console.log("\nprueba con la variable const")
try {
    y=99
} catch (error) {
    console.log("la constante y no puede modificarse")
    
}
console.log(y)
//------------------------------------------------
//var
console.log("\nprueba con la variable var")
if (true){
    z = 4
    console.log(z)
}
console.log(z)