-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 05, 2024 lúc 01:52 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanlikhohang`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ctkiemke`
--

CREATE TABLE `ctkiemke` (
  `maphieukiemmke` varchar(11) NOT NULL COMMENT 'Mã phiếu kiểm kê',
  `masanpham` varchar(11) NOT NULL COMMENT 'Mã sản phẩm',
  `soluong` int(11) NOT NULL,
  `chenhlech` int(11) NOT NULL,
  `ghichu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ctphieunhap`
--

CREATE TABLE `ctphieunhap` (
  `maphieunhap` varchar(11) NOT NULL,
  `maphienbansp` varchar(11) NOT NULL,
  `soluong` int(11) NOT NULL DEFAULT 0,
  `dongia` int(11) NOT NULL DEFAULT 0,
  `hinhthucnhap` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ctphieunhap`
--

INSERT INTO `ctphieunhap` (`maphieunhap`, `maphienbansp`, `soluong`, `dongia`, `hinhthucnhap`) VALUES
('PN001', 'PB001', 6, 5000000, 0),
('PN038', 'PB003', 2, 20000, 0),
('PN039', 'PB003', 5, 5000000, 0),
('PN040', 'PB029', 1, 500000, 0),
('PN041', 'PB003', 1, 200000, 0),
('PN042', 'PB003', 1, 500000, 0),
('PN043', 'PB029', 5, 100000, 0),
('PN044', 'PB029', 5, 100000, 0),
('PN049', 'PB065', 5, 500000, 0),
('PN050', 'PB065', 5, 500000, 0),
('PN051', 'PB065', 5, 500000, 0),
('PN052', 'PB001', 5, 500000, 0),
('PN052', 'PB003', 5, 5000000, 0),
('PN053', 'PB065', 5, 500000, 0),
('PN054', 'PB065', 5, 500000, 0),
('PN056', 'PB001', 5, 5000000, 0),
('PN057', 'PB002', 5, 50000000, 0),
('PN058', 'PB065', 3, 1000000, 0),
('PN059', 'PB004', 3, 500000, 0),
('PN060', 'PB035', 5, 5000000, 0),
('PN064', 'PB067', 5, 100000, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ctphieuxuat`
--

CREATE TABLE `ctphieuxuat` (
  `maphieuxuat` varchar(11) NOT NULL,
  `maphienbansp` varchar(11) NOT NULL DEFAULT '0',
  `soluong` int(11) NOT NULL DEFAULT 0,
  `dongia` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ctphieuxuat`
--

INSERT INTO `ctphieuxuat` (`maphieuxuat`, `maphienbansp`, `soluong`, `dongia`) VALUES
('PX001', 'PB004', 1, 16500000),
('PX002', 'PB004', 3, 16500000),
('PX003', 'PB003', 5, 7800000),
('PX004', 'PB003', 4, 7800000),
('PX005', 'PB001', 4, 5500000),
('PX006', 'PB003', 1, 7800000),
('PX007', 'PB003', 3, 7800000),
('PX008', 'PB001', 4, 5500000),
('PX009', 'PB003', 2, 7800000),
('PX010', 'PB004', 3, 16500000),
('PX011', 'PB001', 2, 5500000),
('PX011', 'PB004', 3, 16500000),
('PX012', 'PB001', 1, 5500000),
('PX013', 'PB055', 3, 14000000),
('PX014', 'PB056', 2, 5500000),
('PX015', 'PB044', 2, 6400000),
('PX015', 'PB055', 3, 14000000),
('PX016', 'PB043', 5, 6400000),
('PX016', 'PB044', 3, 6400000),
('PX017', 'PB036', 3, 9500000),
('PX018', 'PB006', 2, 17000000),
('PX018', 'PB010', 1, 2890000),
('PX019', 'PB013', 2, 9000000),
('PX020', 'PB023', 3, 5790000),
('PX021', 'PB015', 4, 9000000),
('PX022', 'PB004', 1, 16500000),
('PX023', 'PB022', 3, 4400000),
('PX024', 'PB067', 2, 50000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ctquyen`
--

CREATE TABLE `ctquyen` (
  `manhomquyen` varchar(11) NOT NULL,
  `machucnang` varchar(50) NOT NULL,
  `hanhdong` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ctquyen`
--

INSERT INTO `ctquyen` (`manhomquyen`, `machucnang`, `hanhdong`) VALUES
('NQ001', 'khachhang', 'create'),
('NQ001', 'khachhang', 'delete'),
('NQ001', 'khachhang', 'update'),
('NQ001', 'khachhang', 'view'),
('NQ001', 'khuvuckho', 'create'),
('NQ001', 'khuvuckho', 'delete'),
('NQ001', 'khuvuckho', 'update'),
('NQ001', 'khuvuckho', 'view'),
('NQ001', 'nhacungcap', 'create'),
('NQ001', 'nhacungcap', 'delete'),
('NQ001', 'nhacungcap', 'update'),
('NQ001', 'nhacungcap', 'view'),
('NQ001', 'nhanvien', 'create'),
('NQ001', 'nhanvien', 'delete'),
('NQ001', 'nhanvien', 'update'),
('NQ001', 'nhanvien', 'view'),
('NQ001', 'nhaphang', 'create'),
('NQ001', 'nhaphang', 'delete'),
('NQ001', 'nhaphang', 'update'),
('NQ001', 'nhaphang', 'view'),
('NQ001', 'nhomquyen', 'create'),
('NQ001', 'nhomquyen', 'delete'),
('NQ001', 'nhomquyen', 'update'),
('NQ001', 'nhomquyen', 'view'),
('NQ001', 'sanpham', 'create'),
('NQ001', 'sanpham', 'delete'),
('NQ001', 'sanpham', 'update'),
('NQ001', 'sanpham', 'view'),
('NQ001', 'taikhoan', 'create'),
('NQ001', 'taikhoan', 'delete'),
('NQ001', 'taikhoan', 'update'),
('NQ001', 'taikhoan', 'view'),
('NQ001', 'thongke', 'create'),
('NQ001', 'thongke', 'delete'),
('NQ001', 'thongke', 'update'),
('NQ001', 'thongke', 'view'),
('NQ001', 'thuoctinh', 'create'),
('NQ001', 'thuoctinh', 'delete'),
('NQ001', 'thuoctinh', 'update'),
('NQ001', 'thuoctinh', 'view'),
('NQ001', 'xuathang', 'create'),
('NQ001', 'xuathang', 'delete'),
('NQ001', 'xuathang', 'update'),
('NQ001', 'xuathang', 'view'),
('NQ002', 'khuvuckho', 'create'),
('NQ002', 'khuvuckho', 'update'),
('NQ002', 'khuvuckho', 'view'),
('NQ002', 'nhacungcap', 'create'),
('NQ002', 'nhacungcap', 'update'),
('NQ002', 'nhacungcap', 'view'),
('NQ002', 'nhaphang', 'create'),
('NQ002', 'nhaphang', 'update'),
('NQ002', 'nhaphang', 'view'),
('NQ002', 'sanpham', 'create'),
('NQ002', 'sanpham', 'update'),
('NQ002', 'sanpham', 'view'),
('NQ002', 'thuoctinh', 'create'),
('NQ002', 'thuoctinh', 'delete'),
('NQ002', 'thuoctinh', 'update'),
('NQ002', 'thuoctinh', 'view'),
('NQ003', 'khachhang', 'create'),
('NQ003', 'khachhang', 'update'),
('NQ003', 'khachhang', 'view'),
('NQ003', 'sanpham', 'update'),
('NQ003', 'sanpham', 'view'),
('NQ003', 'xuathang', 'create'),
('NQ003', 'xuathang', 'update'),
('NQ003', 'xuathang', 'view'),
('NQ004', 'donvitinh', 'view'),
('NQ004', 'khuvuckho', 'view'),
('NQ004', 'kiemke', 'view'),
('NQ004', 'loaisanpham', 'view'),
('NQ004', 'nhacungcap', 'view'),
('NQ005', 'khachhang', 'view'),
('NQ005', 'khuvuckho', 'view'),
('NQ006', 'khuvuckho', 'view'),
('NQ006', 'kiemke', 'view'),
('NQ006', 'loaisanpham', 'view'),
('NQ006', 'nhacungcap', 'view'),
('NQ006', 'nhanvien', 'view'),
('NQ007', 'loaisanpham', 'create'),
('NQ007', 'nhanvien', 'create'),
('NQ007', 'sanpham', 'create'),
('NQ007', 'xuathang', 'create'),
('NQ008', 'donvitinh', 'view'),
('NQ009', 'khachhang', 'view'),
('NQ009', 'khuvuckho', 'view'),
('NQ010', 'khachhang', 'view'),
('NQ010', 'khuvuckho', 'view'),
('NQ010', 'nhanvien', 'view');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ctsanpham`
--

CREATE TABLE `ctsanpham` (
  `maimei` varchar(255) NOT NULL DEFAULT 'AUTO_INCREMENT' COMMENT 'Mã imei của sản phẩm',
  `maphienbansp` varchar(11) NOT NULL,
  `maphieunhap` varchar(11) NOT NULL,
  `maphieuxuat` varchar(11) DEFAULT NULL,
  `tinhtrang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ctsanpham`
--

INSERT INTO `ctsanpham` (`maimei`, `maphienbansp`, `maphieunhap`, `maphieuxuat`, `tinhtrang`) VALUES
('0000000000000010', 'PB001', 'PN052', NULL, 1),
('000000000000006', 'PB001', 'PN052', NULL, 1),
('000000000000007', 'PB001', 'PN052', NULL, 1),
('000000000000008', 'PB001', 'PN052', NULL, 1),
('000000000000009', 'PB001', 'PN052', NULL, 1),
('000000000000011', 'PB003', 'PN052', NULL, 1),
('000000000000012', 'PB003', 'PN052', NULL, 1),
('000000000000013', 'PB003', 'PN052', NULL, 1),
('000000000000014', 'PB003', 'PN052', NULL, 1),
('000000000000015', 'PB003', 'PN052', NULL, 1),
('000000000000020', 'PB065', 'PN053', NULL, 1),
('000000000000021', 'PB065', 'PN053', NULL, 1),
('000000000000022', 'PB065', 'PN053', NULL, 1),
('000000000000023', 'PB065', 'PN053', NULL, 1),
('000000000000024', 'PB065', 'PN053', NULL, 1),
('000000000000025', 'PB065', 'PN053', NULL, 1),
('000000000000030', 'PB065', 'PN054', NULL, 1),
('000000000000031', 'PB065', 'PN054', NULL, 1),
('000000000000032', 'PB065', 'PN054', NULL, 1),
('000000000000033', 'PB065', 'PN054', NULL, 1),
('000000000000034', 'PB065', 'PN054', NULL, 1),
('000000000000035', 'PB065', 'PN054', NULL, 1),
('000000000000050', 'PB001', 'PN056', NULL, 1),
('000000000000051', 'PB001', 'PN056', NULL, 1),
('000000000000052', 'PB001', 'PN056', NULL, 1),
('000000000000053', 'PB001', 'PN056', NULL, 1),
('000000000000054', 'PB001', 'PN056', NULL, 1),
('000000000000055', 'PB001', 'PN056', NULL, 1),
('000000000000060', 'PB002', 'PN057', NULL, 1),
('000000000000061', 'PB002', 'PN057', NULL, 1),
('000000000000062', 'PB002', 'PN057', NULL, 1),
('000000000000063', 'PB002', 'PN057', NULL, 1),
('000000000000064', 'PB002', 'PN057', NULL, 1),
('000000000000065', 'PB002', 'PN057', NULL, 1),
('000000000000071', 'PB004', 'PN059', NULL, 1),
('000000000000072', 'PB004', 'PN059', NULL, 1),
('000000000000073', 'PB004', 'PN059', NULL, 1),
('000000000000080', 'PB065', 'PN058', NULL, 1),
('000000000000081', 'PB065', 'PN058', NULL, 1),
('000000000000082', 'PB065', 'PN058', NULL, 1),
('000000000000083', 'PB065', 'PN058', NULL, 1),
('000000000000100', 'PB035', 'PN060', NULL, 1),
('000000000000101', 'PB035', 'PN060', NULL, 1),
('000000000000102', 'PB035', 'PN060', NULL, 1),
('000000000000103', 'PB035', 'PN060', NULL, 1),
('000000000000104', 'PB035', 'PN060', NULL, 1),
('000000000000200', 'PB067', 'PN064', 'PX024', 0),
('000000000000201', 'PB067', 'PN064', 'PX024', 0),
('000000000000202', 'PB067', 'PN064', NULL, 1),
('000000000000203', 'PB067', 'PN064', NULL, 1),
('000000000000204', 'PB067', 'PN064', NULL, 1),
('107725056444797', 'PB026', 'PN014', NULL, 1),
('107725056444798', 'PB026', 'PN014', NULL, 1),
('107725056444799', 'PB026', 'PN014', NULL, 1),
('107725056444800', 'PB026', 'PN014', NULL, 1),
('107725056444801', 'PB026', 'PN014', NULL, 1),
('107725056444802', 'PB026', 'PN014', NULL, 1),
('107725056444803', 'PB026', 'PN014', NULL, 1),
('123456789000001', 'PB065', 'PN051', NULL, 1),
('123456789000002', 'PB065', 'PN051', NULL, 1),
('123456789000003', 'PB065', 'PN051', NULL, 1),
('123456789000004', 'PB065', 'PN051', NULL, 1),
('123456789000005', 'PB065', 'PN051', NULL, 1),
('128680626510768', 'PB010', 'PN012', NULL, 1),
('128680626510769', 'PB010', 'PN012', 'PX019', 0),
('128680626510770', 'PB010', 'PN012', NULL, 1),
('191487469319798', 'PB012', 'PN012', NULL, 1),
('191487469319799', 'PB012', 'PN012', NULL, 1),
('191487469319800', 'PB012', 'PN012', NULL, 1),
('191487469319801', 'PB012', 'PN012', NULL, 1),
('191487469319802', 'PB012', 'PN012', NULL, 1),
('201865493271034', 'PB004', 'PN008', NULL, 1),
('201865493271035', 'PB004', 'PN008', 'PX011', 0),
('201865493271036', 'PB004', 'PN008', 'PX011', 0),
('201865493271037', 'PB004', 'PN008', 'PX011', 0),
('201865493271038', 'PB004', 'PN008', 'PX023', 0),
('209563810276493', 'PB006', 'PN009', NULL, 1),
('209563810276494', 'PB006', 'PN009', NULL, 1),
('209563810276495', 'PB006', 'PN009', 'PX019', 0),
('209563810276496', 'PB006', 'PN009', 'PX019', 0),
('209563810276497', 'PB006', 'PN009', NULL, 1),
('209563810276498', 'PB006', 'PN009', NULL, 1),
('209563810276499', 'PB006', 'PN009', NULL, 1),
('222222222222223', 'PB029', 'PN040', NULL, 1),
('222222222222224', 'PB029', 'PN040', NULL, 1),
('222222222222225', 'PB029', 'PN040', NULL, 1),
('234307273503481', 'PB014', 'PN013', NULL, 1),
('234307273503482', 'PB014', 'PN013', NULL, 1),
('234307273503483', 'PB014', 'PN013', NULL, 1),
('234307273503484', 'PB014', 'PN013', NULL, 1),
('234307273503485', 'PB014', 'PN013', NULL, 1),
('234307273503486', 'PB014', 'PN013', NULL, 1),
('234307273503487', 'PB014', 'PN013', NULL, 1),
('234307273503488', 'PB014', 'PN013', NULL, 1),
('234307273503489', 'PB014', 'PN013', NULL, 1),
('234307273503490', 'PB014', 'PN013', NULL, 1),
('234307273503491', 'PB014', 'PN013', NULL, 1),
('234307273503492', 'PB014', 'PN013', NULL, 1),
('234307273503493', 'PB014', 'PN013', NULL, 1),
('234307273503494', 'PB014', 'PN013', NULL, 1),
('234307273503495', 'PB014', 'PN013', NULL, 1),
('237439786201794', 'PB041', 'PN016', NULL, 1),
('237439786201795', 'PB041', 'PN016', NULL, 1),
('237439786201796', 'PB041', 'PN016', NULL, 1),
('237439786201797', 'PB041', 'PN016', NULL, 1),
('237439786201798', 'PB041', 'PN016', NULL, 1),
('237439786201799', 'PB041', 'PN016', NULL, 1),
('237439786201800', 'PB041', 'PN016', NULL, 1),
('237439786201801', 'PB041', 'PN016', NULL, 1),
('237439786201802', 'PB041', 'PN016', NULL, 1),
('237439786201803', 'PB041', 'PN016', NULL, 1),
('248644019558673', 'PB027', 'PN014', NULL, 1),
('248644019558674', 'PB027', 'PN014', NULL, 1),
('248644019558675', 'PB027', 'PN014', NULL, 1),
('248644019558676', 'PB027', 'PN014', NULL, 1),
('248644019558677', 'PB027', 'PN014', NULL, 1),
('248644019558678', 'PB027', 'PN014', NULL, 1),
('267300933303009', 'PB055', 'PN015', NULL, 1),
('267300933303010', 'PB055', 'PN015', 'PX014', 0),
('267300933303011', 'PB055', 'PN015', 'PX014', 0),
('267300933303012', 'PB055', 'PN015', 'PX014', 0),
('267300933303013', 'PB055', 'PN015', NULL, 1),
('267300933303014', 'PB055', 'PN015', NULL, 1),
('267300933303015', 'PB055', 'PN015', 'PX016', 0),
('267300933303016', 'PB055', 'PN015', 'PX016', 0),
('267300933303017', 'PB055', 'PN015', 'PX016', 0),
('267300933303018', 'PB055', 'PN015', NULL, 1),
('267300933303019', 'PB055', 'PN015', NULL, 1),
('267300933303020', 'PB055', 'PN015', NULL, 1),
('267300933303021', 'PB055', 'PN015', NULL, 1),
('325645285296325', 'PB064', 'PN021', NULL, 1),
('325645285296326', 'PB064', 'PN021', NULL, 1),
('325645285296327', 'PB064', 'PN021', NULL, 1),
('325645285296328', 'PB064', 'PN021', NULL, 1),
('325645285296329', 'PB064', 'PN021', NULL, 1),
('354091067813468', 'PB001', 'PN005', NULL, 1),
('354091067813469', 'PB001', 'PN005', 'PX006', 0),
('355663242747336', 'PB003', 'PN004', 'PX004', 0),
('355663242747337', 'PB003', 'PN004', 'PX004', 0),
('355663242747338', 'PB003', 'PN004', 'PX004', 0),
('355663242747339', 'PB003', 'PN004', 'PX004', 0),
('355663242747340', 'PB003', 'PN004', 'PX004', 0),
('356285038690365', 'PB045', 'PN020', NULL, 1),
('356285038690366', 'PB045', 'PN020', NULL, 1),
('356285038690367', 'PB045', 'PN020', NULL, 1),
('356285038690368', 'PB045', 'PN020', NULL, 1),
('356285038690369', 'PB045', 'PN020', NULL, 1),
('356285077460984', 'PB004', 'PN001', 'PX002', 0),
('356285077460985', 'PB004', 'PN001', 'PX003', 0),
('356285077460989', 'PB004', 'PN002', 'PX003', 0),
('356285077460990', 'PB004', 'PN002', 'PX003', 0),
('356285077460991', 'PB004', 'PN002', 'PX012', 0),
('356285077460992', 'PB004', 'PN002', 'PX012', 0),
('356285077460993', 'PB004', 'PN002', 'PX012', 0),
('356285088460123', 'PB001', 'PN002', 'PX006', 0),
('356285088460124', 'PB001', 'PN002', 'PX006', 0),
('356285088460125', 'PB001', 'PN002', 'PX006', 0),
('356285088460126', 'PB001', 'PN002', NULL, 1),
('356285088460127', 'PB001', 'PN002', NULL, 1),
('356285088460128', 'PB001', 'PN002', 'PX009', 0),
('356285088460129', 'PB001', 'PN002', 'PX009', 0),
('356285088460876', 'PB001', 'PN001', 'PX009', 0),
('356285088460877', 'PB001', 'PN001', 'PX009', 0),
('356285088460878', 'PB001', 'PN001', NULL, 1),
('356285088460879', 'PB001', 'PN001', NULL, 1),
('356285088460880', 'PB001', 'PN001', 'PX012', 0),
('356285088460881', 'PB001', 'PN001', 'PX012', 0),
('356679247460989', 'PB003', 'PN003', 'PX005', 0),
('356679247460990', 'PB003', 'PN003', 'PX005', 0),
('356679247460991', 'PB003', 'PN003', 'PX005', 0),
('356679247460992', 'PB003', 'PN003', NULL, 1),
('356679247460993', 'PB003', 'PN003', 'PX005', 0),
('356679247460994', 'PB003', 'PN003', NULL, 1),
('356679247460995', 'PB003', 'PN003', 'PX008', 0),
('356679247460996', 'PB003', 'PN003', 'PX008', 0),
('356679247460997', 'PB003', 'PN003', 'PX007', 0),
('356679247460998', 'PB003', 'PN003', 'PX008', 0),
('356679247460999', 'PB003', 'PN003', NULL, 1),
('356679247461000', 'PB003', 'PN003', 'PX010', 0),
('427856011841915', 'PB007', 'PN012', NULL, 1),
('427856011841916', 'PB007', 'PN012', NULL, 1),
('427856011841917', 'PB007', 'PN012', NULL, 1),
('493536926712616', 'PB023', 'PN014', NULL, 1),
('493536926712617', 'PB023', 'PN014', '21', 0),
('493536926712618', 'PB023', 'PN014', '21', 0),
('493536926712619', 'PB023', 'PN014', '21', 0),
('493536926712620', 'PB023', 'PN014', NULL, 1),
('493536926712621', 'PB023', 'PN014', NULL, 1),
('493536926712622', 'PB023', 'PN014', NULL, 1),
('493536926712623', 'PB023', 'PN014', NULL, 1),
('493536926712624', 'PB023', 'PN014', NULL, 1),
('493536926712625', 'PB023', 'PN014', NULL, 1),
('493536926712626', 'PB023', 'PN014', NULL, 1),
('493536926712627', 'PB023', 'PN014', NULL, 1),
('514897969548020', 'PB011', 'PN012', NULL, 1),
('514897969548021', 'PB011', 'PN012', NULL, 1),
('514897969548022', 'PB011', 'PN012', NULL, 1),
('514897969548023', 'PB011', 'PN012', NULL, 1),
('578559728952141', 'PB015', 'PN013', NULL, 1),
('578559728952142', 'PB015', 'PN013', NULL, 1),
('578559728952143', 'PB015', 'PN013', NULL, 1),
('578559728952144', 'PB015', 'PN013', 'PX022', 0),
('578559728952145', 'PB015', 'PN013', 'PX022', 0),
('578559728952146', 'PB015', 'PN013', 'PX022', 0),
('578559728952147', 'PB015', 'PN013', 'PX022', 0),
('578559728952148', 'PB015', 'PN013', NULL, 1),
('578559728952149', 'PB015', 'PN013', NULL, 1),
('578559728952150', 'PB015', 'PN013', NULL, 1),
('578559728952151', 'PB015', 'PN013', NULL, 1),
('578559728952152', 'PB015', 'PN013', NULL, 1),
('578559728952153', 'PB015', 'PN013', NULL, 1),
('578559728952154', 'PB015', 'PN013', NULL, 1),
('578559728952155', 'PB015', 'PN013', NULL, 1),
('630481155578246', 'PB047', 'PN016', NULL, 1),
('630481155578247', 'PB047', 'PN016', NULL, 1),
('630481155578248', 'PB047', 'PN016', NULL, 1),
('630481155578249', 'PB047', 'PN016', NULL, 1),
('630481155578250', 'PB047', 'PN016', NULL, 1),
('630481155578251', 'PB047', 'PN016', NULL, 1),
('630481155578252', 'PB047', 'PN016', NULL, 1),
('630481155578253', 'PB047', 'PN016', NULL, 1),
('630481155578254', 'PB047', 'PN016', NULL, 1),
('630481155578255', 'PB047', 'PN016', NULL, 1),
('630481155578256', 'PB047', 'PN016', NULL, 1),
('630481155578257', 'PB047', 'PN016', NULL, 1),
('630481155578258', 'PB047', 'PN016', NULL, 1),
('630481155578259', 'PB047', 'PN016', NULL, 1),
('630481155578260', 'PB047', 'PN016', NULL, 1),
('630481155578261', 'PB047', 'PN016', NULL, 1),
('630481155578262', 'PB047', 'PN016', NULL, 1),
('630481155578263', 'PB047', 'PN016', NULL, 1),
('630481155578264', 'PB047', 'PN016', NULL, 1),
('630481155578265', 'PB047', 'PN016', NULL, 1),
('663695386896779', 'PB056', 'PN015', NULL, 1),
('663695386896780', 'PB056', 'PN015', NULL, 1),
('663695386896781', 'PB056', 'PN015', NULL, 1),
('663695386896782', 'PB056', 'PN015', NULL, 1),
('663695386896783', 'PB056', 'PN015', NULL, 1),
('663695386896784', 'PB056', 'PN015', 'PX015', 0),
('663695386896785', 'PB056', 'PN015', 'PX015', 0),
('692900977366244', 'PB045', 'PN019', NULL, 1),
('692900977366245', 'PB045', 'PN019', NULL, 1),
('692900977366246', 'PB045', 'PN019', NULL, 1),
('692900977366247', 'PB045', 'PN019', NULL, 1),
('692900977366248', 'PB045', 'PN019', NULL, 1),
('692900977366249', 'PB045', 'PN019', NULL, 1),
('753654159875633', 'PB003', 'PN042', NULL, 1),
('753654159875634', 'PB003', 'PN042', NULL, 1),
('753654159875635', 'PB003', 'PN042', NULL, 1),
('845223209939936', 'PB044', 'PN018', 'PX017', 0),
('845223209939937', 'PB044', 'PN018', 'PX017', 0),
('845223209939938', 'PB044', 'PN018', 'PX017', 0),
('845223209939939', 'PB044', 'PN018', 'PX016', 0),
('845223209939940', 'PB044', 'PN018', 'PX016', 0),
('853057665280035', 'PB013', 'PN013', 'PX020', 0),
('853057665280036', 'PB013', 'PN013', 'PX020', 0),
('853057665280037', 'PB013', 'PN013', NULL, 1),
('853057665280038', 'PB013', 'PN013', NULL, 1),
('853057665280039', 'PB013', 'PN013', NULL, 1),
('853057665280040', 'PB013', 'PN013', NULL, 1),
('853057665280041', 'PB013', 'PN013', NULL, 1),
('853057665280042', 'PB013', 'PN013', NULL, 1),
('853057665280043', 'PB013', 'PN013', NULL, 1),
('853057665280044', 'PB013', 'PN013', NULL, 1),
('853057665280045', 'PB013', 'PN013', NULL, 1),
('853057665280046', 'PB013', 'PN013', NULL, 1),
('853057665280047', 'PB013', 'PN013', NULL, 1),
('853057665280048', 'PB013', 'PN013', NULL, 1),
('853057665280049', 'PB013', 'PN013', NULL, 1),
('876068039547345', 'PB036', 'PN017', 'PX018', 0),
('876068039547346', 'PB036', 'PN017', 'PX018', 0),
('876068039547347', 'PB036', 'PN017', 'PX018', 0),
('876068039547348', 'PB036', 'PN017', NULL, 1),
('876068039547349', 'PB036', 'PN017', NULL, 1),
('876068039547350', 'PB036', 'PN017', NULL, 1),
('876068039547351', 'PB036', 'PN017', NULL, 1),
('876068039547352', 'PB036', 'PN017', NULL, 1),
('876068039547353', 'PB036', 'PN017', NULL, 1),
('912609172880156', 'PB003', 'PN010', 'PX010', 0),
('919448001026640', 'PB022', 'PN013', NULL, 1),
('919448001026641', 'PB022', 'PN013', NULL, 1),
('919448001026642', 'PB022', 'PN013', NULL, 1),
('919448001026643', 'PB022', 'PN013', NULL, 1),
('919448001026644', 'PB022', 'PN013', NULL, 1),
('919448001026645', 'PB022', 'PN013', NULL, 1),
('919448001026646', 'PB022', 'PN013', NULL, 1),
('919448001026647', 'PB022', 'PN013', NULL, 1),
('919448001026648', 'PB022', 'PN013', NULL, 1),
('919448001026649', 'PB022', 'PN013', NULL, 1),
('919448001026650', 'PB022', 'PN013', NULL, 1),
('919448001026651', 'PB022', 'PN013', NULL, 1),
('919448001026652', 'PB022', 'PN013', NULL, 1),
('919448001026653', 'PB022', 'PN013', NULL, 1),
('919448001026654', 'PB022', 'PN013', NULL, 1),
('919448001026655', 'PB022', 'PN013', NULL, 1),
('919448001026656', 'PB022', 'PN013', NULL, 1),
('919448001026657', 'PB022', 'PN013', NULL, 1),
('919448001026658', 'PB022', 'PN013', NULL, 1),
('919448001026659', 'PB022', 'PN013', NULL, 1),
('919448001026660', 'PB022', 'PN013', NULL, 1),
('919448001026661', 'PB022', 'PN013', NULL, 1),
('919448001026662', 'PB022', 'PN013', NULL, 1),
('919448001026663', 'PB022', 'PN013', NULL, 1),
('919448001026664', 'PB022', 'PN013', NULL, 1),
('919448001026665', 'PB022', 'PN013', NULL, 1),
('919448001026666', 'PB022', 'PN013', NULL, 1),
('919448001026667', 'PB022', 'PN013', NULL, 1),
('919448001026668', 'PB022', 'PN013', NULL, 1),
('919448001026669', 'PB022', 'PN013', NULL, 1),
('964768426041520', 'PB043', 'PN018', 'PX017', 0),
('964768426041521', 'PB043', 'PN018', 'PX017', 0),
('964768426041522', 'PB043', 'PN018', 'PX017', 0),
('964768426041523', 'PB043', 'PN018', 'PX017', 0),
('964768426041524', 'PB043', 'PN018', 'PX017', 0),
('968080239661041', 'PB001', 'PN011', 'PX013', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhmucchucnang`
--

CREATE TABLE `danhmucchucnang` (
  `machucnang` varchar(50) NOT NULL,
  `tenchucnang` varchar(255) NOT NULL,
  `trangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `danhmucchucnang`
--

INSERT INTO `danhmucchucnang` (`machucnang`, `tenchucnang`, `trangthai`) VALUES
('khachhang', 'Quản lý khách hàng', 0),
('khuvuckho', 'Quản lý khu vực kho', 0),
('nhacungcap', 'Quản lý nhà cung cấp', 0),
('nhanvien', 'Quản lý nhân viên', 0),
('nhaphang', 'Quản lý nhập hàng', 0),
('nhomquyen', 'Quản lý nhóm quyền', 0),
('sanpham', 'Quản lý sản phẩm', 0),
('taikhoan', 'Quản lý tài khoản', 0),
('thongke', 'Quản lý thống kê', 0),
('thuoctinh', 'Quản lý thuộc tính', 0),
('xuathang', 'Quản lý xuất hàng', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dungluongram`
--

CREATE TABLE `dungluongram` (
  `madlram` varchar(11) NOT NULL,
  `kichthuocram` int(11) DEFAULT NULL,
  `trangthai` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `dungluongram`
--

INSERT INTO `dungluongram` (`madlram`, `kichthuocram`, `trangthai`) VALUES
('RAM001', 3, 1),
('RAM002', 2, 1),
('RAM003', 4, 1),
('RAM004', 6, 1),
('RAM005', 8, 1),
('RAM006', 12, 1);

--
-- Bẫy `dungluongram`
--
DELIMITER $$
CREATE TRIGGER `before_insert_dungluongram` BEFORE INSERT ON `dungluongram` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manhacungcap lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(madlram, 4) AS UNSIGNED)) INTO max_id FROM dungluongram;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manhacungcap mới cho bản ghi được chèn
    SET NEW.madlram = CONCAT('RAM', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dungluongrom`
--

CREATE TABLE `dungluongrom` (
  `madlrom` varchar(11) NOT NULL,
  `kichthuocrom` int(11) DEFAULT NULL,
  `trangthai` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `dungluongrom`
--

INSERT INTO `dungluongrom` (`madlrom`, `kichthuocrom`, `trangthai`) VALUES
('ROM001', 32, 1),
('ROM002', 64, 1),
('ROM003', 128, 1),
('ROM004', 256, 1),
('ROM005', 512, 1),
('ROM006', 1024, 1);

--
-- Bẫy `dungluongrom`
--
DELIMITER $$
CREATE TRIGGER `before_insert_dungluongrom` BEFORE INSERT ON `dungluongrom` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manhacungcap lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(madlrom, 4) AS UNSIGNED)) INTO max_id FROM dungluongrom;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manhacungcap mới cho bản ghi được chèn
    SET NEW.madlrom = CONCAT('ROM', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hedieuhanh`
--

CREATE TABLE `hedieuhanh` (
  `mahedieuhanh` varchar(11) NOT NULL,
  `tenhedieuhanh` varchar(255) NOT NULL,
  `trangthai` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hedieuhanh`
--

INSERT INTO `hedieuhanh` (`mahedieuhanh`, `tenhedieuhanh`, `trangthai`) VALUES
('HDH001', 'Android', 1),
('HDH002', 'IOS', 1),
('HDH003', '', 0);

--
-- Bẫy `hedieuhanh`
--
DELIMITER $$
CREATE TRIGGER `before_insert_hedieuhanh` BEFORE INSERT ON `hedieuhanh` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manhacungcap lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(mahedieuhanh, 4) AS UNSIGNED)) INTO max_id FROM hedieuhanh;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manhacungcap mới cho bản ghi được chèn
    SET NEW.mahedieuhanh = CONCAT('HDH', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `makh` varchar(11) NOT NULL,
  `tenkhachhang` varchar(255) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `sdt` varchar(255) NOT NULL,
  `trangthai` int(11) NOT NULL,
  `ngaythamgia` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`makh`, `tenkhachhang`, `diachi`, `sdt`, `trangthai`, `ngaythamgia`) VALUES
('KH001', 'Nguyễn Văn A', 'Gia Đức, Ân Đức, Hoài Ân, Bình Định', '0387913347', 1, '2023-04-19 09:52:29'),
('KH002', 'Trần Nhất Nhất', '205 Trần Hưng Đạo, Phường 10, Quận 5, Thành phố Hồ Chí Minh', '0123456789', 1, '2023-04-19 09:52:29'),
('KH003', 'Hoàng Gia Bo', 'Khoa Trường, Hoài Ân, Bình Định', '0987654321', 1, '2023-04-19 09:52:29'),
('KH004', 'Hồ Minh Hưng', 'Khoa Trường, Hoài Ân, Bình Định', '0867987456', 1, '2023-04-19 09:52:29'),
('KH005', 'Nguyễn Thị Minh Anh', '123 Phố Huế, Quận Hai Bà Trưng, Hà Nội', '0935123456', 1, '2023-04-30 17:59:57'),
('KH006', 'Trần Đức Minh', '789 Đường Lê Hồng Phong, Thành phố Đà Nẵng', '0983456789', 1, '2023-04-30 18:08:12'),
('KH007', 'Lê Hải Yến', '456 Tôn Thất Thuyết, Quận 4, Thành phố Hồ Chí Minh', '0977234567', 1, '2023-04-30 18:08:47'),
('KH008', 'Phạm Thanh Hằng', '102 Lê Duẩn, Thành phố Hải Phòng', '0965876543', 1, '2023-04-30 18:12:59'),
('KH009', 'Hoàng Đức Anh', '321 Lý Thường Kiệt, Thành phố Cần Thơ', '0946789012', 1, '2023-04-30 18:13:47'),
('KH010', 'Ngô Thanh Tùng', '987 Trần Hưng Đạo, Quận 1, Thành phố Hồ Chí Minh', '0912345678', 1, '2023-04-30 18:14:12'),
('KH011', 'Võ Thị Kim Ngân', '555 Nguyễn Văn Linh, Quận Nam Từ Liêm, Hà Nội', '0916789123', 1, '2023-04-30 18:15:11'),
('KH012', 'Đỗ Văn Tú', '777 Hùng Vương, Thành phố Huế', '0982345678', 1, '2023-04-30 18:15:56'),
('KH013', 'Lý Thanh Trúc', '888 Nguyễn Thái Học, Quận Ba Đình, Hà Nội', '0982123456', 1, '2023-04-30 18:16:22'),
('KH014', 'Bùi Văn Hoàng', '222 Đường 2/4, Thành phố Nha Trang', '0933789012', 1, '2023-04-30 18:16:53'),
('KH015', 'Lê Văn Thành', '23 Đường 3 Tháng 2, Quận 10, TP. Hồ Chí Minh', '0933456789', 1, '2023-04-30 18:17:46'),
('KH016', 'Nguyễn Thị Lan Anh', '456 Lê Lợi, Quận 1, TP. Hà Nội', '0965123456', 1, '2023-04-30 18:18:10'),
('KH017', 'Phạm Thị Mai', '234 Lê Hồng Phong, Quận 5, TP. Hồ Chí Minh', '0946789012', 1, '2023-04-30 18:18:34'),
('KH018', 'Hoàng Văn Nam', ' 567 Phố Huế, Quận Hai Bà Trưng, Hà Nội', '0912345678', 1, '2023-04-30 18:19:16'),
('KH019', 'Lâm Nguyễn Minh Thắng ', '341 Cao Đạt p1 q5', '0816600038', 0, '2024-11-11 17:23:44');

--
-- Bẫy `khachhang`
--
DELIMITER $$
CREATE TRIGGER `before_insert_khachhang` BEFORE INSERT ON `khachhang` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manv lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(makh, 3) AS INT)) INTO max_id FROM khachhang;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manv mới cho bản ghi được chèn
    SET NEW.makh = CONCAT('KH', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khuvuckho`
--

CREATE TABLE `khuvuckho` (
  `makhuvuc` varchar(11) NOT NULL,
  `tenkhuvuc` varchar(255) NOT NULL,
  `ghichu` varchar(255) NOT NULL,
  `trangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khuvuckho`
--

INSERT INTO `khuvuckho` (`makhuvuc`, `tenkhuvuc`, `ghichu`, `trangthai`) VALUES
('KV001', 'Khu vực A', 'Apple', 1),
('KV002', 'Khu vực B', 'Xiaomi', 1),
('KV003', 'Khu vực C', 'Samsung', 1),
('KV004', 'Khu vực D', 'Realme', 1),
('KV005', 'Khu vực E', 'Oppo', 1);

--
-- Bẫy `khuvuckho`
--
DELIMITER $$
CREATE TRIGGER `before_insert_khuvuckho` BEFORE INSERT ON `khuvuckho` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manv lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(makhuvuc, 3) AS INT)) INTO max_id FROM khuvuckho;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manv mới cho bản ghi được chèn
    SET NEW.makhuvuc = CONCAT('KV', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mausac`
--

CREATE TABLE `mausac` (
  `mamau` varchar(11) NOT NULL,
  `tenmau` varchar(50) NOT NULL DEFAULT '0',
  `trangthai` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `mausac`
--

INSERT INTO `mausac` (`mamau`, `tenmau`, `trangthai`) VALUES
('MAU001', 'Xanh', 1),
('MAU002', 'Đỏ', 1),
('MAU003', 'Vàng', 1),
('MAU004', 'Bạc', 1),
('MAU005', 'Hồng', 1),
('MAU006', 'Đen', 1),
('MAU007', 'Xanh ngọc', 1),
('MAU008', 'Tím', 1),
('MAU009', 'Xanh dương', 1),
('MAU010', 'Xanh lá', 1),
('MAU011', 'Cam', 1),
('MAU012', 'Xám', 1),
('MAU013', 'Trắng', 1);

--
-- Bẫy `mausac`
--
DELIMITER $$
CREATE TRIGGER `before_insert_mausac` BEFORE INSERT ON `mausac` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manhacungcap lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(mamau, 4) AS UNSIGNED)) INTO max_id FROM mausac;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manhacungcap mới cho bản ghi được chèn
    SET NEW.mamau = CONCAT('MAU', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhacungcap`
--

CREATE TABLE `nhacungcap` (
  `manhacungcap` varchar(11) NOT NULL,
  `tennhacungcap` varchar(255) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sdt` varchar(255) NOT NULL,
  `trangthai` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhacungcap`
--

INSERT INTO `nhacungcap` (`manhacungcap`, `tennhacungcap`, `diachi`, `email`, `sdt`, `trangthai`) VALUES
('NCC001', 'Công Ty TNHH Thế Giới Di Động', ' Phòng 6.5, Tầng6, Tòa Nhà E. Town 2, 364 Cộng Hòa, P. 13, Q. Tân Bình, Tp. Hồ Chí Minh', 'lienhe@thegioididong.com', '02835100100', 1),
('NCC002', 'Công ty Vivo Việt Nam', 'Số 79 đường số 6, Hưng Phước 4, Phú Mỹ Hưng, quận 7, TPHCM', 'contact@paviet.vn', '19009477', 1),
('NCC003', 'Công Ty TNHH Bao La', '8/38 Đinh Bô Lĩnh, P.24, Q. Bình Thạnh, Tp. Hồ Chí Minh', 'contact@baola.vn', '02835119060', 1),
('NCC004', 'Công Ty Nokia', 'Phòng 703, Tầng7, Tòa Nhà Metropolitan, 235 Đồng Khởi, P. Bến Nghé, Q. 1, Tp. Hồ Chí Minh (TPHCM)', 'chau.nguyen@nokia.com', '02838236894', 1),
('NCC005', 'Hệ Thống Phân Phối Chính Hãng Xiaomi', '261 Lê Lợi, P. Lê Lợi, Q. Ngô Quyền, Tp. Hải Phòng', 'info@mihome.vn', '0365888866', 1),
('NCC006', 'Công Ty Samsung Việt Nam', 'Tòa nhà tài chính Bitexco, 2 Hải Triều, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh', 'contact@samsung.vn', '0988788456', 1),
('NCC007', 'Công ty Oppo Việt Nam', '27 Đ. Nguyễn Trung Trực, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh', 'oppovietnam@oppo.vn', '0456345234', 1);

--
-- Bẫy `nhacungcap`
--
DELIMITER $$
CREATE TRIGGER `before_insert_nhacungcap` BEFORE INSERT ON `nhacungcap` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manhacungcap lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(manhacungcap, 4) AS UNSIGNED)) INTO max_id FROM nhacungcap;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manhacungcap mới cho bản ghi được chèn
    SET NEW.manhacungcap = CONCAT('NCC', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `manv` varchar(11) NOT NULL,
  `hoten` varchar(255) NOT NULL,
  `gioitinh` varchar(11) NOT NULL,
  `ngaysinh` date NOT NULL,
  `sdt` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `trangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`manv`, `hoten`, `gioitinh`, `ngaysinh`, `sdt`, `email`, `trangthai`) VALUES
('NV001', 'Lâm Nguyễn Minh Thắng', 'Nam', '2000-11-23', '0816600038', 'thang.lnm23120@gmail.com', 1),
('NV002', 'Trần Trung Thành', 'Nam', '2023-04-11', '0987654321', 'email_moi@gmail.com', 1),
('NV003', 'Nguyễn Ngọc Thành', 'Nam', '2003-04-11', '0123456789', 'chinchin@gmail.com', 1),
('NV004', 'Đinh Ngọc Ân', 'Nam', '2003-04-03', '0123456789', 'ngocan@gmail.com', 1),
('NV005', 'Vũ Trung Hiếu', 'Nữ', '2003-05-05', '0123456789', 'hieu@gmail.com', 1),
('NV006', 'Nhân viên test', 'Nam', '2000-11-23', '0816600038', 'test@gmail.com', 0);

--
-- Bẫy `nhanvien`
--
DELIMITER $$
CREATE TRIGGER `before_insert_nhanvien` BEFORE INSERT ON `nhanvien` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manhacungcap lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(manv, 3) AS UNSIGNED)) INTO max_id FROM nhanvien;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manhacungcap mới cho bản ghi được chèn
    SET NEW.manv = CONCAT('NV', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhomquyen`
--

CREATE TABLE `nhomquyen` (
  `manhomquyen` varchar(11) NOT NULL,
  `tennhomquyen` varchar(255) NOT NULL,
  `trangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhomquyen`
--

INSERT INTO `nhomquyen` (`manhomquyen`, `tennhomquyen`, `trangthai`) VALUES
('NQ001', 'Quản lý kho', 1),
('NQ002', 'Nhân viên nhập hàng', 1),
('NQ003', 'Nhân viên xuất hàng', 1),
('NQ004', 'Thủ kho', 0),
('NQ005', 'Nhân viên kiểm kho', 0),
('NQ006', 'abc', 1);

--
-- Bẫy `nhomquyen`
--
DELIMITER $$
CREATE TRIGGER `before_insert_nhomquyen` BEFORE INSERT ON `nhomquyen` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manv lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(manhomquyen, 3) AS INT)) INTO max_id FROM nhomquyen;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manv mới cho bản ghi được chèn
    SET NEW.manhomquyen = CONCAT('NQ', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phienbansanpham`
--

CREATE TABLE `phienbansanpham` (
  `maphienbansp` varchar(11) NOT NULL,
  `masp` varchar(11) DEFAULT NULL,
  `rom` varchar(11) DEFAULT NULL,
  `ram` varchar(11) DEFAULT '0',
  `mausac` varchar(11) DEFAULT NULL,
  `gianhap` int(11) DEFAULT NULL,
  `giaxuat` int(11) DEFAULT NULL,
  `soluongton` int(11) DEFAULT 0,
  `trangthai` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phienbansanpham`
--

INSERT INTO `phienbansanpham` (`maphienbansp`, `masp`, `rom`, `ram`, `mausac`, `gianhap`, `giaxuat`, `soluongton`, `trangthai`) VALUES
('PB001', 'SP001', 'ROM001', 'RAM001', 'MAU001', 5000000, 5500000, 15, 1),
('PB002', 'SP001', 'ROM003', 'RAM004', 'MAU001', 6000000, 6500000, 3, 1),
('PB003', 'SP002', 'ROM003', 'RAM005', 'MAU001', 7000000, 7800000, 19, 1),
('PB004', 'SP003', 'ROM003', 'RAM003', 'MAU005', 15000000, 16500000, 4, 1),
('PB005', 'SP003', 'ROM003', 'RAM003', 'MAU006', 15000000, 16500000, 0, 1),
('PB006', 'SP003', 'ROM003', 'RAM003', 'MAU001', 15500000, 17000000, 5, 1),
('PB007', 'SP004', 'ROM001', 'RAM001', 'MAU001', 2000000, 2890000, 3, 1),
('PB008', 'SP004', 'ROM001', 'RAM001', 'MAU001', 2000000, 2890000, 0, 0),
('PB009', 'SP004', 'ROM001', 'RAM001', 'MAU001', 2000000, 2890000, 0, 0),
('PB010', 'SP004', 'ROM001', 'RAM001', 'MAU006', 2000000, 2890000, 2, 1),
('PB011', 'SP004', 'ROM002', 'RAM001', 'MAU006', 2500000, 3390000, 4, 1),
('PB012', 'SP004', 'ROM002', 'RAM001', 'MAU001', 2500000, 3390000, 5, 1),
('PB013', 'SP005', 'ROM003', 'RAM005', 'MAU008', 8000000, 9000000, 13, 1),
('PB014', 'SP005', 'ROM003', 'RAM005', 'MAU006', 8000000, 9000000, 15, 1),
('PB015', 'SP005', 'ROM003', 'RAM005', 'MAU001', 8000000, 9000000, 11, 1),
('PB016', 'SP005', 'ROM004', 'RAM005', 'MAU001', 9000000, 10000000, 0, 1),
('PB017', 'SP005', 'ROM004', 'RAM005', 'MAU006', 9000000, 10000000, 0, 1),
('PB018', 'SP005', 'ROM004', 'RAM005', 'MAU008', 9000000, 10000000, 0, 1),
('PB019', 'SP006', 'ROM003', 'RAM003', 'MAU009', 3000000, 4100000, 0, 1),
('PB020', 'SP006', 'ROM003', 'RAM003', 'MAU006', 3000000, 4100000, 0, 1),
('PB021', 'SP006', 'ROM003', 'RAM004', 'MAU006', 3200000, 4400000, 0, 1),
('PB022', 'SP006', 'ROM003', 'RAM004', 'MAU009', 3200000, 4400000, 27, 1),
('PB023', 'SP007', 'ROM003', 'RAM005', 'MAU009', 5000000, 5790000, 9, 1),
('PB024', 'SP007', 'ROM003', 'RAM005', 'MAU010', 5000000, 5790000, 0, 1),
('PB025', 'SP007', 'ROM003', 'RAM003', 'MAU009', 4000000, 4890000, 0, 1),
('PB026', 'SP007', 'ROM003', 'RAM003', 'MAU010', 4000000, 4890000, 7, 1),
('PB027', 'SP007', 'ROM003', 'RAM005', 'MAU012', 5000000, 5790000, 6, 1),
('PB028', 'SP007', 'ROM003', 'RAM003', 'MAU012', 4000000, 4890000, 0, 1),
('PB029', 'SP008', 'ROM002', 'RAM003', 'MAU009', 2000000, 2990000, 16, 1),
('PB030', 'SP008', 'ROM002', 'RAM003', 'MAU010', 2000000, 2990000, 0, 1),
('PB031', 'SP008', 'ROM002', 'RAM003', 'MAU012', 2000000, 2990000, 0, 1),
('PB032', 'SP008', 'ROM003', 'RAM003', 'MAU009', 2200000, 3290000, 0, 1),
('PB033', 'SP008', 'ROM003', 'RAM003', 'MAU010', 2200000, 3290000, 0, 1),
('PB034', 'SP008', 'ROM003', 'RAM003', 'MAU012', 2200000, 3290000, 0, 1),
('PB035', 'SP009', 'ROM004', 'RAM005', 'MAU010', 8200000, 9500000, 5, 1),
('PB036', 'SP009', 'ROM004', 'RAM005', 'MAU009', 8200000, 9500000, 6, 1),
('PB037', 'SP010', 'ROM003', 'RAM003', 'MAU011', 3600000, 4700000, 0, 1),
('PB038', 'SP010', 'ROM003', 'RAM003', 'MAU006', 3600000, 4700000, 0, 1),
('PB039', 'SP010', 'ROM003', 'RAM003', 'MAU009', 3600000, 4700000, 0, 1),
('PB040', 'SP010', 'ROM003', 'RAM004', 'MAU011', 4100000, 5200000, 0, 1),
('PB041', 'SP010', 'ROM003', 'RAM004', 'MAU006', 4100000, 5200000, 10, 1),
('PB042', 'SP010', 'ROM003', 'RAM004', 'MAU009', 4100000, 5200000, 0, 1),
('PB043', 'SP011', 'ROM004', 'RAM005', 'MAU006', 5200000, 6400000, 4, 1),
('PB044', 'SP011', 'ROM004', 'RAM005', 'MAU013', 5200000, 6400000, 0, 1),
('PB045', 'SP012', 'ROM002', 'RAM003', 'MAU013', 2500000, 3000000, 11, 1),
('PB046', 'SP012', 'ROM002', 'RAM003', 'MAU009', 2500000, 3000000, 0, 1),
('PB047', 'SP013', 'ROM003', 'RAM005', 'MAU013', 14000000, 16000000, 20, 1),
('PB048', 'SP013', 'ROM003', 'RAM005', 'MAU010', 14000000, 16000000, 0, 1),
('PB049', 'SP013', 'ROM003', 'RAM005', 'MAU004', 14000000, 16000000, 0, 1),
('PB050', 'SP013', 'ROM003', 'RAM005', 'MAU006', 14000000, 16000000, 0, 1),
('PB051', 'SP013', 'ROM004', 'RAM005', 'MAU013', 16000000, 18000000, 0, 1),
('PB052', 'SP013', 'ROM004', 'RAM005', 'MAU010', 16000000, 18000000, 0, 1),
('PB053', 'SP013', 'ROM004', 'RAM005', 'MAU004', 16000000, 18000000, 0, 1),
('PB054', 'SP013', 'ROM004', 'RAM005', 'MAU006', 16000000, 18000000, 0, 1),
('PB055', 'SP014', 'ROM004', 'RAM005', 'MAU001', 12000000, 14000000, 7, 1),
('PB056', 'SP015', 'ROM003', 'RAM005', 'MAU004', 4500000, 5500000, 5, 1),
('PB057', 'SP015', 'ROM003', 'RAM005', 'MAU006', 4500000, 5500000, 0, 1),
('PB059', 'SP002', 'ROM003', 'RAM005', 'MAU001', 7000000, 7800000, 0, 0),
('PB063', 'SP001', 'ROM003', 'RAM004', 'MAU002', 6000000, 6500000, 0, 0),
('PB064', 'SP016', 'ROM001', 'RAM001', 'MAU001', 2500000, 3000000, 5, 1),
('PB065', 'SP017', 'ROM005', 'RAM004', 'MAU012', 10, 12, 28, 1),
('PB066', 'SP017', 'ROM003', 'RAM001', 'MAU013', 8, 10, 0, 1),
('PB067', 'SP018', 'ROM006', 'RAM006', 'MAU013', 100000, 150000, 3, 1),
('PB068', 'SP018', 'ROM003', 'RAM004', 'MAU009', 50000, 100000, 0, 1);

--
-- Bẫy `phienbansanpham`
--
DELIMITER $$
CREATE TRIGGER `before_insert_phienbansanpham` BEFORE INSERT ON `phienbansanpham` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manv lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(maphienbansp, 3) AS INT)) INTO max_id FROM phienbansanpham;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manv mới cho bản ghi được chèn
    SET NEW.maphienbansp = CONCAT('PB', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieubaohanh`
--

CREATE TABLE `phieubaohanh` (
  `maphieubaohanh` varchar(11) NOT NULL,
  `maimei` varchar(255) DEFAULT NULL,
  `lydo` varchar(50) DEFAULT NULL,
  `thoigian` datetime DEFAULT current_timestamp(),
  `thoigiantra` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieudoi`
--

CREATE TABLE `phieudoi` (
  `maphieudoi` varchar(11) NOT NULL,
  `maimei` varchar(255) DEFAULT NULL,
  `lydo` varchar(255) DEFAULT NULL,
  `thoigian` date DEFAULT curdate(),
  `nguoitao` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieukiemke`
--

CREATE TABLE `phieukiemke` (
  `maphieu` varchar(11) NOT NULL,
  `thoigian` date DEFAULT curdate(),
  `nguoitaophieukiemke` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieunhap`
--

CREATE TABLE `phieunhap` (
  `maphieunhap` varchar(11) NOT NULL,
  `thoigian` datetime DEFAULT current_timestamp(),
  `manhacungcap` varchar(11) DEFAULT NULL,
  `nguoitao` varchar(11) DEFAULT NULL,
  `tongtien` bigint(20) DEFAULT 0,
  `trangthai` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phieunhap`
--

INSERT INTO `phieunhap` (`maphieunhap`, `thoigian`, `manhacungcap`, `nguoitao`, `tongtien`, `trangthai`) VALUES
('PN001', '2024-04-01 17:34:12', 'NCC001', 'NV001', 60000000, 1),
('PN002', '2024-04-03 17:42:17', 'NCC001', 'NV001', 110000000, 1),
('PN003', '2024-04-04 18:07:58', 'NCC001', 'NV001', 84000000, 1),
('PN004', '2024-04-04 18:19:51', 'NCC003', 'NV002', 35000000, 1),
('PN005', '2024-04-06 08:18:01', 'NCC001', 'NV001', 10000000, 1),
('PN006', '2024-04-07 20:33:58', 'NCC001', 'NV001', 75000000, 1),
('PN007', '2024-04-07 01:09:27', 'NCC001', 'NV001', 108500000, 1),
('PN008', '2024-04-07 08:42:52', 'NCC001', 'NV001', 7000000, 1),
('PN009', '2024-04-10 00:22:13', 'NCC001', 'NV001', 5000000, 1),
('PN010', '2024-04-13 00:52:47', 'NCC002', 'NV001', 34500000, 1),
('PN011', '2024-04-13 00:56:04', 'NCC006', 'NV001', 456000000, 1),
('PN012', '2024-04-14 00:57:07', 'NCC005', 'NV001', 118000000, 1),
('PN013', '2024-04-15 00:59:02', 'NCC007', 'NV001', 187500000, 1),
('PN014', '2024-04-16 00:59:46', 'NCC006', 'NV001', 321000000, 1),
('PN015', '2024-04-17 01:00:30', 'NCC006', 'NV001', 73800000, 1),
('PN016', '2024-04-19 01:01:25', 'NCC005', 'NV001', 52000000, 1),
('PN017', '2024-04-20 01:02:22', 'NCC001', 'NV001', 7500000, 1),
('PN018', '2024-05-09 12:09:23', 'NCC002', 'NV001', 13000000, 1),
('PN019', '2024-05-10 08:17:32', 'NCC006', 'NV001', 12500000, 1),
('PN020', '2024-05-10 08:25:11', 'NCC001', 'NV001', 16000000, 1),
('PN021', '2024-11-26 11:56:42', 'NCC002', 'NV001', 6000000, 1),
('PN022', '2024-11-26 12:01:17', 'NCC001', 'NV001', 5000000, 1),
('PN023', '2024-11-26 12:05:45', 'NCC001', 'NV001', 25000, 1),
('PN024', '2024-11-26 12:17:32', 'NCC001', 'NV001', 1802776, 1),
('PN025', '2024-11-26 12:20:39', 'NCC001', 'NV001', 1802776, 1),
('PN026', '2024-11-26 12:20:47', 'NCC001', 'NV001', 1802776, 1),
('PN027', '2024-11-26 12:21:02', 'NCC001', 'NV001', 1802776, 1),
('PN028', '2024-11-27 10:18:41', 'NCC001', 'NV001', 250000, 1),
('PN029', '2024-11-27 10:18:50', 'NCC001', 'NV001', 250000, 1),
('PN030', '2024-11-27 10:23:21', 'NCC001', 'NV001', 750000, 1),
('PN031', '2024-11-27 10:27:00', 'NCC002', 'NV001', 150000, 1),
('PN032', '2024-11-27 10:35:43', 'NCC003', 'NV001', 250000, 1),
('PN033', '2024-11-27 10:37:15', 'NCC001', 'NV001', 500000, 1),
('PN034', '2024-11-27 10:37:45', 'NCC001', 'NV001', 200000, 1),
('PN035', '2024-11-27 10:46:49', 'NCC001', 'NV001', 400000, 1),
('PN036', '2024-11-27 10:52:11', 'NCC001', 'NV001', 400000, 1),
('PN037', '2024-11-27 10:52:30', 'NCC001', 'NV001', 400000, 1),
('PN038', '2024-11-27 10:59:41', 'NCC001', 'NV001', 40000, 1),
('PN039', '2024-11-27 11:12:16', 'NCC001', 'NV001', 25000000, 1),
('PN040', '2024-11-27 11:35:59', 'NCC001', 'NV001', 1500000, 1),
('PN041', '2024-11-27 11:39:31', 'NCC004', 'NV001', 600000, 1),
('PN043', '2024-11-27 17:12:24', 'NCC004', 'NV001', 500000, 1),
('PN044', '2024-11-27 18:06:27', 'NCC004', 'NV001', 500000, 1),
('PN045', '2024-11-27 18:13:31', 'NCC004', 'NV001', 500000, 1),
('PN046', '2024-11-27 18:17:25', 'NCC004', 'NV001', 500000, 1),
('PN047', '2024-11-27 18:18:52', 'NCC004', 'NV001', 500000, 1),
('PN048', '2024-11-27 18:19:58', 'NCC004', 'NV001', 40000000, 1),
('PN050', '2024-11-27 18:27:39', 'NCC004', 'NV001', 2500000, 1),
('PN051', '2024-11-27 18:32:58', 'NCC004', 'NV001', 2500000, 1),
('PN052', '2024-11-28 04:04:11', 'NCC004', 'NV001', 27500000, 1),
('PN053', '2024-11-28 04:09:15', 'NCC004', 'NV001', 2500000, 1),
('PN054', '2024-11-28 04:31:32', 'NCC004', 'NV001', 2500000, 1),
('PN055', '2024-11-28 04:32:07', 'NCC004', 'NV001', 2500000, 1),
('PN056', '2024-11-28 04:35:13', 'NCC004', 'NV001', 25000000, 1),
('PN057', '2024-11-28 04:44:22', 'NCC004', 'NV001', 250000000, 1),
('PN058', '2024-11-28 08:13:18', 'NCC001', 'NV001', 3000000, 1),
('PN059', '2024-11-28 09:18:10', 'NCC001', 'NV001', 1500000, 1),
('PN060', '2024-11-28 09:21:02', 'NCC004', 'NV001', 25000000, 1),
('PN061', '2024-12-02 09:01:32', 'KH002', 'NV001', 1000000, 1),
('PN062', '2024-12-02 09:08:43', 'KH002', 'NV001', 1000000, 1),
('PN063', '2024-12-02 09:10:49', 'KH002', 'NV001', 1000000, 1),
('PN064', '2024-12-02 13:38:01', 'NCC004', 'NV001', 500000, 1);

--
-- Bẫy `phieunhap`
--
DELIMITER $$
CREATE TRIGGER `before_insert_phieunhap` BEFORE INSERT ON `phieunhap` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manv lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(maphieunhap, 3) AS INT)) INTO max_id FROM phieunhap;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manv mới cho bản ghi được chèn
    SET NEW.maphieunhap = CONCAT('PN', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieutra`
--

CREATE TABLE `phieutra` (
  `maphieutra` varchar(11) NOT NULL,
  `maimei` varchar(255) DEFAULT NULL,
  `lydo` varchar(255) DEFAULT NULL,
  `thoigian` date DEFAULT curdate(),
  `nguoitao` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieuxuat`
--

CREATE TABLE `phieuxuat` (
  `maphieuxuat` varchar(11) NOT NULL,
  `thoigian` datetime DEFAULT current_timestamp(),
  `tongtien` bigint(20) DEFAULT NULL,
  `nguoitaophieuxuat` varchar(11) DEFAULT NULL,
  `makh` varchar(11) DEFAULT NULL,
  `trangthai` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phieuxuat`
--

INSERT INTO `phieuxuat` (`maphieuxuat`, `thoigian`, `tongtien`, `nguoitaophieuxuat`, `makh`, `trangthai`) VALUES
('PX001', '2024-04-04 09:56:35', 16500000, 'NV001', 'KH001', 1),
('PX002', '2024-04-04 03:18:23', 49500000, 'NV001', 'KH001', 1),
('PX003', '2024-04-05 03:19:31', 39000000, 'NV001', 'KH004', 1),
('PX004', '2024-04-06 18:30:26', 31200000, 'NV001', 'KH016', 1),
('PX005', '2024-04-06 01:01:48', 22000000, 'NV001', 'KH014', 1),
('PX006', '2024-04-06 12:39:44', 7800000, 'NV001', 'KH003', 1),
('PX007', '2024-04-08 12:40:04', 23400000, 'NV001', 'KH004', 1),
('PX008', '2024-04-09 12:40:32', 22000000, 'NV001', 'KH009', 1),
('PX009', '2024-04-11 12:40:50', 15600000, 'NV001', 'KH017', 1),
('PX010', '2024-04-11 12:42:33', 49500000, 'NV001', 'KH013', 1),
('PX011', '2024-04-12 02:31:45', 60500000, 'NV001', 'KH007', 1),
('PX012', '2024-04-13 00:23:02', 5500000, 'NV001', 'KH017', 1),
('PX013', '2024-04-30 01:52:18', 42000000, 'NV001', 'KH013', 1),
('PX014', '2024-05-01 01:57:39', 11000000, 'NV001', 'KH004', 1),
('PX015', '2024-05-02 01:58:16', 54800000, 'NV001', 'KH006', 1),
('PX016', '2024-05-03 01:59:44', 51200000, 'NV001', 'KH015', 1),
('PX017', '2024-05-04 02:00:13', 28500000, 'NV001', 'KH015', 1),
('PX018', '2024-05-05 02:01:28', 36890000, 'NV001', 'KH003', 1),
('PX019', '2024-05-06 02:06:24', 18000000, 'NV001', 'KH011', 1),
('PX020', '2024-05-07 10:08:49', 17370000, 'NV001', 'KH013', 1),
('PX021', '2024-05-08 22:56:21', 36000000, 'NV001', 'KH010', 1),
('PX022', '2024-05-09 22:57:23', 16500000, 'NV001', 'KH006', 1),
('PX023', '2024-05-10 02:55:35', 13200000, 'NV001', 'KH013', 1),
('PX024', '2024-12-02 13:39:17', 100000, 'NV001', 'KH019', 1);

--
-- Bẫy `phieuxuat`
--
DELIMITER $$
CREATE TRIGGER `before_insert_phieuxuat` BEFORE INSERT ON `phieuxuat` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manv lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(maphieuxuat, 3) AS INT)) INTO max_id FROM phieuxuat;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manv mới cho bản ghi được chèn
    SET NEW.maphieuxuat = CONCAT('PX', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `masp` varchar(11) NOT NULL,
  `tensp` varchar(255) DEFAULT NULL,
  `hinhanh` varchar(255) DEFAULT NULL,
  `xuatxu` varchar(11) DEFAULT NULL,
  `chipxuly` varchar(255) DEFAULT NULL,
  `dungluongpin` int(11) DEFAULT NULL,
  `kichthuocman` double DEFAULT NULL,
  `hedieuhanh` varchar(11) DEFAULT NULL,
  `phienbanhdh` int(11) DEFAULT NULL,
  `camerasau` varchar(255) DEFAULT NULL,
  `cameratruoc` varchar(255) DEFAULT NULL,
  `thoigianbaohanh` int(11) DEFAULT NULL,
  `thuonghieu` varchar(11) DEFAULT NULL,
  `khuvuckho` varchar(11) DEFAULT NULL,
  `soluongton` int(11) DEFAULT 0,
  `trangthai` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`masp`, `tensp`, `hinhanh`, `xuatxu`, `chipxuly`, `dungluongpin`, `kichthuocman`, `hedieuhanh`, `phienbanhdh`, `camerasau`, `cameratruoc`, `thoigianbaohanh`, `thuonghieu`, `khuvuckho`, `soluongton`, `trangthai`) VALUES
('SP001', 'Vivo Y22s', '92vivo-y22s-vang-thumb-600x600.jpg', 'XX001', 'SnapDragon 680', 5000, 6.55, 'HDH001', 12, 'Chính 50 MP & Phụ 2 MP', '8 MP', 24, 'TH001', 'KV001', 18, 1),
('SP002', 'Samsung Galaxy A53 5G', '57samsung-galaxy-a53-cam-thumb-1-600x600.jpg', 'XX001', 'Exynos 1280', 5000, 6.5, 'HDH001', 12, 'Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP', '32 MP', 24, 'TH003', 'KV002', 17, 1),
('SP003', 'iPhone 13 mini', '997iphone-13-mini-pink-1-600x600.jpg', 'XX001', ' Apple A15 Bionic', 2438, 5.4, 'HDH002', 15, '2 camera 12 MP', ' 12 MP', 36, 'TH001', 'KV001', 9, 0),
('SP004', 'Vivo Y02s', '74vivo-y02s-thumb-1-2-3-600x600.jpg', 'XX001', 'MediaTek Helio P35', 5000, 6.51, 'HDH001', 12, '8 MP', ' 5 MP', 24, 'TH010', 'KV003', 14, 1),
('SP005', 'Samsung Galaxy A54 5G', '399samsung-galaxy-a54-5g-tim-thumb-600x600.jpg', 'XX002', ' Exynos 1380 8 nhân', 5000, 6.4, 'HDH001', 12, 'Chính 50 MP & Phụ 12 MP, 5 MP', ' 32 MP', 24, 'TH003', 'KV003', 39, 1),
('SP006', 'Samsung Galaxy A13', '337samsung-galaxy-a14-black-thumb-600x600.jpg', 'XX001', 'Exynos 850', 5000, 6.6, 'HDH001', 12, 'Chính 50 MP & Phụ 5 MP, 2 MP, 2 MP', '8 MP', 24, 'TH003', 'KV002', 27, 1),
('SP007', 'Xiaomi Redmi Note 12', '717xiaomi-redmi-note-12-4g-mono-den-600x600.jpg', 'XX001', ' Snapdragon 685 8 nhân', 5000, 6.67, 'HDH001', 12, 'Chính 50 MP & Phụ 8 MP, 2 MP', '13 MP', 24, 'TH002', 'KV004', 22, 1),
('SP008', 'Xiaomi Redmi 12C', '437xiaomi-redmi-12c-grey-thumb-600x600.jpg', 'XX001', 'MediaTek Helio G85', 5000, 6.71, 'HDH001', 12, 'Chính 50 MP & Phụ QVGA', '5 MP', 24, 'TH001', 'KV001', 16, 1),
('SP009', 'Samsung Galaxy S20 FE', '286samsung-galaxy-s20-fan-edition-xanh-la-thumbnew-600x600.jpeg', 'XX001', 'Snapdragon 865', 4500, 6.5, 'HDH001', 12, 'Chính 12 MP & Phụ 12 MP, 8 MP', '32 MP', 24, 'TH003', 'KV004', 11, 1),
('SP010', 'Samsung Galaxy A23', '826samsung-galaxy-a23-cam-thumb-600x600.jpg', 'XX001', 'Snapdragon 680', 5000, 6.6, 'HDH001', 12, 'Chính 50 MP & Phụ 5 MP, 2 MP, 2 MP', '8 MP', 24, 'TH001', 'KV001', 10, 1),
('SP011', 'Realme 10', '877realme-10-thumb-1-600x600.jpg', 'XX001', 'MediaTek Helio G99', 5000, 6.4, 'HDH001', 12, 'Chính 50 MP & Phụ 2 MP', '16 MP', 24, 'TH011', 'KV001', 4, 1),
('SP012', 'Vivo Y21', '960vivo-y21-blue-01-600x600.jpg', 'XX001', 'MediaTek Helio P35', 5000, 6.51, 'HDH001', 12, 'Chính 13 MP & Phụ 2 MP', '8 MP', 24, 'TH010', 'KV005', 11, 1),
('SP013', 'Samsung Galaxy S22+ 5G', '177Galaxy-S22-Ultra-Burgundy-600x600.jpg', 'XX001', 'Snapdragon 8 Gen 1', 4500, 6.6, 'HDH001', 12, 'Chính 50 MP & Phụ 12 MP, 10 MP', '10 MP', 24, 'TH003', 'KV004', 20, 1),
('SP014', 'OPPO Reno6 Pro 5G', '203oppo-reno6-pro-grey-600x600.jpg', 'XX001', 'Snapdragon 870 5G', 4500, 6.55, 'HDH001', 11, 'Chính 50 MP & Phụ 16 MP, 13 MP, 2 MP', '32 MP', 24, 'TH003', 'KV004', 7, 1),
('SP015', ' OPPO A95', '555oppo-a95-4g-bac-2-600x600.jpg', 'XX001', 'Snapdragon 662', 5000, 6.43, 'HDH001', 11, 'Chính 48 MP & Phụ 2 MP, 2 MP', '16 MP', 24, 'TH001', 'KV001', 5, 1),
('SP016', 'Samsung Galaxy A53 5G S', '74319198933.jpg', 'XX001', 'chip a', 5000, 5.6, 'HDH001', 12, 'msdf', 'dsfgfdg', 24, 'TH001', 'KV001', 5, 0),
('SP017', 'Test', '1730128790343.png', 'XX001', 'Axios', 60000, 12, 'HDH001', 12, '12Mp', '12MP', 12, 'TH001', 'KV001', 28, 1),
('SP018', 'TestFinal', '1733121423998.png', 'XX003', 'Axios', 800000, 8, 'HDH001', 12, '8MP', '9MP', 12, 'TH011', 'KV002', 3, 1);

--
-- Bẫy `sanpham`
--
DELIMITER $$
CREATE TRIGGER `before_insert_sanpham` BEFORE INSERT ON `sanpham` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manv lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(masp, 3) AS INT)) INTO max_id FROM sanpham;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manv mới cho bản ghi được chèn
    SET NEW.masp = CONCAT('SP', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `manv` varchar(11) NOT NULL,
  `matkhau` varchar(255) DEFAULT NULL,
  `manhomquyen` varchar(11) DEFAULT NULL,
  `tendangnhap` varchar(50) DEFAULT '',
  `trangthai` int(11) DEFAULT NULL,
  `otp` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`manv`, `matkhau`, `manhomquyen`, `tendangnhap`, `trangthai`, `otp`) VALUES
('NV001', '$2b$12$ItCXeiLQIWDWvRObJu4MfO3VLsz9/Zu712/Q8pHGRleDyGdAFP.sS', 'NQ001', 'admin', 1, 'null'),
('NV002', '$2a$12$6GSkiQ05XjTRvCW9MB6MNuf7hOJEbbeQx11Eb8oELil1OrCq6uBXm', 'NQ001', 'minhthang', 1, '451418'),
('NV003', '$2a$12$SAlAhcsudMzNEouyBaoHnOKR23ixdH0ZkcoyXUJ5gS/NFt.b4oqw6', 'NQ006', 'trungthanh', 1, NULL),
('NV004', '$2a$12$SAlAhcsudMzNEouyBaoHnOKR23ixdH0ZkcoyXUJ5gS/NFt.b4oqw6', 'NQ002', 'ngocan', 0, NULL),
('NV005', '$2a$12$SAlAhcsudMzNEouyBaoHnOKR23ixdH0ZkcoyXUJ5gS/NFt.b4oqw6', 'NQ003', 'hieunek', 0, NULL),
('NV006', '$2b$10$CwulpYTQl9VqWj7oJ/bYrOeu.021DyV6w//eXfjcMZZRyTLZXrBTm', 'NQ002', 'Test', 1, NULL);

--
-- Bẫy `taikhoan`
--
DELIMITER $$
CREATE TRIGGER `before_insert_taikhoan` BEFORE INSERT ON `taikhoan` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manv lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(manv, 3) AS INT)) INTO max_id FROM taikhoan;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manv mới cho bản ghi được chèn
    SET NEW.manv = CONCAT('NV', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thuonghieu`
--

CREATE TABLE `thuonghieu` (
  `mathuonghieu` varchar(11) NOT NULL,
  `tenthuonghieu` varchar(255) DEFAULT NULL,
  `trangthai` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thuonghieu`
--

INSERT INTO `thuonghieu` (`mathuonghieu`, `tenthuonghieu`, `trangthai`) VALUES
('TH001', 'Apple', 1),
('TH002', 'Xiaomi', 1),
('TH003', 'Samsung', 1),
('TH004', 'Sữa tươi', 0),
('TH005', 'g', 0),
('TH006', '', 0),
('TH007', 'Oppo', 1),
('TH008', 'Vivo', 1),
('TH009', 'Realme', 1),
('TH010', 'Nokia', 1),
('TH011', 'Vsmart', 1),
('TH012', 'Apple', 0);

--
-- Bẫy `thuonghieu`
--
DELIMITER $$
CREATE TRIGGER `before_insert_thuonghieu` BEFORE INSERT ON `thuonghieu` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manv lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(mathuonghieu, 3) AS INT)) INTO max_id FROM thuonghieu;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manv mới cho bản ghi được chèn
    SET NEW.mathuonghieu = CONCAT('TH', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `xuatxu`
--

CREATE TABLE `xuatxu` (
  `maxuatxu` varchar(11) NOT NULL,
  `tenxuatxu` varchar(50) DEFAULT NULL,
  `trangthai` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `xuatxu`
--

INSERT INTO `xuatxu` (`maxuatxu`, `tenxuatxu`, `trangthai`) VALUES
('XX001', 'Trung Quốc', 1),
('XX002', 'Hàn Quốc', 1),
('XX003', 'Việt Nam', 1),
('XX004', 'USA', 1);

--
-- Bẫy `xuatxu`
--
DELIMITER $$
CREATE TRIGGER `before_insert_xuatxu` BEFORE INSERT ON `xuatxu` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị manv lớn nhất hiện tại
    SELECT MAX(CAST(SUBSTRING(maxuatxu, 3) AS INT)) INTO max_id FROM xuatxu;

    -- Nếu max_id là NULL (tức là bảng chưa có dữ liệu), đặt max_id = 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;

    -- Gán giá trị manv mới cho bản ghi được chèn
    SET NEW.maxuatxu = CONCAT('XX', LPAD(max_id + 1, 3, '0'));
END
$$
DELIMITER ;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ctkiemke`
--
ALTER TABLE `ctkiemke`
  ADD PRIMARY KEY (`maphieukiemmke`,`masanpham`);

--
-- Chỉ mục cho bảng `ctphieunhap`
--
ALTER TABLE `ctphieunhap`
  ADD PRIMARY KEY (`maphieunhap`,`maphienbansp`);

--
-- Chỉ mục cho bảng `ctphieuxuat`
--
ALTER TABLE `ctphieuxuat`
  ADD PRIMARY KEY (`maphieuxuat`,`maphienbansp`);

--
-- Chỉ mục cho bảng `ctquyen`
--
ALTER TABLE `ctquyen`
  ADD PRIMARY KEY (`manhomquyen`,`machucnang`,`hanhdong`) USING BTREE;

--
-- Chỉ mục cho bảng `ctsanpham`
--
ALTER TABLE `ctsanpham`
  ADD PRIMARY KEY (`maimei`) USING BTREE;

--
-- Chỉ mục cho bảng `danhmucchucnang`
--
ALTER TABLE `danhmucchucnang`
  ADD PRIMARY KEY (`machucnang`);

--
-- Chỉ mục cho bảng `dungluongram`
--
ALTER TABLE `dungluongram`
  ADD PRIMARY KEY (`madlram`);

--
-- Chỉ mục cho bảng `dungluongrom`
--
ALTER TABLE `dungluongrom`
  ADD PRIMARY KEY (`madlrom`);

--
-- Chỉ mục cho bảng `hedieuhanh`
--
ALTER TABLE `hedieuhanh`
  ADD PRIMARY KEY (`mahedieuhanh`) USING BTREE;

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`makh`);

--
-- Chỉ mục cho bảng `khuvuckho`
--
ALTER TABLE `khuvuckho`
  ADD PRIMARY KEY (`makhuvuc`);

--
-- Chỉ mục cho bảng `mausac`
--
ALTER TABLE `mausac`
  ADD PRIMARY KEY (`mamau`),
  ADD UNIQUE KEY `tenmau` (`tenmau`);

--
-- Chỉ mục cho bảng `nhacungcap`
--
ALTER TABLE `nhacungcap`
  ADD PRIMARY KEY (`manhacungcap`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`manv`);

--
-- Chỉ mục cho bảng `nhomquyen`
--
ALTER TABLE `nhomquyen`
  ADD PRIMARY KEY (`manhomquyen`);

--
-- Chỉ mục cho bảng `phienbansanpham`
--
ALTER TABLE `phienbansanpham`
  ADD PRIMARY KEY (`maphienbansp`) USING BTREE,
  ADD KEY `FK_phienbansanpham_sanpham` (`masp`);

--
-- Chỉ mục cho bảng `phieubaohanh`
--
ALTER TABLE `phieubaohanh`
  ADD PRIMARY KEY (`maphieubaohanh`);

--
-- Chỉ mục cho bảng `phieudoi`
--
ALTER TABLE `phieudoi`
  ADD PRIMARY KEY (`maphieudoi`),
  ADD KEY `FK_phieudoi_ctsanpham` (`maimei`),
  ADD KEY `FK_phieudoi_taikhoan` (`nguoitao`);

--
-- Chỉ mục cho bảng `phieukiemke`
--
ALTER TABLE `phieukiemke`
  ADD PRIMARY KEY (`maphieu`),
  ADD KEY `FK_phieukiemke_taikhoan` (`nguoitaophieukiemke`);

--
-- Chỉ mục cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`maphieunhap`),
  ADD KEY `FK_phieunhap_nhacungcap` (`manhacungcap`),
  ADD KEY `FK_phieunhap_taikhoan` (`nguoitao`);

--
-- Chỉ mục cho bảng `phieutra`
--
ALTER TABLE `phieutra`
  ADD PRIMARY KEY (`maphieutra`),
  ADD KEY `FK_phieutra_ctsanpham` (`maimei`),
  ADD KEY `FK_phieutra_taikhoan` (`nguoitao`);

--
-- Chỉ mục cho bảng `phieuxuat`
--
ALTER TABLE `phieuxuat`
  ADD PRIMARY KEY (`maphieuxuat`),
  ADD KEY `FK_phieuxuat_khachhang` (`makh`),
  ADD KEY `FK_phieuxuat_taikhoan` (`nguoitaophieuxuat`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`masp`) USING BTREE;

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`manv`),
  ADD UNIQUE KEY `tendangnhap` (`tendangnhap`),
  ADD KEY `FK_taikhoan_nhomquyen` (`manhomquyen`);

--
-- Chỉ mục cho bảng `thuonghieu`
--
ALTER TABLE `thuonghieu`
  ADD PRIMARY KEY (`mathuonghieu`) USING BTREE;

--
-- Chỉ mục cho bảng `xuatxu`
--
ALTER TABLE `xuatxu`
  ADD PRIMARY KEY (`maxuatxu`) USING BTREE;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `fk_taikhoan_nhanvien` FOREIGN KEY (`manv`) REFERENCES `nhanvien` (`manv`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
