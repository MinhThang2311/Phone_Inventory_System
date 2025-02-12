import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Row, Col, Spinner, Alert } from 'react-bootstrap';

const HeDieuHanhForm = () => {
    const [heDieuHanhData, setHeDieuHanhData] = useState([]);  // Ensure default is an array
    const [formData, setFormData] = useState({ mahedieuhanh: '', tenhedieuhanh: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    // Fetch dữ liệu hệ điều hành
    useEffect(() => {
        const fetchHeDieuHanh = async () => {
            try {
                const response = await fetch('http://localhost:5000/hedieuhanh-tt');
                const data = await response.json();
                // Ensure data is always an array
                setHeDieuHanhData(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (err) {
                setError('Có lỗi xảy ra khi tải dữ liệu');
                setLoading(false);
            }
        };
        fetchHeDieuHanh();
    }, []);

    // Handler cho form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Thêm hệ điều hành
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { tenhedieuhanh } = formData;

        try {
            const response = await fetch('http://localhost:5000/hedieuhanh-tt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tenhedieuhanh }),
            });

            const data = await response.json();
            if (response.ok) {
                // Sử dụng mã hệ điều hành (mahedieuhanh) từ phản hồi của API
                setHeDieuHanhData((prevData) => [
                    ...prevData,
                    { ...formData, mahedieuhanh: data.mahedieuhanh },
                ]);
                setFormData({ mahedieuhanh: '', tenhedieuhanh: '' });
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi thêm hệ điều hành');
        }
    };

    // Cập nhật hệ điều hành
    const handleUpdate = async () => {
        const { tenhedieuhanh } = formData;

        try {
            const response = await fetch(`http://localhost:5000/hedieuhanh-tt/${selectedId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tenhedieuhanh }),
            });

            const data = await response.json();
            if (response.ok) {
                setHeDieuHanhData((prevData) =>
                    prevData.map((item) =>
                        item.mahedieuhanh === selectedId ? { ...item, tenhedieuhanh } : item
                    )
                );
                setFormData({ mahedieuhanh: '', tenhedieuhanh: '' });
                setSelectedId(null);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi cập nhật hệ điều hành');
        }
    };

    // Xóa hệ điều hành
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/hedieuhanh-tt/${selectedId}`, { method: 'DELETE' });
            if (response.ok) {
                setHeDieuHanhData((prevData) => prevData.filter((item) => item.mahedieuhanh !== selectedId));
                setFormData({ mahedieuhanh: '', tenhedieuhanh: '' });
                setSelectedId(null);
            } else {
                setError('Có lỗi xảy ra khi xóa hệ điều hành');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi xóa hệ điều hành');
        }
    };

    // Xử lý tìm kiếm
    const filteredData = heDieuHanhData.filter((item) =>
        item.tenhedieuhanh.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            <h4 style={{ backgroundColor: "#007bff", color: "white", padding: "10px", borderRadius: "5px" }}>
                Quản Lý Hệ Điều Hành
            </h4>
            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm hệ điều hành..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã Hệ Điều Hành</th>
                        <th>Tên Hệ Điều Hành</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr
                            key={item.mahedieuhanh}
                            onClick={() => {
                                setSelectedId(item.mahedieuhanh);
                                setFormData(item);
                            }}
                            style={{
                                backgroundColor: selectedId === item.mahedieuhanh ? '#f5f5f5' : 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td>{item.mahedieuhanh}</td>
                            <td>{item.tenhedieuhanh}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    {/* Trường nhập mã hệ điều hành */}
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Mã Hệ Điều Hành"
                            name="mahedieuhanh"
                            value={formData.mahedieuhanh}
                            onChange={handleInputChange}
                        />
                    </Col>

                    {/* Trường nhập tên hệ điều hành */}
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Tên Hệ Điều Hành"
                            name="tenhedieuhanh"
                            value={formData.tenhedieuhanh}
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

export default HeDieuHanhForm;
