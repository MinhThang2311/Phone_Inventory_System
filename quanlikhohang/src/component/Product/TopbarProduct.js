import React, { useState, useEffect } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import {
  FaPlus,
  FaTrash,
  FaEye,
  FaDownload,
  FaFileExcel,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import ProductDetailForm from "./ProductDetailForm";
import ProductConfigTable from "./ProductConfigTable";
import ProductImeiDetailForm from "./ProductImeiDetailForm";
import "./CSS/Topbar.css";
const TopbarProduct = ({ selectedProductId, onSearch }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // Trạng thái hiển thị form chỉnh sửa
  const [selectedProduct, setSelectedProduct] = useState(null); // Trạng thái để lưu thông tin sản phẩm đã chọn
  const [showConfig, setShowConfig] = useState(false);
  const [configurations, setConfigurations] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false); // Trạng thái mở modal chi tiết sản phẩm
  const [showImeiDetailModal, setShowImeiDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu giá trị tìm kiếm
  const [thuonghieuMap, setThuongHieuMap] = useState({});
  const [hedieuhanhMap, setHeDieuHanhMap] = useState({});
  const [xuatxuMap, setXuatXuMap] = useState({});
  const [khuvuckhoMap, setKhuVucKhoMap] = useState({});
  useEffect(() => {
    const fetchThuongHieu = async () => {
      try {
        const response = await fetch("http://localhost:5000/thuonghieu");
        const data = await response.json();
        if (data.data) {
          const map = data.data.reduce((acc, thuonghieu) => {
            acc[thuonghieu.mathuonghieu] = thuonghieu.tenthuonghieu;
            return acc;
          }, {});
          setThuongHieuMap(map);
        }
      } catch (error) {
        console.error("Error fetching thuonghieu:", error);
      }
    };

    const fetchHeDieuHanh = async () => {
      try {
        const response = await fetch("http://localhost:5000/hedieuhanh");
        const data = await response.json();
        if (data.data) {
          const map = data.data.reduce((acc, hedieuhanh) => {
            acc[hedieuhanh.mahedieuhanh] = hedieuhanh.tenhedieuhanh;
            return acc;
          }, {});
          setHeDieuHanhMap(map);
        }
      } catch (error) {
        console.error("Error fetching hedieuhanh:", error);
      }
    };

    const fetchXuatXu = async () => {
      try {
        const response = await fetch("http://localhost:5000/xuatxu");
        const data = await response.json();
        if (data.data) {
          const map = data.data.reduce((acc, xuatxu) => {
            acc[xuatxu.maxuatxu] = xuatxu.tenxuatxu;
            return acc;
          }, {});
          setXuatXuMap(map);
        }
      } catch (error) {
        console.error("Error fetching xuatxu:", error);
      }
    };

    const fetchKhuVucKho = async () => {
      try {
        const response = await fetch("http://localhost:5000/khuvuckho");
        const data = await response.json();
        if (data.data) {
          const map = data.data.reduce((acc, khuvuckho) => {
            acc[khuvuckho.makhuvuc] = khuvuckho.tenkhuvuc;
            return acc;
          }, {});
          setKhuVucKhoMap(map);
        }
      } catch (error) {
        console.error("Error fetching khuvuckho:", error);
      }
    };

    fetchThuongHieu();
    fetchHeDieuHanh();
    fetchXuatXu();
    fetchKhuVucKho();
  }, []);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Gọi hàm onSearch từ props
  };
  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);
  const handleShowImeiDetail = () => {
    if (selectedProductId) {
      setShowImeiDetailModal(true);
    } else {
      alert("Vui lòng chọn sản phẩm để xem danh sách IMEI.");
    }
  };
  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedProduct(null); // Đặt lại trạng thái sản phẩm đã chọn khi đóng form
  };
  const handleDelete = async () => {
    if (selectedProductId) {
      try {
        const response = await fetch(
          `http://localhost:5000/sanpham/${selectedProductId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Sản phẩm đã được xóa thành công.");
        // Thực hiện thêm hành động nếu cần, như tải lại danh sách sản phẩm
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa sản phẩm.");
        console.log(selectedProductId); // Kiểm tra giá trị id
        console.error("Error deleting product:", error);
      }
    } else {
      alert("Vui lòng chọn sản phẩm cần xóa.");
    }
  };
  const handleShowEditForm = async () => {
    if (selectedProductId) {
      try {
        const response = await fetch(
          `http://localhost:5000/sanpham/${selectedProductId}`
        );
        const data = await response.json();
        setSelectedProduct(data); // Đặt sản phẩm đã chọn vào state
        setShowEditForm(true); // Hiển thị form chỉnh sửa
      } catch (error) {
        alert("Có lỗi xảy ra khi lấy thông tin sản phẩm.");
        console.error("Error fetching product details:", error);
      }
    } else {
      alert("Vui lòng chọn sản phẩm để chỉnh sửa.");
    }
  };
  const handleShowDetail = async () => {
    if (selectedProductId) {
      try {
        const response = await fetch(
          `http://localhost:5000/sanpham/${selectedProductId}`
        );
        const data = await response.json();
        setSelectedProduct(data); // Lưu thông tin sản phẩm đã chọn
        setShowDetailModal(true); // Hiển thị modal chi tiết sản phẩm
      } catch (error) {
        alert("Có lỗi xảy ra khi hiển thị chi tiết sản phẩm.");
        console.error("Error fetching product details:", error);
      }
    } else {
      alert("Vui lòng chọn sản phẩm để xem chi tiết.");
    }
  };
  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedProduct(null);
  };
  const handleShowConfig = async () => {
    setShowDetailModal(false); // Đóng chi tiết trước khi mở cấu hình
    if (selectedProductId) {
      try {
        const response = await fetch(
          `http://localhost:5000/sanpham/configurations/${selectedProductId}`
        );
        const data = await response.json();
        setConfigurations(data);
        setShowConfig(true); // Hiển thị bảng cấu hình sản phẩm
      } catch (error) {
        alert("Có lỗi xảy ra khi lấy cấu hình sản phẩm.");
        console.error("Error fetching product configurations:", error);
      }
    }
  };

  const handleSelectProduct = async (masp) => {
    try {
      const response = await fetch(`http://localhost:5000/sanpham/${masp}`);
      const data = await response.json();
      setSelectedProduct(data);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const handleCloseConfig = () => {
    setShowConfig(false);
    setShowDetailModal(true); // Go back to product details view
  };
  const handleExportExcel = async () => {
    try {
      const response = await fetch("http://localhost:5000/sanpham");
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu sản phẩm.");
      }
      const result = await response.json();

      // Access the array inside the 'data' property
      const data = result.data;

      if (!data || data.length === 0) {
        alert("Không có dữ liệu để xuất.");
        return;
      }

      const worksheet = XLSX.utils.aoa_to_sheet([
        [
          "Mã SP",
          "Tên Sản Phẩm",
          "Số Lượng Tồn",
          "Thương Hiệu",
          "Hệ Điều Hành",
          "Kích Thước Màn",
          "Chip Xử Lý",
          "Dung Lượng Pin",
          "Xuất Xứ",
          "Khu Vực Kho",
        ],
      ]);

      data.forEach((item, index) => {
        const row = [
          item.masp,
          item.tensp,
          item.soluongton,
          thuonghieuMap[item.thuonghieu],
          hedieuhanhMap[item.hedieuhanh],
          item.kichthuocman,
          item.chipxuly,
          item.dungluongpin,
          xuatxuMap[item.xuatxu],
          khuvuckhoMap[item.khuvuckho],
        ];
        XLSX.utils.sheet_add_aoa(worksheet, [row], {
          origin: `A${index + 2}`,
        });
      });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "SanPham");

      worksheet["!cols"] = [
        { wch: 10 },
        { wch: 20 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 10 },
        { wch: 20 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
      ];

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      FileSaver.saveAs(blob, "DanhSachSanPham.xlsx");

      alert("Xuất file Excel thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi xuất file Excel.");
      console.error("Error exporting Excel:", error);
    }
  };

  return (
    <div className="topbar d-flex justify-content-between align-items-center">
      <div className="actions">
        <Button variant="primary" onClick={handleShowAddForm}>
          <FaPlus /> Thêm
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          <FaTrash /> Xóa
        </Button>
        <Button variant="warning" onClick={handleShowEditForm}>
          <FaTrash /> Sửa
        </Button>
        <Button variant="primary" onClick={handleShowDetail}>
          <FaEye /> Chi tiết
        </Button>
        <Button variant="info" onClick={handleShowImeiDetail}>
          DS IMEI
        </Button>
        <Button variant="info" onClick={handleExportExcel}>
          <FaFileExcel /> Xuất Excel
        </Button>
        <AddProductForm show={showAddForm} handleClose={handleCloseAddForm} />
        {showEditForm && (
          <EditProductForm
            show={showEditForm}
            onClose={handleCloseEditForm}
            masp={selectedProductId}
          />
        )}

        {/* Product Detail Form */}
        {showDetailModal && (
          <ProductDetailForm
            masp={selectedProductId}
            onClose={handleCloseDetail}
            show={showDetailModal}
          />
        )}
        {showImeiDetailModal && (
          <ProductImeiDetailForm
            show={showImeiDetailModal}
            handleClose={() => setShowImeiDetailModal(false)}
            masp={selectedProductId}
          />
        )}
        {/* Product Configuration Table */}
        {showConfig && (
          <ProductConfigTable
            configurations={configurations}
            onClose={handleCloseConfig}
          />
        )}
      </div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Tìm kiếm mã,tên sp"
          className="mr-2"
          onChange={handleSearch}
        />
        <Button variant="outline-success">Tìm kiếm</Button>
      </Form>
    </div>
  );
};

export default TopbarProduct;
