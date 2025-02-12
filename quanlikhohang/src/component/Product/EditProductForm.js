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

const ProductEditForm = ({ masp, onClose, show, onSave }) => {
  const [product, setProduct] = useState({
    tensp: "",
    hinhanh: "",
    xuatxu: "",
    chipxuly: "",
    dungluongpin: "",
    kichthuocman: "",
    hedieuhanh: "",
    phienbanhdh: "",
    camerasau: "",
    cameratruoc: "",
    thoigianbaohanh: "",
    thuonghieu: "",
    khuvuckho: "",
    soluongton: 0,
    trangthai: 1,
  });
  const [productVersion, setProductVersion] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [heDieuHanhOptions, setHeDieuHanhOptions] = useState([]);
  const [thuongHieuOptions, setThuongHieuOptions] = useState([]);
  const [khuVucKhoOptions, setKhuVucKhoOptions] = useState([]);
  const [xuatXuOptions, setXuatXuOptions] = useState([]);
  const [ramOptions, setRAMOptions] = useState([]);
  const [romOptions, setROMOptions] = useState([]);
  const [mauSacOptions, setMauSacOptions] = useState([]);
  const [versions, setVersions] = useState([
    {
      masp: "",
      rom: "",
      ram: "",
      mausac: "",
      gianhap: "",
      giaxuat: "",
      soluongton: 0,
      trangthai: 1,
    },
  ]);
  useEffect(() => {
    const fetchOptions = async () => {
      const osResponse = await fetch("http://localhost:5000/hedieuhanh");
      const osData = await osResponse.json();
      setHeDieuHanhOptions(Array.isArray(osData.data) ? osData.data : []);

      const ramOptions = await fetch("http://localhost:5000/ram");
      const ramData = await ramOptions.json();
      setRAMOptions(ramData);

      const romOptions = await fetch("http://localhost:5000/rom");
      const romData = await romOptions.json();
      setROMOptions(romData);

      const mauSacOptions = await fetch("http://localhost:5000/mausac");
      const mauSacData = await mauSacOptions.json();
      setMauSacOptions(mauSacData);

      const brandResponse = await fetch("http://localhost:5000/thuonghieu");
      const brandData = await brandResponse.json();
      setThuongHieuOptions(Array.isArray(brandData.data) ? brandData.data : []);

      const storageResponse = await fetch("http://localhost:5000/khuvuckho");
      const storageData = await storageResponse.json();
      setKhuVucKhoOptions(storageData);

      const madeinResponse = await fetch("http://localhost:5000/xuatxu");
      const madeinData = await madeinResponse.json();
      setXuatXuOptions(Array.isArray(madeinData.data) ? madeinData.data : []);
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
          if (data.success) {
            setProductVersion(data.data);
            setVersions(data.data); // Cập nhật versions với dữ liệu phiên bản
          } else {
            setProductVersion(null);
          }
        } catch (error) {
          console.error("Error fetching product version:", error);
          setProductVersion(null);
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
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const filteredVersions = versions.filter(
      (v) => v.rom && v.ram && v.mausac && v.gianhap && v.giaxuat
    );
    const formData = new FormData();
    if (selectedFile) {
      formData.append("hinhanh", selectedFile);
    } else {
      // Nếu không có hình ảnh mới, gửi tên hình ảnh cũ
      formData.append("hinhanh", product.hinhanh);
    }
    Object.keys(product).forEach((key) => formData.append(key, product[key]));
    formData.append(
      "versions",
      JSON.stringify(
        filteredVersions.map((version) => ({
          ...version,
          maphienbansp: version.maphienbansp, // Đảm bảo rằng maphienbansp được bao gồm
        }))
      )
    );

    try {
      const response = await fetch(
        `http://localhost:5000/chinhsuasanphamvaphienban/${masp}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("Product and versions updated successfully");
        onClose();
      } else {
        alert(result.error || "Error updating product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const imageUrl = product.hinhanh
    ? `http://localhost:5000/uploads/${product.hinhanh}`
    : "https://via.placeholder.com/150";

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") setSelectedFile(files[0]);
    else setProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleRemoveVersion = (index) => {
    setVersions((prev) => prev.filter((_, i) => i !== index));
  };
  const handleVersionChange = (index, e) => {
    const { name, value } = e.target;
    setVersions((prev) =>
      prev.map((version, i) =>
        i === index ? { ...version, [name]: value } : version
      )
    );
  };
  const handleAddVersion = () => {
    setVersions((prev) => [
      ...prev,
      {
        rom: "",
        ram: "",
        mausac: "",
        gianhap: "",
        giaxuat: "",
        soluongton: 0,
        trangthai: 1,
      },
    ]);
  };
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh Sửa Sản Phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Thay đổi hình ảnh</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    name="tensp"
                    value={product.tensp}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Xuất Xứ</Form.Label>
                  <Form.Control
                    as="select"
                    name="xuatxu"
                    value={product.xuatxu}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn Xuất Xứ</option>
                    {xuatXuOptions.map((xx) => (
                      <option key={xx.maxuatxu} value={xx.maxuatxu}>
                        {xx.tenxuatxu}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Chip xử lý</Form.Label>
                  <Form.Control
                    type="text"
                    name="chipxuly"
                    value={product.chipxuly}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Dung lượng pin</Form.Label>
                  <Form.Control
                    type="text"
                    name="dungluongpin"
                    value={product.dungluongpin}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Kích thước màn</Form.Label>
                  <Form.Control
                    type="text"
                    name="kichthuocman"
                    value={product.kichthuocman}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Hệ điều hành</Form.Label>
                  <Form.Control
                    as="select"
                    name="hedieuhanh"
                    value={product.hedieuhanh}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn hệ điều hành </option>
                    {heDieuHanhOptions.map((hdh) => (
                      <option key={hdh.mahedieuhanh} value={hdh.mahedieuhanh}>
                        {hdh.tenhedieuhanh}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Phiên bản hệ điều hành</Form.Label>
                  <Form.Control
                    type="text"
                    name="phienbanhdh"
                    value={product.phienbanhdh}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Camera trước</Form.Label>
                  <Form.Control
                    type="text"
                    name="cameratruoc"
                    value={product.cameratruoc}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Camera sau</Form.Label>
                  <Form.Control
                    type="text"
                    name="camerasau"
                    value={product.camerasau}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Thương hiệu </Form.Label>
                  <Form.Control
                    as="select"
                    name="thuonghieu"
                    value={product.thuonghieu}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn Xuất Xứ</option>
                    {thuongHieuOptions.map((th) => (
                      <option key={th.mathuonghieu} value={th.mathuonghieu}>
                        {th.tenthuonghieu}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Thời gian bảo hành</Form.Label>
                  <Form.Control
                    type="text"
                    name="thoigianbaohanh"
                    value={product.thoigianbaohanh}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Khu vực kho </Form.Label>
                  <Form.Control
                    as="select"
                    name="khuvuckho"
                    value={product.khuvuckho}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn Xuất Xứ</option>
                    {khuVucKhoOptions.map((kv) => (
                      <option key={kv.makhuvuc} value={kv.makhuvuc}>
                        {kv.tenkhuvuc}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Các thông tin sản phẩm khác tương tự */}

            <h5 className="mt-4">Phiên Bản Sản Phẩm</h5>
            {versions.map((version, index) => (
              <Row key={index} className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>ROM</Form.Label>
                    <Form.Control
                      as="select"
                      name="rom"
                      value={version.rom}
                      onChange={(e) => handleVersionChange(index, e)}
                    >
                      <option value="">Chọn ROM</option>
                      {romOptions.map((rom) => (
                        <option key={rom.madlrom} value={rom.madlrom}>
                          {rom.kichthuocrom}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>RAM</Form.Label>
                    <Form.Control
                      as="select"
                      name="ram"
                      value={version.ram}
                      onChange={(e) => handleVersionChange(index, e)}
                    >
                      <option value="">Chọn RAM</option>
                      {ramOptions.map((ram) => (
                        <option key={ram.madlram} value={ram.madlram}>
                          {ram.kichthuocram}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Màu sắc</Form.Label>
                    <Form.Control
                      as="select"
                      name="mausac"
                      value={version.mausac}
                      onChange={(e) => handleVersionChange(index, e)}
                    >
                      <option value="">Chọn Màu Sắc</option>
                      {mauSacOptions.map((mausac) => (
                        <option key={mausac.mamau} value={mausac.mamau}>
                          {mausac.tenmau}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Giá nhập</Form.Label>
                    <Form.Control
                      type="text"
                      name="gianhap"
                      value={version.gianhap}
                      onChange={(e) => handleVersionChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Giá xuất</Form.Label>
                    <Form.Control
                      type="text"
                      name="giaxuat"
                      value={version.giaxuat}
                      onChange={(e) => handleVersionChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            ))}
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductEditForm;
