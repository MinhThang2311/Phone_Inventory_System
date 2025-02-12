import React from "react";
import { Modal, Button, Row, Col, Form, Alert, Card } from "react-bootstrap";
import "./CSS/ProductDetailForm.css";

const ProductVersionForm = ({
  productVersions,
  romMap,
  ramMap,
  mausacMap,
  onClose,
}) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Phiên Bản Sản Phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {productVersions && productVersions.length > 0 ? (
          productVersions.map((version, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>Phiên bản {index + 1}</Card.Title>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>ROM</Form.Label>
                      <Form.Control
                        type="text"
                        value={romMap[version.rom]}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>RAM</Form.Label>
                      <Form.Control
                        type="text"
                        value={ramMap[version.ram]}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Màu sắc</Form.Label>
                      <Form.Control
                        type="text"
                        value={mausacMap[version.mausac]}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Giá xuất</Form.Label>
                      <Form.Control
                        type="text"
                        value={formatCurrency(version.giaxuat)}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Giá nhập</Form.Label>
                      <Form.Control
                        type="text"
                        value={formatCurrency(version.gianhap)}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert variant="warning">Không có phiên bản sản phẩm nào.</Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Quay lại
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductVersionForm;
