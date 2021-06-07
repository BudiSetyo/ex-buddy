-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Jun 2021 pada 06.15
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buddy`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `category_name`) VALUES
(1, 'Software'),
(2, 'History'),
(3, 'Math'),
(4, 'Science'),
(5, 'Finance'),
(6, 'Psychology');

-- --------------------------------------------------------

--
-- Struktur dari tabel `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `id_fasilitator` int(11) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `day` int(11) NOT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `category` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `pricing` int(11) NOT NULL,
  `class_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `class`
--

INSERT INTO `class` (`id`, `id_fasilitator`, `class_name`, `description`, `day`, `start_time`, `end_time`, `category`, `level`, `pricing`, `class_img`) VALUES
(1, 35, 'Know more Javascript', 'JavaScript is a cross-platform, object-oriented scripting language used to make webpages interactive (e.g., having complex animations, clickable buttons, popup menus, etc.).', 1, '08:00:00', '11:00:00', 1, 1, 0, ''),
(2, 35, 'HTML and CSS to code', 'HTML (the Hypertext Markup Language) and CSS (Cascading Style Sheets) are two of the core technologies for building Web pages.', 2, '08:00:00', '11:00:00', 1, 2, 10, ''),
(3, 0, 'Indonesian war history', 'The military history of Indonesia includes the military history of the modern nation of Republic of Indonesia, as well as the military history of the states which preceded and formed it. It encompassed a kaleidoscope of conflicts spanning over a millennia.', 3, '08:00:00', '11:00:00', 2, 3, 50, ''),
(4, 0, 'Buddhism and Modern Psychology', 'The Dalai Lama has said that Buddhism and science are deeply compatible and has encouraged Western scholars to critically examine both the meditative practice and Buddhist ideas about the human mind. A number of scientists and philosophers have taken up this challenge. There have been brain scans of meditators and philosophical examinations of Buddhist doctrines. There have even been discussions of Darwin and the Buddha: Do early Buddhist descriptions of the mind, and of the human condition, make particular sense in light of evolutionary psychology? \r\n\r\nThis course will examine how Buddhism is faring under this scrutiny. Are neuroscientists starting to understand how meditation “works”? Would such an understanding validate meditation—or might physical explanations of meditation undermine the spiritual significance attributed to it? And how are some of the basic Buddhist claims about the human mind holding up? We’ll pay special attention to some highly counterintuitive doctrines: that the self doesn’t exist, and that much of perceived reality is in some sense illusory. Do these claims, radical as they sound, make a certain kind of sense in light of modern psychology? And what are the implications of all this for how we should live our lives? Can meditation make us not just happier, but better people?', 4, '08:00:00', '11:00:00', 6, 1, 0, ''),
(5, 0, 'Financial markets', 'Financial Market refers to a marketplace, where creation and trading of financial assets, such as shares, debentures, bonds, derivatives, currencies, etc.', 5, '08:00:00', '11:00:00', 5, 2, 10, ''),
(6, 0, 'Corporate finance', 'Corporate finance is the division of finance that deals with how corporations deal with funding sources, capital structuring, and investment decisions.', 6, '08:00:00', '11:00:00', 5, 3, 50, ''),
(7, 0, 'Algorithm specialization', 'This specialization is an introduction to algorithms for learners with at least a little programming experience.', 1, '11:00:00', '13:00:00', 3, 3, 50, ''),
(8, 35, 'Business and Financial Modeling', 'Financial modeling is a representation in numbers of a company\'s operations in the past, present, and the forecasted future.', 2, '11:00:00', '13:00:00', 1, 1, 0, ''),
(9, 35, 'Marketing in a Digital World', 'Marketing in a Digital World is one of the most popular courses on Coursera with over 250,000 Learners and is rated by Class Central as one of the Top 50 MOOCs of All Time (https://www.class-central.com/report/top-moocs/). The course was initially launched in 2015, and has been updated in April 2020.', 3, '11:00:00', '13:00:00', 1, 2, 10, ''),
(10, 0, 'Social Psychology', 'Social psychology is the scientific study of how people\'s thoughts, feelings, beliefs, intentions and goals are constructed within a social context by the actual or imagined interactions with others.', 4, '11:00:00', '13:00:00', 6, 3, 50, ''),
(16, 35, 'Front-end fundamentals', 'Learn the fundamentals of front end...', 5, '11:00:00', '13:00:00', 1, 1, 0, ''),
(25, 35, 'State management redux', 'Redux is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces.', 0, '08:00:00', '10:00:00', 1, 2, 20, ''),
(28, 0, 'History of Europe', 'The history of Europe concerns itself with the discovery and collection, the study, organization and presentation and the interpretation of past events and affairs of the people of Europe since the beginning of written records.', 0, '11:00:00', '13:00:00', 2, 2, 10, ''),
(30, 35, 'Vue js', 'vue js is Ui framework', 3, '11:00:00', '13:00:00', 1, 3, 50, ''),
(31, 35, 'Trigonometri', 'Trygonometri is', 1, NULL, NULL, 3, 1, 10, '/images/1622077594284-image.jpg'),
(32, 35, 'redux', 'description\nasdasd', 1, NULL, NULL, 1, 1, 10, '/images/1622106386617-image.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `levels`
--

CREATE TABLE `levels` (
  `id` int(11) NOT NULL,
  `level_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `levels`
