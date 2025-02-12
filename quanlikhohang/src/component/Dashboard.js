import React, { useState } from "react"; // Nhập useState để quản lý trạng thái
import Sidebar from "./Sidebar";
import TopbarProduct from "./Product/TopbarProduct";
import ProductTable from "./Product/ProductTable";
import "../App.css";

function Dashboard() {
  const [selectedProductId, setSelectedProductId] = useState(null); // State để lưu mã sản phẩm được chọn
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu giá trị tìm kiếm

  const handleSelectProduct = (masp) => {
    setSelectedProductId(masp); // Cập nhật mã sản phẩm được chọn
  };
  const handleSearch = (term) => {
    setSearchTerm(term); // Cập nhật giá trị tìm kiếm
  };
  return (
    <div className="dashboard d-flex">
      <Sidebar />
      <div className="content">
        <TopbarProduct
          selectedProductId={selectedProductId}
          onSearch={handleSearch}
        />
        <div className="product-table">
          <ProductTable
            onSelectProduct={handleSelectProduct}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
