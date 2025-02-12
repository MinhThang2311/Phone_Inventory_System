import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Row, Col, Card } from "react-bootstrap";
import "./CSS/AddPhieuXuat.css";

const AddPhieuXuatForm = ({ show, handleClose }) => {
  const [sanpham, setSanPham] = useState([]);
  const [khachhang, setKhachHang] = useState([]);
  const [imeiList, setImeiList] = useState([]);
  const [imeiSearchTerm, setImeiSearchTerm] = useState("");
  const [showImeiModal, setShowImeiModal] = useState(false);
  const [selectedImei, setSelectedImei] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [phienBanSanPham, setPhienBanSanPham] = useState([]);
  const [nhanVien, setNhanVien] = useState({ hoten: "", manv: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [phieuNhapData, setPhieuNhapData] = useState({
    products: [],
  });
  const formatCurrency = (value) => {
    if (value === undefined || value === null) {
      return ""; // Hoặc một giá trị mặc định khác
    }
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const [newProductDetails, setNewProductDetails] = useState({
    cauhinh: "",
    giaxuat: "",
    soluong: "", // Chỉ cần số lượng
  });
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state cho tìm kiếm
  const [chiTietPhieuXuat, setchiTietPhieuXuat] = useState([]);

  const handleOpenImeiModal = () => {
    setShowImeiModal(true);
  };

  const handleCloseImeiModal = () => {
    setShowImeiModal(false);
  };

  const handleAddProduct = async () => {
    const { cauhinh, giaxuat } = newProductDetails;
    // Kiểm tra các trường nhập
    if (!cauhinh || !giaxuat) {
      alert("Vui lòng nhập đầy đủ thông tin cấu hình, giá xuất và số lượng.");
      return;
    }

    const soluong = selectedImei.length;
    // Kiểm tra số lượng IMEI đã chọn
    if (soluong === 0) {
      alert("Vui lòng chọn ít nhất 1 mã IMEI.");
      return;
    }
    const newDetail = {
      masp: selectedProduct.masp,
      maphienbansp: selectedProduct.maphienbansp,
      tensp: selectedProduct.tensp,
      cauhinh,
      giaxuat: parseFloat(giaxuat), // Đảm bảo rằng đây là giá xuất
      imei: selectedImei, // Lưu danh sách IMEI
      soluong,
    };

    if (editingIndex !== null) {
      // Cập nhật sản phẩm
      const updatedDetails = [...chiTietPhieuXuat];
      updatedDetails[editingIndex] = newDetail;
      setchiTietPhieuXuat(updatedDetails);
      setEditingIndex(null);
    } else {
      // Thêm mới sản phẩm
      setchiTietPhieuXuat([...chiTietPhieuXuat, newDetail]);
    }

    // Reset các trường nhập
    setNewProductDetails({ cauhinh: "", giaxuat: "" }); // Đảm bảo đúng tên biến
    setSelectedImei([]); // Reset danh sách IMEI đã chọn
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
    chiTietPhieuXuat.reduce(
      (sum, item) => sum + item.giaxuat * item.soluong,
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
    const fetchKhachHang = async () => {
      try {
        const response = await fetch("http://localhost:5000/khachhang");
        const data = await response.json();
        setKhachHang(data);
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
    fetchKhachHang();
  }, []);

  const handleEdit = (index) => {
    const detail = chiTietPhieuXuat[index];
    setNewProductDetails({
      cauhinh: detail.cauhinh,
      gianhap: detail.gianhap.toString(),
      soluong: detail.soluong.toString(),
    });
    setSelectedImei(detail.imei.split(", ")); // Chia tách mã IMEI đã chọn
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedDetails = chiTietPhieuXuat.filter((_, i) => i !== index);
    setchiTietPhieuXuat(updatedDetails);
  };

  const handleSelectProduct = async (product) => {
    setSelectedProduct(product);

    // Fetch thông tin chi tiết sản phẩm
    try {
      const response = await fetch(
        `http://localhost:5000/truyvanPagePhieuXuat/${product.masp}`
      );
      const data = await response.json();
      if (data.success) {
        setPhienBanSanPham(data.data);
        const defaultConfig = data.data.length > 0 ? data.data[0].cauhinh : "";
        setNewProductDetails((prev) => ({
          ...prev,
          cauhinh: defaultConfig,
        }));

        const firstVersion = data.data[0];
        setSelectedProduct((prev) => ({
          ...prev,
          maphienbansp: firstVersion.maphienbansp,
          masp: firstVersion.masp,
        }));

        const imeiResponse = await fetch(
          `http://localhost:5000/getImeiByVersion/${firstVersion.maphienbansp}`
        );
        const imeiData = await imeiResponse.json();
        if (imeiData.success) {
          setImeiList(imeiData.data); // Cập nhật danh sách IMEI
        }
      }
    } catch (error) {
      console.error("Error fetching phiên bản sản phẩm:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phieuNhapData.khachhang || chiTietPhieuXuat.length === 0) {
      alert("Vui lòng chọn khách hàng và thêm ít nhất một sản phẩm.");
      return;
    }

    const requestData = {
      khachhang: phieuNhapData.khachhang,
      nguoitaophieuxuat: nhanVien.manv,
      tongtien: calculateTotal(),
      ctPhieuXuat: chiTietPhieuXuat.map((detail) => ({
        maphienbansp: detail.maphienbansp,
        masp: detail.masp,
        soluong: detail.soluong,
        dongia: detail.giaxuat,
        imei: detail.imei,
      })),
    };

    try {
      const response = await fetch("http://localhost:5000/themPhieuXuat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        handleClose(); // Đóng modal
        setchiTietPhieuXuat([]); // Reset danh sách chi tiết phiếu xuất
        setPhieuNhapData({ khachhang: "", nguoitao: "", tongtien: "" }); // Reset dữ liệu
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Lỗi khi tạo phiếu xuất:", error);
      alert("Có lỗi xảy ra khi tạo phiếu xuất.");
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
        <Modal.Title>Phiếu Xuất</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
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
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Danh sách sản phẩm</Card.Title>
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
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Thông tin sản phẩm</Card.Title>
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
                      onChange={async (e) => {
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
                          setSelectedVersion(selectedVersion.maphienbansp);

                          setNewProductDetails((prev) => ({
                            ...prev,
                            soluongton: selectedVersion.soluongton,
                          }));

                          const imeiResponse = await fetch(
                            `http://localhost:5000/getImeiByVersion/${selectedVersion.maphienbansp}`
                          );
                          const imeiData = await imeiResponse.json();
                          if (imeiData.success) {
                            setImeiList(imeiData.data);
                          }
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
                  <Form.Group controlId="giaxuat">
                    <Form.Label>Giá xuất</Form.Label>
                    <Form.Control
                      type="number"
                      value={newProductDetails.giaxuat}
                      onChange={(e) =>
                        setNewProductDetails({
                          ...newProductDetails,
                          giaxuat: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="soluongton">
                    <Form.Label>Số lượng tồn</Form.Label>
                    <Form.Control
                      type="number"
                      value={newProductDetails.soluongton || ""}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="imei">
                    <Form.Label></Form.Label>
                    <Button variant="primary" onClick={handleOpenImeiModal}>
                      Chọn Mã IMEI
                    </Button>
                    <Form.Control
                      type="text"
                      readOnly
                      value={selectedImei.join(", ")}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Thông tin phiếu xuất</Card.Title>
                <Form>
                  <Form.Group controlId="nhanvien">
                    <Form.Label>Nhân viên xuất</Form.Label>
                    <Form.Control type="text" readOnly value={nhanVien.hoten} />
                  </Form.Group>
                  <Form.Group controlId="khachhang">
                    <Form.Label>Khách hàng</Form.Label>
                    <Form.Select
                      value={phieuNhapData.khachhang}
                      onChange={(e) =>
                        setPhieuNhapData({
                          ...phieuNhapData,
                          khachhang: e.target.value,
                        })
                      }
                    >
                      <option value="">Chọn khách hàng</option>
                      {khachhang.map((kh) => (
                        <option key={kh.makh} value={kh.makh}>
                          {kh.tenkhachhang}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Danh sách chi tiết</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã SP</th>
                      <th>Tên SP</th>
                      <th>Cấu hình</th>
                      <th>Mã PB</th>
                      <th>Giá xuất</th>
                      <th>Mã IMEI</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chiTietPhieuXuat.map((detail, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{detail.masp}</td>
                        <td>{detail.tensp}</td>
                        <td>{formatCauhinh(detail.cauhinh)}</td>
                        <td>{detail.maphienbansp}</td>
                        <td>{formatCurrency(detail.giaxuat)}</td>
                        <td>{detail.imei.join(", ")}</td>
                        <td>{detail.soluong}</td>
                        <td>
                          {formatCurrency(detail.giaxuat * detail.soluong)}
                        </td>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" onClick={handleClose} className="mr-2">
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Tạo phiếu xuất
          </Button>
        </div>
      </Modal.Body>
      {/* Modal chọn IMEI */}
      <Modal show={showImeiModal} onHide={handleCloseImeiModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn Mã IMEI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm mã IMEI"
            value={imeiSearchTerm}
            onChange={(e) => setImeiSearchTerm(e.target.value)}
          />
          <div
            style={{ maxHeight: "300px", overflowY: "auto", marginTop: "10px" }}
          >
            {imeiList
              .filter((imei) =>
                imei.maimei.toLowerCase().includes(imeiSearchTerm.toLowerCase())
              )
              .map((imei) => (
                <Form.Check
                  key={imei.maimei}
                  type="checkbox"
                  label={imei.maimei}
                  checked={selectedImei.includes(imei.maimei)}
                  onChange={() => {
                    if (selectedImei.includes(imei.maimei)) {
                      setSelectedImei(
                        selectedImei.filter((id) => id !== imei.maimei)
                      );
                    } else {
                      setSelectedImei([...selectedImei, imei.maimei]);
                    }
                  }}
                />
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseImeiModal}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseImeiModal();
            }}
          >
            Chọn
          </Button>
        </Modal.Footer>
      </Modal>
    </Modal>
  );
};

export default AddPhieuXuatForm;
