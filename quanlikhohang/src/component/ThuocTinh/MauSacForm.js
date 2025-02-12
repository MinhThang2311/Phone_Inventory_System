import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Row, Col, Spinner, Alert } from 'react-bootstrap';

const MauSacForm = () => {
    const [mauSacData, setMauSacData] = useState([]);
    const [formData, setFormData] = useState({ mamau: '', tenmau: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    // Fetch dữ liệu màu sắc
    useEffect(() => {
        const fetchMauSac = async () => {
            try {
                const response = await fetch('http://localhost:5000/mausac-tt');
                const data = await response.json();
                setMauSacData(data);
                setLoading(false);
            } catch (err) {
                setError('Có lỗi xảy ra khi tải dữ liệu');
                setLoading(false);
            }
        };
        fetchMauSac();
    }, []);

    // Handler cho form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Thêm màu sắc
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { tenmau } = formData;

        try {
            const response = await fetch('http://localhost:5000/mausac-tt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tenmau }),
            });

            const data = await response.json();
            if (response.ok) {
                // Sử dụng mã màu sắc (mamau) từ phản hồi của API
                setMauSacData((prevData) => [
                    ...prevData,
                    { ...formData, mamau: data.mamau },  // Lấy mamau từ data trả về
                ]);
                setFormData({ mamau: '', tenmau: '' });
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi thêm màu sắc');
        }
    };

    // Cập nhật màu sắc
    const handleUpdate = async () => {
        const { tenmau } = formData;

        try {
            const response = await fetch(`http://localhost:5000/mausac-tt/${selectedId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tenmau }),
            });

            const data = await response.json();
            if (response.ok) {
                setMauSacData((prevData) =>
                    prevData.map((item) => (item.mamau === selectedId ? { ...item, tenmau } : item))
                );
                setFormData({ mamau: '', tenmau: '' });
                setSelectedId(null);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi cập nhật màu sắc');
        }
    };

    // Xóa màu sắc
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/mausac-tt/${selectedId}`, { method: 'DELETE' });
            if (response.ok) {
                setMauSacData((prevData) => prevData.filter((item) => item.mamau !== selectedId));
                setFormData({ mamau: '', tenmau: '' });
                setSelectedId(null);
            } else {
                setError('Có lỗi xảy ra khi xóa màu sắc');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi xóa màu sắc');
        }
    };

    // Xử lý tìm kiếm
    const filteredData = mauSacData.filter((item) =>
        item.tenmau.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            <h4 style={{ backgroundColor: "#007bff", color: "white", padding: "10px", borderRadius: "5px" }}>
                Quản Lý Màu Sắc
            </h4>
            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm màu sắc..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã Màu</th>
                        <th>Tên Màu</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr
                            key={item.mamau}
                            onClick={() => {
                                setSelectedId(item.mamau);
                                setFormData(item);
                            }}
                            style={{
                                backgroundColor: selectedId === item.mamau ? '#f5f5f5' : 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td>{item.mamau}</td>
                            <td>{item.tenmau}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    {/* Trường nhập mã màu sắc */}
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Mã Màu"
                            name="mamau"
                            value={formData.mamau}
                            onChange={handleInputChange}
                        />
                    </Col>

                    {/* Trường nhập tên màu sắc */}
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Tên Màu"
                            name="tenmau"
                            value={formData.tenmau}
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

export default MauSacForm;
