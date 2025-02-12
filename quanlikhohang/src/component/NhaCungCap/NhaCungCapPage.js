import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Sidebar from "../Sidebar";
import "../../App.css";
import TopbarNhaCungCap from "./TopbarNhaCungCap";

const NhaCungCapPage = () => {
  const [nhaCungCapData, setnhaCungCapData] = useState([]);
  const [selectedNhaCungCapId, setSelectedNhaCungCapId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredNhaCungCapData = nhaCungCapData.filter((ncc) => {
    return (
      ncc.tennhacungcap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ncc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ncc.sdt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNhaCungCapData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredNhaCungCapData.length / itemsPerPage);

  useEffect(() => {
    fetch("http://localhost:5000/nhacungcap")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Mạng lỗi: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setnhaCungCapData(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []);

  const handleRowClick = (nhacungcap) => {
    setSelectedNhaCungCapId(nhacungcap.manhacungcap);
    console.log("Đã chọn mã ncc: ", nhacungcap.manhacungcap);
  };

  return (
    <div className="dashboard d-flex">
      <Sidebar />
      <div className="content">
        <TopbarNhaCungCap
          selectedNhaCungCapId={selectedNhaCungCapId}
          onSearch={handleSearch}
          nhaCungCapData={nhaCungCapData}
        />
        <div className="nha-cung-cap-page">
          <h2>Danh sách nhà cung cấp</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mã NCC</th>
                <th>Tên nhà cung cấp</th>
                <th>Địa chỉ</th>
                <th>Email</th>
                <th>Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((ncc) => (
                  <tr
                    key={ncc.manhacungcap}
                    onClick={() => handleRowClick(ncc)}
                    className={
                      selectedNhaCungCapId === ncc.manhacungcap
                        ? "table-primary"
                        : ""
                    }
                  >
                    <td>{ncc.manhacungcap}</td>
                    <td>{ncc.tennhacungcap}</td>
                    <td>{ncc.diachi}</td>
                    <td>{ncc.email}</td>
                    <td>{ncc.sdt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
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
    </div>
  );
};

export default NhaCungCapPage;
