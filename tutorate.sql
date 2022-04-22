-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2022 at 01:33 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `tutorate`
--

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(9);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `sender_name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tutor`
--

CREATE TABLE `tutor` (
  `id` int(11) NOT NULL,
  `average_rating` float NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `min_wage` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `rating_count` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tutor`
--

INSERT INTO `tutor` (`id`, `average_rating`, `image`, `location`, `min_wage`, `name`, `phone`, `rating_count`, `username`) VALUES
(1, 4.2, '/tutorImages/11650577219958.jpg', 'Dhaka, Bangladesh', 8000, 'Florence Rhodes', '01234567', 5, 'Florence-Rhodes'),
(2, 4.075, '/tutorImages/21650578799650.jpg', 'Banani, Dhaka', 10000, 'Cathy Herrera', '01234567', 4, 'CathyHerrera'),
(3, 3.5, '/tutorImages/31650579212857.jpg', 'Dhanmondi, Dhaka', 9000, 'Ashley Scott', '01234567', 2, 'AshleyScott'),
(4, 4, '/tutorImages/41650580095731.jpg', 'Uttara, Dhaka', 8000, 'Charlie Young', '01234567', 1, 'CharlieYoung'),
(5, 3.9, '/tutorImages/51650580769283.jpg', 'Chittagong, Bangladesh', 8000, 'Derek Barker', '01234567', 1, 'derekBarker'),
(6, 3.6, '/tutorImages/61650581477517.jpg', 'Gulshan, Dhaka', 7000, 'Edmund Miller', '01234567', 1, 'edmundMiller'),
(7, 0, '/tutorImages/71650582041959.jpg', 'Baily Road, Dhaka', 10000, 'Marcella Hunter', '01234567', 0, 'marcellaHunter'),
(8, 0, '/tutorImages/81650582307991.jpg', 'Dhaka, Bangladesh', 8000, 'Lance Padilla', '0123456', 0, 'lancePadilla');

-- --------------------------------------------------------

--
-- Table structure for table `tutor_grades`
--

CREATE TABLE `tutor_grades` (
  `tutor_id` int(11) NOT NULL,
  `grades` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tutor_grades`
--

INSERT INTO `tutor_grades` (`tutor_id`, `grades`) VALUES
(1, 'Class 6'),
(1, 'Class 7'),
(1, 'Class 8'),
(2, 'class 9'),
(2, 'Class 10'),
(2, 'Class 11'),
(2, 'Class 12'),
(3, 'Class 8'),
(3, 'class 9'),
(3, 'Class 10'),
(3, 'Class 11'),
(3, 'Class 12'),
(5, 'class 9'),
(5, 'Class 10'),
(5, 'Class 11'),
(5, 'Class 12'),
(4, 'class 9'),
(4, 'Class 10'),
(6, 'Class 7'),
(6, 'Class 8'),
(6, 'class 9'),
(6, 'Class 10'),
(7, 'class 9'),
(7, 'Class 10'),
(7, 'Class 11'),
(7, 'Class 12'),
(8, 'Class 6'),
(8, 'Class 7'),
(8, 'Class 8'),
(8, 'class 9');

-- --------------------------------------------------------

--
-- Table structure for table `tutor_rating`
--

CREATE TABLE `tutor_rating` (
  `fk_tutor` int(11) NOT NULL,
  `fk_user` int(11) NOT NULL,
  `clarity` int(11) NOT NULL,
  `effectiveness` int(11) NOT NULL,
  `patience` int(11) NOT NULL,
  `punctuality` int(11) NOT NULL,
  `rating` float NOT NULL,
  `review` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tutor_rating`
--

INSERT INTO `tutor_rating` (`fk_tutor`, `fk_user`, `clarity`, `effectiveness`, `patience`, `punctuality`, `rating`, `review`) VALUES
(1, 2, 3, 4, 5, 5, 4, 'Florence supported our daughter now off to Cornell and he\'s now working with my son in his Jr year. We like her method of billing super simple. We have recommended her to many friends.'),
(1, 3, 5, 5, 5, 5, 5, 'She is absolutely the best tutor and according to my daughter, she conveys the contents very clearly, shares all the secret tips and formulas for effective learning, and 7she\'s also very knowledgeable in ALL subjects that she\'s teaching.'),
(1, 4, 4, 4, 4, 4, 4, 'I referred Florence to several parents and they were all pleased with the results in their children\'s test scores.  I can\'t say enough about her...she is committed and genuinely interested in helping individual students\' needs.'),
(1, 5, 4, 4, 5, 3, 4.1, 'I highly recommend Florence if you need a coach to help you with your writing!'),
(1, 6, 5, 3, 4, 4, 3.9, 'She is very patient, kind, and truly cared about my mission and perspective. If you need any help writing, planning, or simply organizing your ideas for an outline, she is your guy! I recommend her without reservation.'),
(2, 3, 4, 4, 5, 4, 4.2, 'We have been going to her for over 7 years now and she has helped my three daughters achieve success in higher math and enable them to get into great colleges. She teaches math in a way that the kids understand.'),
(2, 4, 4, 5, 4, 5, 4.5, 'I\'ve been working with her for a few years now. She has helped me get into law school, business school, apply for interviews, and even land my #1 choice for an internship. '),
(2, 5, 3, 4, 4, 3, 3.6, 'My son was feeling overwhelmed and underprepared as he began the daunting task of submitting college admission applications. Thankfully we found Cathy, who provided a sense of confidence as he navigated the process.'),
(2, 6, 5, 4, 3, 3, 4, 'First of all, I really appreciate Cathy for proofreading my dissertation writings. My adviser is very meticulous and careful to read writings. She always concerns my English to have better expression, correct grammar, and good arguments.'),
(3, 4, 3, 3, 4, 4, 3.3, 'Ashley is truly one of the greatest tutors I have had the pleasure of working with. She not only teaches her students, but actually takes the time to help them understand whatever subject they need help with.'),
(3, 5, 3, 4, 4, 4, 3.7, 'I am so happy that I found Ashley at Enrich Your Academics. I have been applying for multiple research and educational grants during this past year, and she has been a tremendous help to me.'),
(4, 5, 4, 4, 4, 4, 4, ' I have recommended 6 people to him so far, they all got interviews, acceptance and at times even scholarships.'),
(5, 6, 4, 3, 5, 5, 3.9, 'I am extremely grateful for Derek\'s help with my personal statement for law school and cannot recommend him enough.  '),
(6, 7, 3, 4, 4, 3, 3.6, 'I have never felt comfortable writing personal statements or essays in general. Edmund was recommended to me by a friend and I can honestly say it was the best recommendation anyone has ever given me.');

-- --------------------------------------------------------

--
-- Table structure for table `tutor_subjects`
--

CREATE TABLE `tutor_subjects` (
  `tutor_id` int(11) NOT NULL,
  `subjects` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tutor_subjects`
--

INSERT INTO `tutor_subjects` (`tutor_id`, `subjects`) VALUES
(1, 'English'),
(1, 'Maths'),
(1, 'Science'),
(2, 'Physics'),
(2, 'Chemistry'),
(2, 'Biology'),
(3, 'Algebra'),
(3, 'Geometry'),
(3, 'Chemistry'),
(5, 'Maths'),
(5, 'Economics'),
(5, 'Business Studies'),
(4, 'Business Studies'),
(4, 'Geography'),
(4, 'History'),
(6, 'Biology'),
(6, 'Chemistry'),
(6, 'Maths'),
(7, 'Physics'),
(7, 'Chemistry'),
(7, 'Maths'),
(8, 'English'),
(8, 'Maths'),
(8, 'Science');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `tutor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `password`, `role`, `username`, `tutor_id`) VALUES
(1, '202cb962ac59075b964b07152d234b70', 1, 'Florence-Rhodes', 1),
(2, '202cb962ac59075b964b07152d234b70', 1, 'CathyHerrera', 2),
(3, '202cb962ac59075b964b07152d234b70', 1, 'AshleyScott', 3),
(4, '202cb962ac59075b964b07152d234b70', 1, 'CharlieYoung', 4),
(5, '202cb962ac59075b964b07152d234b70', 1, 'derekBarker', 5),
(6, '202cb962ac59075b964b07152d234b70', 1, 'edmundMiller', 6),
(7, '202cb962ac59075b964b07152d234b70', 1, 'marcellaHunter', 7),
(8, '202cb962ac59075b964b07152d234b70', 1, 'lancePadilla', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tutor_grades`
--
ALTER TABLE `tutor_grades`
  ADD KEY `FKsevpas7wkhl2in0ymouu2s1hw` (`tutor_id`);

--
-- Indexes for table `tutor_rating`
--
ALTER TABLE `tutor_rating`
  ADD PRIMARY KEY (`fk_tutor`,`fk_user`),
  ADD KEY `FK40jjhetsd8fm1fxp1m5mfkwmb` (`fk_user`);

--
-- Indexes for table `tutor_subjects`
--
ALTER TABLE `tutor_subjects`
  ADD KEY `FKrbwej4ik99xyo11357qqwucco` (`tutor_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK3h3ng7s1beyn870bx1d4vfo5e` (`tutor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tutor`
--
ALTER TABLE `tutor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tutor_grades`
--
ALTER TABLE `tutor_grades`
  ADD CONSTRAINT `FKsevpas7wkhl2in0ymouu2s1hw` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`);

--
-- Constraints for table `tutor_rating`
--
ALTER TABLE `tutor_rating`
  ADD CONSTRAINT `FK40jjhetsd8fm1fxp1m5mfkwmb` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK54q0pnaa1nh9cuplicp9vl8eo` FOREIGN KEY (`fk_tutor`) REFERENCES `tutor` (`id`);

--
-- Constraints for table `tutor_subjects`
--
ALTER TABLE `tutor_subjects`
  ADD CONSTRAINT `FKrbwej4ik99xyo11357qqwucco` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK3h3ng7s1beyn870bx1d4vfo5e` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`);
COMMIT;
