import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Table,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";

const ProductImeiDetailForm = ({ show, handleClose, masp }) => {
  const [chiTietImei, setChiTietImei] = useState([]);
  const [selectedConfiguration, setSelectedConfiguration] = useState(null);
  const [configurations, setConfigurations] = useState([]);
  const [filterStatus, setFilterStatus] = useState(""); // Lọc trạng thái
  const [searchImei, setSearchImei] = useState(""); // Tìm kiếm mã IMEI
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const rowsPerPage = 5; // Số dòng mỗi trang

  useEffect(() => {
    const fetchChiTietImei = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/truyVanMaImei/${masp}`
        );
        const data = await response.json();
        if (data.success) {
          setChiTietImei(data.data);
          const uniqueConfigs = Array.from(
            new Map(
              data.data.map((detail) => [detail.maphienbansp, detail])
            ).values()
          );
          setConfigurations(uniqueConfigs);
        }
      } catch (error) {
        console.error("Error fetching chi tiết Imei:", error);
      }
    };

    if (masp) {
      fetchChiTietImei();
    }
  }, [masp]);

  const handleConfigurationSelect = (maphienbansp) => {
    setSelectedConfiguration(maphienbansp);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchImei(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Lọc danh sách dựa trên cấu hình, trạng thái và tìm kiếm
  const filteredImei = chiTietImei.filter((detail) => {
    const matchesConfiguration =
      !selectedConfiguration || detail.maphienbansp === selectedConfiguration;
    const matchesStatus =
      filterStatus === ""
        ? true
        : filterStatus === "1"
        ? detail.tinhtrang === 1
        : detail.tinhtrang === 0;
    const matchesSearch =
      !searchImei ||
      detail.maimei.toLowerCase().includes(searchImei.toLowerCase());

    return matchesConfiguration && matchesStatus && matchesSearch;
  });

  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredImei.slice(indexOfFirstRow, indexOfLastRow);

  // Tổng số trang
  const totalPages = Math.ceil(filteredImei.length / rowsPerPage);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết DS Imei</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Chọn cấu hình</Form.Label>
              <Form.Control
                as="select"
                value={selectedConfiguration || ""}
                onChange={(e) => handleConfigurationSelect(e.target.value)}
              >
                <option value="" disabled>
                  -- Chọn cấu hình --
                </option>
                {configurations.map((config, index) => (
                  <option key={index} value={config.maphienbansp}>
                    {config.cauhinh}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Lọc trạng thái</Form.Label>
              <Form.Control
                as="select"
                value={filterStatus}
                onChange={handleFilterChange}
              >
                <option value="">-- Tất cả --</option>
                <option value="1">Tồn kho</option>
                <option value="0">Đã bán</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Tìm mã IMEI</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mã IMEI"
                value={searchImei}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Imei</th>
                  <th>Mã phiếu nhập</th>
                  <th>Mã phiếu xuất</th>
                  <th>Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.maimei}</td>
                    <td>{detail.maphieunhap}</td>
                    <td>
                      {detail.maphieuxuat
                        ? detail.maphieuxuat
                        : "Chưa xuất kho"}
                    </td>
                    <td>
                      {detail.tinhtrang === 1
                        ? "Tồn kho"
                        : detail.tinhtrang === 0
                        ? "Đã bán"
                        : "Không xác định"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {filteredImei.length > rowsPerPage && (
              <Pagination className="justify-content-center mt-3">
                {[...Array(totalPages).keys()].map((page) => (
                  <Pagination.Item
                    key={page + 1}
                    active={page + 1 === currentPage}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" onClick={handleClose} className="mr-2">
            Hủy bỏ
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductImeiDetailForm;
