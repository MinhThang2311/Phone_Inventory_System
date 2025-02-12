import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Row, Col, Card } from "react-bootstrap";

const ChuyenKhoModal = ({ show, handleClose }) => {
  const [sanpham, setSanPham] = useState([]);
  const [phienBanSanPham, setPhienBanSanPham] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [khuvuckho, setKhuVucKho] = useState("");
  const [soluong, setSoLuong] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProductDetails, setNewProductDetails] = useState({
    cauhinh: "",
    soluongton: "",
    khuvuckho: "",
  });
  const [khuVucKhoList, setKhuVucKhoList] = useState([]); // State để lưu danh sách khu vực kho

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

    // Fetch danh sách khu vực kho
    const fetchKhuVucKho = async () => {
      try {
        const response = await fetch("http://localhost:5000/khuvuckho");
        const data = await response.json();
        console.log("Khu vực kho data:", data); // Kiểm tra dữ liệu
        setKhuVucKhoList(data); // Sử dụng trực tiếp mảng
      } catch (error) {
        console.error("Error fetching khu vực kho:", error);
      }
    };

    fetchSanPham();
    fetchKhuVucKho();
  }, []);

  const handleSelectProduct = async (product) => {
    setSelectedProduct(product);

    // Fetch thông tin chi tiết sản phẩm
    try {
      const response = await fetch(
        `http://localhost:5000/truyvanPagePhieuXuatKho/${product.masp}`
      );
      const data = await response.json();
      if (data.success) {
        setPhienBanSanPham(data.data);
        setSelectedVersion(data.data[0]?.maphienbansp); // Chọn phiên bản đầu tiên
        // Cập nhật số lượng tồn và khu vực kho cho cấu hình đầu tiên
        if (data.data.length > 0) {
          setNewProductDetails((prev) => ({
            ...prev,
            cauhinh: data.data[0].cauhinh,
            soluongton: data.data[0].soluongton, // Cập nhật số lượng tồn
            khuvuckho: data.data[0].khuvuckho, // Cập nhật khu vực kho
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching phiên bản sản phẩm:", error);
    }
  };

  const handleCauhinhChange = (e) => {
    const selectedCauhinh = e.target.value;
    const selectedVersion = phienBanSanPham.find(
      (pbsp) => pbsp.cauhinh === selectedCauhinh
    );

    setNewProductDetails((prev) => ({
      ...prev,
      cauhinh: selectedCauhinh,
    }));

    if (selectedVersion) {
      setSelectedVersion(selectedVersion.maphienbansp);
      setNewProductDetails((prev) => ({
        ...prev,
        soluongton: selectedVersion.soluongton, // Cập nhật số lượng tồn
        khuvuckho: selectedVersion.khuvuckho, // Cập nhật khu vực kho
      }));
    }
  };

  const handleSubmit = async () => {
    if (!selectedProduct.masp || !selectedVersion || !khuvuckho || !soluong) {
      alert("Vui lòng chọn đầy đủ thông tin.");
      return;
    }

    const requestData = {
      masp: selectedProduct.masp,
      maphienbansp: selectedVersion,
      khuvuckho,
      soluong,
    };

    try {
      const response = await fetch("http://localhost:5000/chuyenKho", {
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
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Lỗi khi chuyển kho:", error);
      alert("Có lỗi xảy ra khi chuyển kho.");
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
        <Modal.Title>Chuyển Kho</Modal.Title>
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
          <Col md={12}>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
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
                      onChange={handleCauhinhChange}
                    >
                      <option value="">Chọn cấu hình</option>
                      {phienBanSanPham.map((pbsp) => (
                        <option key={pbsp.maphienbansp} value={pbsp.cauhinh}>
                          {formatCauhinh(pbsp.cauhinh)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="soluongton">
                    <Form.Label>Số lượng tồn</Form.Label>
                    <Form.Control
                      type="number"
                      value={newProductDetails.soluongton || ""}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="khuvuckho">
                    <Form.Label>Khu vực kho</Form.Label>
                    <Form.Control
                      type="text"
                      value={newProductDetails.khuvuckho || ""}
                      readOnly
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Thông tin chuyển kho</Card.Title>
                <Form>
                  <Form.Group controlId="khuvuckho">
                    <Form.Label>Khu vực kho</Form.Label>
                    <Form.Select
                      value={khuvuckho}
                      onChange={(e) => setKhuVucKho(e.target.value)}
                    >
                      <option value="">Chọn khu vực kho</option>
                      {khuVucKhoList.map((khu) => (
                        <option key={khu.makhuvuc} value={khu.makhuvuc}>
                          {khu.tenkhuvuc}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="soluong">
                    <Form.Label>Số lượng</Form.Label>
                    <Form.Control
                      type="number"
                      value={soluong}
                      onChange={(e) => setSoLuong(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" onClick={handleClose} className="mr-2">
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Chuyển kho
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChuyenKhoModal;
