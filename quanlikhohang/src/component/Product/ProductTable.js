import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";

const ProductTable = ({ onSelectProduct, searchTerm }) => {
  const [sanpham, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [thuonghieuMap, setThuongHieuMap] = useState({});
  const [hedieuhanhMap, setHeDieuHanhMap] = useState({});
  const [xuatxuMap, setXuatXuMap] = useState({});
  const [khuvuckhoMap, setKhuVucKhoMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 10; // Số sản phẩm trên mỗi trang
  const [filteredProducts, setFilteredProducts] = useState([]); // State để lưu sản phẩm đã lọc

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sản phẩm
        const productResponse = await fetch("http://localhost:5000/sanpham");
        if (!productResponse.ok) {
          throw new Error(`HTTP error! Status: ${productResponse.status}`);
        }
        const productData = await productResponse.json();
        setProducts(productData.data);
        // console.log(productData);

        // Fetch thương hiệu
        const thuonghieuResponse = await fetch(
          "http://localhost:5000/thuonghieu"
        );
        const thuonghieuData = await thuonghieuResponse.json();

        const thuonghieuMap = Array.isArray(thuonghieuData.data)
          ? thuonghieuData.data.reduce((map, thuonghieu) => {
              map[thuonghieu.mathuonghieu] = thuonghieu.tenthuonghieu;
              return map;
            }, {})
          : {};

        // Fetch hệ điều hành
        const hedieuhanhResponse = await fetch(
          "http://localhost:5000/hedieuhanh"
        );
        const hedieuhanhData = await hedieuhanhResponse.json();
        const hedieuhanhMap = Array.isArray(hedieuhanhData.data)
          ? hedieuhanhData.data.reduce((map, hedieuhanh) => {
              map[hedieuhanh.mahedieuhanh] = hedieuhanh.tenhedieuhanh;
              return map;
            }, {})
          : {};

        // Fetch xuất xứ
        const xuatxuResponse = await fetch("http://localhost:5000/xuatxu");
        const xuatxuData = await xuatxuResponse.json();
        const xuatxuMap = Array.isArray(xuatxuData.data)
          ? xuatxuData.data.reduce((map, xuatxu) => {
              map[xuatxu.maxuatxu] = xuatxu.tenxuatxu;
              return map;
            }, {})
          : {};

        // Fetch khu vực kho
        const khuvuckhoResponse = await fetch(
          "http://localhost:5000/khuvuckho"
        );
        const khuvuckhoData = await khuvuckhoResponse.json();
        const khuvuckhoMap = Array.isArray(khuvuckhoData)
          ? khuvuckhoData.reduce((map, khuvuckho) => {
              map[khuvuckho.makhuvuc] = khuvuckho.tenkhuvuc;
              return map;
            }, {})
          : {};

        setThuongHieuMap(thuonghieuMap);
        setHeDieuHanhMap(hedieuhanhMap);
        setXuatXuMap(xuatxuMap);
        setKhuVucKhoMap(khuvuckhoMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Filter products based on searchTerm
    const filtered = sanpham.filter(
      (item) =>
        item.tensp.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.masp.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page on search
  }, [searchTerm, sanpham]);

  // Tính toán dữ liệu hiển thị cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  // Tổng số trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleRowClick = (masp) => {
    setSelectedProductId(masp);
    onSelectProduct(masp);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng tồn</th>
            <th>Thương hiệu</th>
            <th>Hệ điều hành</th>
            <th>Kích thước màn</th>
            <th>Chip xử lý</th>
            <th>Dung lượng pin</th>
            <th>Xuất xứ</th>
            <th>Khu vực kho</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr
              key={item.masp}
              onClick={() => handleRowClick(item.masp)}
              className={selectedProductId === item.masp ? "table-primary" : ""}
            >
              <td>{item.masp}</td>
              <td>{item.tensp}</td>
              <td>{item.soluongton}</td>
              <td>{thuonghieuMap[item.thuonghieu]}</td>
              <td>{hedieuhanhMap[item.hedieuhanh] || "Không xác định"}</td>
              <td>{item.kichthuocman}</td>
              <td>{item.chipxuly}</td>
              <td>{item.dungluongpin}</td>
              <td>{xuatxuMap[item.xuatxu]}</td>
              <td>{khuvuckhoMap[item.khuvuckho] || "N/A"}</td>
            </tr>
          ))}
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
  );
};

export default ProductTable;
