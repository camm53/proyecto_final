let studentName = "Raul Ramirez";

let studentAge = 17;
let isEnrolled = true;
let gradeMath = 10;
let gradeScience = 7;
let gradeLanguage = 8;
prom = ((gradeLanguage+gradeMath+gradeScience)/3).toFixed(2);

let totalClases = 30;
let attendedClasses = 28;
let asistencia = ((28/30)*100).toFixed(2);

console.log("Nombre del estudiante: "+ studentName);
console.log("Edad del estudiante: "+ studentAge);
console.log("¿Esta inscrito? " +(isEnrolled == true? "si":"no"));
console.log("Calificacion en Matematicas: "+ gradeMath);
console.log("Calificacion en Ciencias: "+ gradeScience);
console.log("Calificacion en Lenguaje: "+ gradeLanguage);
console.log("Promedio de calificaciones: "+ prom);
console.log("Total de clases: "+ totalClases);
console.log("Clases asistidas: "+ attendedClasses);
console.log("Porcentaje de asistencia: "+ asistencia+"%");




