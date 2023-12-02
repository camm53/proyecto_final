class Patient {
    constructor(name, patientID, medicalHistory, symptoms) {
        this.name = name;
        this.patientID = patientID;
        this.medicalHistory = medicalHistory;
        this.symptoms = symptoms;
    }

    addCurrentSymptoms(newSymptoms) {
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
        this.medicalHistory.push(newHistory);
        db.updatePatientMedicalHistory(this.patientID, this.medicalHistory);
        return this.medicalHistory;
    }

    startTreatment() {
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
        const diagnosis = new Diagnosis(this.doctorID, patient.getPatientID(), condition, notes);
        db.saveDiagnosis(diagnosis);
        return diagnosis;
    }

    prescribeTreatment(diagnosis, medications, procedures, startDate, endDate) {
        const treatment = new Treatment(diagnosis.getDiagnosisID(), medications, procedures, startDate, endDate);
        db.saveTreatment(treatment);
        return treatment;
    }

    addPatient(patient) {
        this.patients.push(patient);
        db.addPatientToDoctor(patient.getPatientID(), this.doctorID);
        return this.patients;
    }

    removePatient(patient) {
        this.patients = this.patients.filter(p => p.getPatientID() !== patient.getPatientID());
        db.removePatientFromDoctor(patient.getPatientID(), this.doctorID);
        return this.patients;
    }
}

class Diagnosis {
    constructor(doctorID, patientID, condition, notes) {
        this.diagnosisID = generateDiagnosisID(); // Assume there's a function to generate a unique ID
        this.doctorID = doctorID;
        this.patientID = patientID;
        this.condition = condition;
        this.notes = notes;
    }

    getDate() {
        return new Date();
    }

    getCondition() {
        return this.condition;
    }

    getPatient() {
        return this.patientID;
    }

    addNotes(newNotes) {
        this.notes += `\n${newNotes}`;
        db.updateDiagnosisNotes(this.diagnosisID, this.notes);
        return this.notes;
    }

    getNotes() {
        return this.notes;
    }

    getDoctorID() {
        return this.doctorID;
    }

    getDiagnosisID() {
        return this.diagnosisID;
    }
}

class Treatment {
    constructor(diagnosisID, medications, procedures, startDate, endDate) {
        this.treatmentID = generateTreatmentID(); // Assume there's a function to generate a unique ID
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

// Additional classes

class MedicalDatabase {
    updatePatientMedicalHistory(patientID, medicalHistory) {
        // Simulate updating patient's medical history in the database
    }

    saveDiagnosis(diagnosis) {
        // Simulate saving diagnosis to the database
    }

    saveTreatment(treatment) {
        // Simulate saving treatment to the database
    }

    addPatientToDoctor(patientID, doctorID) {
        // Simulate adding patient to doctor's list in the database
    }

    removePatientFromDoctor(patientID, doctorID) {
        // Simulate removing patient from doctor's list in the database
    }
}

// Instantiate classes

const patient = new Patient("John Doe", "P001", [], ["Fever"]);
const doctor = new Doctor("D001", "Dr. Smith", "Cardiology", "Mon-Fri");
const diagnosis = doctor.makeDiagnosis(patient, "Heart Disease", "Initial diagnosis.");
const treatment = doctor.prescribeTreatment(diagnosis, ["Aspirin"], ["ECG"], "2023-12-01", "2023-12-15");

// Display parameters of the instances created
console.log("Patient:", patient);
console.log("Doctor:", doctor);
console.log("Diagnosis:", diagnosis);
console.log("Treatment:", treatment);