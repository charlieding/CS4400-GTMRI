-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 24, 2014 at 03:50 PM
-- Server version: 5.1.69
-- PHP Version: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `cs4400_Group_18`
--

-- --------------------------------------------------------

--
-- Table structure for table `Appointment`
--

CREATE TABLE IF NOT EXISTS `Appointment` (
  `PatientUsername` varchar(50) NOT NULL,
  `DoctorUsername` varchar(50) NOT NULL,
  `Date` date NOT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  PRIMARY KEY (`PatientUsername`,`DoctorUsername`),
  KEY `DoctorUsername` (`DoctorUsername`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Appointment`
--


-- --------------------------------------------------------

--
-- Table structure for table `Doctor`
--

CREATE TABLE IF NOT EXISTS `Doctor` (
  `DoctorUsername` varchar(50) NOT NULL,
  `LicenseNumber` varchar(50) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `DOB` date DEFAULT NULL,
  `WorkPhone` varchar(10) DEFAULT NULL,
  `Specialty` varchar(50) DEFAULT NULL,
  `RoomNumber` int(11) DEFAULT NULL,
  `HomeAddress` varchar(50) DEFAULT NULL,
  `AverageRating` double DEFAULT NULL,
  PRIMARY KEY (`DoctorUsername`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Doctor`
--


-- --------------------------------------------------------

--
-- Table structure for table `DoctorToDoctorComm`
--

CREATE TABLE IF NOT EXISTS `DoctorToDoctorComm` (
  `SenderUsername` varchar(50) NOT NULL,
  `RecipientUsername` varchar(50) NOT NULL,
  `Status` varchar(30) NOT NULL,
  `DateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Content` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`SenderUsername`,`RecipientUsername`,`DateTime`),
  KEY `RecipientUsername` (`RecipientUsername`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `DoctorToDoctorComm`
--


-- --------------------------------------------------------

--
-- Table structure for table `DoctorToPatientComm`
--

CREATE TABLE IF NOT EXISTS `DoctorToPatientComm` (
  `PatientUsername` varchar(50) NOT NULL,
  `DoctorUsername` varchar(50) NOT NULL,
  `Status` varchar(30) NOT NULL,
  `DateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Content` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`PatientUsername`,`DoctorUsername`,`DateTime`),
  KEY `DoctorUsername` (`DoctorUsername`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `DoctorToPatientComm`
--


-- --------------------------------------------------------

--
-- Table structure for table `Doctor_Availability`
--

CREATE TABLE IF NOT EXISTS `Doctor_Availability` (
  `DoctorUsername` varchar(50) NOT NULL,
  `Day` date NOT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  PRIMARY KEY (`DoctorUsername`,`Day`,`StartTime`,`EndTime`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Doctor_Availability`
--


-- --------------------------------------------------------

--
-- Table structure for table `Patient`
--

CREATE TABLE IF NOT EXISTS `Patient` (
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `HomePhone` varchar(10) NOT NULL,
  `AnnualIncome` double DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Gender` varchar(6) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `WorkPhone` varchar(10) DEFAULT NULL,
  `EmergencyContactName` varchar(50) DEFAULT NULL,
  `EmergencyContactPhone` varchar(10) DEFAULT NULL,
  `Weight` double DEFAULT NULL,
  `Height` double DEFAULT NULL,
  `CardNumber` char(16) DEFAULT NULL,
  `PatientUsername` varchar(50) NOT NULL,
  PRIMARY KEY (`PatientUsername`),
  UNIQUE KEY `FirstName` (`FirstName`,`LastName`,`HomePhone`),
  KEY `CardNumber` (`CardNumber`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Patient`
--


-- --------------------------------------------------------

--
-- Table structure for table `PatientToDoctorComm`
--

CREATE TABLE IF NOT EXISTS `PatientToDoctorComm` (
  `PatientUsername` varchar(50) NOT NULL,
  `DoctorUsername` varchar(50) NOT NULL,
  `Status` varchar(30) NOT NULL,
  `DateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Content` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`PatientUsername`,`DoctorUsername`,`DateTime`),
  KEY `DoctorUsername` (`DoctorUsername`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `PatientToDoctorComm`
--


-- --------------------------------------------------------

--
-- Table structure for table `Patient_Allergies`
--

CREATE TABLE IF NOT EXISTS `Patient_Allergies` (
  `PatientUsername` varchar(50) NOT NULL,
  `Allergy` varchar(50) NOT NULL,
  PRIMARY KEY (`PatientUsername`,`Allergy`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Patient_Allergies`
--


-- --------------------------------------------------------

--
-- Table structure for table `Payment_Information`
--

CREATE TABLE IF NOT EXISTS `Payment_Information` (
  `CardNumber` char(16) NOT NULL,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `Type` varchar(15) NOT NULL,
  `DateOfExpiry` date NOT NULL,
  `CVV` int(11) NOT NULL,
  PRIMARY KEY (`CardNumber`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Payment_Information`
--


-- --------------------------------------------------------

--
-- Table structure for table `Prescription`
--

CREATE TABLE IF NOT EXISTS `Prescription` (
  `MedicineName` varchar(50) NOT NULL,
  `DateOfVisit` date NOT NULL,
  `DoctorUsername` varchar(50) NOT NULL,
  `PatientUsername` varchar(50) NOT NULL,
  `Notes` varchar(300) DEFAULT NULL,
  `Dosage` int(11) DEFAULT NULL,
  `Duration` int(11) DEFAULT NULL,
  `Ordered` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`MedicineName`,`DateOfVisit`,`DoctorUsername`,`PatientUsername`),
  KEY `DoctorUsername` (`DoctorUsername`),
  KEY `PatientUsername` (`PatientUsername`),
  KEY `DateOfVisit` (`DateOfVisit`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Prescription`
--


-- --------------------------------------------------------

--
-- Table structure for table `Rates`
--

CREATE TABLE IF NOT EXISTS `Rates` (
  `PatientUsername` varchar(50) NOT NULL,
  `DoctorUsername` varchar(50) NOT NULL,
  `Rating` double NOT NULL,
  PRIMARY KEY (`PatientUsername`,`DoctorUsername`),
  KEY `DoctorUsername` (`DoctorUsername`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Rates`
--


-- --------------------------------------------------------

--
-- Table structure for table `Surgery`
--

CREATE TABLE IF NOT EXISTS `Surgery` (
  `CPT_Code` double NOT NULL,
  `SurgeryType` varchar(30) NOT NULL,
  `SurgeryCost` double NOT NULL,
  PRIMARY KEY (`CPT_Code`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Surgery`
--


-- --------------------------------------------------------

--
-- Table structure for table `Surgery_PreopMed`
--

CREATE TABLE IF NOT EXISTS `Surgery_PreopMed` (
  `CPT_Code` double NOT NULL,
  `Preoperative_Medication` varchar(50) NOT NULL,
  PRIMARY KEY (`CPT_Code`,`Preoperative_Medication`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Surgery_PreopMed`
--


-- --------------------------------------------------------

--
-- Table structure for table `Surgery_Record`
--

CREATE TABLE IF NOT EXISTS `Surgery_Record` (
  `PatientUsername` varchar(50) NOT NULL,
  `DoctorUsername` varchar(50) NOT NULL,
  `SurgeryEndTime` time NOT NULL,
  `SurgeryStartTime` datetime NOT NULL,
  `Complications` varchar(300) DEFAULT NULL,
  `AnesthesiaStartTime` time DEFAULT NULL,
  `NumOfAssistants` int(11) DEFAULT NULL,
  `CPT_Code` double NOT NULL,
  `SurgeonFirstName` varchar(30) NOT NULL,
  `SurgeonLastName` varchar(30) NOT NULL,
  `PatientFirstName` varchar(30) NOT NULL,
  `PatientLastName` varchar(30) NOT NULL,
  PRIMARY KEY (`PatientUsername`,`DoctorUsername`,`CPT_Code`),
  KEY `DoctorUsername` (`DoctorUsername`),
  KEY `CPT_Code` (`CPT_Code`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Surgery_Record`
--


-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `Username` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--


-- --------------------------------------------------------

--
-- Table structure for table `Visit`
--

CREATE TABLE IF NOT EXISTS `Visit` (
  `PatientUsername` varchar(50) NOT NULL,
  `Date` date NOT NULL,
  `DoctorUsername` varchar(50) NOT NULL,
  `BillingAmount` double DEFAULT NULL,
  `DiastolicBP` int(11) DEFAULT NULL,
  `SystolicBP` int(11) DEFAULT NULL,
  PRIMARY KEY (`PatientUsername`,`Date`,`DoctorUsername`),
  KEY `DoctorUsername` (`DoctorUsername`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Visit`
--


-- --------------------------------------------------------

--
-- Table structure for table `Visit_Diagnosis`
--

CREATE TABLE IF NOT EXISTS `Visit_Diagnosis` (
  `PatientUsername` varchar(50) NOT NULL,
  `Date` date NOT NULL,
  `DoctorUsername` varchar(50) NOT NULL,
  `Diagnosis` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`PatientUsername`,`Date`,`DoctorUsername`,`Diagnosis`),
  KEY `DoctorUsername` (`DoctorUsername`),
  KEY `Date` (`Date`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Visit_Diagnosis`
--

