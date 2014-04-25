-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 25, 2014 at 06:22 AM
-- Server version: 5.6.14
-- PHP Version: 5.5.6
CREATE DATABASE if not exists cding9_gtmrs;    /*Uncomment this line hostgator*/

USE cding9_gtmrs;

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
('csanders', 'pcook', '2014-08-23', '14:00:00', '15:00:00'),
('sprice', 'jgray', '2014-08-11', '14:00:00', '15:00:00'),
('ayoung', 'jcampbell', '2014-07-23', '12:00:00', '13:00:00');

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

INSERT INTO `Doctor` (`DoctorUsername`, `LicenseNumber`, `FirstName`, `LastName`, `DOB`, `WorkPhone`, `Specialty`, `RoomNumber`, `HomeAddress`, `AverageRating`) VALUES
('pcook', '3476', 'Phyllis', 'Cook', '1956-01-18', '1', 'Gynecologist', 687, '123 Main St.', NULL),
('kcoleman', '7661', 'Kevin', 'Coleman', '1948-01-13', '1', 'Eye Physician', 805, '123 Main St.', NULL),
('khernandez', '2526', 'Kelly', 'Hernandez', '1978-12-02', '1', 'Orthopedics', 205, '123 Main St.', NULL),
('dphillips', '9321', 'Dorothy', 'Phillips', '1950-04-29', '1', 'Orthopedics', 311, '123 Main St.', NULL),
('bward', '8445', 'Benjamin', 'Ward', '1956-02-01', '1', 'Orthopedics', 746, '123 Main St.', NULL),
('jgray', '4019', 'Jimmy', 'Gray', '1979-03-11', '1', 'Psychiatry', 781, '123 Main St.', NULL),
('kmoore', '3862', 'Katherine', 'Moore', '1951-10-09', '1', 'Psychiatry', 102, '123 Main St.', NULL),
('kjenkins', '8949', 'Kathryn', 'Jenkins', '1954-08-10', '1', 'Psychiatry', 819, '123 Main St.', NULL),
('rgonzales', '4228', 'Ruby', 'Gonzales', '1972-04-01', '1', 'Gynecologist', 633, '123 Main St.', NULL),
('rgreen', '1162', 'Ronald', 'Green', '1972-08-31', '1', 'Gynecologist', 550, '123 Main St.', NULL),
('hpowell', '9529', 'Henry', 'Powell', '1968-04-26', '1', 'Eye Physician', 717, '123 Main St.', NULL),
('tbailey', '4671', 'Tina', 'Bailey', '1975-09-04', '1', 'Heart Specialist', 800, '123 Main St.', NULL),
('pcooper', '5707', 'Pamela', 'Cooper', '1973-06-30', '1', 'Heart Specialist', 274, '123 Main St.', NULL),
('dlee', '6809', 'Denise', 'Lee', '1953-07-24', '1', 'Heart Specialist', 343, '123 Main St.', NULL),
('mrodriguez', '3983', 'Mildred', 'Rodriguez', '1946-06-10', '1', 'Eye Physician', 769, '123 Main St.', NULL),
('rjones', '4679', 'Rachel', 'Jones', '1980-02-27', '1', 'General Physician', 434, '123 Main St.', NULL),
('sramirez', '8757', 'Sharon', 'Ramirez', '1951-05-23', '1', 'General Physician', 386, '123 Main St.', NULL),
('jcampbell', '8814', 'Jerry', 'Campbell', '1959-12-14', '1', 'General Physician', 478, '123 Main St.', NULL);

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
('jcampbell', 'bward', 'Unread', '2014-04-25 04:21:09', 'I mustache you a question!'),
('dlee', 'sramirez', 'Unread', '2014-04-25 04:21:37', 'I have an interesting case here'),
('kcoleman', 'rgonzales', 'Unread', '2014-04-25 04:22:15', 'Wanna grab lunch?');

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
('hthompson', 'rjones', 'Unread', '2014-04-25 04:19:23', 'You haven''t come in a while!'),
('speterson', 'jgray', 'Unread', '2014-04-25 04:19:56', 'We can meet soon'),
('ayoung', 'dphillips', 'Unread', '2014-04-25 04:20:26', 'Your test results are in');

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
('bward', '2014-06-06', '09:00:00', '10:00:00'),
('dlee', '2014-08-27', '17:00:00', '18:00:00'),
('dphillips', '2014-06-25', '12:00:00', '13:00:00'),
('hpowell', '2014-06-13', '13:00:00', '14:00:00'),
('kcoleman', '2014-08-02', '10:00:00', '11:00:00'),
('khernandez', '2014-07-20', '11:00:00', '12:00:00'),
('kjenkins', '2014-08-17', '17:00:00', '18:00:00'),
('kmoore', '2014-08-15', '14:00:00', '15:00:00'),
('mrodriguez', '2014-05-23', '09:00:00', '10:00:00'),
('pcooper', '2014-07-28', '16:00:00', '17:00:00'),
('rgonzales', '2014-08-14', '11:00:00', '12:00:00'),
('rgreen', '2014-06-01', '16:00:00', '17:00:00'),
('rjones', '2014-08-20', '17:00:00', '18:00:00'),
('sramirez', '2014-05-18', '11:00:00', '12:00:00'),
('tbailey', '2014-05-14', '16:00:00', '17:00:00');

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

