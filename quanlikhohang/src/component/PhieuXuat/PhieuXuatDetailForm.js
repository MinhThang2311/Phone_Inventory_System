import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
const PDFContent = ({
  phieuXuatData,
  chiTietPhieuXuat,
  formatDateTime,
  formatCurrency,
}) => (
  <div>
    <Row>
      <Col md={12}>
        <h2 style={{ textAlign: "left" }}>
          Hệ thống quản lí điện thoại Thắng và Thành
        </h2>
        <h4 style={{ textAlign: "right" }}>{formatDateTime(new Date())}</h4>
        <h3>Thông tin Phiếu Xuất</h3>
        <p>
          <strong>Mã phiếu xuất:</strong> {phieuXuatData.maphieuxuat}
        </p>
        <p>
          <strong>Khách hàng:</strong> {phieuXuatData.khachhang} -{" "}
          <strong>Địa chỉ:</strong> {phieuXuatData.diachi}
        </p>
        <p>
          <strong>Người thực hiện:</strong> {phieuXuatData.nguoitao} -{" "}
          <strong>Mã nhân viên:</strong> {phieuXuatData.manv}
        </p>
        <p>
          <strong>Thời gian xuất:</strong>{" "}
          {formatDateTime(phieuXuatData.thoigian)}
        </p>
      </Col>
    </Row>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Phiên bản</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Tổng tiền</th>
        </tr>
      </thead>
      <tbody>
        {chiTietPhieuXuat.map((detail) => (
          <tr key={detail.masp}>
            <td>{detail.tensp}</td>
            <td>{detail.maphienbansp}</td>
            <td>{formatCurrency(detail.dongia)}</td>
            <td>{detail.soluong}</td>
            <td>{formatCurrency(detail.dongia * detail.soluong)}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="4" className="text-end">
            <strong>Tổng thành tiền:</strong>
          </td>
          <td>
            <strong>
              {formatCurrency(
                chiTietPhieuXuat.reduce(
                  (sum, item) => sum + item.dongia * item.soluong,
                  0
                )
              )}
            </strong>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

const PhieuXuatDetailForm = ({ show, handleClose, maphieuxuat }) => {
  const [chiTietPhieuXuat, setChiTietPhieuXuat] = useState([]);
  const [phieuXuatData, setPhieuXuatData] = useState({
    maphieuxuat: "",
    thoigian: "",
    khachhang: "",
    nguoitaophieuxuat: "",
    tongtien: "",
  });
  const [expandedRow, setExpandedRow] = useState(null);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  useEffect(() => {
    const fetchChiTietPhieuXuat = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/chiTietPhieuXuat/${maphieuxuat}`
        );
        const data = await response.json();
        if (data.success) {
          setChiTietPhieuXuat(data.data);
          setPhieuXuatData({
            maphieuxuat: data.data[0].maphieuxuat,
            thoigian: data.data[0].thoigian,
            khachhang: data.data[0].tenkhachhang,
            nguoitao: data.data[0].nhanvien,
            tongtien: data.data[0].tongtien,
            diachi: data.data[0].diachi,
            manv: data.data[0].ma_nhanvien, // Thêm mã nhân viên
          });
        }
      } catch (error) {
        console.error("Error fetching chi tiết phiếu xuất:", error);
      }
    };

    if (maphieuxuat) {
      fetchChiTietPhieuXuat();
    }
  }, [maphieuxuat]);

  const exportPDF = () => {
    const input = document.getElementById("pdf-content");

    input.style.display = "block"; // Make it visible for capturing

    setTimeout(() => {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 190; // width of the image in PDF
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("phieu_xuat.pdf");

        input.style.display = "none"; // Hide it again after capturing
      });
    }, 100); // Adjust the timeout as necessary
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết Phiếu Xuất</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={3}>
            <Form.Group controlId="maphieuxuat">
              <Form.Label>Mã phiếu xuất</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={phieuXuatData.maphieuxuat}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="nhanvien">
              <Form.Label>Nhân viên xuất</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={phieuXuatData.nguoitao}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="khachhang">
              <Form.Label>Khách hàng</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={phieuXuatData.khachhang}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="thoigian">
              <Form.Label>Thời gian tạo</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={formatDateTime(phieuXuatData.thoigian)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã SP</th>
                  <th>Tên SP</th>
                  <th>Cấu hình</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {chiTietPhieuXuat.map((detail, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleRowClick(index)}>
                      <td>{index + 1}</td>
                      <td>{detail.masp}</td>
                      <td>{detail.tensp}</td>
                      <td>{detail.cauhinh}</td>
                      <td>{formatCurrency(detail.dongia)}</td>
                      <td>{detail.soluong}</td>
                    </tr>
                    {expandedRow !== null && expandedRow === index && (
                      <tr>
                        <td colSpan="5">
                          <h5>Danh sách mã imei</h5>
                          <div
                            style={{
                              maxHeight: "100px",
                              overflowY: "scroll",
                              border: "1px solid #ddd",
                              padding: "5px",
                              borderRadius: "4px",
                            }}
                          >
                            {detail.maimei_list &&
                            detail.maimei_list.length > 0 ? (
                              detail.maimei_list
                                .split(",")
                                .map((imei, imeiIndex) => (
                                  <div key={imeiIndex}>
                                    {imeiIndex + 1}. {imei.trim()}
                                  </div>
                                ))
                            ) : (
                              <div>Không có mã IMEI nào.</div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                <tr>
                  <td colSpan="4" className="text-end">
                    <strong>Tổng tiền:</strong>
                  </td>
                  <td>
                    <strong>
                      {formatCurrency(
                        chiTietPhieuXuat.reduce(
                          (sum, item) => sum + item.dongia * item.soluong,
                          0
                        )
                      )}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" onClick={handleClose} className="mr-2">
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={exportPDF}>
            Xuất file PDF
          </Button>
        </div>

        <div
          id="pdf-content"
          style={{
            display: "none",
            position: "absolute",
            left: "-9999px",
          }}
        >
          <PDFContent
            phieuXuatData={phieuXuatData}
            chiTietPhieuXuat={chiTietPhieuXuat}
            formatDateTime={formatDateTime}
            formatCurrency={formatCurrency}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PhieuXuatDetailForm;
