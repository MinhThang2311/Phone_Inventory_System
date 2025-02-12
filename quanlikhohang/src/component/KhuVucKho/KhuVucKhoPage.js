import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Sidebar from "../Sidebar";
import "../../App.css";
import TopbarKhuVucKho from "./TopbarKhuVucKho";
import ProductList from "./ProductList";

const KhuVucKhoPage = () => {
  const [khuvuckhoData, setKhuvuckhoData] = useState([]);
  const [selectedKhuVucKho, setSelectedKhuVucKho] = useState(null);
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 10;
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/khuvuckho");
      if (!response.ok) {
        throw new Error("Mạng lỗi hoặc không tìm thấy dữ liệu");
      }
      const data = await response.json();
      setKhuvuckhoData(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = async (khuvuckho) => {
    setSelectedKhuVucKho(khuvuckho);
    try {
      const response = await fetch(
        `http://localhost:5000/sanphamtheokhuvuc?khuvuc=${khuvuckho.makhuvuc}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const products = await response.json();
      setProductList(products);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = khuvuckhoData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(khuvuckhoData.length / itemsPerPage);
  return (
    <div className="dashboard d-flex">
      <Sidebar />
      <div
        className="content"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div style={{ flex: 1 }}>
          <TopbarKhuVucKho
            selectedKhuVucKho={selectedKhuVucKho}
            onReloadData={fetchData}
            khuvuckhoData={khuvuckhoData}
          />
          <div className="khu-vuc-kho-page">
            <h2>Danh sách khu vực kho</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Mã kho</th>
                  <th>Tên khu vực</th>
                  <th>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {khuvuckhoData.length > 0 ? (
                  khuvuckhoData.map((khuvuckho) => (
                    <tr
                      key={khuvuckho.makhuvuc}
                      onClick={() => handleRowClick(khuvuckho)}
                      className={
                        selectedKhuVucKho?.makhuvuc === khuvuckho.makhuvuc
                          ? "table-active"
                          : ""
                      }
                    >
                      <td>{khuvuckho.makhuvuc}</td>
                      <td>{khuvuckho.tenkhuvuc}</td>
                      <td>{khuvuckho.ghichu}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      Không có dữ liệu để hiển thị.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Pagination className="justify-content-center">
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
          </div>
        </div>

        {/* Product List will show only if a Khu Vuc Kho is selected */}
        {selectedKhuVucKho && (
          <div
            className="product-list"
            style={{
              width: "300px",
              backgroundColor: "#f0f0f0",
              padding: "20px",
            }}
          >
            <h5>Danh sách sản phẩm đang có ở khu vực</h5>
            <ProductList sanpham={productList} />
          </div>
        )}
      </div>
    </div>
  );
};

export default KhuVucKhoPage;
