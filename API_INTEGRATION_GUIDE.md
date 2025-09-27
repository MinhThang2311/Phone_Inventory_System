# 🔗 API Configuration Guide - Frontend to Backend

## 📋 **Port Configuration Summary:**
- **Frontend (React):** `http://localhost:3000` 
- **Backend (Node.js):** `http://localhost:5000` ✅ Running
- **Database (MySQL/XAMPP):** `localhost:3306` ✅ Connected

---

## 🚀 **Frontend API Calls Configuration**

### **1. Base URL Configuration**
Trong frontend, bạn cần cấu hình base URL để gọi đến backend:

```javascript
// src/config/api.js hoặc src/utils/api.js
const API_BASE_URL = 'http://localhost:5000';

export default API_BASE_URL;
```

### **2. Axios Configuration (Recommended)**
```javascript
// src/config/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
```

### **3. API Calls Examples**

#### **Old Style (Still Works):**
```javascript
// Sản phẩm
fetch('http://localhost:5000/sanpham')
fetch('http://localhost:5000/khachhang') 
fetch('http://localhost:5000/nhanvien')

// Hoặc với axios
axios.get('http://localhost:5000/sanpham')
axios.get('http://localhost:5000/khachhang')
```

#### **New Style (Recommended):**
```javascript
// Sản phẩm  
fetch('http://localhost:5000/api/products')
fetch('http://localhost:5000/api/customers')
fetch('http://localhost:5000/api/employees')

// Hoặc với axios
axios.get('http://localhost:5000/api/products')
axios.get('http://localhost:5000/api/customers')
```

---

## 🔧 **Complete Frontend API Service Example**

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const apiService = {
  // Products
  getProducts: () => axios.get(`${API_BASE_URL}/api/products`),
  getProduct: (id) => axios.get(`${API_BASE_URL}/api/products/${id}`),
  createProduct: (data) => axios.post(`${API_BASE_URL}/api/products/themsanphamvoiphienban`, data),
  updateProduct: (id, data) => axios.put(`${API_BASE_URL}/api/products/capnhat/${id}`, data),
  deleteProduct: (id) => axios.delete(`${API_BASE_URL}/api/products/${id}`),
  
  // Customers
  getCustomers: () => axios.get(`${API_BASE_URL}/api/customers`),
  getCustomer: (id) => axios.get(`${API_BASE_URL}/api/customers/${id}`),
  createCustomer: (data) => axios.post(`${API_BASE_URL}/api/customers`, data),
  updateCustomer: (id, data) => axios.put(`${API_BASE_URL}/api/customers/${id}`, data),
  deleteCustomer: (id) => axios.delete(`${API_BASE_URL}/api/customers/${id}`),
  
  // Employees
  getEmployees: () => axios.get(`${API_BASE_URL}/api/employees`),
  getEmployee: (id) => axios.get(`${API_BASE_URL}/api/employees/${id}`),
  updateEmployee: (id, data) => axios.put(`${API_BASE_URL}/api/employees/${id}`, data),
  
  // Warehouse
  getWarehouses: () => axios.get(`${API_BASE_URL}/api/warehouse/khuvuckho`),
  getInventory: (params) => axios.get(`${API_BASE_URL}/api/warehouse/tonkho`, { params }),
  
  // Auth
  login: (credentials) => axios.post(`${API_BASE_URL}/api/auth/taikhoan/login`, credentials),
  
  // Lookups
  getRAM: () => axios.get(`${API_BASE_URL}/api/lookups/ram`),
  getROM: () => axios.get(`${API_BASE_URL}/api/lookups/rom`),
  getColors: () => axios.get(`${API_BASE_URL}/api/lookups/mausac`),
  getBrands: () => axios.get(`${API_BASE_URL}/api/lookups/thuonghieu`),
};

export default apiService;
```

---

## 🛠 **Usage in React Components**

```javascript
// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import apiService from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProducts();
        setProducts(response.data.data || response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Products</h1>
      {products.map(product => (
        <div key={product.masp}>
          <h3>{product.tensp}</h3>
          <p>Price: {product.giaxuat}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
```

---

## ⚠️ **Common Issues & Solutions**

### **1. CORS Error**
Nếu gặp lỗi CORS, backend đã được cấu hình cors() middleware:
```javascript
app.use(cors()); // ✅ Already configured
```

### **2. Network Error**
- Đảm bảo backend đang chạy: `http://localhost:5000`
- Kiểm tra MySQL: `http://localhost:3306` (XAMPP)

### **3. 404 Not Found**
- Sử dụng đúng endpoints (xem list phía trên)
- Cả old và new endpoints đều work

---

## 📋 **Available Endpoints**

### **Legacy Endpoints (Still Work):**
- `GET /sanpham` - Lấy danh sách sản phẩm
- `GET /khachhang` - Lấy danh sách khách hàng  
- `GET /nhanvien` - Lấy danh sách nhân viên
- `GET /nhacungcap` - Lấy danh sách nhà cung cấp
- `GET /khuvuckho` - Lấy khu vực kho
- `GET /tonkho` - Lấy tồn kho

### **New Endpoints (Recommended):**
- `GET /api/products` - Quản lý sản phẩm
- `GET /api/customers` - Quản lý khách hàng
- `GET /api/employees` - Quản lý nhân viên  
- `GET /api/suppliers` - Quản lý nhà cung cấp
- `GET /api/warehouse` - Quản lý kho
- `GET /api/auth` - Xác thực
- `GET /api/lookups` - Dữ liệu tra cứu

---

## ✅ **Status Check**
- ✅ Backend Running: `http://localhost:5000`
- ✅ Database Connected: `MySQL on port 3306`  
- ✅ CORS Enabled: All origins allowed
- ✅ Legacy APIs: Backward compatible
- ✅ New APIs: Modern structure

**🚀 Frontend chỉ cần gọi đến `http://localhost:5000` với các endpoints trên!**