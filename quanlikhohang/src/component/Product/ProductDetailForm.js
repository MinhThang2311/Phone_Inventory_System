import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Container,
  Alert,
} from "react-bootstrap";
import ProductVersionForm from "./ProductVersionForm";
const ProductDetailForm = ({ masp, onClose, show }) => {
  const [product, setProduct] = useState(null);
  const [productVersions, setProductVersions] = useState([]);
  const [error, setError] = useState(null);
  const [showProductVersionForm, setShowProductVersionForm] = useState(false);
  const [step, setStep] = useState(1); // State to track the current step
  // Các state quản lý dữ liệu tham chiếu
  const [thuonghieuMap, setThuongHieuMap] = useState({});
  const [hedieuhanhMap, setHeDieuHanhMap] = useState({});
  const [xuatxuMap, setXuatXuMap] = useState({});
  const [khuvuckhoMap, setKhuVucKhoMap] = useState({});
  const [ramMap, setRAMOptions] = useState([]);
  const [romMap, setROMOptions] = useState([]);
  const [mausacMap, setMauSacOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      // Fetch hệ điều hành
      const hedieuhanhResponse = await fetch(
        "http://localhost:5000/hedieuhanh"
      );
      const hedieuhanhData = await hedieuhanhResponse.json();
      const hedieuhanhMap = Array.isArray(hedieuhanhData.data)
        ? hedieuhanhData.data.reduce((map, hedieuhanh) => {
            map[hedieuhanh.mahedieuhanh] = hedieuhanh.tenhedieuhanh;
            return map;
          }, {})
        : {};
      // Fetch thương hiệu
      const thuonghieuResponse = await fetch(
        "http://localhost:5000/thuonghieu"
      );
      const thuonghieuData = await thuonghieuResponse.json();

      const thuonghieuMap = Array.isArray(thuonghieuData.data)
        ? thuonghieuData.data.reduce((map, thuonghieu) => {
            map[thuonghieu.mathuonghieu] = thuonghieu.tenthuonghieu;
            return map;
          }, {})
        : {}; // Set map là object rỗng nếu dữ liệu không phải là mảng
      // Fetch xuất xứ
      const xuatxuResponse = await fetch("http://localhost:5000/xuatxu");
      const xuatxuData = await xuatxuResponse.json();
      const xuatxuMap = Array.isArray(xuatxuData.data)
        ? xuatxuData.data.reduce((map, xuatxu) => {
            map[xuatxu.maxuatxu] = xuatxu.tenxuatxu;
            return map;
          }, {})
        : {};
      const ramOptions = await fetch("http://localhost:5000/ram");
      const ramData = await ramOptions.json();
      const ramMap = Array.isArray(ramData)
        ? ramData.reduce((map, ram) => {
            map[ram.madlram] = ram.kichthuocram;
            return map;
          }, {})
        : {};

      const romOptions = await fetch("http://localhost:5000/rom");
      const romData = await romOptions.json();
      const romMap = Array.isArray(romData)
        ? romData.reduce((map, rom) => {
            map[rom.madlrom] = rom.kichthuocrom;
            return map;
          }, {})
        : {};

      const mauSacOptions = await fetch("http://localhost:5000/mausac");
      const mauSacData = await mauSacOptions.json();
      const mausacMap = Array.isArray(mauSacData)
        ? mauSacData.reduce((map, mausac) => {
            map[mausac.mamau] = mausac.tenmau;
            return map;
          }, {})
        : {};
      // Fetch khu vực kho
      const khuvuckhoResponse = await fetch("http://localhost:5000/khuvuckho");
      const khuvuckhoData = await khuvuckhoResponse.json();
      const khuvuckhoMap = Array.isArray(khuvuckhoData)
        ? khuvuckhoData.reduce((map, khuvuckho) => {
            map[khuvuckho.makhuvuc] = khuvuckho.tenkhuvuc;
            return map;
          }, {})
        : {};

      setRAMOptions(ramMap);
      setROMOptions(romMap);
      setMauSacOptions(mausacMap);
      setThuongHieuMap(thuonghieuMap);
      setHeDieuHanhMap(hedieuhanhMap);
      setXuatXuMap(xuatxuMap);
      setKhuVucKhoMap(khuvuckhoMap);
    };
    if (masp) {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/sanpham/${masp}`);
          const data = await response.json();

          if (data.success) {
            setProduct(data.data);
            setError(null);
          } else {
            setError("Sản phẩm không tồn tại.");
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
          setError("Lỗi khi tải chi tiết sản phẩm.");
        }
      };

      const fetchProductVersion = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/phienbansanpham/${masp}`
          );
          const data = await response.json();
          console.log("Product Versions: ", data);
          if (data.success) {
            setProductVersions(data.data);
          } else {
            setProductVersions([]);
          }
        } catch (error) {
          console.error("Error fetching product version:", error);
          setProductVersions([]);
        }
      };
      fetchOptions();
      fetchProductDetails();
      fetchProductVersion();
    }
  }, [masp]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!product) {
    return null; // Loading state
  }
  const handleNextStep = () => setStep(2);
  const handlePreviousStep = () => setStep(1);

  const imageUrl = product.hinhanh
    ? `http://localhost:5000/uploads/${product.hinhanh}`
    : "https://via.placeholder.com/150";

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {step === 1 ? "Xem Chi Tiết Sản Phẩm" : "Chi Tiết Phiên Bản Sản Phẩm"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 ? (
          <Form>
            <Container>
              {/* Product Details */}
              <Row className="mb-3 text-center">
                <Col md={6}>
                  <div className="form-group text-center">
                    <img
                      src={imageUrl}
                      alt={product.tensp}
                      style={{ width: "150px", borderRadius: "8px" }}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Tên sản phẩm</Form.Label>
                    <Form.Control type="text" value={product.tensp} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Xuất xứ</Form.Label>
                    <Form.Control
                      type="text"
                      value={xuatxuMap[product.xuatxu]}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Chip xử lý</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.chipxuly}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Dung lượng pin</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.dungluongpin}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Kích thước màn</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.kichthuocman}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Hệ điều hành</Form.Label>
                    <Form.Control
                      type="text"
                      value={hedieuhanhMap[product.hedieuhanh]}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Phiên bản hệ điều hành</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.phienbanhdh}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Camera trước</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.cameratruoc}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Camera sau</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.camerasau}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Thương hiệu</Form.Label>
                    <Form.Control
                      type="text"
                      value={thuonghieuMap[product.thuonghieu]}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Thời gian bảo hành</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.thoigianbaohanh}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Khu vực kho</Form.Label>
                    <Form.Control
                      type="text"
                      value={khuvuckhoMap[product.khuvuckho]}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Form>
        ) : (
          <ProductVersionForm
            productVersions={productVersions}
            romMap={romMap}
            ramMap={ramMap}
            mausacMap={mausacMap}
            onClose={handlePreviousStep}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        {step === 1 ? (
          <>
            <Button variant="secondary" onClick={onClose}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleNextStep}>
              Xem cấu hình
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={handlePreviousStep}>
            Quay lại
          </Button>
        )}
      </Modal.Footer>
      {showProductVersionForm && (
        <ProductVersionForm
          productVersions={productVersions}
          romMap={romMap}
          ramMap={ramMap}
          mausacMap={mausacMap}
          onClose={() => setShowProductVersionForm(false)}
        />
      )}
    </Modal>
  );
};

export default ProductDetailForm;
