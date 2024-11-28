-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: linkedin
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `date_posted` varchar(50) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `post_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('1','https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Jane Smith','2024-10-21 14:08:50','Great post, John!','1','1'),('2','https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','John Doe','2024-10-21 14:08:50','Thanks, Jane!','2','2'),('3','https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Michael Johnson','2024-10-21 14:08:50','Insightful post, Emily!','4','2'),('4','https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Chris Brown','2024-10-21 14:08:50','Well done, Michael!','3','3'),('426','https://images.ctfassets.net/hrltx12pl8hq/3Mz6t2p2yHYqZcIM0ic9E2/3b7037fe8871187415500fb9202608f7/Man-Stock-Photos.jpg','1','16/11/2024, 3:39:30 μ.μ.','meeeeeen ','1','4'),('5','https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Emily Davis','2024-10-21 14:08:50','Congrats on the migration, Chris!','5','4'),('547','https://images.ctfassets.net/hrltx12pl8hq/3Mz6t2p2yHYqZcIM0ic9E2/3b7037fe8871187415500fb9202608f7/Man-Stock-Photos.jpg','1','2024-11-16 15:42:07','fhgd','1','5'),('602','https://images.ctfassets.net/hrltx12pl8hq/3Mz6t2p2yHYqZcIM0ic9E2/3b7037fe8871187415500fb9202608f7/Man-Stock-Photos.jpg','1','2024-11-16 15:40:16','hfgdhf','1','5');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiences`
--

DROP TABLE IF EXISTS `experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiences` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `experiences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiences`
--