INSERT INTO `Patient` (`FirstName`, `LastName`, `HomePhone`, `AnnualIncome`, `DOB`, `Gender`, `Address`, `WorkPhone`, `EmergencyContactName`, `EmergencyContactPhone`, `Weight`, `Height`, `CardNumber`, `PatientUsername`) VALUES
('Nicholas', 'Hall', '276-429-20', 32382, '1968-11-26', 'male', '123 Something St.', '0', 'Louise Jenkins', '483-286-17', 207, 162, NULL, 'nhall'),
('Carl', 'Sanders', '368-959-89', 31070, '1983-05-07', 'male', '123 Something St.', '0', 'Thomas King', '571-812-26', 240, 175, NULL, 'csanders'),
('Nicole', 'Sanchez', '549-310-40', 34108, '1982-09-03', 'female', '123 Something St.', '0', 'Edward Nelson', '505-532-38', 107, 163, NULL, 'nsanchez'),
('Sean', 'Peterson', '234-291-83', 25286, '1982-11-16', 'male', '123 Something St.', '0', 'Shawn Williams', '507-468-68', 241, 115, NULL, 'speterson'),
('Aaron', 'Young', '313-264-81', 27250, '1966-10-02', 'male', '123 Something St.', '0', 'Heather Anderson', '577-732-58', 227, 176, NULL, 'ayoung'),
('Barbara', 'Evans', '661-443-86', 30202, '1980-02-20', 'female', '123 Something St.', '0', 'Russell Cook', '186-789-87', 233, 198, NULL, 'bevans'),
('Joe', 'Wood', '492-726-44', 26713, '1953-10-28', 'male', '123 Something St.', '0', 'Mark Howard', '240-389-47', 233, 132, NULL, 'jwood'),
('Martin', 'Smith', '554-732-12', 23639, '1956-03-21', 'male', '123 Something St.', '0', 'Betty Edwards', '456-154-74', 169, 143, NULL, 'msmith'),
('Howard', 'Thompson', '451-454-14', 33263, '1988-07-07', 'male', '123 Something St.', '0', 'Johnny Long', '411-251-25', 137, 150, NULL, 'hthompson'),
('Shawn', 'Price', '118-734-87', 23960, '1960-05-06', 'male', '123 Something St.', '0', 'Patrick Cox', '925-376-83', 125, 100, NULL, 'sprice');

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
('ayoung', 'kjenkins', 'Unread', '2014-04-25 04:17:45', 'Hi there!'),
('nhall', 'dlee', 'Unread', '2014-04-25 04:18:13', 'Can we meet soon?'),
('bevans', 'rjones', 'Unread', '2014-04-25 04:18:38', 'We need to meet urgently');

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
('ayoung', 'Dust'),
('ayoung', 'Gluten'),
('ayoung', 'Lactose'),
('bevans', 'Dust'),
('bevans', 'Gluten'),
('bevans', 'Pollen'),
('csanders', 'Dust'),
('csanders', 'Gluten'),
('csanders', 'Peanuts'),
('hthompson', 'Dust'),
('hthompson', 'Lactose'),
('hthompson', 'Peanuts'),
('jwood', 'Dust'),
('jwood', 'Gluten'),
('jwood', 'Lactose'),
('msmith', 'Lactose'),
('msmith', 'Peanuts'),
('msmith', 'Shellfish'),
('nhall', 'Gluten'),
('nhall', 'Lactose'),
('nhall', 'Shellfish'),
('nsanchez', 'Gluten'),
('nsanchez', 'Lactose'),
('nsanchez', 'Peanuts'),
('speterson', 'Dust'),
('speterson', 'Gluten'),
('speterson', 'Lactose'),
('sprice', 'Gluten'),
('sprice', 'Peanuts'),
('sprice', 'Pollen');

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
('Antibiotics', '2014-03-19', 'kcoleman', 'ayoung', 'Once a day with breakfast', 3, 7, 0),
('Robitussin', '2014-03-19', 'kcoleman', 'ayoung', 'Once a day before bed', 0, 6, 0),
('Heroine', '2014-03-19', 'kcoleman', 'ayoung', 'Once after food', 1, 1, 0),
('Heroine', '2014-03-25', 'kcoleman', 'bevans', 'Once after food', 2, 4, 0),
('Tylenol', '2014-03-25', 'kcoleman', 'bevans', 'Once a day with breakfast', 0, 6, 0),
('Robitussin', '2014-03-25', 'kcoleman', 'bevans', 'Once a day before bed', 3, 8, 0),
('Heroine', '2014-03-09', 'khernandez', 'hthompson', 'Once a day before bed', 0, 8, 0),
('Tylenol', '2014-03-09', 'khernandez', 'hthompson', 'Once a day with breakfast', 3, 1, 0),
('Antibiotics', '2014-03-09', 'khernandez', 'hthompson', 'Take with dinner', 4, 3, 0),
('Antibiotics', '2014-03-30', 'khernandez', 'jwood', 'Take with dinner', 0, 5, 0),
('Antibiotics', '2014-02-15', 'kjenkins', 'msmith', 'Once a day with breakfast', 3, 7, 0),
('Heroine', '2014-02-15', 'kjenkins', 'msmith', 'Once a day before bed', 0, 0, 0),
('Heroine', '2014-02-25', 'kjenkins', 'nsanchez', 'Take with dinner', 1, 4, 0),
('Heroine', '2014-01-16', 'kmoore', 'speterson', 'Once after food', 4, 3, 0),
('Antibiotics', '2014-01-16', 'kmoore', 'speterson', 'Take with dinner', 2, 0, 0),
('Heroine', '2014-02-05', 'kmoore', 'sprice', 'Take with dinner', 0, 6, 0),
('Antibiotics', '2014-02-05', 'kmoore', 'sprice', 'Once a day with breakfast', 2, 9, 0),
('Tylenol', '2014-02-21', 'kmoore', 'bevans', 'Once a day before bed', 1, 0, 0),
('Heroine', '2014-02-08', 'mrodriguez', 'csanders', 'Take with dinner', 3, 8, 0),
('Robitussin', '2014-02-17', 'mrodriguez', 'hthompson', 'Once a day before bed', 0, 0, 0),
('Tylenol', '2014-02-17', 'mrodriguez', 'hthompson', 'Once a day with breakfast', 4, 5, 0),
('Robitussin', '2014-02-24', 'mrodriguez', 'jwood', 'Take with dinner', 2, 7, 0),
('Heroine', '2014-02-24', 'mrodriguez', 'jwood', 'Once a day with breakfast', 0, 4, 0),
('Antibiotics', '2014-02-24', 'mrodriguez', 'jwood', 'Once a day before bed', 3, 2, 0),
('Heroine', '2014-02-23', 'pcook', 'msmith', 'Once a day before bed', 1, 5, 0),
('Robitussin', '2014-03-02', 'pcook', 'nhall', 'Once a day before bed', 2, 6, 0),
('Antibiotics', '2014-03-02', 'pcook', 'nhall', 'Once a day with breakfast', 3, 4, 0),
('Tylenol', '2014-03-02', 'pcook', 'nhall', 'Once after food', 1, 1, 0),
('Antibiotics', '2014-03-03', 'pcook', 'nsanchez', 'Once after food', 0, 9, 0),
('Robitussin', '2014-03-03', 'pcook', 'nsanchez', 'Once a day before bed', 3, 0, 0),
('Heroine', '2014-03-03', 'pcook', 'nsanchez', 'Take with dinner', 1, 1, 0),
('Antibiotics', '2014-01-20', 'pcooper', 'speterson', 'Once a day with breakfast', 4, 9, 0),
('Tylenol', '2014-01-20', 'pcooper', 'speterson', 'Once a day before bed', 1, 1, 0),
('Heroine', '2014-01-20', 'pcooper', 'speterson', 'Take with dinner', 3, 0, 0),
('Heroine', '2014-01-01', 'rgonzales', 'csanders', 'Once after food', 0, 4, 0),
('Tylenol', '2014-03-08', 'rgonzales', 'hthompson', 'Once a day with breakfast', 0, 6, 0),
('Heroine', '2014-03-16', 'rgonzales', 'jwood', 'Once a day with breakfast', 0, 3, 0),
('Tylenol', '2014-01-21', 'rgreen', 'msmith', 'Once a day with breakfast', 2, 3, 0),
('Robitussin', '2014-01-21', 'rgreen', 'msmith', 'Once after food', 4, 2, 0),
('Antibiotics', '2014-01-21', 'rgreen', 'msmith', 'Once a day before bed', 1, 6, 0),
('Tylenol', '2014-03-18', 'kcoleman', 'speterson', 'Once a day with breakfast', 1, 5, 0),
('Robitussin', '2014-02-26', 'jgray', 'nhall', 'Once after food', 4, 1, 0),
('Tylenol', '2014-02-26', 'jgray', 'nhall', 'Once a day with breakfast', 3, 2, 0),
('Heroine', '2014-01-23', 'jgray', 'msmith', 'Once after food', 4, 5, 0),
('Robitussin', '2014-01-23', 'jgray', 'msmith', 'Once a day with breakfast', 3, 7, 0),
('Tylenol', '2014-01-23', 'jgray', 'msmith', 'Take with dinner', 1, 3, 0),
('Robitussin', '2014-03-26', 'jcampbell', 'jwood', 'Once a day before bed', 2, 8, 0),
('Heroine', '2014-03-26', 'jcampbell', 'jwood', 'Once a day with breakfast', 1, 2, 0),
('Antibiotics', '2014-02-09', 'jcampbell', 'csanders', 'Take with dinner', 3, 7, 0),
('Antibiotics', '2014-02-22', 'hpowell', 'bevans', 'Once after food', 1, 0, 0),
('Robitussin', '2014-03-31', 'dphillips', 'speterson', 'Take with dinner', 4, 7, 0),
('Tylenol', '2014-03-31', 'dphillips', 'speterson', 'Once after food', 3, 2, 0),
('Antibiotics', '2014-03-31', 'dphillips', 'speterson', 'Once a day before bed', 1, 9, 0),
('Tylenol', '2014-02-10', 'dphillips', 'nsanchez', 'Once after food', 0, 4, 0),
('Antibiotics', '2014-02-10', 'dphillips', 'nsanchez', 'Once a day before bed', 1, 1, 0),
('Robitussin', '2014-03-29', 'dlee', 'msmith', 'Once a day with breakfast', 2, 7, 0),
('Antibiotics', '2014-03-29', 'dlee', 'msmith', 'Once a day before bed', 1, 6, 0),
('Antibiotics', '2014-01-16', 'bward', 'bevans', 'Once a day before bed', 1, 4, 0),
('Robitussin', '2014-01-16', 'bward', 'bevans', 'Once after food', 3, 7, 0),
('Robitussin', '2014-03-29', 'rgreen', 'nsanchez', 'Once a day before bed', 4, 9, 0),
('Tylenol', '2014-03-29', 'rgreen', 'nsanchez', 'Once a day with breakfast', 3, 4, 0),
('Robitussin', '2014-01-16', 'rjones', 'speterson', 'Once a day with breakfast', 3, 3, 0),
('Heroine', '2014-01-16', 'rjones', 'speterson', 'Once a day before bed', 1, 9, 0),
('Antibiotics', '2014-03-02', 'rjones', 'bevans', 'Once a day before bed', 0, 4, 0),
('Tylenol', '2014-03-02', 'rjones', 'bevans', 'Take with dinner', 4, 1, 0),
('Robitussin', '2014-03-02', 'rjones', 'bevans', 'Once after food', 2, 7, 0),
('Heroine', '2014-02-03', 'sramirez', 'csanders', 'Once after food', 0, 5, 0),
('Tylenol', '2014-03-05', 'sramirez', 'hthompson', 'Take with dinner', 1, 0, 0),
('Antibiotics', '2014-03-05', 'sramirez', 'hthompson', 'Once a day before bed', 0, 8, 0),
('Heroine', '2014-03-05', 'sramirez', 'hthompson', 'Once after food', 2, 3, 0),
('Robitussin', '2014-01-25', 'tbailey', 'msmith', 'Take with dinner', 0, 7, 0),
('Robitussin', '2014-02-09', 'tbailey', 'nhall', 'Once a day before bed', 0, 7, 0),
('Tylenol', '2014-03-02', 'tbailey', 'nsanchez', 'Once a day before bed', 2, 1, 0);

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
(8810, 'Stent Insertion', 1500),
(6789, 'Complex Spinal Fusion', 1500),
(1234, 'Hysterectomy', 1500),
(3091, 'Knee Arthroscopy', 1500),
(6183, 'Prostatectomy', 1500);

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
(3091, 'Calcium'),
(6183, 'Caffeine'),
(6183, 'Potassium'),
(6789, 'Painkiller'),
(8810, 'Aspirin'),
(8810, 'Blood Thinner');

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
('nsanchez', 'pcooper', '13:00:00', '2014-04-05 12:00:00', 'None', '11:00:00', 9, 8810, 'Pamela', 'Cooper', 'Nicole', 'Sanchez'),
('csanders', 'tbailey', '19:00:00', '2014-02-11 18:00:00', 'None', '17:00:00', 5, 8810, 'Tina', 'Bailey', 'Carl', 'Sanders'),
('nhall', 'hpowell', '16:00:00', '2014-01-04 15:00:00', 'None', '14:00:00', 10, 3091, 'Henry', 'Powell', 'Nicholas', 'Hall'),
('sprice', 'rgreen', '19:00:00', '2014-04-18 18:00:00', 'None', '17:00:00', 8, 3091, 'Ronald', 'Green', 'Shawn', 'Price'),
('hthompson', 'rgonzales', '16:00:00', '2014-04-11 15:00:00', 'None', '14:00:00', 6, 6789, 'Ruby', 'Gonzales', 'Howard', 'Thompson'),
('msmith', 'kjenkins', '17:00:00', '2014-04-15 16:00:00', 'None', '15:00:00', 3, 8810, 'Kathryn', 'Jenkins', 'Martin', 'Smith'),
('jwood', 'kmoore', '15:00:00', '2014-01-15 14:00:00', 'None', '13:00:00', 7, 6183, 'Katherine', 'Moore', 'Joe', 'Wood'),
('bevans', 'jgray', '12:00:00', '2014-03-11 11:00:00', 'None', '10:00:00', 4, 3091, 'Jimmy', 'Gray', 'Barbara', 'Evans'),
('ayoung', 'bward', '17:00:00', '2014-03-16 16:00:00', 'None', '15:00:00', 2, 6183, 'Benjamin', 'Ward', 'Aaron', 'Young'),
('speterson', 'dphillips', '12:00:00', '2014-04-05 11:00:00', 'None', '10:00:00', 2, 6789, 'Dorothy', 'Phillips', 'Sean', 'Peterson'),
('nsanchez', 'khernandez', '12:00:00', '2014-03-22 11:00:00', 'None', '10:00:00', 3, 3091, 'Kelly', 'Hernandez', 'Nicole', 'Sanchez'),
('csanders', 'kcoleman', '14:00:00', '2014-03-26 13:00:00', 'None', '12:00:00', 7, 1234, 'Kevin', 'Coleman', 'Carl', 'Sanders'),
('nhall', 'pcook', '17:00:00', '2014-02-27 16:00:00', 'None', '15:00:00', 7, 3091, 'Phyllis', 'Cook', 'Nicholas', 'Hall'),
('speterson', 'dlee', '19:00:00', '2014-04-12 18:00:00', 'None', '17:00:00', 1, 3091, 'Denise', 'Lee', 'Sean', 'Peterson'),
('ayoung', 'mrodriguez', '15:00:00', '2014-02-18 14:00:00', 'None', '13:00:00', 7, 6183, 'Mildred', 'Rodriguez', 'Aaron', 'Young'),
('bevans', 'rjones', '16:00:00', '2014-01-16 15:00:00', 'None', '14:00:00', 3, 6789, 'Rachel', 'Jones', 'Barbara', 'Evans'),
('jwood', 'sramirez', '19:00:00', '2014-03-01 18:00:00', 'None', '17:00:00', 5, 1234, 'Sharon', 'Ramirez', 'Joe', 'Wood'),
('msmith', 'jcampbell', '18:00:00', '2014-03-25 17:00:00', 'None', '16:00:00', 8, 8810, 'Jerry', 'Campbell', 'Martin', 'Smith');

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
('rjones', '$2a$08$wByiDIcysJa3FyTE2cnPdOA/yUXKKDPqsENwFPjx8WJZ48P/iHzRa'),
('sramirez', '$2a$08$XWDg/jYXiQ/2J4F5IaB4Ru20jApSHhF8Eetb5diUjGZtyF2iiNXI2'),
('jcampbell', '$2a$08$qZHuQ3JJfbd7uO4ZKd57YeG8EQoruNoQuSKY1HPOvWV98.8mozYI.'),
('tbailey', '$2a$08$YhOxhJPCZzaDxrPUJOzX/.j3jmbMTUPr69ZZNmQhxI5sQPtjfW4GW'),
('pcooper', '$2a$08$pjjcSImyYMcz6n48LAzk7e0HtW3W.fbuDRp2Pq3gWpAwkkIDcry7q'),
('dlee', '$2a$08$SVqFr/dFNjkm3sQwJmtpLeFu7xo9q.tYj4hlKVy80xic0ldQxUsfK'),
('mrodriguez', '$2a$08$yNYhc5I/wUCNk6xgFZitYe6zmtEDh5u28y8CdnbP757e/OpS9nTGq'),
('hpowell', '$2a$08$kz.6G4cDaODdtFq6caKKz.DuUKDqbRYTPbBnZkxZT0ywBrHbqHy9m'),
('kcoleman', '$2a$08$kgA9mxeaKYqxYNMR0DTyW.QCpzDbUtQfOJc3cRvBQw7P.ZLfwTw3u'),
('khernandez', '$2a$08$z3Ov3ZH2ID8cTVwYIIB79OFjBAQSgsnvRKFBTr9Vl6LTrh/3GdVZa'),
('dphillips', '$2a$08$IDY6uJKRDWT3Gck40oaHR.HWh8C/sUUI3hqCOS1wE.DanVtPx1B/S'),
('bward', '$2a$08$0vV9mPqZXeskpjBru9qhieqLGjIzmxqWE4Sa35i.vJD5vTqIjIf4.'),
('jgray', '$2a$08$JwPWip7LkAt8hW63resEauWzzEAGeVT2W9cLsETD4/5yzOx5Zezpe'),
('kmoore', '$2a$08$tuVnTXpIRZdj6rN6MlrV/OvYZUga5XtLdpfDG55pdpQPgpx569lVC'),
('kjenkins', '$2a$08$Y3zB8ZrphFd7EcrrmQFMrOvRlc4ii0YJ81LJEShiFqyaSA2OwvN3.'),
('rgonzales', '$2a$08$.8xnu0i2RgmylxYpUnKLjukUmQWHQVX/hKAvsMBkxZ3T/Nm1HtfD2'),
('rgreen', '$2a$08$15t.FDNUpwEIiv9PLdq7o.uWDKPGX./II7yA3wPFzL//h1vmtH8jq'),
('pcook', '$2a$08$WbgYFiFrx9vGqeNMVOGpfeDRK3P.LBx8ixQLdnK2C2PKurQvkwXju'),
('nhall', '$2a$08$eBfpcJo9wbGllz95t5NcX.yezS.bKzBH/kCLKvLJuI4hCKWQHndb2'),
('csanders', '$2a$08$qRnjMN/0eIHSIXdKk4OS1OGZk0d73UrPfNQ84AwkUGVt/8.z38RGe'),
('nsanchez', '$2a$08$XY.8LFxXOvQnWI9J66B4WOzAo5BaceyP41rmxr3K4sU1cbNam81iO'),
('speterson', '$2a$08$G7mjJ0OcP71CWG6w4zNHUuYOIcP/V.pcWQgSg3jyUbCAVJ3j/EsH2'),
('ayoung', '$2a$08$BKxMQSf7CU/2LgXdWDGOQ.g8g3GArzxMNp.sVUl/cKLT0L2PGmfra'),
('bevans', '$2a$08$DcDAeSTiAkalh5zUnIJVpeXTcgsL7Q8m/eMhn4FH4PJyWsosJY8pu'),
('jwood', '$2a$08$kHfs.kJ9KqjheuRRPHrbV.ERXoFdvuyuV9Ztw1CdiCEzPgAfJHV8.'),
('msmith', '$2a$08$ObxEPB4NBhoe1h9i0YB6kukLq0OLvmqx9mE6gblpOGTvjfGaEIdCq'),
('hthompson', '$2a$08$TShdNQzDAo7237Wb0UtYg.H33jdAZAtD5HxfPwhyJyI7anCQ8Svra'),
('sprice', '$2a$08$V2L0YmgZ3ygYvRk1oTLX7epMzK/OpYUObPOq4w/xPhNOeq1hIB8Gy'),
('aharris', '$2a$08$ZIYWqHDY2WTzff.MX/F1f.bidSjifUaemUj6uuVHQJrIrUOxYjE.G'),
('mmorgan', '$2a$08$MOTDRZEVUp.0gaXqRs6L7evg8Wv9A/EykNpPWqFUcA8Iuun7IG83S'),
('etorres', '$2a$08$4cluXs7.xr9Ub7644VEFF.kkGy1stiHJTN3GPqI7Z3zz8kWVDMgOO'),
('gwashington', '$2a$08$NXLP8zF713Kjjb5A/uzds.vEL7ArHXWo0l3mSgBpFmGEiJRadiufS'),
('sdavis', '$2a$08$OsY6gvchI2T/aNOTMc6/dOjejatnvsTGfJSwMiiqVPD6OaZ0TImni'),
('srichardson', '$2a$08$oqjZkYEmXcYGWxrRHBdjy.zQ7trIbqaO0iq0joZ0EeJ4p6aZbYVce'),
('croberts', '$2a$08$mmfK9m74FEFCNpfe6YF9XuwocUznaa/SXU1LofoYAF/sVMly51SFa'),
('callen', '$2a$08$TyTS.xQcxAmZw0VUpRbg3u4DPIMfRkQhgYQ8.GA2D4dHpN9K/57tm'),
('pdiaz', '$2a$08$Y7GxalSdKHFulVz.6dhsXepN4axwMfWXNGA8Ap6zQop0Nf21OMCYy'),
('walexander', '$2a$08$eJR/Y5E.vuwkbBdofu3uVOyAdijPdSs.CqzQf2KFIvZURjsynZV02'),
('mross', '$2a$08$9dbhsenquR7IRUcMeYzzpe6bD43d3alPn5ZHzZjm1e5XxJbHxAOmu'),
('cmorris', '$2a$08$/liXnAk3Sui0d6aaSVW5ROI3UTdqw1/k8Awxn98poQ1M2NRQTME3W'),
('padams', '$2a$08$dV3/8C53u1BZZw7WTGO.AOkROZl6SA2BJfzO2sLDOt5kgI87ZGUh.'),
('mlopez', '$2a$08$wdpp.pl0RtA/U5zJoQvL/.cvgsktg/JMMfLwK.FYHQCjCW.1pBGcC'),
('erobinson', '$2a$08$AF8CQrWUXcwqsvtnno9c/e4oVgFCrRSObnHf.i2llKVkpcoIrWp1K'),
('sanderson', '$2a$08$6s3IRH1Ia8iMK5CYGTHj5uGJV.s/MjG4DIfUBc5zZfLMEcZA3n6d2'),
('mhughes', '$2a$08$ef454gPavNlIk2zXm2EA7.12OFnRIMy01miMCLZxjQ4BZh4RCpjje'),
('arogers', '$2a$08$m.EYoqS3CjFnHV0n4DUT4uChdEkpVcQjKs1NZ1t.6WVgDGxYTVgC6'),
('asimmons', '$2a$08$RHp.86m9hNnzKwI43EVkUuJxNoSlxhgqzTtyBJicfIDyp1cc/kb1e'),
('ajohnson', '$2a$08$UE5LGESGU49PvSWigRjdfOg1klKzeKL21FPSzlFav4ZVcUsxPnyiC'),
('spatterson', '$2a$08$pf0vWjYfo.ISqvVOvbL7eu7ISxoWm5TMFToPrWHnd4hABajPntBmC'),
('rhenderson', '$2a$08$9zI87qgSRokb0txc944qeeHso70Sbq.76E5r9epTTc1lydvTM5vPu'),
('pat', '$2a$08$v/O7DTxDYUt7..20z5gfFunBFknYoXU7o9xvvsjkJKq7Z9w59hfVi');

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
('hthompson', '2014-01-31', 'dlee', 150, 85, 110),
('jwood', '2014-02-16', 'dlee', 150, 88, 118),
('msmith', '2014-03-29', 'dlee', 120, 81, 130),
('nhall', '2014-02-07', 'dphillips', 150, 79, 122),
('nsanchez', '2014-02-10', 'dphillips', 150, 89, 130),
('speterson', '2014-03-31', 'dphillips', 150, 78, 126),
('sprice', '2014-01-01', 'hpowell', 120, 90, 126),
('ayoung', '2014-01-20', 'hpowell', 150, 90, 124),
('bevans', '2014-02-22', 'hpowell', 150, 80, 115),
('csanders', '2014-02-09', 'jcampbell', 150, 90, 126),
('hthompson', '2014-02-15', 'jcampbell', 150, 76, 115),
('jwood', '2014-03-26', 'jcampbell', 150, 86, 119),
('msmith', '2014-01-23', 'jgray', 120, 77, 118),
('nhall', '2014-02-26', 'jgray', 150, 85, 110),
('nsanchez', '2014-03-26', 'jgray', 150, 73, 124),
('speterson', '2014-03-18', 'kcoleman', 150, 78, 119),
('ayoung', '2014-03-19', 'kcoleman', 150, 76, 119),
('bevans', '2014-03-25', 'kcoleman', 150, 82, 113),
('csanders', '2014-02-03', 'khernandez', 150, 70, 118),
('hthompson', '2014-03-09', 'khernandez', 150, 86, 114),
('jwood', '2014-03-30', 'khernandez', 150, 79, 114),
('msmith', '2014-02-15', 'kjenkins', 120, 85, 122),
('nhall', '2014-02-16', 'kjenkins', 150, 88, 118),
('nsanchez', '2014-02-25', 'kjenkins', 150, 83, 117),
('speterson', '2014-01-16', 'kmoore', 150, 76, 124),
('sprice', '2014-02-05', 'kmoore', 120, 87, 127),
('bevans', '2014-02-21', 'kmoore', 150, 80, 125),
('csanders', '2014-02-08', 'mrodriguez', 150, 84, 128),
('hthompson', '2014-02-17', 'mrodriguez', 150, 81, 130),
('jwood', '2014-02-24', 'mrodriguez', 150, 70, 113),
('msmith', '2014-02-23', 'pcook', 120, 83, 126),
('nhall', '2014-03-02', 'pcook', 200, 74, 122),
('nsanchez', '2014-03-03', 'pcook', 200, 75, 128),
('speterson', '2014-01-20', 'pcooper', 200, 88, 120),
('ayoung', '2014-02-19', 'pcooper', 200, 79, 126),
('bevans', '2014-03-10', 'pcooper', 200, 79, 114),
('csanders', '2014-01-01', 'rgonzales', 200, 79, 122),
('hthompson', '2014-03-08', 'rgonzales', 200, 74, 119),
('jwood', '2014-03-16', 'rgonzales', 200, 79, 118),
('msmith', '2014-01-21', 'rgreen', 160, 81, 124),
('csanders', '2014-02-13', 'bward', 150, 86, 125),
('bevans', '2014-01-16', 'bward', 150, 73, 110),
('ayoung', '2014-01-05', 'bward', 150, 83, 114),
('nhall', '2014-02-24', 'rgreen', 150, 74, 129),
('nsanchez', '2014-03-29', 'rgreen', 150, 76, 129),
('speterson', '2014-01-16', 'rjones', 150, 81, 110),
('sprice', '2014-02-23', 'rjones', 120, 70, 128),
('bevans', '2014-03-02', 'rjones', 150, 82, 110),
('csanders', '2014-02-03', 'sramirez', 150, 83, 114),
('hthompson', '2014-03-05', 'sramirez', 150, 86, 126),
('jwood', '2014-03-12', 'sramirez', 150, 88, 114),
('msmith', '2014-01-25', 'tbailey', 120, 86, 124),
('nhall', '2014-02-09', 'tbailey', 150, 90, 119),
('nsanchez', '2014-03-02', 'tbailey', 150, 90, 116);

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

