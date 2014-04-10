/***************
*Hostgator database:
*Name: cding9_gtmrs
*Password: cs4400gtmrs
****************/

CREATE DATABASE if not exists cding9_gtmrs;    /*Uncomment this line hostgator*/



/*create four tables*/

CREATE TABLE User (

	Username VARCHAR(50)  NOT NULL,
	Password VARCHAR(50)  NOT NULL,
	PRIMARY KEY (Username)
);

CREATE TABLE Doctor (

	DoctorUsername VARCHAR(50) NOT NULL,
	LicenseNumber VARCHAR(50) NOT NULL,
	FirstName VARCHAR(50) NOT NULL,
	LastName VARCHAR(50) NOT NULL,
	DOB DATE,
	WorkPhone VARCHAR(10),
	Specialty VARCHAR(50),
	RoomNumber INT,
	HomeAddress VARCHAR(50),
	AverageRating REAL,
	PRIMARY KEY (DoctorUsername),
	FOREIGN KEY (DoctorUsername) REFERENCES User (Username)
);


CREATE TABLE Doctor_Availability(
	DoctorUsername VARCHAR(50) NOT NULL,
	Day  	DATE NOT NULL,
	StartTime TIME NOT NULL,
	EndTime TIME NOT NULL,
	PRIMARY KEY (DoctorUsername, Day, StartTime, EndTime),
	FOREIGN KEY (DoctorUsername) REFERENCES Doctor (DoctorUsername)
);


CREATE TABLE Payment_Information (
	CardNumber CHAR(16) NOT NULL,
	FirstName VARCHAR(30) NOT NULL,
	LastName VARCHAR(30) NOT NULL,
	Type            VARCHAR(15) NOT NULL,
	DateOfExpiry    DATE NOT NULL,
	CVV	INT 	NOT NULL,
	PRIMARY KEY (CardNumber)
);


CREATE TABLE Patient(
	FirstName VARCHAR(50) NOT NULL,
	LastName VARCHAR(50) NOT NULL,
	HomePhone VARCHAR(10) NOT NULL,
	AnnualIncome REAL,
	DOB DATE,
	Gender CHAR(1),
	Address VARCHAR(50),
	WorkPhone VARCHAR(10),
	EmergencyContactName varchar(50),
	EmergencyContactPhone VARCHAR(10),
	Weight REAL,
	Height REAL,
	CardNumber CHAR(16),
	PatientUsername  VARCHAR(50) NOT NULL,
	PRIMARY KEY (PatientUsername),
	FOREIGN KEY (CardNumber) REFERENCES Payment_Information (CardNumber),
FOREIGN KEY (PatientUsername ) REFERENCES User (Username)
	
);

CREATE TABLE Patient_Allergies(
	PatientUsername VARCHAR(50) NOT NULL,
	Allergy VARCHAR(50) NOT NULL,
	PRIMARY KEY (PatientUsername , Allergy),
	FOREIGN KEY (PatientUsername ) REFERENCES Patient (PatientUsername )
);

//Date will be either set to current date by application or by a trigger
CREATE TABLE Visit(
	PatientUsername VARCHAR(50) NOT NULL,
	Date DATE NOT NULL,
	DoctorUsername VARCHAR(50) NOT NULL,
	BillingAmount REAL,
DiastolicBP INT,
	SystolicBP INT,
	PRIMARY KEY (PatientUsername, Date, DoctorUsername),
	FOREIGN KEY (PatientUsername) REFERENCES Patient (PatientUsername),
	FOREIGN KEY (DoctorUsername) REFERENCES Doctor (DoctorUsername)
);

CREATE TABLE Visit_Diagnosis (
	PatientUsername VARCHAR(50) NOT NULL,
	Date DATE NOT NULL,
	DoctorUsername VARCHAR(50) NOT NULL,
	Diagnosis VARCHAR(100),
	PRIMARY KEY (PatientUsername, Date, DoctorUsername, Diagnosis),
	FOREIGN KEY (PatientUsername) REFERENCES Patient (Username),
	FOREIGN KEY (DoctorUsername) REFERENCES Doctor (Number),
	FOREIGN KEY (Date) REFERENCES Visit (Date)
);


CREATE TABLE Surgery (
	CPT_Code REAL NOT NULL,
	SurgeryType VARCHAR(30)  NOT NULL,
	SurgeryCost REAL NOT NULL,
	PRIMARY KEY (CPT_Code)
);

CREATE TABLE Surgery_PreopMed (
	CPT_Code REAL NOT NULL,
	Preoperative_Medication VARCHAR(50) NOT NULL,
	PRIMARY KEY (CPT_Code, Preoperative_Medication),
	FOREIGN KEY (CPT_Code) REFERENCES Surgery (CPT_Code)
);


