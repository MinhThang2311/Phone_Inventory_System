import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal, Spinner } from "react-bootstrap";
import Sidebar from "../Sidebar";
import ThuongHieuForm from "./ThuongHieuForm";
import XuatXuForm from "./XuatXuForm";
import HeDieuHanhForm from "./HeDieuHanhForm";
import RAMForm from "./RAMForm";
import ROMForm from "./ROMForm";
import MauSacForm from "./MauSacForm";
import "./CSS/ThuocTinhPage.css";

const ThuocTinhPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [thuocTinhData, setThuocTinhData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchThuocTinh = async () => {
      try {
        const response = await fetch("http://localhost:5000/thuoctinh");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setThuocTinhData(data); // Save data to state
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchThuocTinh();
  }, []);

  // Handler to show modal with the corresponding form
  const handleCardClick = async (form) => {
    setActiveForm(form);
    setShowModal(true);

    if (form === "xuatxu") {
      try {
        // Lấy dữ liệu xuất xứ từ API
        const response = await fetch("http://localhost:5000/xuatxu"); // Thay URL này bằng endpoint lấy danh sách xuất xứ
        const data = await response.json();

        // Nếu cần lấy một xuất xứ cụ thể (sửa), ta sẽ sử dụng id để tìm
        if (data.length > 0) {
          setSelectedData(data[0]); // Ví dụ lấy dữ liệu xuất xứ đầu tiên trong danh sách
        } else {
          setSelectedData(null); // Nếu không có dữ liệu, set về null
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu xuất xứ:", error);
      }
    }
  };

  // Handler to close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setActiveForm(null);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5">
        <p className="text-danger">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="thuoctinh d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <div className="content-container flex-grow-1 d-flex align-items-center justify-content-center">
        {/* Row chứa các card */}
        <Row className="justify-content-center w-100">
          <Col md={4} onClick={() => handleCardClick("thuonghieu")}>
            <Card className="text-center card-hover">
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/7253/7253231.png"
                    alt="Thương hiệu Icon"
                    style={{
                      width: "8em",
                      height: "8em",
                      marginRight: "10px",
                      verticalAlign: "middle",
                    }}
                  />
                  Thương hiệu
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} onClick={() => handleCardClick("xuatxu")}>
            <Card className="text-center card-hover">
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.freepik.com/512/234/234845.png"
                    alt="Xuất xứ Icon"
                    style={{
                      width: "8em",
                      height: "8em",
                      marginRight: "10px",
                      verticalAlign: "middle",
                    }}
                  />
                  Xuất xứ
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} onClick={() => handleCardClick("hedieuhanh")}>
            <Card className="text-center card-hover">
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/15/15476.png"
                    alt="Hệ điều hành Icon"
                    style={{
                      width: "8em",
                      height: "8em",
                      marginRight: "10px",
                      verticalAlign: "middle",
                    }}
                  />
                  Hệ điều hành
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} onClick={() => handleCardClick("ram")}>
            <Card className="text-center card-hover">
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2164/2164987.png"
                    alt="RAM Icon"
                    style={{
                      width: "8em",
                      height: "8em",
                      marginRight: "10px",
                      verticalAlign: "middle",
                    }}
                  />
                  RAM
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} onClick={() => handleCardClick("rom")}>
            <Card className="text-center card-hover">
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2009/2009548.png"
                    alt="ROM Icon"
                    style={{
                      width: "8em",
                      height: "8em",
                      marginRight: "10px",
                      verticalAlign: "middle",
                    }}
                  />
                  ROM
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} onClick={() => handleCardClick("mausac")}>
            <Card className="text-center card-hover">
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://www.freeiconspng.com/thumbs/color-icons/colors-icon-4.png"
                    alt="Color Icon"
                    style={{
                      width: "8em",
                      height: "8em",
                      marginRight: "10px",
                      verticalAlign: "middle",
                    }}
                  />
                  Màu sắc
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal to show forms */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Thông Tin Thuộc Tính</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {activeForm === "thuonghieu" && <ThuongHieuForm />}
            {activeForm === "xuatxu" && (
              <XuatXuForm selectedData={selectedData} />
            )}
            {activeForm === "hedieuhanh" && <HeDieuHanhForm />}
            {activeForm === "ram" && <RAMForm />}
            {activeForm === "rom" && <ROMForm />}
            {activeForm === "mausac" && <MauSacForm />}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ThuocTinhPage;
