import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import {
  Table,
  Card,
  Row,
  Col,
  Tabs,
  Tab,
  Form,
  Nav,
  Button,
} from "react-bootstrap";
import { FaMobileAlt, FaUsers, FaUser } from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  registerables,
} from "chart.js";
import "./CSS/ThongKe.css";
import TongQuan from "./ThongKeTabs/TongQuan";
import TonKho from "./ThongKeTabs/TonKho";
import DoanhThu from "./ThongKeTabs/DoanhThu";
import NhaCungCap from "./ThongKeTabs/NhaCungCap";
import KhachHang from "./ThongKeTabs/KhachHang";
import BinhQuan from "./ThongKeTabs/BinhQuan";
// Register the required components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);
ChartJS.register(...registerables);

const ThongKe = () => {
  const [sanPhamCount, setSanPhamCount] = useState(0);
  const [khachHangCount, setKhachHangCount] = useState(0);
  const [nhanVienCount, setNhanVienCount] = useState(0);
  const [khachHangData, setKhachHangData] = useState([]);
  const [nhaCungCapData, setNhaCungCapData] = useState([]);
  const [averagePrice, setAveragePrice] = useState(0);
  const [selectedKhachHangId, setSelectedKhachHangId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermNCC, setSearchTermNCC] = useState("");
  const [tonKhoData, setTonKhoData] = useState([]);
  const [data, setData] = useState([]);
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year} `;
  };
  const [chartDataTQ, setChartDataTQ] = useState({
    labels: [],
    datasets: [],
  });
  const [thongKe8Ngay, setThongKe8Ngay] = useState([]);

  const [chartMonthlyData, setchartMonthlyData] = useState([]);
  const [chartMonthlyConfig, setchartMonthlyConfig] = useState({
    labels: [],
    datasets: [],
  });
  const [chartDaylyData, setchartDaylyData] = useState([]);
  const [chartDaylyConfig, setchartDaylyConfig] = useState({
    labels: [],
    datasets: [],
  });
  const [chartYearlyData, setchartYearlyData] = useState([]);
  const [chartYearlyConfig, setchartYearlyConfig] = useState({
    labels: [],
    datasets: [],
  });

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statistics, setStatistics] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [binhQuanData, setBinhQuanData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const KhachHangTable = () => {
    const [khachhang, setKhachhang] = useState([]);
    const [selectedKhachHangId, setSelectedKhachHangId] = useState(null);
  };
  const fetchDataByDateRange = () => {
    // Kiểm tra nếu từ ngày và đến ngày không được chọn
    if (!fromDate || !toDate) {
      console.warn("Vui lòng chọn cả từ ngày và đến ngày.");
      return;
    }

    // Đảm bảo ngày được định dạng đúng (nếu cần)
    const formattedFromDate = new Date(fromDate).toISOString().split("T")[0];
    const formattedToDate = new Date(toDate).toISOString().split("T")[0];

    // Gửi yêu cầu đến backend với khoảng thời gian từ ngày đến ngày
    fetch(
      `http://localhost:5000/doanhthu-daytoday?from=${formattedFromDate}&to=${formattedToDate}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Kiểm tra xem dữ liệu có hợp lệ không và cập nhật trạng thái
        if (
          data.chiphi !== undefined &&
          data.doanhthu !== undefined &&
          data.loinhuan !== undefined
        ) {
          setStatistics(data);
        } else {
          console.error("Dữ liệu không hợp lệ:", data);
        }
      })
      .catch((error) => {
        // Xử lý lỗi khi fetch không thành công
        console.error("Error fetching data:", error);
      });
  };
  // Lấy dữ liệu từ API
  useEffect(() => {
    // Hàm để lấy dữ liệu sản phẩm
    const fetchSanPhamCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/sanphamcount");
        const data = await response.json();
        setSanPhamCount(data.soluongsanpham);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng sản phẩm:", error);
      }
    };

    // Hàm để lấy dữ liệu khách hàng
    const fetchKhachHangCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/khachhangcount");
        const data = await response.json();
        setKhachHangCount(data.soluongkhachhang);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng khách hàng:", error);
      }
    };

    // Hàm để lấy dữ liệu nhân viên
    const fetchNhanVienCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/nhanviencount");
        const data = await response.json();
        setNhanVienCount(data.soluongnhanvien);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng nhân viên:", error);
      }
    };

    // Hàm để lấy dữ liệu khách hàng
    const fetchKhachHangData = async () => {
      try {
        const response = await fetch("http://localhost:5000/khachhangdata"); // Gọi đến API mới
        const data = await response.json();
        setKhachHangData(data);

        // Tính toán giá bình quân
        const totalRevenue = data.reduce(
          (acc, khachhang) => acc + (khachhang.tongtien || 0),
          0
        );
        const totalQuantity = data.reduce(
          (acc, khachhang) => acc + (khachhang.soluongphieuxuat || 0),
          0
        );
        const average = totalQuantity ? totalRevenue / totalQuantity : 0;

        setAveragePrice(average);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
      }
    };

    // Hàm để lấy dữ liệu nhà cung cấp
    const fetchNhaCungCapData = async () => {
      try {
        const response = await fetch("http://localhost:5000/nhacungcapdata");
        const data = await response.json();
        setNhaCungCapData(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhà cung cấp:", error);
      }
    };

    const fetchTonKhoData = async () => {
      try {
        const response = await fetch("http://localhost:5000/tonkho");
        const result = await response.json();

        // Chuyển đổi dữ liệu để phù hợp với bảng
        const transformedData = result.map((item) => ({
          masp: item.masp,
          tensp: item.tensp,
          tondauky: item.tondauky || 0, // Tồn đầu kỳ từ API
          nhaptrongky: item.nhap_trong_ky || 0, // Nhập trong kỳ, mặc định là 0 nếu không có
          xuattrongky: item.xuat_trong_ky || 0, // Xuất trong kỳ, mặc định là 0 nếu không có
          toncuoiky: item.toncuoiky || 0, // Tồn cuối kỳ, mặc định là 0 nếu không có
        }));

        setTonKhoData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchThongKe8Ngay = async () => {
      try {
        const response = await fetch("http://localhost:5000/thongke-8ngay");
        const result = await response.json();

        console.log("Fetched data:", result); // Kiểm tra dữ liệu

        if (Array.isArray(result)) {
          // Khởi tạo labels và dữ liệu cho từng dataset với giá trị mặc định
          const labels =
            result.length > 0
              ? result.map((item) => formatDateTime(item.ngay) ?? "Ngày")
              : ["Ngày"];
          const doanhthuData =
            result.length > 0 ? result.map((item) => item.doanhthu ?? 0) : [0];
          const vonData =
            result.length > 0 ? result.map((item) => item.von ?? 0) : [0];
          const loinhuanData =
            result.length > 0 ? result.map((item) => item.loinhuan ?? 0) : [0];

          setThongKe8Ngay(result);
          setChartDataTQ({
            labels,
            datasets: [
              {
                label: "Doanh thu",
                data: doanhthuData,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
              {
                label: "Vốn",
                data: vonData,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
              },
              {
                label: "Lợi nhuận",
                data: loinhuanData,
                backgroundColor: "rgba(153, 102, 255, 0.6)",
              },
            ],
          });
        } else {
          console.error("Result is not an array:", result);
          // Thiết lập dữ liệu mặc định khi không có dữ liệu
          setThongKe8Ngay([]);
          setChartDataTQ({
            labels: ["Ngày"],
            datasets: [
              {
                label: "Doanh thu",
                data: [0],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
              {
                label: "Vốn",
                data: [0],
                backgroundColor: "rgba(255, 99, 132, 0.6)",
              },
              {
                label: "Lợi nhuận",
                data: [0],
                backgroundColor: "rgba(153, 102, 255, 0.6)",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchYearlyData = async () => {
      try {
        const response = await fetch("http://localhost:5000/doanhthu-nam");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log(data); // In ra dữ liệu để kiểm tra

        // Khởi tạo dữ liệu cho tất cả các năm (2022 - 2026)
        const allYearData = [2022, 2023, 2024, 2025, 2026].map((year) => ({
          year: year,
          total_von: 0,
          total_doanhthu: 0,
          loi_nhuan: 0,
        }));

        // Cập nhật dữ liệu cho các năm đã có
        data.forEach((item) => {
          const yearIndex = allYearData.findIndex(
            (yearData) => yearData.year === item.year
          );
          if (yearIndex !== -1) {
            allYearData[yearIndex] = item; // Lưu lại dữ liệu cho năm tương ứng
          }
        });

        const chartConfig = {
          labels: allYearData.map((item) => `Năm ${item.year}`), // Nhãn cho tất cả các năm
          datasets: [
            {
              label: "Vốn",
              data: allYearData.map((item) => item.total_von || 0),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
            {
              label: "Doanh thu",
              data: allYearData.map((item) => item.total_doanhthu || 0),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Lợi nhuận",
              data: allYearData.map((item) => item.loi_nhuan || 0),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
          ],
        };

        setchartYearlyConfig(chartConfig); // Cập nhật cấu hình biểu đồ
      } catch (error) {
        console.error("Error fetching yearly data:", error);
      }
    };

    const fetchMonthlyData = async () => {
      try {
        const response = await fetch("http://localhost:5000/doanhthu-thang");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log(data); // In ra dữ liệu để kiểm tra

        // Khởi tạo dữ liệu cho tất cả các tháng
        const allMonthsData = Array.from({ length: 12 }, (_, i) => ({
          month: i + 1,
          total_von: 0,
          total_doanhthu: 0,
          loi_nhuan: 0,
        }));

        // Cập nhật dữ liệu cho các tháng đã có
        data.forEach((item) => {
          allMonthsData[item.month - 1] = item; // Lưu lại dữ liệu cho tháng tương ứng
        });

        const chartConfig = {
          labels: allMonthsData.map((item) => `Tháng ${item.month}`), // Nhãn cho tất cả các tháng
          datasets: [
            {
              label: "Vốn",
              data: allMonthsData.map((item) => item.total_von || 0),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
            {
              label: "Doanh thu",
              data: allMonthsData.map((item) => item.total_doanhthu || 0),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Lợi nhuận",
              data: allMonthsData.map((item) => item.loi_nhuan || 0),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
          ],
        };

        setchartMonthlyConfig(chartConfig); // Cập nhật cấu hình biểu đồ
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    const fetchDaylyData = async () => {
      try {
        const response = await fetch("http://localhost:5000/doanhthu-ngay");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log(data); // In ra dữ liệu để kiểm tra

        // Khởi tạo dữ liệu cho tất cả các khoảng ngày trong tháng (1-3, 4-6, ...)
        const allDayRangesData = [
          "1-3",
          "4-6",
          "7-9",
          "10-12",
          "13-15",
          "16-18",
          "19-21",
          "22-24",
          "25-27",
          "28-30",
        ].map((range) => ({
          range,
          total_von: 0,
          total_doanhthu: 0,
          loi_nhuan: 0,
        }));

        // Cập nhật dữ liệu cho các khoảng ngày đã có
        data.forEach((item) => {
          const rangeIndex = Math.floor((item.day - 1) / 3); // Tính chỉ số khoảng ngày
          allDayRangesData[rangeIndex] = {
            ...allDayRangesData[rangeIndex],
            total_von: allDayRangesData[rangeIndex].total_von + item.total_cost,
            total_doanhthu:
              allDayRangesData[rangeIndex].total_doanhthu + item.total_revenue,
            loi_nhuan:
              allDayRangesData[rangeIndex].loi_nhuan + item.total_profit,
          };
        });

        const chartConfig = {
          labels: allDayRangesData.map((item) => item.range), // Nhãn cho các khoảng ngày
          datasets: [
            {
              label: "Vốn",
              data: allDayRangesData.map((item) => item.total_von || 0),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
            {
              label: "Doanh thu",
              data: allDayRangesData.map((item) => item.total_doanhthu || 0),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Lợi nhuận",
              data: allDayRangesData.map((item) => item.loi_nhuan || 0),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
          ],
        };

        setchartDaylyConfig(chartConfig); // Cập nhật cấu hình biểu đồ
      } catch (error) {
        console.error("Error fetching daily data:", error);
      }
    };

    const fetchDataByDateRange = () => {
      // Kiểm tra nếu từ ngày và đến ngày không được chọn
      if (!fromDate || !toDate) {
        console.warn("Vui lòng chọn cả từ ngày và đến ngày.");
        return;
      }

      // Đảm bảo ngày được định dạng đúng (nếu cần)
      const formattedFromDate = new Date(fromDate).toISOString().split("T")[0];
      const formattedToDate = new Date(toDate).toISOString().split("T")[0];

      // Gửi yêu cầu đến backend với khoảng thời gian từ ngày đến ngày
      fetch(
        `http://localhost:5000/doanhthu-daytoday?from=${formattedFromDate}&to=${formattedToDate}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Kiểm tra xem dữ liệu có hợp lệ không và cập nhật trạng thái
          if (
            data.chiphi !== undefined &&
            data.doanhthu !== undefined &&
            data.loinhuan !== undefined
          ) {
            setStatistics(data);
          } else {
            console.error("Dữ liệu không hợp lệ:", data);
          }
        })
        .catch((error) => {
          // Xử lý lỗi khi fetch không thành công
          console.error("Error fetching data:", error);
        });
    };
    const fetchBinhQuanData = async () => {
      try {
        const response = await fetch("http://localhost:5000/binhquan-mathang");
        const data = await response.json();
        setBinhQuanData(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bình quân mặt hàng:", error);
      }
    };
    // Gọi các hàm trên
    fetchSanPhamCount();
    fetchKhachHangCount();
    fetchNhanVienCount();
    fetchKhachHangData();
    fetchNhaCungCapData();
    fetchTonKhoData();
    fetchThongKe8Ngay();
    fetchYearlyData();
    fetchMonthlyData();
    fetchDaylyData();
    fetchDataByDateRange();
    fetchBinhQuanData();
  }, []);

  // Lọc dữ liệu khách hàng dựa trên từ khóa tìm kiếm
  const filteredKhachHangData = khachHangData.filter((khachhang) =>
    khachhang.tenkhachhang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lọc dữ liệu nhà cung cấp dựa trên từ khóa tìm kiếm
  const filteredNhaCungCapData = nhaCungCapData.filter((ncc) =>
    ncc.tennhacungcap.toLowerCase().includes(searchTermNCC.toLowerCase())
  );

  const handleSelectedKhachHang = (makh) => {
    setSelectedKhachHangId(makh);
    console.log("Khách hàng đã chọn:", makh);
  };

  const handleRowClick = (makh) => {
    setSelectedKhachHangId(makh);
    handleSelectedKhachHang(makh);
  };

  return (
    <div className="thongke-container d-flex">
      <Sidebar />
      <div className="content flex-grow-1">
        <Tabs defaultActiveKey=" tongquan" id="thongke-tabs" className="mb-3">
          <Tab eventKey="tongquan" title="Tổng quan">
            <TongQuan
              sanPhamCount={sanPhamCount}
              khachHangCount={khachHangCount}
              nhanVienCount={nhanVienCount}
              chartDataTQ={chartDataTQ}
              thongKe8Ngay={thongKe8Ngay}
              formatDateTime={formatDateTime}
            />
          </Tab>
          <Tab eventKey="tonkho" title="Tồn kho">
            <TonKho tonKhoData={tonKhoData} />
          </Tab>
          <Tab eventKey="doanhthu" title="Doanh thu">
            <DoanhThu
              chartYearlyConfig={chartYearlyConfig}
              chartMonthlyConfig={chartMonthlyConfig}
              chartDaylyConfig={chartDaylyConfig}
              chartYearlyData={chartYearlyData} // Thêm dòng này
              statistics={statistics}
              fetchError={fetchError}
              fromDate={fromDate}
              toDate={toDate}
              setFromDate={setFromDate}
              setToDate={setToDate}
              fetchDataByDateRange={fetchDataByDateRange}
            />
          </Tab>
          <Tab eventKey="nhacungcap" title="Nhà cung cấp">
            <NhaCungCap
              nhaCungCapData={nhaCungCapData}
              searchTermNCC={searchTermNCC}
              setSearchTermNCC={setSearchTermNCC}
            />
          </Tab>
          <Tab eventKey="khachhang" title="Khách hàng">
            <KhachHang
              filteredKhachHangData={filteredKhachHangData}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </Tab>
          <Tab eventKey="binhquan" title="Giá Bình Quân">
            <BinhQuan binhQuanData={binhQuanData} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ThongKe;
