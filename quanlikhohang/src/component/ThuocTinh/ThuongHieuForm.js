import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Row, Col, Spinner, Alert } from 'react-bootstrap';

const ThuongHieuForm = () => {
    const [thuongHieuData, setThuongHieuData] = useState([]);
    const [formData, setFormData] = useState({ mathuonghieu: '', tenthuonghieu: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    // Fetch dữ liệu thương hiệu
    useEffect(() => {
        const fetchThuongHieu = async () => {
            try {
                const response = await fetch('http://localhost:5000/thuonghieu-tt');
                const data = await response.json();
                setThuongHieuData(data);
                setLoading(false);
            } catch (err) {
                setError('Có lỗi xảy ra khi tải dữ liệu');
                setLoading(false);
            }
        };
        fetchThuongHieu();
    }, []);

    // Handler cho form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Thêm thương hiệu
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { tenthuonghieu } = formData;

        try {
            const response = await fetch('http://localhost:5000/thuonghieu-tt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tenthuonghieu }),
            });

            const data = await response.json();
            if (response.ok) {
                // Sử dụng mã thương hiệu (mathuonghieu) từ phản hồi của API
                setThuongHieuData((prevData) => [
                    ...prevData,
                    { ...formData, mathuonghieu: data.mathuonghieu },  // Lấy mathuonghieu từ data trả về
                ]);
                setFormData({ mathuonghieu: '', tenthuonghieu: '' });
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi thêm thương hiệu');
        }
    };


    // Cập nhật thương hiệu
    const handleUpdate = async () => {
        const { tenthuonghieu } = formData;

        try {
            const response = await fetch(`http://localhost:5000/thuonghieu-tt/${selectedId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tenthuonghieu }),
            });

            const data = await response.json();
            if (response.ok) {
                setThuongHieuData((prevData) =>
                    prevData.map((item) => (item.mathuonghieu === selectedId ? { ...item, tenthuonghieu } : item))
                );
                setFormData({ mathuonghieu: '', tenthuonghieu: '' });
                setSelectedId(null);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi cập nhật thương hiệu');
        }
    };

    // Xóa thương hiệu
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/thuonghieu-tt/${selectedId}`, { method: 'DELETE' });
            if (response.ok) {
                setThuongHieuData((prevData) => prevData.filter((item) => item.mathuonghieu !== selectedId));
                setFormData({ mathuonghieu: '', tenthuonghieu: '' });
                setSelectedId(null);
            } else {
                setError('Có lỗi xảy ra khi xóa thương hiệu');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi xóa thương hiệu');
        }
    };

    // Xử lý tìm kiếm
    const filteredData = thuongHieuData.filter((item) =>
        item.tenthuonghieu.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            <h4 style={{ backgroundColor: "#007bff", color: "white", padding: "10px", borderRadius: "5px" }}>
                Quản Lý Thương Hiệu
            </h4>
            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm thương hiệu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã Thương Hiệu</th>
                        <th>Tên Thương Hiệu</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr
                            key={item.mathuonghieu}
                            onClick={() => {
                                setSelectedId(item.mathuonghieu);
                                setFormData(item);
                            }}
                            style={{
                                backgroundColor: selectedId === item.mathuonghieu ? '#f5f5f5' : 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td>{item.mathuonghieu}</td>
                            <td>{item.tenthuonghieu}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    {/* Trường nhập mã thương hiệu */}
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Mã Thương Hiệu"
                            name="mathuonghieu"
                            value={formData.mathuonghieu}
                            onChange={handleInputChange}
                        />
                    </Col>

                    {/* Trường nhập tên thương hiệu */}
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Tên Thương Hiệu"
                            name="tenthuonghieu"
                            value={formData.tenthuonghieu}
                            onChange={handleInputChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Button type="submit" variant="primary" disabled={selectedId}>
                            Thêm
                        </Button>
                        <Button
                            variant="warning"
                            onClick={handleUpdate}
                            disabled={!selectedId}
                            className="ml-2"
                        >
                            Sửa
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            disabled={!selectedId}
                            className="ml-2"
                        >
                            Xóa
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ThuongHieuForm;
