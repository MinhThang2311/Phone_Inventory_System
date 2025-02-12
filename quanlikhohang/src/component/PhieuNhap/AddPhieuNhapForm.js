import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Row, Col } from "react-bootstrap";
import ImeiScanner from "./ImeiScanner"; // Import component quét mã IMEI

const PhieuNhapForm = ({ show, handleClose }) => {
  const [sanpham, setSanPham] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [phienBanSanPham, setPhienBanSanPham] = useState([]);
  const [nhanVien, setNhanVien] = useState({ hoten: "", manv: "" });
  const [nhaCungCap, setNhaCungCap] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state cho tìm kiếm
  const [chiTietPhieuNhap, setChiTietPhieuNhap] = useState([]);
  const [phieuNhapData, setPhieuNhapData] = useState({
    nhacungcap: "",
    products: [],
  });
  const [newProductDetails, setNewProductDetails] = useState({
    cauhinh: "",
    gianhap: "",
    imei: "",
    soluong: "",
  });
  const handleScan = (imei) => {
    console.log("IMEI quét được:", imei);
    setNewProductDetails((prev) => ({
      ...prev,
      imei: imei,
    }));
  };

  const formatCurrency = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const handleAddProduct = async () => {
    const { cauhinh, gianhap, imei, soluong } = newProductDetails;

    // Kiểm tra định dạng IMEI
    if (!/^\d{15}$/.test(imei)) {
      alert("Mã IMEI phải là 15 số.");
      return;
    }

    // Kiểm tra xem IMEI đã tồn tại hay chưa
    const isImeiExists = await checkImeiExists(imei);
    if (isImeiExists) {
      alert("Mã IMEI đã tồn tại. Vui lòng nhập mã IMEI khác.");
      return;
    }

    if (!cauhinh || !gianhap || !soluong) {
      alert("Vui lòng nhập đầy đủ thông tin cấu hình, giá nhập và số lượng.");
      return;
    }

    const newDetail = {
      masp: selectedProduct.masp,
      maphienbansp: selectedProduct.maphienbansp,
      tensp: selectedProduct.tensp,
      cauhinh,
      gianhap: parseFloat(gianhap),
      imei,
      soluong: parseInt(soluong, 10),
    };

    if (editingIndex !== null) {
      // Cập nhật sản phẩm
      const updatedDetails = [...chiTietPhieuNhap];
      updatedDetails[editingIndex] = newDetail;
      setChiTietPhieuNhap(updatedDetails);
      setEditingIndex(null);
    } else {
      // Thêm mới sản phẩm
      setChiTietPhieuNhap([...chiTietPhieuNhap, newDetail]);
    }
    setNewProductDetails({ cauhinh: "", gianhap: "", imei: "", soluong: "" });
  };

  // Hàm kiểm tra IMEI
  const checkImeiExists = async (imei) => {
    try {
      const response = await fetch(`http://localhost:5000/checkImei/${imei}`);
      const data = await response.json();
      return data.exists; // Giả sử backend trả về { exists: true/false }
    } catch (error) {
      console.error("Error checking IMEI:", error);
      return false; // Nếu có lỗi, coi như không tồn tại
    }
  };

  const formatCauhinh = (cauhinh) => {
    if (!cauhinh) return ""; // Nếu không có cấu hình, trả về chuỗi rỗng
    const parts = cauhinh.split("-");
    if (parts.length >= 2) {
      // Thêm "GB" vào phần đầu tiên (ROM) và phần thứ hai (RAM)
      parts[0] = `${parts[0]}GB`;
      parts[1] = `${parts[1]}GB`;
    }
    return parts.join("-"); // Ghép lại chuỗi
  };

  const calculateTotal = () =>
    chiTietPhieuNhap.reduce(
      (sum, item) => sum + item.gianhap * item.soluong,
      0
    );

  useEffect(() => {
    // Fetch danh sách sản phẩm
    const fetchSanPham = async () => {
      try {
        const response = await fetch("http://localhost:5000/sanpham");
        const data = await response.json();
        if (data.success) {
          setSanPham(data.data);
        }
      } catch (error) {
        console.error("Error fetching sản phẩm:", error);
      }
    };

    // Fetch nhà cung cấp
    const fetchNhaCungCap = async () => {
      try {
        const response = await fetch("http://localhost:5000/nhacungcap");
        const data = await response.json();
        setNhaCungCap(data);
      } catch (error) {
        console.error("Error fetching nhà cung cấp:", error);
      }
    };

    // Fetch thông tin nhân viên từ localStorage
    const storedHoten = localStorage.getItem("hoten");
    const storedManv = localStorage.getItem("manv");
    if (storedHoten && storedManv) {
      setNhanVien({ hoten: storedHoten, manv: storedManv });
    }
    fetchSanPham();
    fetchNhaCungCap();
  }, []);

  const handleEdit = (index) => {
    const detail = chiTietPhieuNhap[index];
    setNewProductDetails({
      cauhinh: detail.cauhinh,
      gianhap: detail.gianhap.toString(),
      imei: detail.imei,
      soluong: detail.soluong.toString(),
    });
    setSelectedProduct({ masp: detail.masp, tensp: detail.tensp });
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedDetails = chiTietPhieuNhap.filter((_, i) => i !== index);
    setChiTietPhieuNhap(updatedDetails);
  };

  // Xử lý chọn sản phẩm
  const handleSelectProduct = async (product) => {
    setSelectedProduct(product);

    // Fetch thông tin chi tiết sản phẩm
    try {
      const response = await fetch(
        `http://localhost:5000/truyvanPagePhieuNhap/${product.masp}`
      );
      const data = await response.json();
      if (data.success) {
        setPhienBanSanPham(data.data);
        // Lấy cấu hình đầu tiên làm mặc định
        const defaultConfig = data.data.length > 0 ? data.data[0].cauhinh : "";
        setNewProductDetails((prev) => ({
          ...prev,
          cauhinh: defaultConfig,
        }));
        // Cập nhật selectedProduct với maphienbansp
        setSelectedProduct((prev) => ({
          ...prev,
          maphienbansp: data.data[0]?.maphienbansp || "",
          masp: data.data[0]?.masp || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching phiên bản sản phẩm:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phieuNhapData.nhacungcap || chiTietPhieuNhap.length === 0) {
      alert("Vui lòng chọn nhà cung cấp và thêm ít nhất một sản phẩm.");
      return;
    }

    const requestData = {
      manhacungcap: phieuNhapData.nhacungcap,
      nguoitao: nhanVien.manv,
      tongtien: calculateTotal(),
      ctPhieuNhap: chiTietPhieuNhap.map((detail) => ({
        maphienbansp: detail.maphienbansp,
        masp: selectedProduct.masp,
        soluong: detail.soluong,
        dongia: detail.gianhap,
        imei: detail.imei,
      })),
    };

    console.log("Dữ liệu gửi đến backend:", requestData); // Kiểm tra dữ liệu gửi

    try {
      const response = await fetch(
        "http://localhost:5000/themPhieuNhapvsCtPhieuNhap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();
      console.log("Phản hồi từ backend:", data); // Kiểm tra phản hồi từ backend

      if (data.success) {
        alert(data.message);
        handleClose(); // Đóng modal
        setChiTietPhieuNhap([]); // Reset danh sách chi tiết phiếu nhập
        setPhieuNhapData({ manhacungcap: "", nguoitao: "", tongtien: "" }); // Reset dữ liệu
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Lỗi khi tạo phiếu nhập:", error);
      alert("Có lỗi xảy ra khi tạo phiếu nhập.");
    }
  };

  const filteredProducts = sanpham.filter(
    (item) =>
      item.tensp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.masp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Phiếu Nhập</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <Form.Group controlId="search">
              <Form.Label>Tìm kiếm sản phẩm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên hoặc mã sản phẩm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* Danh sách sản phẩm */}
          <Col md={4}>
            <h5>Danh sách sản phẩm</h5>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Mã SP</th>
                    <th>Tên SP</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((item) => (
                    <tr
                      key={item.masp}
                      onClick={() => handleSelectProduct(item)}
                    >
                      <td>{item.masp}</td>
                      <td>{item.tensp}</td>
                      <td>{item.soluongton}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Button
              className="mt-3"
              variant="success"
              onClick={handleAddProduct}
            >
              Thêm sản phẩm
            </Button>
          </Col>

          {/* Thông tin sản phẩm */}
          <Col md={4}>
            <h5>Thông tin sản phẩm</h5>
            <Form>
              <Form.Group controlId="masp">
                <Form.Label>Mã SP</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={selectedProduct.masp || ""}
                />
              </Form.Group>
              <Form.Group controlId="tensp">
                <Form.Label>Tên SP</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={selectedProduct.tensp || ""}
                />
              </Form.Group>
              <Form.Group controlId="cauhinh">
                <Form.Label>Cấu hình</Form.Label>
                <Form.Select
                  value={newProductDetails.cauhinh}
                  onChange={(e) => {
                    const selectedCauhinh = e.target.value;
                    const selectedVersion = phienBanSanPham.find(
                      (pbsp) => pbsp.cauhinh === selectedCauhinh
                    );
                    setNewProductDetails({
                      ...newProductDetails,
                      cauhinh: selectedCauhinh,
                    });
                    if (selectedVersion) {
                      setSelectedProduct((prev) => ({
                        ...prev,
                        maphienbansp: selectedVersion.maphienbansp,
                      }));
                    }
                  }}
                >
                  <option value="">Chọn cấu hình</option>
                  {phienBanSanPham.map((pbsp) => (
                    <option key={pbsp.maphienbansp} value={pbsp.cauhinh}>
                      {formatCauhinh(pbsp.cauhinh)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="gianhap">
                <Form.Label>Giá nhập</Form.Label>
                <Form.Control
                  type="number"
                  value={newProductDetails.gianhap}
                  onChange={(e) =>
                    setNewProductDetails({
                      ...newProductDetails,
                      gianhap: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="imei">
                <Form.Label>Mã IMEI</Form.Label>
                <Form.Control
                  type="text"
                  value={newProductDetails.imei}
                  onChange={(e) =>
                    setNewProductDetails({
                      ...newProductDetails,
                      imei: e.target.value,
                    })
                  }
                />
                <Button
                  variant="info"
                  onClick={() => setShowScannerModal(true)} // Mở modal quét mã
                  className="mt-2"
                >
                  Quét IMEI
                </Button>
              </Form.Group>
              <Form.Group controlId="soluong">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  value={newProductDetails.soluong}
                  onChange={(e) =>
                    setNewProductDetails({
                      ...newProductDetails,
                      soluong: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Col>

          {/* Thông tin phiếu nhập */}
          <Col md={4}>
            <h5>Thông tin phiếu nhập</h5>
            <Form>
              <Form.Group controlId="nhanvien">
                <Form.Label>Nhân viên nhập</Form.Label>
                <Form.Control type="text" readOnly value={nhanVien.hoten} />
              </Form.Group>
              <Form.Group controlId="nhacungcap">
                <Form.Label>Nhà cung cấp</Form.Label>
                <Form.Select
                  value={phieuNhapData.nhacungcap}
                  onChange={(e) =>
                    setPhieuNhapData({
                      ...phieuNhapData,
                      nhacungcap: e.target.value,
                    })
                  }
                >
                  <option value="">Chọn nhà cung cấp</option>
                  {nhaCungCap.map((ncc) => (
                    <option key={ncc.manhacungcap} value={ncc.manhacungcap}>
                      {ncc.tennhacungcap}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h5>Danh sách chi tiết</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã SP</th>
                  <th>Tên SP</th>
                  <th>Cấu hình</th>
                  <th>Mã PB</th>
                  <th>Giá nhập</th>
                  <th>Mã IMEI</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {chiTietPhieuNhap.map((detail, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{detail.masp}</td>
                    <td>{detail.tensp}</td>
                    <td>{formatCauhinh(detail.cauhinh)}</td>
                    <td>{detail.maphienbansp}</td>
                    <td>{formatCurrency(detail.gianhap)}</td>
                    <td>{detail.imei}</td>
                    <td>{detail.soluong}</td>
                    <td>{formatCurrency(detail.gianhap * detail.soluong)}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(index)}
                      >
                        Sửa
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(index)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="7" className="text-end">
                    <strong>Tổng tiền:</strong>
                  </td>
                  <td>
                    <strong>{formatCurrency(calculateTotal())}</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* Modal quét mã IMEI */}
        <ImeiScanner
          show={showScannerModal}
          handleClose={() => setShowScannerModal(false)}
          onScan={handleScan}
        />
        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" onClick={handleClose} className="mr-2">
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Tạo phiếu nhập
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PhieuNhapForm;