--

INSERT INTO `levels` (`id`, `level_name`) VALUES
(1, 'Beginner'),
(2, 'Intermediate'),
(3, 'Advance');

-- --------------------------------------------------------

--
-- Struktur dari tabel `my_class`
--

CREATE TABLE `my_class` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_class` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `my_class`
--

INSERT INTO `my_class` (`id`, `id_user`, `id_class`) VALUES
(1, 34, 1),
(3, 36, 1),
(4, 34, 4),
(5, 36, 8),
(6, 36, 4),
(9, 34, 6),
(10, 34, 11),
(11, 36, 16),
(13, 61, 2),
(14, 61, 3),
(15, 34, 7),
(16, 77, 3),
(17, 34, 2),
(18, 34, 3),
(19, 34, 5);

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'student'),
(2, 'teacher');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sub_class`
--

CREATE TABLE `sub_class` (
  `id` int(11) NOT NULL,
  `sub_class_name` varchar(255) NOT NULL,
  `id_class` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `sub_class`
--

INSERT INTO `sub_class` (`id`, `sub_class_name`, `id_class`) VALUES
(1, 'HTML Essential Training', 16),
(2, 'CSS Essential Training', 16),
(3, 'Javascript Essential Training', 16),
(4, 'Responsive Layout', 16),
(5, 'Mid-term Exam', 16),
(6, 'Bootstrap4 Essential Training', 16),
(7, 'Sass Essential Training', 16),
(8, 'Learning React.js', 16),
(9, 'UX for Web Design', 16),
(10, 'Final-term Exam', 16),
(12, 'Javascript variable', 1),
(13, 'Spread operator', 1),
(14, 'Destructuring asignment', 1),
(15, 'FOR loop', 1),
(16, 'While loop', 1),
(17, 'Spread operator', 1),
(18, 'Ternary operator', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `gender` enum('L','P') NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1,
  `profile_img` varchar(255) NOT NULL,
  `otp` varchar(4) NOT NULL,
  `otp_expired` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `user_name`, `phone_number`, `gender`, `role`, `profile_img`, `otp`, `otp_expired`) VALUES
(34, '', 'betabet@gmail.com', '$2b$10$SBS56FhksBM0o0B2v9h91uucK1nnIJCdYsn67rgI2QpyZaw/GIera', 'dewakipas', '085238956085', 'L', 1, '/images/1622776254212-image.jpg', '', 1622772371581),
(35, 'bambang setyo budi', 'buddys@gmail.com', '$2b$10$PiUeakV43xiXdLze79UAdecAmqxsSJpSg/Q/ipVu2d/5q9mSQW1Tu', 'setyo', '082456786682', 'L', 2, '/images/1622767654011-image.jpg', '', 1622081697972),
(77, '', 'bamboo@gmail.com', '$2b$10$lfnF8hRnkh3Mwg6fNx.b1OmVp4VLZqlyJjRUstSGgfO06eCR5z.l2', 'bamboo', '', 'L', 1, '', '', 1621102799961),
(78, '', 'User@gmail.com', '$2b$10$.qh/E0E0e9cGs9nI2ikcVuZYnnOUt8J6tx4XWUXlbwLqsUczicoQO', 'User', '', 'L', 1, '', '', 1622753871655);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users_progress`
--

CREATE TABLE `users_progress` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_sub_class` int(11) NOT NULL,
  `id_class` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users_progress`
--

INSERT INTO `users_progress` (`id`, `id_user`, `id_sub_class`, `id_class`, `score`) VALUES
(1, 36, 1, 16, 80),
(2, 36, 2, 16, 90),
(3, 36, 3, 16, NULL),
(4, 36, 4, 16, NULL),
(5, 36, 5, 16, NULL),
(6, 36, 6, 16, NULL),
(7, 36, 7, 16, NULL),
(8, 36, 8, 16, NULL),
(9, 36, 9, 16, NULL),
(10, 36, 10, 16, NULL),
(12, 36, 12, 1, NULL),
(13, 36, 13, 1, NULL),
(14, 36, 14, 1, 84),
(15, 36, 15, 1, 65),
(16, 36, 16, 1, 80);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `my_class`
--
ALTER TABLE `my_class`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sub_class`
--
ALTER TABLE `sub_class`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users_progress`
--
ALTER TABLE `users_progress`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT untuk tabel `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `my_class`
--
ALTER TABLE `my_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `sub_class`
--
ALTER TABLE `sub_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT untuk tabel `users_progress`
--
ALTER TABLE `users_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
