-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Apr 2021 pada 05.49
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
  `class_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `day` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `category` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `pricing` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `class`
--

INSERT INTO `class` (`id`, `class_name`, `description`, `day`, `start_time`, `end_time`, `category`, `level`, `pricing`) VALUES
(1, 'Know more Javascript', 'JavaScript is a cross-platform, object-oriented scripting language used to make webpages interactive (e.g., having complex animations, clickable buttons, popup menus, etc.).', 0, '00:00:00', '00:00:00', 1, 1, 0),
(2, 'HTML and CSS to code', 'HTML (the Hypertext Markup Language) and CSS (Cascading Style Sheets) are two of the core technologies for building Web pages.', 0, '00:00:00', '00:00:00', 1, 2, 10),
(3, 'Indonesian war history', 'The military history of Indonesia includes the military history of the modern nation of Republic of Indonesia, as well as the military history of the states which preceded and formed it. It encompassed a kaleidoscope of conflicts spanning over a millennia.', 0, '00:00:00', '00:00:00', 2, 3, 50),
(4, 'Buddhism and Modern Psychology', 'The Dalai Lama has said that Buddhism and science are deeply compatible and has encouraged Western scholars to critically examine both the meditative practice and Buddhist ideas about the human mind. A number of scientists and philosophers have taken up this challenge. There have been brain scans of meditators and philosophical examinations of Buddhist doctrines. There have even been discussions of Darwin and the Buddha: Do early Buddhist descriptions of the mind, and of the human condition, make particular sense in light of evolutionary psychology? \r\n\r\nThis course will examine how Buddhism is faring under this scrutiny. Are neuroscientists starting to understand how meditation “works”? Would such an understanding validate meditation—or might physical explanations of meditation undermine the spiritual significance attributed to it? And how are some of the basic Buddhist claims about the human mind holding up? We’ll pay special attention to some highly counterintuitive doctrines: that the self doesn’t exist, and that much of perceived reality is in some sense illusory. Do these claims, radical as they sound, make a certain kind of sense in light of modern psychology? And what are the implications of all this for how we should live our lives? Can meditation make us not just happier, but better people?', 0, '00:00:00', '00:00:00', 6, 1, 0),
(5, 'Financial markets', 'Financial Market refers to a marketplace, where creation and trading of financial assets, such as shares, debentures, bonds, derivatives, currencies, etc.', 0, '00:00:00', '00:00:00', 5, 2, 10),
(6, 'Corporate finance', 'Corporate finance is the division of finance that deals with how corporations deal with funding sources, capital structuring, and investment decisions.', 0, '00:00:00', '00:00:00', 5, 3, 50),
(7, 'Algorithm specialization', 'This specialization is an introduction to algorithms for learners with at least a little programming experience.', 0, '00:00:00', '00:00:00', 3, 3, 50),
(8, 'Business and Financial Modeling', 'Financial modeling is a representation in numbers of a company\'s operations in the past, present, and the forecasted future.', 0, '00:00:00', '00:00:00', 1, 1, 0),
(9, 'Marketing in a Digital World', 'Marketing in a Digital World is one of the most popular courses on Coursera with over 250,000 Learners and is rated by Class Central as one of the Top 50 MOOCs of All Time (https://www.class-central.com/report/top-moocs/). The course was initially launched in 2015, and has been updated in April 2020.', 0, '00:00:00', '00:00:00', 1, 2, 10),
(10, 'Social Psychology', 'Social psychology is the scientific study of how people\'s thoughts, feelings, beliefs, intentions and goals are constructed within a social context by the actual or imagined interactions with others.', 0, '00:00:00', '00:00:00', 6, 3, 50),
(16, 'Front-end fundamentals', 'Learn the fundamentals of front end...', 0, '00:00:00', '00:00:00', 1, 1, 0);

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
(2, 'Intermediet'),
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
(2, 35, 8),
(3, 36, 1),
(4, 34, 4),
(5, 36, 8),
(6, 36, 4),
(7, 35, 4),
(8, 35, 10),
(9, 34, 6),
(10, 34, 11),
(11, 36, 16),
(12, 35, 16);

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
(14, 'Destructuring asignment', 1);

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
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `user_name`, `phone_number`, `gender`, `role`) VALUES
(34, '', 'betabet@gmail.com', '$2b$10$rP5Qy8i44457qpo0IFrtieiIw5l0657qLysM40exTzauNm4l.TlT.', 'dewakipas', '', 'L', '1'),
(35, 'bambang setyo budi', 'buddys@gmail.com', '$2b$10$DkLlcuuMgiFY1zJMXXssDuzvZ1jCj1ByFGxRK1h4GApBEHmEyvtbG', 'setyo', '081782944456', 'L', '2'),
(36, '', 'meyla@gmail.com', '$2b$10$5Fgj4apjENjIEktAx11wyuFMH39I0OgTWrqn5/hFMuGPw31Lvn6ei', 'rauf', '', 'L', ''),
(37, '', 'roboto@gmail.com', '$2b$10$iZEHV8qHVSSplIm40Ezfy.nv.b9pObwOj.o/wd3SmTY8lpah52kpG', 'roboto', '', 'L', ''),
(38, '', 'gimangkuy@gmail.com', '$2b$10$pa3hBCNXEyrJjFFERvY/AeuOojXJt.L0x0vfGYOYxXvkw6HBOBlHm', 'gimangkuy', '', 'L', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users_progress`
--

CREATE TABLE `users_progress` (
  `id` int(11) NOT NULL,
  `id_user_class` int(11) NOT NULL,
  `id_sub_class` int(11) NOT NULL,
  `id_class` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users_progress`
--

INSERT INTO `users_progress` (`id`, `id_user_class`, `id_sub_class`, `id_class`, `score`) VALUES
(1, 11, 1, 16, 80),
(2, 11, 2, 16, NULL),
(3, 11, 3, 16, NULL),
(4, 11, 4, 16, NULL),
(5, 11, 5, 16, NULL),
(6, 11, 6, 16, NULL),
(7, 11, 7, 16, NULL),
(8, 11, 8, 16, NULL),
(9, 11, 9, 16, NULL),
(10, 11, 10, 16, NULL),
(11, 12, 1, 16, 75),
(12, 3, 12, 1, NULL),
(13, 3, 13, 1, NULL),
(14, 3, 14, 1, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `my_class`
--
ALTER TABLE `my_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `sub_class`
--
ALTER TABLE `sub_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT untuk tabel `users_progress`
--
ALTER TABLE `users_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
