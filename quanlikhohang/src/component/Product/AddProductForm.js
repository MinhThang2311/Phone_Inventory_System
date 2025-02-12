import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa";

const AddProductForm = ({ show, handleClose }) => {
  const [heDieuHanhOptions, setHeDieuHanhOptions] = useState([]);
  const [thuongHieuOptions, setThuongHieuOptions] = useState([]);
  const [khuVucKhoOptions, setKhuVucKhoOptions] = useState([]);
  const [xuatXuOptions, setXuatXuOptions] = useState([]);
  const [ramOptions, setRAMOptions] = useState([]);
  const [romOptions, setROMOptions] = useState([]);
  const [mauSacOptions, setMauSacOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State để lưu trữ URL hình ảnh đã chọn

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [
          osResponse,
          ramResponse,
          romResponse,
          colorResponse,
          brandResponse,
          storageResponse,
          originResponse,
        ] = await Promise.all([
          fetch("http://localhost:5000/hedieuhanh"),
          fetch("http://localhost:5000/ram"),
          fetch("http://localhost:5000/rom"),
          fetch("http://localhost:5000/mausac"),
          fetch("http://localhost:5000/thuonghieu"),
          fetch("http://localhost:5000/khuvuckho"),
          fetch("http://localhost:5000/xuatxu"),
        ]);

        const osData = await osResponse.json();
        const ramData = await ramResponse.json();
        const romData = await romResponse.json();
        const colorData = await colorResponse.json();
        const brandData = await brandResponse.json();
        const storageData = await storageResponse.json();
        const originData = await originResponse.json();

        setHeDieuHanhOptions(Array.isArray(osData.data) ? osData.data : []);
        setRAMOptions(ramData);
        setROMOptions(romData);
        setMauSacOptions(colorData);
        setThuongHieuOptions(
          Array.isArray(brandData.data) ? brandData.data : []
        );
        setKhuVucKhoOptions(storageData);
        setXuatXuOptions(Array.isArray(originData.data) ? originData.data : []);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

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

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleVersionChange = (index, field, value) => {
    const updatedVersions = [...versions];
    updatedVersions[index][field] = value;
    setVersions(updatedVersions);
  };

  const handleAddVersion = () => {
    setVersions((prevVersions) => [
      ...prevVersions,
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

  const handleRemoveVersion = (index) => {
    const updatedVersions = versions.filter((_, idx) => idx !== index);
    setVersions(updatedVersions);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const fileURL = URL.createObjectURL(file); // Tạo URL cho hình ảnh đã chọn
      setImagePreview(fileURL); // Cập nhật state để hiển thị hình ảnh
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredVersions = versions
      .filter(
        (version) =>
          version.rom &&
          version.ram &&
          version.mausac &&
          version.gianhap &&
          version.giaxuat
      )
      .map((version) => ({
        ...version,
        masp: product.masp,
      }));
    const formData = new FormData();
    formData.append("tensp", product.tensp);
    formData.append("xuatxu", product.xuatxu);
    formData.append("chipxuly", product.chipxuly);
    formData.append("dungluongpin", product.dungluongpin);
    formData.append("kichthuocman", product.kichthuocman);
    formData.append("hedieuhanh", product.hedieuhanh);
    formData.append("phienbanhdh", product.phienbanhdh);
    formData.append("camerasau", product.camerasau);
    formData.append("cameratruoc", product.cameratruoc);
    formData.append("thoigianbaohanh", product.thoigianbaohanh);
    formData.append("thuonghieu", product.thuonghieu);
    formData.append("khuvuckho", product.khuvuckho);
    formData.append("soluongton", product.soluongton);
    formData.append("trangthai", product.trangthai);

    // Append the image file only if one is selected
    if (selectedFile) {
      formData.append("hinhanh", selectedFile);
    }

    formData.append("versions", JSON.stringify(filteredVersions));

    try {
      const response = await fetch(
        "http://localhost:5000/themsanphamvoiphienban",
        {
          method: "POST",
          body: formData, // Send as FormData
        }
      );
      alert("Product and versions added successfully");
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm Sản Phẩm Mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container>
            {/* Product Details */}
            <h4 className="mb-4">Thông Tin Sản Phẩm</h4>
            <Row>
              <Col md={6}>
                <Form.Group controlId="tensp">
                  <Form.Label>Tên Sản Phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    name="tensp"
                    value={product.tensp}
                    onChange={handleProductChange}
                    placeholder="Nhập tên sản phẩm"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="hinhanh">
                  <Form.Label>Hình Ảnh</Form.Label>
                  <Form.Control
                    type="file"
                    name="hinhanh"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="xuatxu">
                  <Form.Label>Xuất Xứ</Form.Label>
                  <Form.Control
                    as="select"
                    name="xuatxu"
                    value={product.xuatxu || ""}
                    onChange={handleProductChange}
                    required
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
              <Col md={6}>
                <Form.Group controlId="chipxuly">
                  <Form.Label>Chip Xử Lý</Form.Label>
                  <Form.Control
                    type="text"
                    name="chipxuly"
                    value={product.chipxuly}
                    onChange={handleProductChange}
                    placeholder="Chip xử lý"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="dungluongpin">
                  <Form.Label>Dung Lượng Pin</Form.Label>
                  <Form.Control
                    type="number"
                    name="dungluongpin"
                    value={product.dungluongpin}
                    onChange={handleProductChange}
                    placeholder="Dung lượng pin"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="kichthuocman">
                  <Form.Label>Kích Thước Màn</Form.Label>
                  <Form.Control
                    type="number"
                    name="kichthuocman"
                    value={product.kichthuocman}
                    onChange={handleProductChange}
                    placeholder="Kích thước màn hình (inch)"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="hedieuhanh">
                  <Form.Label>Hệ điều hành</Form.Label>
                  <Form.Control
                    as="select"
                    name="hedieuhanh"
                    value={product.hedieuhanh || ""}
                    onChange={handleProductChange}
                    required
                  >
                    <option value="">Chọn hệ điều hành</option>
                    {heDieuHanhOptions.map((os) => (
                      <option key={os.mahedieuhanh} value={os.mahedieuhanh}>
                        {os.tenhedieuhanh}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="phienbanhdh">
                  <Form.Label>Phiên Bản Hệ Điều Hành</Form.Label>
                  <Form.Control
                    type="text"
                    name="phienbanhdh"
                    value={product.phienbanhdh}
                    onChange={handleProductChange}
                    placeholder="Phiên bản hệ điều hành"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="camerasau">
                  <Form.Label>Camera Sau</Form.Label>
                  <Form.Control
                    type="text"
                    name="camerasau"
                    value={product.camerasau}
                    onChange={handleProductChange}
                    placeholder="Camera sau (MP)"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="cameratruoc">
                  <Form.Label>Camera Trước</Form.Label>
                  <Form.Control
                    type="text"
                    name="cameratruoc"
                    value={product.cameratruoc}
                    onChange={handleProductChange}
                    placeholder="Camera trước (MP)"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="thoigianbaohanh">
                  <Form.Label>Thời Gian Bảo Hành</Form.Label>
                  <Form.Control
                    type="text"
                    name="thoigianbaohanh"
                    value={product.thoigianbaohanh}
                    onChange={handleProductChange}
                    placeholder="Thời gian bảo hành"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="thuonghieu">
                  <Form.Label>Thương Hiệu</Form.Label>
                  <Form.Control
                    as="select"
                    name="thuonghieu"
                    value={product.thuonghieu || ""}
                    onChange={handleProductChange}
                    required
                  >
                    <option value="">Chọn Thương Hiệu</option>
                    {thuongHieuOptions.map((brand) => (
                      <option
                        key={brand.mathuonghieu}
                        value={brand.mathuonghieu}
                      >
                        {brand.tenthuonghieu}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="khuvuckho">
                  <Form.Label>Khu Vực Kho</Form.Label>
                  <Form.Control
                    as="select"
                    name="khuvuckho"
                    value={product.khuvuckho || ""}
                    onChange={handleProductChange}
                    required
                  >
                    <option value="">Chọn Khu Vực Kho</option>
                    {khuVucKhoOptions.map((kho) => (
                      <option key={kho.makhuvuc} value={kho.makhuvuc}>
                        {kho.tenkhuvuc}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Product Versions */}
            <h4 className="mt-4">Phiên Bản Sản Phẩm</h4>
            {versions.map((version, index) => (
              <div key={index} className="border p-3 mb-3 rounded">
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId={`rom-${index}`}>
                      <Form.Label>ROM</Form.Label>
                      <Form.Control
                        as="select"
                        value={version.rom}
                        onChange={(e) =>
                          handleVersionChange(index, "rom", e.target.value)
                        }
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
                    <Form.Group controlId={`ram-${index}`}>
                      <Form.Label>RAM</Form.Label>
                      <Form.Control
                        as="select"
                        value={version.ram}
                        onChange={(e) =>
                          handleVersionChange(index, "ram", e.target.value)
                        }
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
                    <Form.Group controlId={`mausac-${index}`}>
                      <Form.Label>Màu Sắc</Form.Label>
                      <Form.Control
                        as="select"
                        value={version.mausac}
                        onChange={(e) =>
                          handleVersionChange(index, "mausac", e.target.value)
                        }
                      >
                        <option value="">Chọn Màu Sắc</option>
                        {mauSacOptions.map((color) => (
                          <option key={color.mamau} value={color.mamau}>
                            {color.tenmau}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId={`gianhap-${index}`}>
                      <Form.Label>Giá Nhập</Form.Label>
                      <Form.Control
                        type="number"
                        value={version.gianhap}
                        onChange={(e) =>
                          handleVersionChange(index, "gianhap", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId={`giaxuat-${index}`}>
                      <Form.Label>Giá Xuất</Form.Label>
                      <Form.Control
                        type="number"
                        value={version.giaxuat}
                        onChange={(e) =>
                          handleVersionChange(index, "giaxuat", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveVersion(index)}
                      className="mt-4"
                    >
                      <FaTrash size={20} style={{ color: "white" }} />{" "}
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
            <Button variant="primary" onClick={handleAddVersion}>
              <FaPlus size={20} style={{ color: "white" }} />{" "}
              {/* Thêm icon vào nút */}
            </Button>

            {/* Submit Button */}
            <div className="mt-4 text-center">
              <Button variant="success" type="submit">
                Lưu Sản Phẩm
              </Button>
            </div>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductForm;