CREATE TABLE Prescription (
	MedicineName VARCHAR(50) NOT NULL,
	DateOfVisit DATE NOT NULL,
	DoctorUsername VARCHAR(50) NOT NULL,
	PatientUsername VARCHAR(50) NOT NULL,
	Notes VARCHAR(300),
	Dosage INT,
	Duration INT,
	Ordered BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (MedicineName, DateOfVisit, DoctorUsername, PatientUsername),
	FOREIGN KEY (DoctorUsername) REFERENCES Doctor (DoctorUsername),
	FOREIGN KEY (PatientUsername) REFERENCES Patient (PatientUsername),
	FOREIGN KEY (DateOfVisit) REFERENCES Visit (Date)
);



CREATE TABLE DoctorToDoctorComm (
	SenderUsername  VARCHAR(50) NOT NULL,
	RecipientUsername  VARCHAR(50) NOT NULL,
	Status VARCHAR(30) NOT NULL, 
	DateTime TIMESTAMP NOT NULL,
	Content VARCHAR(300),
	PRIMARY KEY (SenderUsername, RecipientUsername, DateTime),
	FOREIGN KEY (SenderUsername) REFERENCES Doctor (DoctorUsername),
	FOREIGN KEY (RecipientUsername) REFERENCES Doctor (DoctorUsername)
);



CREATE TABLE Appointment (
	PatientUsername VARCHAR(50) NOT NULL,
	DoctorUsername VARCHAR(50) NOT NULL,
	Date DATE NOT NULL,
	StartTime TIME NOT NULL,
	EndTime TIME NOT NULL,
	PRIMARY KEY (PatientUsername, DoctorUsername),
	FOREIGN KEY (PatientUsername) REFERENCES Patient (PatientUsername),
	FOREIGN KEY (DoctorUsername) REFERENCES Doctor (DoctorUsername)
);



CREATE TABLE Rates (
	PatientUsername VARCHAR(50) NOT NULL,
	DoctorUsername VARCHAR(50) NOT NULL,
	Rating REAL NOT NULL  CHECK (Rating >= 0 AND Rating <=5),
	PRIMARY KEY (PatientUsername, DoctorUsername),
	FOREIGN KEY (PatientUsername) REFERENCES Patient (PatientUsername),
	FOREIGN KEY (DoctorUsername) REFERENCES Doctor (DoctorUsername)
);


CREATE TABLE PatientToDoctorComm (
	PatientUsername VARCHAR(50) NOT NULL,
	DoctorUsername VARCHAR(50) NOT NULL,
	Status VARCHAR(30) NOT NULL,
	DateTime TIMESTAMP NOT NULL,
	Content VARCHAR(300),
	PRIMARY KEY (PatientUsername, DoctorUsername ,DateTime),
	FOREIGN KEY (PatientUsername) REFERENCES Patient (PatientUsername),
	FOREIGN KEY (DoctorUsername) REFERENCES Doctor (DoctorUsername)
);



CREATE TABLE DoctorToPatientComm (
	PatientUsername VARCHAR(50) NOT NULL,
	DoctorUsername VARCHAR(50) NOT NULL,
	Status varchar(30) NOT NULL,
	DateTime TIMESTAMP NOT NULL,
	Content varchar(300),
	PRIMARY KEY (PatientUsername, DoctorUsername, DateTime),
	FOREIGN KEY (PatientUsername) REFERENCES Patient (PatientUsername),
	FOREIGN KEY (DoctorUsername) REFERENCES Doctor (DoctorUsername)
);


CREATE TABLE Surgery_Record (
	PatientUsername VARCHAR(50) NOT NULL,
	DoctorUsername VARCHAR(50) NOT NULL,
	SurgeryEndTime TIME NOT NULL,
	SurgeryStartTime TIME NOT NULL,
	Complications VARCHAR(300),
	AnesthesiaStartTime TIME,
	NumOfAssistants INT,
	CPT_Code REAL NOT NULL,
	SurgeonFirstName VARCHAR(30) NOT NULL,
	SurgeonLastName VARCHAR(30) NOT NULL,
	PatientFirstName VARCHAR(30) NOT NULL,
	PatientLastName VARCHAR(30) NOT NULL,
	PRIMARY KEY (PatientUsername, DoctorUsername, CPT_Code),
	FOREIGN KEY (PatientUsername) REFERENCES Patient (PatientUsername),
	FOREIGN KEY (DoctorUsername) REFERENCES Doctor (DoctorUsername),
	FOREIGN KEY (CPT_Code) REFERENCES Surgery(CPT_Code)
);