LOCK TABLES `experiences` WRITE;
/*!40000 ALTER TABLE `experiences` DISABLE KEYS */;
INSERT INTO `experiences` VALUES ('1','Software Engineer','Tech Corp','https://www.shutterstock.com/shutterstock/photos/2520463467/display_1500/stock-vector-compact-mini-excavator-ready-made-emblem-badge-logo-vector-best-for-excavating-company-logo-2520463467.jpg','New York','Mid-level','2019-2023','1'),('2','Front-end Developer','Design Hub','https://www.shutterstock.com/shutterstock/photos/2484104751/display_1500/stock-vector-round-leaf-formation-plant-modern-logo-unique-color-transitions-nature-and-boutique-life-company-2484104751.jpg','San Francisco','Senior','2020-2024','2'),('3','Data Scientist','DataWorks','https://www.shutterstock.com/shutterstock/photos/2487834049/display_1500/stock-vector-growth-logo-technology-software-finance-investment-etc-logo-template-for-businesses-2487834049.jpg','Austin','Lead','2018-2022','3'),('4','Full-stack Developer','Dev Solutions','https://www.shutterstock.com/shutterstock/photos/2478831899/display_1500/stock-vector-modern-creative-company-logo-design-2478831899.jpg','Chicago','Senior','2021-2024','4'),('5','Cloud Architect','Cloudify','https://www.shutterstock.com/shutterstock/photos/2484703787/display_1500/stock-vector-oval-rectangle-curved-shape-plant-vector-green-food-company-logo-design-template-ideal-for-2484703787.jpg','Seattle','Expert','2022-Present','5'),('6','fdgs','gds','','gsdd','Associate','6/11/2024 - 12/11/2024','691'),('982','jk',NULL,NULL,NULL,NULL,NULL,'691');
/*!40000 ALTER TABLE `experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `ID` varchar(255) NOT NULL,
  `TITLE` varchar(255) DEFAULT NULL,
  `COMPANYNAME` varchar(255) DEFAULT NULL,
  `COMPANYLOGO` varchar(255) DEFAULT NULL,
  `LOCATION` varchar(255) DEFAULT NULL,
  `LEVEL` varchar(255) DEFAULT NULL,
  `ABOUT` varchar(1000) DEFAULT NULL,
  `SAVE` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES ('1','PHP Developer','bFlex.io','https://via.placeholder.com/100.png?text=bFlex','Athens, Attiki, Greece (Hybrid)','Internship','Connecting networks, clouds and businesses, Console Connect by PCCW Global is dedicated to helping organisations overcome the barriers and complexity of connecting to the cloud. Our goal is to provide businesses with on-demand, dedicated connectivity into cloud service providers and partners around the globe, making access to business-critical applications simple, predictable and ultra-secure. Console Connect by PCCW Global is the world’s first global software-defined interconnection platform, born out of the belief that business connectivity should be simpler and more accessible for all. Console Connect enables users to efficiently manage their private connections via a user-friendly interface, regardless of their level of technical expertise. Backed by PCCW Global, one of the world’s leading global telecommunications companies.','Save'),('2','Frontend Developer','Tech Innovators','https://via.placeholder.com/100.png?text=Tech+Innovators','Remote','Full-time','As a Frontend Developer at Tech Innovators, you will be responsible for creating beautiful and functional user interfaces. You will work closely with our design team to bring wireframes and prototypes to life, ensuring a seamless user experience across all devices. We value creativity and innovation, and we are looking for someone who can think outside the box.','Save'),('3','Backend Developer','Code Masters','https://via.placeholder.com/100.png?text=Code+Masters','San Francisco, CA, USA','Part-time','Join Code Masters as a Backend Developer and play a key role in designing and implementing server-side components and APIs. You will work with a team of talented developers and collaborate with frontend engineers to build scalable and efficient applications. We are looking for someone who is passionate about coding and thrives in a fast-paced environment.','Saved'),('4','Data Scientist','DataWise','https://via.placeholder.com/100.png?text=DataWise','New York, NY, USA','Full-time','As a Data Scientist at DataWise, you will analyze complex data sets to help inform business decisions and strategies. You will use your analytical skills to interpret data, create models, and communicate findings to stakeholders. We are looking for someone with a strong background in statistics and machine learning.','Save'),('5','UX/UI Designer','Creative Solutions','https://via.placeholder.com/100.png?text=Creative+Solutions','Berlin, Germany','Internship','Join our team as a UX/UI Designer and help create intuitive and engaging interfaces for our applications. You will collaborate with product managers and developers to ensure a consistent user experience. We are looking for someone with a keen eye for design and a passion for creating user-friendly products.','Save');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `people` (
  `ID` varchar(255) NOT NULL,
  `AVATAR` varchar(255) DEFAULT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `ROLE` varchar(255) DEFAULT NULL,
  `COMPANY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` VALUES ('1','https://media.licdn.com/dms/image/v2/D4E03AQHaeXnMmfjvyQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706286002081?e=2147483647&v=beta&t=eB6QsKVtfFsKQHBnnR1jUZaiHSJgJOv0d_BOhoiBlxo','Bonnie Green','Visual Designer','Intrasoft'),('10','https://randomuser.me/api/portraits/women/65.jpg','Mia Rodriguez','Project Coordinator','Project Management Inc.'),('2','https://randomuser.me/api/portraits/women/44.jpg','Emma Wilson','Software Engineer','TechCorp'),('3','https://randomuser.me/api/portraits/men/43.jpg','Liam Johnson','Product Manager','Innovate Inc.'),('4','https://randomuser.me/api/portraits/women/25.jpg','Sophia Martinez','UX Designer','Design Hub'),('5','https://randomuser.me/api/portraits/men/21.jpg','James Smith','Data Analyst','Data Solutions'),('6','https://randomuser.me/api/portraits/women/37.jpg','Olivia Brown','Marketing Specialist','AdWorld'),('7','https://randomuser.me/api/portraits/men/60.jpg','Ethan Taylor','Web Developer','WebWorks'),('8','https://randomuser.me/api/portraits/women/17.jpg','Isabella Lee','Content Writer','Content Creators'),('9','https://randomuser.me/api/portraits/men/34.jpg','Mason Garcia','Sales Executive','Sales Pros');
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people_seq`
--

DROP TABLE IF EXISTS `people_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `people_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people_seq`
--

LOCK TABLES `people_seq` WRITE;
/*!40000 ALTER TABLE `people_seq` DISABLE KEYS */;
INSERT INTO `people_seq` VALUES (1);
/*!40000 ALTER TABLE `people_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` varchar(255) NOT NULL,
  `post_time` timestamp NULL DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  `posted_by_avatar` varchar(255) DEFAULT NULL,
  `content` text,
  `likes` int DEFAULT NULL,
  `number_of_comments` int DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `title` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES ('1','2024-10-21 10:47:13','John Doe','https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Excited to start my new project on AI!',18,5,'https://images.pexels.com/photos/29019651/pexels-photo-29019651/free-photo-of-close-up-of-green-leaves-with-sunlight-and-shadows.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','1','Go me !'),('122','2024-11-25 18:20:21','1','https://images.ctfassets.net/hrltx12pl8hq/3Mz6t2p2yHYqZcIM0ic9E2/3b7037fe8871187415500fb9202608f7/Man-Stock-Photos.jpg','Testing with photo link',0,0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaYW31b6V9r05WWAzWMlo-i4Lh-I-CJapjoA&s','691','okokokok'),('2','2024-10-21 10:47:13','Jane Smith','https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Loving the new updates to the design system!',26,8,'https://images.pexels.com/photos/29008779/pexels-photo-29008779/free-photo-of-vivid-green-leaf-close-up-with-natural-patterns.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','2','its ok'),('3','2024-10-21 10:47:13','Michael Johnson','https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Here are some insights on machine learning.',15,3,'https://images.pexels.com/photos/29008760/pexels-photo-29008760/free-photo-of-artistic-wheat-stalks-against-colorful-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','3','lets go'),('4','2024-10-21 10:47:13','Emily Davis','https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Full-stack development is so rewarding!',21,6,'https://images.pexels.com/photos/29012806/pexels-photo-29012806/free-photo-of-neon-bitcoin-logo-against-vine-covered-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','4','nice'),('5','2024-10-21 10:47:13','Chris Brown','https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Just completed a major cloud migration.',18,7,'https://images.pexels.com/photos/29008333/pexels-photo-29008333/free-photo-of-abstract-geometric-shapes-on-colorful-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','5','OMG WTF'),('628','2024-11-25 18:21:02','1','https://images.ctfassets.net/hrltx12pl8hq/3Mz6t2p2yHYqZcIM0ic9E2/3b7037fe8871187415500fb9202608f7/Man-Stock-Photos.jpg','OKOKOKOKOKO',0,0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaYW31b6V9r05WWAzWMlo-i4Lh-I-CJapjoA&s','691','OKOKOKOKOK'),('800','2024-11-16 18:31:55','1','https://images.ctfassets.net/hrltx12pl8hq/3Mz6t2p2yHYqZcIM0ic9E2/3b7037fe8871187415500fb9202608f7/Man-Stock-Photos.jpg','dgfs',1,0,NULL,'691','dfhs');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` varchar(255) NOT NULL,
  `skill_name` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES ('1','Python,React','1'),('2','React.js','2'),('3','Machine Learning','3'),('4','Node.js','4'),('5','AWS','5'),('6','new skill, okok','691');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `bg` varchar(255) DEFAULT NULL,
  `about_content` varchar(500) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1','John Doe','john@example.com','https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','https://images.pexels.com/photos/2818118/pexels-photo-2818118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Software engineer with a passion for AI.','John','$10$omNkfnoMcN4P7R2lDW5FQ.6H0qli8CvnOgU.W1SrMAIjuxml/uyKa'),('2','Jane Smith','jane@example.com','https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','https://images.pexels.com/photos/28959710/pexels-photo-28959710/free-photo-of-autumn-leaves-on-water-surface.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Front-end developer and UX enthusiast.','Jane','$10$omNkfnoMcN4P7R2lDW5FQ.6H0qli8CvnOgU.W1SrMAIjuxml/uyKa'),('3','Michael Johnson','michael@example.com','https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','https://images.pexels.com/photos/28948284/pexels-photo-28948284/free-photo-of-aerial-view-of-parking-lot-with-sparse-cars.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Data scientist and machine learning expert.','Michael','$10$omNkfnoMcN4P7R2lDW5FQ.6H0qli8CvnOgU.W1SrMAIjuxml/uyKa'),('4','Emily Davis','emily@example.com','https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Full-stack developer with 5 years of experience.','Emily','$10$omNkfnoMcN4P7R2lDW5FQ.6H0qli8CvnOgU.W1SrMAIjuxml/uyKa'),('5','Chris Brown','chris@example.com','https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','https://images.pexels.com/photos/28993170/pexels-photo-28993170/free-photo-of-colorful-raindrops-on-glass-with-bokeh-lights.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Cloud architect and DevOps specialist.','Chris','$10$omNkfnoMcN4P7R2lDW5FQ.6H0qli8CvnOgU.W1SrMAIjuxml/uyKa'),('691','1','a@a.com','https://images.ctfassets.net/hrltx12pl8hq/3Mz6t2p2yHYqZcIM0ic9E2/3b7037fe8871187415500fb9202608f7/Man-Stock-Photos.jpg','https://images.pexels.com/photos/13610249/pexels-photo-13610249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','ookkmdasvsnkj','Bob','$10$omNkfnoMcN4P7R2lDW5FQ.6H0qli8CvnOgU.W1SrMAIjuxml/uyKa'),('956','Con','b@b.email.com','https://images.ctfassets.net/hrltx12pl8hq/3Mz6t2p2yHYqZcIM0ic9E2/3b7037fe8871187415500fb9202608f7/Man-Stock-Photos.jpg','https://media.istockphoto.com/id/2167996762/photo/flamingos-on-lake.webp?s=2048x2048&w=is&k=20&c=o-1jSUV2DCyTcxlGCU0GaRjJ2Stj3s45ik_QvZcJGKk=','okokok','Sin','$2a$10$omNkfnoMcN4P7R2lDW5FQ.6H0qli8CvnOgU.W1SrMAIjuxml/uyKa');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-28 15:12:04
