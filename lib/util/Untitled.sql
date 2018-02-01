CREATE DATABASE  IF NOT EXISTS `xpress` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `xpress`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: xpress
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Card`
--

DROP TABLE IF EXISTS `Card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Card` (
  `idCard` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `dateCreate` datetime DEFAULT NULL,
  `dateUpdate` datetime DEFAULT NULL,
  `createByUserID` int(11) DEFAULT NULL,
  `Active` tinyint(4) DEFAULT NULL,
  `idDeck` int(11) DEFAULT NULL,
  `UrlImgVideo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idCard`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Card`
--

LOCK TABLES `Card` WRITE;
/*!40000 ALTER TABLE `Card` DISABLE KEYS */;
INSERT INTO `Card` VALUES (15,'postTitle','postDescription','2018-01-22 09:13:04','2018-01-29 10:41:34',1,1,4,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982949/autocontrol-min_g9pwbh.jpg'),(16,'updateTitle','update description','2018-01-22 09:13:35','2018-01-29 10:42:24',0,1,4,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982949/cooperativo-min_pd9n3d.jpg'),(17,'Do you know?','Angular','2018-01-25 16:57:43',NULL,16,1,1,'http://res.cloudinary.com/dnakveysz/image/upload/v1516921038/Angular2-min_elcvix.png'),(20,'Do you know?','Angular','2018-01-26 08:04:40',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516921038/Angular2-min_elcvix.png'),(21,'Do you know?','Java','2018-01-26 08:31:17',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516976987/java-min_nigtij.jpg'),(22,'Do you know?','CSS3','2018-01-26 08:31:49',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516976987/css3-min_xe2smc.jpg'),(23,'Do you know?','HTML5','2018-01-26 08:32:34',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516977009/html5-min_vnd7if.png'),(24,'Do you know?','JavaScript','2018-01-26 08:32:58',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516977009/js-min_bzhuxq.png'),(25,'Do you know?','Git','2018-01-26 08:33:21',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516976987/git-logo-min_glfmcr.jpg'),(26,'Do you know?','NodeJS','2018-01-26 08:33:54',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516977009/nodejs-min_xsu4c7.png'),(27,'Do you know?','Python','2018-01-26 08:34:27',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516977009/python-min_mnvnjn.png'),(28,'Do you know?','Apache Spark','2018-01-26 08:35:05',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516977009/Apache_Spark-min_ergez1.png'),(29,'Do you know?','Apache Kafka','2018-01-26 08:35:49',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516977009/apache-kafka-min_lrb26z.png'),(30,'Do you know?','Cassandra','2018-01-26 08:36:23',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516977009/Cassandra-min_jhovpb.png'),(31,'Do you know?','Linux','2018-01-26 08:37:02',NULL,16,1,5,'http://res.cloudinary.com/dnakveysz/image/upload/v1516977009/Linux-min_o19xxt.png'),(32,'Do you have','self confidence','2018-01-26 10:13:29',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982950/self-confidence-min_nyuneb.jpg'),(33,'Do you have','Ability to make decisions','2018-01-26 10:16:10',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982950/toma-decisiones-min_ctttxf.jpg'),(34,'Are you','Communicative','2018-01-26 10:17:49',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982949/cmunicativo-min_zsudvz.jpg'),(35,'Do you have?','Emotional self-control','2018-01-26 10:25:55',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982949/autocontrol-min_g9pwbh.jpg'),(36,'Are you','Planification and organization','2018-01-26 11:04:20',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982950/organizacion-min_por3cl.jpg'),(37,'Are you','Empathic','2018-01-26 11:05:28',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982949/empatico-min_bmknmy.jpg'),(38,'Are you','Cooperative','2018-01-26 11:06:39',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982949/cooperativo-min_pd9n3d.jpg'),(39,'Are you','Fair','2018-01-26 11:08:46',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982949/justice-min_tkt0db.jpg'),(40,'Are you','Easy communication','2018-01-26 11:10:34',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982949/claridadMensaje-min_keuwgw.jpg'),(41,'Are you','Responsible','2018-01-26 11:11:39',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982949/responsable-min_njix78.jpg'),(42,'Are you','Optimistic','2018-01-26 11:12:47',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982950/optimismo-min_kplrla.jpg'),(43,'Are you','Strategic thinking','2018-01-26 11:14:11',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982949/estrategico-min_iumbdz.jpg'),(44,'Are you','Willing to take risks','2018-01-26 11:15:44',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982949/riesgos-min_oh6gle.jpg'),(45,'Are you','Enabler and not controller','2018-01-26 11:16:52',NULL,16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982950/HabilitadorControlador-min_ftlpqf.jpg'),(46,'Are you','Future vision','2018-01-26 11:17:34','2018-01-26 11:20:31',16,1,6,'http://res.cloudinary.com/dnakveysz/image/upload/v1516982950/visionFuturo-min_tfe1cx.jpg');
/*!40000 ALTER TABLE `Card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Deck`
--

DROP TABLE IF EXISTS `Deck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Deck` (
  `idDeck` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `dateCreate` datetime DEFAULT NULL,
  `dateUpdate` datetime DEFAULT NULL,
  `createByUserID` int(11) DEFAULT NULL,
  `results` varchar(250) DEFAULT NULL,
  `Active` tinyint(4) DEFAULT NULL,
  `UrlImgVideo` varchar(200) DEFAULT NULL,
  `EvaluatePeopleThings` tinyint(4) DEFAULT NULL,
  `IMGVideoFromPT` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idDeck`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Deck`
--

LOCK TABLES `Deck` WRITE;
/*!40000 ALTER TABLE `Deck` DISABLE KEYS */;
INSERT INTO `Deck` VALUES (3,'string','string','2018-01-19 12:53:12','2018-01-22 09:16:17',1,'string',0,'string',NULL,NULL),(4,'post title','post description','2018-01-22 09:15:19','2018-01-25 14:58:20',2,'.',1,'http://res.cloudinary.com/dnakveysz/image/upload/v1516913759/No_Image_Available-min_xrs0zt.jpg',NULL,NULL),(5,'Developer Tools ','Which tools as a developer you know','2018-01-25 11:54:57','2018-01-26 08:51:45',16,'.',1,'https://res.cloudinary.com/dnakveysz/image/upload/v1516902866/ProgramingLanguajes_cj4qok.png',1,NULL),(6,'Leadership','This questions will let us know if you have the skills of a leadership','2018-01-25 12:04:41','2018-01-25 15:03:02',16,'.',1,'http://res.cloudinary.com/dnakveysz/image/upload/v1516914093/leadership-min_zjrhyv.jpg',1,1);
/*!40000 ALTER TABLE `Deck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeckWillEvaluatePT`
--

DROP TABLE IF EXISTS `DeckWillEvaluatePT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DeckWillEvaluatePT` (
  `IdRegistrerPTTBE` int(11) NOT NULL AUTO_INCREMENT,
  `IdDeck` int(11) DEFAULT NULL,
  `IdPTTE` int(11) DEFAULT NULL,
  `DateCreate` datetime DEFAULT NULL,
  `LastUpdate` datetime DEFAULT NULL,
  PRIMARY KEY (`IdRegistrerPTTBE`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeckWillEvaluatePT`
--

LOCK TABLES `DeckWillEvaluatePT` WRITE;
/*!40000 ALTER TABLE `DeckWillEvaluatePT` DISABLE KEYS */;
INSERT INTO `DeckWillEvaluatePT` VALUES (1,4,3,'2018-01-29 08:20:27',NULL),(2,6,4,'2018-01-29 09:24:06',NULL),(3,6,5,'2018-01-29 09:24:53',NULL),(4,6,6,'2018-01-29 09:24:53',NULL),(5,6,7,'2018-01-29 09:24:53',NULL),(6,6,8,'2018-01-29 09:24:53',NULL),(7,6,9,'2018-01-29 09:24:53',NULL);
/*!40000 ALTER TABLE `DeckWillEvaluatePT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DecksAnswered`
--

DROP TABLE IF EXISTS `DecksAnswered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DecksAnswered` (
  `idDecksAns` int(11) NOT NULL AUTO_INCREMENT,
  `idDeck` int(11) DEFAULT NULL,
  `idAssociate` int(11) DEFAULT NULL,
  `dateCreate` datetime DEFAULT NULL,
  PRIMARY KEY (`idDecksAns`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DecksAnswered`
--

LOCK TABLES `DecksAnswered` WRITE;
/*!40000 ALTER TABLE `DecksAnswered` DISABLE KEYS */;
/*!40000 ALTER TABLE `DecksAnswered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DecksAvailableIn`
--

DROP TABLE IF EXISTS `DecksAvailableIn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DecksAvailableIn` (
  `IdRegistrer` int(11) NOT NULL AUTO_INCREMENT,
  `IdDeck` int(11) DEFAULT NULL,
  `IdCountryAvailable` int(11) DEFAULT NULL,
  `IdDepAvailable` int(11) DEFAULT NULL,
  `DateCreate` datetime DEFAULT NULL,
  `lastUpdate` datetime DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `OfficeAvailableIn` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdRegistrer`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DecksAvailableIn`
--

LOCK TABLES `DecksAvailableIn` WRITE;
/*!40000 ALTER TABLE `DecksAvailableIn` DISABLE KEYS */;
INSERT INTO `DecksAvailableIn` VALUES (3,2,1,3,'2018-01-23 10:11:19',NULL,1,NULL),(5,0,0,0,'2018-01-23 11:57:44','2018-01-23 12:25:15',0,0);
/*!40000 ALTER TABLE `DecksAvailableIn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LoginInfo`
--

DROP TABLE IF EXISTS `LoginInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LoginInfo` (
  `idLoginInfo` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `DateCreate` datetime DEFAULT NULL,
  `lastUpdate` datetime DEFAULT NULL,
  `Logedin` tinyint(1) DEFAULT NULL,
  `Points` double DEFAULT NULL,
  PRIMARY KEY (`idLoginInfo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LoginInfo`
--

LOCK TABLES `LoginInfo` WRITE;
/*!40000 ALTER TABLE `LoginInfo` DISABLE KEYS */;
INSERT INTO `LoginInfo` VALUES (3,3,1,'2018-01-22 14:58:06',NULL,1,NULL),(5,5,1,'2018-01-23 09:40:44',NULL,1,NULL),(6,15,0,'2018-01-23 16:07:29','2018-01-23 16:08:04',0,200);
/*!40000 ALTER TABLE `LoginInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PeopleThingsToEvaluate`
--

DROP TABLE IF EXISTS `PeopleThingsToEvaluate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PeopleThingsToEvaluate` (
  `IdThingPeople` int(11) NOT NULL AUTO_INCREMENT,
  `NameObject` varchar(200) DEFAULT NULL,
  `DescriptioObject` varchar(200) DEFAULT NULL,
  `isAssociate` tinyint(1) DEFAULT NULL,
  `CreationDate` datetime DEFAULT NULL,
  `LastUpdate` datetime DEFAULT NULL,
  `ImgVideoURL` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`IdThingPeople`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PeopleThingsToEvaluate`
--

LOCK TABLES `PeopleThingsToEvaluate` WRITE;
/*!40000 ALTER TABLE `PeopleThingsToEvaluate` DISABLE KEYS */;
INSERT INTO `PeopleThingsToEvaluate` VALUES (3,'change name','change description',0,'2018-01-24 13:33:38','2018-01-24 13:52:36',NULL),(4,'Alberto Fuentes Casarrubias','Evaluate Leadership testing',1,'2018-01-26 12:22:52',NULL,'http://res.cloudinary.com/dnakveysz/image/upload/v1516990905/AlbertoFuentes-min_qdm2kr.jpg'),(5,'Pilar Gutierrez Castro','Evaluate Leadership testing',1,'2018-01-26 12:23:30',NULL,'http://res.cloudinary.com/dnakveysz/image/upload/v1516990905/PilarCastro-min_jkvpdh.jpg'),(6,'Alejandra Carolina Brum Garcia','Evaluate Leadership testing',1,'2018-01-26 12:24:15',NULL,'http://res.cloudinary.com/dnakveysz/image/upload/v1516990905/AlejandraBrum-min_spaser.jpg'),(7,'Julian Valencia','Evaluate Leadership testing',1,'2018-01-26 12:29:27',NULL,'http://res.cloudinary.com/dnakveysz/image/upload/v1516990905/JulianValencia-min_uetcky.jpg'),(8,'Miguel Angel Magos','Evaluate Leadership testing',1,'2018-01-26 12:36:14','2018-01-26 12:40:46','http://res.cloudinary.com/dnakveysz/image/upload/v1516990905/MiguelMAgos-min_qds8sj.jpg'),(9,'Marcos Daniel Martinez Lopez','Evaluate Leadership testing',1,'2018-01-26 12:36:58',NULL,'http://res.cloudinary.com/dnakveysz/image/upload/v1516990905/MarcosMartinez-min_vfdllf.jpg');
/*!40000 ALTER TABLE `PeopleThingsToEvaluate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ResultsDeck`
--

DROP TABLE IF EXISTS `ResultsDeck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ResultsDeck` (
  `IdResult` int(11) NOT NULL AUTO_INCREMENT,
  `IdDeck` int(11) DEFAULT NULL,
  `ResultDescription` varchar(100) DEFAULT NULL,
  `lastUpdate` datetime DEFAULT NULL,
  `Active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`IdResult`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ResultsDeck`
--

LOCK TABLES `ResultsDeck` WRITE;
/*!40000 ALTER TABLE `ResultsDeck` DISABLE KEYS */;
INSERT INTO `ResultsDeck` VALUES (2,NULL,'UPDATE MAYUS','2018-01-22 11:22:28',0),(4,2,'hola231','2018-01-22 10:15:43',NULL),(5,2,'hola2331','2018-01-22 10:15:48',NULL),(6,NULL,NULL,'2018-01-22 10:31:01',NULL),(7,NULL,NULL,'2018-01-22 10:44:58',NULL),(8,0,'string','2018-01-22 10:46:02',NULL),(9,9,'9999999','2018-01-23 09:15:34',1);
/*!40000 ALTER TABLE `ResultsDeck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VotesCard`
--

DROP TABLE IF EXISTS `VotesCard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VotesCard` (
  `IdRegistrer` int(11) NOT NULL AUTO_INCREMENT,
  `idCard` int(11) DEFAULT NULL,
  `idAssociate` int(11) DEFAULT NULL,
  `vote` tinyint(1) DEFAULT NULL,
  `DateCreate` datetime DEFAULT NULL,
  `lastUpdate` datetime DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `idThingsPeopleToEvaluate` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdRegistrer`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VotesCard`
--

LOCK TABLES `VotesCard` WRITE;
/*!40000 ALTER TABLE `VotesCard` DISABLE KEYS */;
INSERT INTO `VotesCard` VALUES (102,15,1,1,'2018-01-31 22:19:33',NULL,1,0),(103,15,2,1,'2018-01-31 22:19:36',NULL,1,0),(104,15,3,1,'2018-01-31 22:19:41',NULL,1,0),(105,15,4,1,'2018-01-31 22:19:47',NULL,1,0),(106,15,5,0,'2018-01-31 22:19:57',NULL,1,0),(107,15,6,0,'2018-01-31 22:20:00',NULL,1,0),(108,15,7,0,'2018-01-31 22:20:04',NULL,1,0),(109,15,8,0,'2018-01-31 22:20:08',NULL,1,0),(110,15,9,0,'2018-01-31 22:20:11',NULL,1,0),(111,15,10,0,'2018-01-31 22:20:18',NULL,1,0);
/*!40000 ALTER TABLE `VotesCard` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-31 23:15:51
