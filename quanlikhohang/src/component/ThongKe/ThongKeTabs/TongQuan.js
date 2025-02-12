import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { FaMobileAlt, FaUsers, FaUser } from "react-icons/fa";
import { Bar } from "react-chartjs-2";

const TongQuan = ({
  sanPhamCount,
  khachHangCount,
  nhanVienCount,
  chartDataTQ,
  thongKe8Ngay,
  formatDateTime,
}) => {
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <FaMobileAlt size={40} />
              <h5>Sản phẩm trong kho</h5>
              <p>{sanPhamCount}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <FaUsers size={40} />
              <h5>Khách hàng</h5>
              <p>{khachHangCount}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <FaUser size={40} />
              <h5>Nhân viên</h5>
              <p>{nhanVienCount}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h5>Biểu đồ doanh thu 8 ngày gần nhất</h5>
              {chartDataTQ.labels.length > 0 ? (
                <Bar
                  data={chartDataTQ}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Thống kê 8 ngày gần nhất",
                      },
                    },
                  }}
                />
              ) : (
                <p>Đang tải dữ liệu...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h5>Chi tiết doanh thu từng ngày</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th className="text-end">Vốn</th>
                    <th className="text-end">Doanh thu</th>
                    <th className="text-end">Lợi nhuận</th>
                  </tr>
                </thead>
                <tbody>
                  {thongKe8Ngay.map((item) => (
                    <tr key={item.ngay}>
                      <td>{formatDateTime(item.ngay)}</td>
                      <td className="text-end">
                        {item.von.toLocaleString()} VNĐ
                      </td>
                      <td className="text-end">
                        {item.doanhthu.toLocaleString()} VNĐ
                      </td>
                      <td className="text-end">
                        {item.loinhuan.toLocaleString()} VNĐ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TongQuan;
