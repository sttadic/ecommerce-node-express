-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: G00438839
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customerID` smallint NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`customerID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (14,'user','$2b$10$NeonWgAL4RALfrtPVNhFLO0OVtDQX0T7b8hTohRvsmsTvuI40XybS','TestUser'),(15,'stipa','$2b$10$PN5fwRCkDMme1P9gCDcWXuvUhTFHD40hq06GRqlNwvA18kVAMIKZy','Stjepan');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productID` smallint NOT NULL,
  `brand` varchar(15) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` text,
  `price` decimal(3,2) DEFAULT NULL,
  `image` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (0,'Franck','Jubilarna Original 250g','This coffee is rightfully considered the queen among coffees, thanks to its full, chocolatey flavour and irresistible fragrance that has been appreciated by generations of true coffee lovers.',2.99,'fr_original.jpg'),(1,'Franck','Jubilarna Sensual 250g','Ground coffee with delicate taste whose seductive aroma will bring smile to your face every day. Magic taste of Jubilarna Sensual gives special meaning to our daily rituals of preparing and enjoying coffee.',3.59,'fr_sensual.jpg'),(2,'Franck','Jubilarna Intense 250g','Strong ground coffee, Jubilarna Intense, will prepare you for all the challenges of the day. Awaken all your senses with just one cup of coffee. Its intense aroma will give you the strength to go further than you thought possible.',3.59,'fr_intense.jpg'),(3,'Franck','Jubilarna Decaf 250g','Crafted from premium raw coffee beans and decaffeinated using a special process to achieve just 0.1% caffeine content. Perfect for those seeking the rich, smooth taste of coffee without the caffeine kick.',5.29,'fr_decaf.jpg'),(4,'Franck','Guatemala Arabica 250g','Volcanic soil and unique climate, influenced by two nearby oceans fosters microclimates ideal for cultivating coffee with notes reminiscent of dark chocolate and spice, resulting in a truly exceptional brew.',6.49,'fr_guatemala.jpg'),(5,'Lavazza','Qualita Oro 250g','Qualità Oro is a combination of 6 varieties of Arabica coffee beans from Central & South America. The perfect symphony of taste you can enjoy every day. Like Italian families.',5.99,'la_oro.jpg'),(6,'Lavazza','Crema e Gusto 250g','A soft, round and enveloping blend composed mainly of high-quality Arabica and Robusta. Perfect harmony between body and spiced notes. Ideal for milk-based preparations.',6.49,'la_gusto.jpg'),(7,'Lavazza','Tierra For Affrica 180g','¡Tierra! For Africa is a blend of fine hand-picked organic beans from East Africa where the Lavazza Foundation supports the new generations of farmers. A coffee you can trust.',3.99,'la_africa.jpg'),(8,'Lavazza','Tierra For Planet 180g','¡Tierra! for Planet is a selection of hand-picked organic beans. Discover this premium quality blend with delicate, fruity notes. Best enjoyed brewed.',3.99,'la_planet.jpg'),(9,'Lavazza','Caffe Decaf 250g','An aromatic and refined blend of selected Arabica and Robusta coffee beans, distinguished by sweet aromas of almonds and milk chocolate and with nuances of dried fruits.',4.99,'la_decaf.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `customerID` smallint NOT NULL,
  `productID` smallint NOT NULL,
  `quantity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (2,0,2),(2,1,1),(2,0,2),(2,1,1),(2,0,1),(2,0,1),(2,0,1),(2,0,1),(2,0,1),(2,2,1),(2,0,1),(2,3,1),(2,3,1),(2,1,2),(2,0,1),(2,1,1),(2,5,7),(2,7,2),(2,4,4),(2,9,18),(2,1,1),(2,3,1),(1,2,1),(1,0,1),(1,2,2),(1,1,1),(2,1,1),(2,2,99);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-09 14:56:42
