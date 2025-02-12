import React, { useState } from "react";
import {
  Card,
  Tabs,
  Tab,
  Table,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";

const DoanhThu = ({
  chartYearlyConfig,
  chartMonthlyConfig,
  chartDaylyConfig,
  statistics,
  fetchError,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  fetchDataByDateRange,
}) => {
  const [startYear, setStartYear] = useState(2022); // Năm bắt đầu
  const [endYear, setEndYear] = useState(2026); // Năm kết thúc
  const [yearlyData, setYearlyData] = useState(null); // Dữ liệu doanh thu theo năm
  const [yearlyDetails, setYearlyDetails] = useState([]); // Chi tiết doanh thu theo năm
  const [selectedYear, setSelectedYear] = useState(2024); // Năm được chọn cho thống kê từng tháng
  const [selectedMonth, setSelectedMonth] = useState(1); // Tháng được chọn
  const [monthlyData, setMonthlyData] = useState(null); // Dữ liệu doanh thu theo tháng
  const [monthlyDetails, setMonthlyDetails] = useState([]); // Chi tiết doanh thu theo
  const [dailyData, setDailyData] = useState(null); // Dữ liệu doanh thu theo ngày
  const [dailyDetails, setDailyDetails] = useState([]); // Chi tiết doanh thu theo ngày
  const fetchYearlyData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doanhthu-nam?startYear=${startYear}&endYear=${endYear}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const allYears = [];
      for (let year = startYear; year <= endYear; year++) {
        const yearData = data.find((item) => item.year === year) || {
          year,
          total_von: 0,
          total_doanhthu: 0,
          loi_nhuan: 0,
        };
        allYears.push(yearData);
      }
      // Cập nhật dữ liệu cho biểu đồ
      const chartConfig = {
        labels: allYears.map((item) => `Năm ${item.year}`),
        datasets: [
          {
            label: "Vốn",
            data: data.map((item) => item.total_von || 0),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
          {
            label: "Doanh thu",
            data: data.map((item) => item.total_doanhthu || 0),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Lợi nhuận",
            data: data.map((item) => item.loi_nhuan || 0),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      };
      setYearlyData(chartConfig); // Cập nhật dữ liệu biểu đồ
      setYearlyDetails(allYears); // Cập nhật chi tiết doanh thu
    } catch (error) {
      console.error("Error fetching yearly data:", error);
    }
  };
  const fetchMonthlyData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doanhthu-thang?year=${selectedYear}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Cập nhật dữ liệu cho biểu đồ
      const chartConfig = {
        labels: data.map((item) => `Tháng ${item.month}`),
        datasets: [
          {
            label: "Vốn",
            data: data.map((item) => item.total_von || 0),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
          {
            label: "Doanh thu",
            data: data.map((item) => item.total_doanhthu || 0),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Lợi nhuận",
            data: data.map((item) => item.loi_nhuan || 0),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      };
      setMonthlyData(chartConfig); // Cập nhật dữ liệu biểu đồ
      setMonthlyDetails(data); // Cập nhật chi tiết doanh thu theo tháng
    } catch (error) {
      console.error("Error fetching monthly data:", error);
    }
  };
  const fetchDailyData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doanhthu-ngay?year=${selectedYear}&month=${selectedMonth}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Cập nhật dữ liệu cho biểu đồ
      const chartConfig = {
        labels: data.map((item) => `Ngày ${item.day}`),
        datasets: [
          {
            label: "Tổng Chi Phí",
            data: data.map((item) => item.total_cost || 0),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
          {
            label: "Tổng Doanh Thu",
            data: data.map((item) => item.total_revenue || 0),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Lợi Nhuận",
            data: data.map((item) => item.total_profit || 0),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      };
      setDailyData(chartConfig); // Cập nhật dữ liệu biểu đồ
      setDailyDetails(data); // Cập nhật chi tiết doanh thu theo ngày
    } catch (error) {
      console.error("Error fetching daily data:", error);
    }
  };

  const exportToExcel = () => {
    // Tạo một workbook
    const wb = XLSX.utils.book_new();

    // Chuyển đổi dữ liệu chi tiết doanh thu thành định dạng sheet
    const ws = XLSX.utils.json_to_sheet(
      yearlyDetails.map((item) => ({
        Năm: item.year,
        Vốn: item.total_von,
        DoanhThu: item.total_doanhthu,
        LoiNhuan: item.loi_nhuan,
      }))
    );

    // Thêm sheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, "DoanhThu");

    // Xuất file Excel
    XLSX.writeFile(wb, `DoanhThu_${startYear}-${endYear}.xlsx`);
  };
  return (
    <Card>
      <Card.Body>
        <Tabs defaultActiveKey="theonam" id="tab-doanh-thu">
          <Tab eventKey="theonam" title="Thống kê theo năm">
            <Row className="align-items-center mb-3">
              <Col xs={6} md={4}>
                <Form.Group controlId="formStartYear">
                  <Form.Label>Từ năm:</Form.Label>
                  <Form.Control
                    type="number"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    min="2022"
                    max="2026"
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group controlId="formEndYear">
                  <Form.Label>Đến năm:</Form.Label>
                  <Form.Control
                    type="number"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    min="2022"
                    max="2026"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Button
                  variant="primary"
                  onClick={fetchYearlyData}
                  className="mt-4"
                >
                  Thống kê
                </Button>
                <Button
                  variant="success"
                  onClick={exportToExcel}
                  className="mt-4 ms-2"
                >
                  Xuất Excel
                </Button>
              </Col>
            </Row>

            {yearlyData ? (
              <Bar
                data={yearlyData}
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Năm",
                      },
                    },
                    y: {
                      beginAtZero: true,
                      max: 1_000_000_000,
                      title: {
                        display: true,
                        text: "Giá trị (VNĐ)",
                      },
                      ticks: {
                        callback: (value) =>
                          value.toLocaleString("vi-VN") + " VNĐ",
                      },
                    },
                  },
                }}
              />
            ) : (
              <p>Đang tải dữ liệu...</p>
            )}
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <h5>Chi tiết doanh thu theo năm</h5>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Năm</th>
                          <th className="text-end">Tổng Doanh Thu</th>
                          <th className="text-end">Tổng Vốn</th>
                          <th className="text-end">Lợi Nhuận</th>
                        </tr>
                      </thead>
                      <tbody>
                        {yearlyDetails.map((item) => (
                          <tr key={item.year}>
                            <td>{item.year}</td>
                            <td className="text-end">
                              {item.total_von.toLocaleString("vi-VN") || 0} VNĐ
                            </td>
                            <td className="text-end">
                              {item.total_doanhthu.toLocaleString("vi-VN") || 0}{" "}
                              VNĐ
                            </td>
                            <td className="text-end">
                              {item.loi_nhuan.toLocaleString("vi-VN") || 0} VNĐ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="tungthang" title="Thống kê từng tháng trong năm">
            <Row className="align-items-center mb-3">
              <Col xs={6} md={4}>
                <Form.Group controlId="formSelectYear">
                  <Form.Label>Chọn năm:</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Button
                  variant="primary"
                  onClick={fetchMonthlyData}
                  className=" mt-4"
                >
                  Thống kê
                </Button>
              </Col>
            </Row>
            {monthlyData ? (
              <Bar
                data={monthlyData}
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      title: {
                        display: true,
                      },
                      ticks: {
                        autoSkip: false, // Hiển thị tất cả các nhãn
                      },
                    },
                    y: {
                      beginAtZero: true,
                      max: 1_000_000_000,
                      title: {
                        display: true,
                        text: "Giá trị (VNĐ)",
                      },
                      ticks: {
                        callback: (value) =>
                          value.toLocaleString("vi-VN") + " VNĐ",
                      },
                    },
                  },
                }}
              />
            ) : (
              <p>Đang tải dữ liệu...</p>
            )}
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <h5>Chi tiết doanh thu tháng theo năm</h5>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Tháng</th>
                          <th className="text-end">Tổng Doanh Thu</th>
                          <th className="text-end">Tổng Vốn</th>
                          <th className="text-end">Lợi Nhuận</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyDetails.map((item) => (
                          <tr key={item.month}>
                            <td>Tháng {item.month}</td>
                            <td className="text-end">
                              {item.total_von.toLocaleString("vi-VN") || 0} VNĐ
                            </td>
                            <td className="text-end">
                              {item.total_doanhthu.toLocaleString("vi-VN") || 0}{" "}
                              VNĐ
                            </td>
                            <td className="text-end">
                              {item.loi_nhuan.toLocaleString("vi-VN") || 0} VNĐ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="tungay" title="Thống kê từng ngày trong tháng">
            <Row className="align-items-center mb-3">
              <Col xs={6} md={4}>
                <Form.Group controlId="formSelectYear">
                  <Form.Label>Chọn năm:</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value=" 2026">2026</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group controlId="formSelectMonth">
                  <Form.Label>Chọn tháng:</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {[...Array(12).keys()].map((month) => (
                      <option key={month + 1} value={month + 1}>
                        {month + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Button
                  variant="primary"
                  onClick={fetchDailyData}
                  className="mt-4"
                >
                  Thống kê
                </Button>
              </Col>
            </Row>
            {dailyData ? (
              <Bar
                data={dailyData}
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Ngày",
                      },
                      ticks: {
                        autoSkip: false,
                      },
                    },
                    y: {
                      beginAtZero: true,
                      max: 1_000_000_000,
                      title: {
                        display: true,
                        text: "Giá trị (VNĐ)",
                      },
                      ticks: {
                        callback: (value) =>
                          value.toLocaleString("vi-VN") + " VNĐ",
                      },
                    },
                  },
                }}
              />
            ) : (
              <p>Đang tải dữ liệu...</p>
            )}
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <h5>Chi tiết doanh thu theo ngày</h5>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Ngày</th>
                          <th className="text-end">Tổng Chi Phí</th>
                          <th className="text-end">Tổng Doanh Thu</th>
                          <th className="text-end">Lợi Nhuận</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dailyDetails.map((item) => (
                          <tr key={item.day}>
                            <td>{item.day}</td>
                            <td className="text-end">
                              {(item.total_cost ?? 0).toLocaleString("vi-VN")}{" "}
                              VNĐ
                            </td>
                            <td className="text-end">
                              {(item.total_revenue ?? 0).toLocaleString(
                                "vi-VN"
                              )}{" "}
                              VNĐ
                            </td>
                            <td className="text-end">
                              {(item.total_profit ?? 0).toLocaleString("vi-VN")}{" "}
                              VNĐ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default DoanhThu;
