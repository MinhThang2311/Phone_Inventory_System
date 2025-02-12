import React, { useEffect, useState } from "react";
import { Card, Table, Form, Button } from "react-bootstrap";

const TonKho = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("dauky"); // "dauky", "giuaKy", "cuoiky"
  const [selectedProduct, setSelectedProduct] = useState("");
  const [filteredTonKhoData, setFilteredTonKhoData] = useState([]);
  const [products, setProducts] = useState([]); // State để lưu danh sách sản phẩm

  useEffect(() => {
    // Fetch danh sách sản phẩm từ API /sanpham
    fetch("http://localhost:5000/sanpham")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data); // Lưu danh sách sản phẩm vào state
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleFilter = () => {
    // Gửi yêu cầu đến backend với năm, kỳ và sản phẩm đã chọn
    fetch(
      `http://localhost:5000/tonkho?year=${selectedYear}&period=${selectedPeriod}&product=${selectedProduct}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFilteredTonKhoData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <Card>
      <Card.Body>
        <h5>Chi tiết tồn kho</h5>
        <Form>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Form.Group
              controlId="formYear"
              style={{ flex: 1, marginRight: "1rem" }}
            >
              <Form.Label>Chọn Năm</Form.Label>
              <Form.Control
                as="select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Chọn năm</option>
                {[2020, 2021, 2022, 2023, 2024].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId="formPeriod"
              style={{ flex: 1, marginRight: "1rem" }}
            >
              <Form.Label>Chọn Kỳ</Form.Label>
              <Form.Control
                as="select"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="dauky">Đầu Kỳ (Tháng 1 - Tháng 6)</option>
                <option value="giuaKy">Giữa Kỳ (Tháng 7 - Tháng 9)</option>
                <option value="cuoiky">Cuối Kỳ (Tháng 10 - Tháng 12)</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProduct" style={{ flex: 1 }}>
              <Form.Label>Chọn Sản Phẩm</Form.Label>
              <Form.Control
                as="select"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Tất cả sản phẩm</option>
                {products.map((item) => (
                  <option key={item.masp} value={item.masp}>
                    {item.tensp} {/* Hiển thị tên sản phẩm */}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <Button variant="primary" onClick={handleFilter}>
            Lọc
          </Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Sản Phẩm</th>
              <th>Tên Sản Phẩm </th>
              {selectedPeriod === "dauky" && (
                <>
                  <th>Tồn Đầu Kỳ</th>
                  <th>Nhập Trong Kỳ</th>
                  <th>Xuất Trong Kỳ</th>
                </>
              )}
              {selectedPeriod === "giuaKy" && (
                <>
                  <th>Tồn Giữa Kỳ</th>
                  <th>Nhập Trong Kỳ</th>
                  <th>Xuất Trong Kỳ</th>
                </>
              )}
              {selectedPeriod === "cuoiky" && (
                <>
                  <th>Tồn Cuối Kỳ</th>
                  <th>Nhập Trong Kỳ</th>
                  <th>Xuất Trong Kỳ</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTonKhoData.map((item, index) => (
              <tr key={item.masp}>
                <td>{index + 1}</td>
                <td>{item.masp}</td>
                <td>{item.tensp}</td>
                {selectedPeriod === "dauky" && (
                  <>
                    <td>{item.tondauky}</td>
                    <td>{item.nhap_trong_ky}</td>
                    <td>{item.xuat_trong_ky}</td>
                  </>
                )}
                {selectedPeriod === "giuaKy" && (
                  <>
                    <td>{item.tongiuaKy}</td>
                    <td>{item.nhap_trong_ky}</td>
                    <td>{item.xuat_trong_ky}</td>
                  </>
                )}
                {selectedPeriod === "cuoiky" && (
                  <>
                    <td>{item.toncuoiky}</td>
                    <td>{item.nhap_trong_ky}</td>
                    <td>{item.xuat_trong_ky}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TonKho;