INSERT INTO `Visit_Diagnosis` (`PatientUsername`, `Date`, `DoctorUsername`, `Diagnosis`) VALUES
('ayoung', '2014-01-05', 'bward', 'Flu'),
('ayoung', '2014-01-20', 'hpowell', 'Bacterial Infection'),
('ayoung', '2014-02-19', 'pcooper', 'Flu'),
('ayoung', '2014-02-19', 'pcooper', 'Stomach Ulcer'),
('ayoung', '2014-03-19', 'kcoleman', 'Broken Arm'),
('ayoung', '2014-03-19', 'kcoleman', 'Flu'),
('bevans', '2014-02-21', 'kmoore', 'Bacterial Infection'),
('bevans', '2014-02-21', 'kmoore', 'Broken Arm'),
('bevans', '2014-02-22', 'hpowell', 'Allergy'),
('bevans', '2014-02-22', 'hpowell', 'Bacterial Infection'),
('bevans', '2014-03-02', 'rjones', 'Allergy'),
('bevans', '2014-03-10', 'pcooper', 'Allergy'),
('bevans', '2014-03-10', 'pcooper', 'Flu'),
('bevans', '2014-03-10', 'pcooper', 'Stomach Ulcer'),
('bevans', '2014-03-25', 'kcoleman', 'Bacterial Infection'),
('bevans', '2014-03-25', 'kcoleman', 'Flu'),
('csanders', '2014-01-01', 'rgonzales', 'Allergy'),
('csanders', '2014-01-01', 'rgonzales', 'Bacterial Infection'),
('csanders', '2014-01-01', 'rgonzales', 'Broken Arm'),
('csanders', '2014-02-09', 'jcampbell', 'Allergy'),
('csanders', '2014-02-09', 'jcampbell', 'Bacterial Infection'),
('csanders', '2014-02-09', 'jcampbell', 'Stomach Ulcer'),
('csanders', '2014-02-13', 'bward', 'Broken Arm'),
('csanders', '2014-02-13', 'bward', 'Flu'),
('csanders', '2014-02-13', 'bward', 'Stomach Ulcer'),
('hthompson', '2014-01-31', 'dlee', 'Flu'),
('hthompson', '2014-02-15', 'jcampbell', 'Bacterial Infection'),
('hthompson', '2014-02-15', 'jcampbell', 'Broken Arm'),
('hthompson', '2014-02-15', 'jcampbell', 'Stomach Ulcer'),
('hthompson', '2014-02-17', 'mrodriguez', 'Allergy'),
('hthompson', '2014-03-05', 'sramirez', 'Allergy'),
('hthompson', '2014-03-05', 'sramirez', 'Bacterial Infection'),
('hthompson', '2014-03-08', 'rgonzales', 'Broken Arm'),
('hthompson', '2014-03-08', 'rgonzales', 'Stomach Ulcer'),
('jwood', '2014-02-16', 'dlee', 'Allergy'),
('jwood', '2014-02-16', 'dlee', 'Broken Arm'),
('jwood', '2014-02-16', 'dlee', 'Flu'),
('jwood', '2014-02-24', 'mrodriguez', 'Allergy'),
('jwood', '2014-02-24', 'mrodriguez', 'Bacterial Infection'),
('jwood', '2014-02-24', 'mrodriguez', 'Broken Arm'),
('jwood', '2014-03-26', 'jcampbell', 'Stomach Ulcer'),
('jwood', '2014-03-30', 'khernandez', 'Allergy'),
('jwood', '2014-03-30', 'khernandez', 'Bacterial Infection'),
('jwood', '2014-03-30', 'khernandez', 'Stomach Ulcer'),
('msmith', '2014-01-25', 'tbailey', 'Bacterial Infection'),
('msmith', '2014-01-25', 'tbailey', 'Flu'),
('msmith', '2014-02-15', 'kjenkins', 'Broken Arm'),
('msmith', '2014-03-29', 'dlee', 'Allergy'),
('msmith', '2014-03-29', 'dlee', 'Broken Arm'),
('nhall', '2014-02-07', 'dphillips', 'Broken Arm'),
('nhall', '2014-02-09', 'tbailey', 'Allergy'),
('nhall', '2014-02-09', 'tbailey', 'Flu'),
('nhall', '2014-02-16', 'kjenkins', 'Allergy'),
('nhall', '2014-02-16', 'kjenkins', 'Stomach Ulcer'),
('nhall', '2014-02-24', 'rgreen', 'Allergy'),
('nhall', '2014-02-24', 'rgreen', 'Broken Arm'),
('nhall', '2014-02-26', 'jgray', 'Allergy'),
('nhall', '2014-02-26', 'jgray', 'Bacterial Infection'),
('nhall', '2014-02-26', 'jgray', 'Stomach Ulcer'),
('nsanchez', '2014-02-10', 'dphillips', 'Bacterial Infection'),
('nsanchez', '2014-02-25', 'kjenkins', 'Broken Arm'),
('nsanchez', '2014-03-02', 'tbailey', 'Bacterial Infection'),
('nsanchez', '2014-03-02', 'tbailey', 'Stomach Ulcer'),
('speterson', '2014-01-16', 'rjones', 'Allergy'),
('speterson', '2014-01-16', 'rjones', 'Bacterial Infection'),
('speterson', '2014-01-16', 'rjones', 'Stomach Ulcer'),
('speterson', '2014-01-20', 'pcooper', 'Bacterial Infection'),
('speterson', '2014-01-20', 'pcooper', 'Broken Arm'),
('speterson', '2014-03-18', 'kcoleman', 'Allergy'),
('speterson', '2014-03-31', 'dphillips', 'Broken Arm'),
('speterson', '2014-03-31', 'dphillips', 'Flu'),
('sprice', '2014-01-01', 'hpowell', 'Allergy'),
('sprice', '2014-01-01', 'hpowell', 'Bacterial Infection'),
('sprice', '2014-01-01', 'hpowell', 'Stomach Ulcer'),
('sprice', '2014-02-05', 'kmoore', 'Allergy'),
('sprice', '2014-02-23', 'rjones', 'Bacterial Infection'),
('sprice', '2014-02-23', 'rjones', 'Flu');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
