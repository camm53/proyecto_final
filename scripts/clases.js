

//   NOTA!!!, en este ejemplo se asume que hay funciones que conectan a una base de datos pero este no es el caso dentro de
//   este ejemplo representativo por lo que se ve aqui es un codigo no funcional

class Patient {
    constructor(name, patientID, medicalHistory, symptoms) {
        this.name = name;
        this.patientID = patientID;
        this.medicalHistory = medicalHistory;
        this.symptoms = symptoms;
    }

    addCurrentSymptoms(newSymptoms) {
        // Simula agregar los síntomas actuales a los existentes
        this.symptoms.push(...newSymptoms);
        return true;
    }

    getPatientID() {
        return this.patientID;
    }

    getName() {
        return this.name;
    }

    getMedicalHistory() {
        return this.medicalHistory;
    }

    updateMedicalHistory(newHistory) {
        // Simula actualizar el historial médico
        this.medicalHistory.push(newHistory);
        // Simula actualizar la base de datos
        db.updatePatientMedicalHistory(this.patientID, this.medicalHistory);
        return this.medicalHistory;
    }

    startTreatment() {
        // Simula iniciar el tratamiento
        return true;
    }
}



class Doctor {
    constructor(doctorID, name, specialty, workSchedule) {
        this.doctorID = doctorID;
        this.name = name;
        this.specialty = specialty;
        this.workSchedule = workSchedule;
        this.patients = [];
    }

    makeDiagnosis(patient, condition, notes) {
        // Simula realizar un diagnóstico para un paciente
        const diagnosis = new Diagnosis(patient.getPatientID(), this.doctorID, condition, notes);
        // Simula guardar el diagnóstico en la base de datos
         db.saveDiagnosis(diagnosis);
        return diagnosis;
    }

    prescribeTreatment(diagnosis, medications, procedures, start_date, end_date) {
        // Simula recetar un tratamiento para un diagnóstico
        const treatment = new Treatment(diagnosis.diagnosisID, medications, procedures, start_date, end_date);
        // Simula guardar el tratamiento en la base de datos
        db.saveTreatment(treatment);
        return treatment;
    }

    addPatient(patient) {
        // Simula agregar un paciente a la lista del doctor
        this.patients.push(patient);
        // Simula actualizar la base de datos
        db.addPatientToDoctor(patient.getPatientID(), this.doctorID);
        return this.patients;
    }

    removePatient(patient) {
        // Simula eliminar un paciente de la lista del doctor
        this.patients = this.patients.filter(p => p.getPatientID() !== patient.getPatientID());
        // Simula actualizar la base de datos
        db.removePatientFromDoctor(patient.getPatientID(), this.doctorID);
        return this.patients;
    }
}



class Diagnosis {
    constructor(diagnosisID, patientID, doctorID, condition, notes) {
        this.diagnosisID = diagnosisID;
        this.patientID = patientID;
        this.doctorID = doctorID;
        this.condition = condition;
        this.notes = notes;
    }

    getDate() {
        // Simula obtener la fecha del diagnóstico
        return new Date();
    }

    getCondition() {
        return this.condition;
    }

    getPatient() {
        return this.patientID;
    }

    addNotes(newNotes) {
        // Simula agregar notas a las existentes
        this.notes += `\n${newNotes}`;
        // Simula actualizar la base de datos
        db.updateDiagnosisNotes(this.diagnosisID, this.notes);
        return this.notes;
    }

    getNotes() {
        return this.notes;
    }

    getDoctorID() {
        return this.doctorID;
    }
}



class Treatment {
    constructor(treatmentID, diagnosisID, medications, procedures, startDate, endDate) {
        this.treatmentID = treatmentID;
        this.diagnosisID = diagnosisID;
        this.medications = medications;
        this.procedures = procedures;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    getDiagnosis() {
        return this.diagnosisID;
    }

    getMedications() {
        return this.medications;
    }

    getProcedures() {
        return this.procedures;
    }

    getStartDate() {
        return this.startDate;
    }

    getEndDate() {
        return this.endDate;
    }

    getTreatmentID() {
        return this.treatmentID;
    }
}




//   NOTA!!!, en este ejemplo se asume que hay funciones que conectan a una base de datos pero este no es el caso dentro de
//   este ejemplo representativo por lo que se ve aqui es un codigo no funcional

// se crea instancia de Paciente
const patient1 = new Patient("John Doe", "P001", ["Previous illness"], ["Fever", "Headache"]);
console.log("Patient:");
console.log(patient1);

// se crea instancia de Doctor
const doctor1 = new Doctor("D001", "Dr. Smith", "Cardiologist", "Monday-Friday, 9 AM - 5 PM");
console.log("\nDoctor:");
console.log(doctor1);

// se añade paciente a la lista de doctor
doctor1.addPatient(patient1);

// se crea instancia de Diagnosis
const diagnosis1 = doctor1.makeDiagnosis(patient1, "Common Cold", "Patient has a mild cold.");
console.log("\nDiagnosis:");
console.log(diagnosis1);

// se crea instancia de Treatment
const treatment1 = doctor1.prescribeTreatment(diagnosis1, ["Paracetamol"], ["Rest"], new Date(), new Date());
console.log("\nTreatment:");
console.log(treatment1);