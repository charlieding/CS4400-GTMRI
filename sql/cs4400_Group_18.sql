-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 24, 2014 at 08:40 PM
-- Server version: 5.6.14
-- PHP Version: 5.5.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cding9_gtmrs`
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

INSERT INTO `Appointment` (`PatientUsername`, `DoctorUsername`, `Date`, `StartTime`, `EndTime`) VALUES
('jguinta', 'jduff', '2014-03-28', '03:00:00', '04:00:00'),
('jguinta', 'rlee', '2014-04-09', '00:00:00', '00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Diagnosis`
--

CREATE TABLE IF NOT EXISTS `Diagnosis` (
  `PatientUsername` varchar(50) NOT NULL,
  `Date` date NOT NULL,
  `DoctorUsername` varchar(50) NOT NULL,
  `Diagnosis` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`PatientUsername`,`Date`,`DoctorUsername`,`Diagnosis`),
  KEY `DoctorUsername` (`DoctorUsername`),
  KEY `Date` (`Date`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Diagnosis`
--

INSERT INTO `Diagnosis` (`PatientUsername`, `Date`, `DoctorUsername`, `Diagnosis`) VALUES
('jguinta', '2014-03-28', 'rlee', 'HE ALIVE');

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
  PRIMARY KEY (`DoctorUsername`),
  UNIQUE KEY `LicenseNumber` (`LicenseNumber`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Doctor`
--

INSERT INTO `Doctor` (`DoctorUsername`, `LicenseNumber`, `FirstName`, `LastName`, `DOB`, `WorkPhone`, `Specialty`, `RoomNumber`, `HomeAddress`) VALUES
('jduff', '123XX56', 'Jay', 'Duff', NULL, '1234567890', 'Heart Specialist', 403, 'EasyStreet'),
('rlee', 'IDKWUTIMDOIN', 'Robert', 'Lee', NULL, NULL, 'Psychiatry', NULL, NULL),
('doc', '123456', 'Doc', 'Doctersen', '2014-04-08', '0', 'Heart Specialist', 123, 'fsadfas');

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

INSERT INTO `DoctorToDoctorComm` (`SenderUsername`, `RecipientUsername`, `Status`, `DateTime`, `Content`) VALUES
('jduff', 'rlee', 'Unread', '2014-03-20 21:40:56', 'eyyy');

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

INSERT INTO `DoctorToPatientComm` (`PatientUsername`, `DoctorUsername`, `Status`, `DateTime`, `Content`) VALUES
('jguinta', 'rlee', 'Unread', '2014-03-20 21:41:38', 'SUP DUDE'),
('pat', 'doc', 'Read', '2014-04-24 01:16:04', 'a message that is secret'),
('pat', 'doc', 'Read', '2014-04-24 01:16:15', 'Heres my number so call me maybe'),
('pat', 'doc', 'Read', '2014-04-24 01:44:10', 'hihih'),
('pat', 'doc', 'Read', '2014-04-24 01:48:17', 'jolilkadflad');

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

INSERT INTO `Doctor_Availability` (`DoctorUsername`, `Day`, `StartTime`, `EndTime`) VALUES
('doc', '2014-04-25', '10:00:00', '11:00:00'),
('doc', '2014-06-05', '17:00:00', '18:00:00'),
('jduff', '2014-03-28', '03:00:00', '04:00:00');

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
  `Gender` char(1) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `WorkPhone` varchar(10) DEFAULT NULL,
  `EmergencyContactName` varchar(50) DEFAULT NULL,
  `EmergencyContactPhone` varchar(10) DEFAULT NULL,
  `Weight` double DEFAULT NULL,
  `Height` double DEFAULT NULL,
  `CardNumber` char(16) DEFAULT NULL,
  `PatientUsername` varchar(50) NOT NULL,
  PRIMARY KEY (`PatientUsername`),
  UNIQUE KEY `NamePhone` (`FirstName`,`LastName`,`HomePhone`),
  KEY `CardNumber` (`CardNumber`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Patient`
--

INSERT INTO `Patient` (`FirstName`, `LastName`, `HomePhone`, `AnnualIncome`, `DOB`, `Gender`, `Address`, `WorkPhone`, `EmergencyContactName`, `EmergencyContactPhone`, `Weight`, `Height`, `CardNumber`, `PatientUsername`) VALUES
('Joseph', 'Guinta', '7703455555', NULL, '0000-00-00', 'M', '123 Main St', '2147483647', 'Bob', '989585652', 180, 75, '1234123412341234', 'jguinta'),
('Ully', 'Grant', '7704445555', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ugrant'),
('pat', 'patient', '12345678', 25000, '1993-02-09', 'm', 'lakjflksdj', '0', 'abcde', '4044044004', 200, 181, '1234512345123456', 'pat');

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

INSERT INTO `PatientToDoctorComm` (`PatientUsername`, `DoctorUsername`, `Status`, `DateTime`, `Content`) VALUES
('jguinta', 'jduff', 'Unread', '2014-01-22 10:00:00', 'Testing'),
('pat', 'doc', 'Read', '2014-04-24 01:11:41', 'Hey I just met you and this is crazy');

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

INSERT INTO `Patient_Allergies` (`PatientUsername`, `Allergy`) VALUES
('jguinta', 'Smelly Stuff'),
('pat', 'a1'),
('pat', 'a2'),
('pat', 'a3'),
('pat', 'a4');

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

INSERT INTO `Payment_Information` (`CardNumber`, `FirstName`, `LastName`, `Type`, `DateOfExpiry`, `CVV`) VALUES
('1234123412341234', 'Joseph', 'Guinta', 'VISA', '2016-01-19', 722),
('1234512345123456', 'Pat', 'Patient', 'Discover', '2014-12-18', 4566);

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

INSERT INTO `Prescription` (`MedicineName`, `DateOfVisit`, `DoctorUsername`, `PatientUsername`, `Notes`, `Dosage`, `Duration`, `Ordered`) VALUES
('DRUGS', '2014-03-28', 'rlee', 'jguinta', 'NOTES HERE', 20, 30, 1),
('MOLLY', '2014-03-28', 'rlee', 'pat', 'I GOT MOLLY I GOT WHITE I GOT MOLLY I GOT WHITE.', 2, 2, 1);

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

INSERT INTO `Rates` (`PatientUsername`, `DoctorUsername`, `Rating`) VALUES
('jguinta', 'rlee', 5),
('jguinta', 'jduff', 5),
('ugrant', 'jduff', 5),
('ugrant', 'rlee', 5),
('pat', 'doc', 5);

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

INSERT INTO `Surgery` (`CPT_Code`, `SurgeryType`, `SurgeryCost`) VALUES
(0, 'Test', 5);

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

INSERT INTO `Surgery_PreopMed` (`CPT_Code`, `Preoperative_Medication`) VALUES
(0, 'WHITE');

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

INSERT INTO `Surgery_Record` (`PatientUsername`, `DoctorUsername`, `SurgeryEndTime`, `SurgeryStartTime`, `Complications`, `AnesthesiaStartTime`, `NumOfAssistants`, `CPT_Code`, `SurgeonFirstName`, `SurgeonLastName`, `PatientFirstName`, `PatientLastName`) VALUES
('jguinta', 'rlee', '00:00:00', '2014-04-24 00:00:00', NULL, NULL, NULL, 0, '', '', '', ''),
('jguinta', 'jduff', '00:00:00', '2014-04-24 00:00:00', NULL, NULL, NULL, 0, '', '', '', ''),
('ugrant', 'rlee', '00:00:00', '2014-04-24 00:00:00', NULL, NULL, NULL, 0, '', '', '', ''),
('pat', 'doc', '19:00:00', '2014-04-10 17:00:00', 'he ded', '16:00:00', 12, 0, 'Doc', 'Doctersen', 'pat', 'patient');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `Username` varchar(50) NOT NULL,
  `Password` varchar(70) NOT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`Username`, `Password`) VALUES
('jduff', 'mypass'),
('jguinta', 'password'),
('rlee', 'thing'),
('ugrant', 'kkk'),
('kjohnson', 'stuff'),
('ad', '$2a$08$jX/hIpe5y0VtqkC7xS5WNOI/YKomgpAq9d/uCln4J0jhLf4Omwdsq'),
('pat', '$2a$08$Fs16xOVM7DTAO9y1sMYbr.mNTmFx.TZRtNVucYQY/lTtFqJgBf1Gm'),
('doc', '$2a$08$mdIq6wL1/dtrZCH8A1KEZua4T.iHez92ISO12oDe1qoN.7smWRI1C');

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

INSERT INTO `Visit` (`PatientUsername`, `Date`, `DoctorUsername`, `BillingAmount`, `DiastolicBP`, `SystolicBP`) VALUES
('jguinta', '2014-03-28', 'rlee', 25000, 120, 80),
('pat', '2014-03-28', 'doc', 0, 120, 80);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
