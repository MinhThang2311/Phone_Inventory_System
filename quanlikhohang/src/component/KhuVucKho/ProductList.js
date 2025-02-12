import React from "react";
import { Card } from "react-bootstrap";
import "./CSS/ProductList.css";

const ProductList = ({ sanpham = [] }) => {
  const baseUrl = "http://localhost:5000/uploads/";

  return (
    <div className="product-list">
      {sanpham.length === 0 ? (
        <p>Không có sản phẩm trong khu vực này.</p>
      ) : (
        sanpham.map((sp) => (
          <Card key={sp.masp} className="product-card">
            <Card.Img
              variant="top"
              src={baseUrl + sp.hinhanh}
              alt={sp.tensp}
              style={{ width: "100px" }}
            />
            <Card.Body>
              <Card.Title>{sp.tensp}</Card.Title>
              <Card.Text>Số lượng: {sp.soluongton}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default ProductList;
