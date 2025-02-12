import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Row, Col, Spinner, Alert } from 'react-bootstrap';

const XuatXuForm = () => {
    const [xuatXuData, setXuatXuData] = useState([]); // Dữ liệu xuất xứ
    const [formData, setFormData] = useState({ maxuatxu: '', tenxuatxu: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    // Fetch dữ liệu xuất xứ
    useEffect(() => {
        const fetchXuatXu = async () => {
            try {
                const response = await fetch('http://localhost:5000/xuatxu-tt');
                const data = await response.json();
                setXuatXuData(data);
                setLoading(false);
            } catch (err) {
                setError('Có lỗi xảy ra khi tải dữ liệu');
                setLoading(false);
            }
        };
        fetchXuatXu();
    }, []);

    // Handler cho form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Thêm xuất xứ
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { tenxuatxu } = formData;

        try {
            const response = await fetch('http://localhost:5000/xuatxu-tt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tenxuatxu }),
            });

            const data = await response.json();
            if (response.ok) {
                // Sử dụng mã xuất xứ (maxuatxu) từ phản hồi của API
                setXuatXuData((prevData) => [
                    ...prevData,
                    { ...formData, maxuatxu: data.maxuatxu },  // Lấy maxuatxu từ data trả về
                ]);
                setFormData({ maxuatxu: '', tenxuatxu: '' });
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi thêm xuất xứ');
        }
    };

    // Cập nhật xuất xứ
    const handleUpdate = async () => {
        const { tenxuatxu } = formData;

        try {
            const response = await fetch(`http://localhost:5000/xuatxu-tt/${selectedId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tenxuatxu }),
            });

            const data = await response.json();
            if (response.ok) {
                setXuatXuData((prevData) =>
                    prevData.map((item) => (item.maxuatxu === selectedId ? { ...item, tenxuatxu } : item))
                );
                setFormData({ maxuatxu: '', tenxuatxu: '' });
                setSelectedId(null);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi cập nhật xuất xứ');
        }
    };

    // Xóa xuất xứ
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/xuatxu-tt/${selectedId}`, { method: 'DELETE' });
            if (response.ok) {
                setXuatXuData((prevData) => prevData.filter((item) => item.maxuatxu !== selectedId));
                setFormData({ maxuatxu: '', tenxuatxu: '' });
                setSelectedId(null);
            } else {
                setError('Có lỗi xảy ra khi xóa xuất xứ');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi xóa xuất xứ');
        }
    };

    // Xử lý tìm kiếm
    const filteredData = xuatXuData.filter((item) =>
        item.tenxuatxu.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            <h4 style={{ backgroundColor: "#007bff", color: "white", padding: "10px", borderRadius: "5px" }}>
                Quản Lý Xuất Xứ
            </h4>
            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm xuất xứ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã Xuất Xứ</th>
                        <th>Tên Xuất Xứ</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr
                            key={item.maxuatxu}
                            onClick={() => {
                                setSelectedId(item.maxuatxu);
                                setFormData(item);
                            }}
                            style={{
                                backgroundColor: selectedId === item.maxuatxu ? '#f5f5f5' : 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td>{item.maxuatxu}</td>
                            <td>{item.tenxuatxu}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    {/* Trường nhập mã xuất xứ */}
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Mã Xuất Xứ"
                            name="maxuatxu"
                            value={formData.maxuatxu}
                            onChange={handleInputChange}
                        />
                    </Col>

                    {/* Trường nhập tên xuất xứ */}
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Tên Xuất Xứ"
                            name="tenxuatxu"
                            value={formData.tenxuatxu}
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

export default XuatXuForm;
