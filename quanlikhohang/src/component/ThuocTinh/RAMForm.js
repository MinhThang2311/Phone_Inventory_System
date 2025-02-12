import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Row, Col, Spinner, Alert } from 'react-bootstrap';

const RAMForm = () => {
    const [ramData, setRamData] = useState([]);
    const [formData, setFormData] = useState({ madlram: '', kichthuocram: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    // Fetch dữ liệu dung lượng RAM
    useEffect(() => {
        const fetchRam = async () => {
            try {
                const response = await fetch('http://localhost:5000/ram-tt');
                const data = await response.json();
                setRamData(data);
                setLoading(false);
            } catch (err) {
                setError('Có lỗi xảy ra khi tải dữ liệu');
                setLoading(false);
            }
        };
        fetchRam();
    }, []);

    // Handler cho form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Thêm RAM
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { kichthuocram } = formData;

        try {
            const response = await fetch('http://localhost:5000/ram-tt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ kichthuocram }),
            });

            const data = await response.json();
            if (response.ok) {
                setRamData((prevData) => [
                    ...prevData,
                    { ...formData, madlram: data.madlram },
                ]);
                setFormData({ madlram: '', kichthuocram: '' });
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi thêm dung lượng RAM');
        }
    };

    // Cập nhật RAM
    const handleUpdate = async () => {
        const { kichthuocram } = formData;

        try {
            const response = await fetch(`http://localhost:5000/ram-tt/${selectedId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ kichthuocram }),
            });

            const data = await response.json();
            if (response.ok) {
                setRamData((prevData) =>
                    prevData.map((item) => (item.madlram === selectedId ? { ...item, kichthuocram } : item))
                );
                setFormData({ madlram: '', kichthuocram: '' });
                setSelectedId(null);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi cập nhật dung lượng RAM');
        }
    };

    // Xóa RAM
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/ram-tt/${selectedId}`, { method: 'DELETE' });
            if (response.ok) {
                setRamData((prevData) => prevData.filter((item) => item.madlram !== selectedId));
                setFormData({ madlram: '', kichthuocram: '' });
                setSelectedId(null);
            } else {
                setError('Có lỗi xảy ra khi xóa dung lượng RAM');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi xóa dung lượng RAM');
        }
    };

    // Xử lý tìm kiếm
    const filteredData = ramData.filter((item) =>
        item.kichthuocram.toString().includes(searchTerm)
    );

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            <h4 style={{ backgroundColor: "#007bff", color: "white", padding: "10px", borderRadius: "5px" }}>
                Quản Lý Dung Lượng RAM
            </h4>
            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm dung lượng RAM..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã Dung Lượng RAM</th>
                        <th>Kích Thước RAM (GB)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr
                            key={item.madlram}
                            onClick={() => {
                                setSelectedId(item.madlram);
                                setFormData(item);
                            }}
                            style={{
                                backgroundColor: selectedId === item.madlram ? '#f5f5f5' : 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td>{item.madlram}</td>
                            <td>{item.kichthuocram}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Mã Dung Lượng RAM"
                            name="madlram"
                            value={formData.madlram}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            type="number"
                            placeholder="Kích Thước RAM (GB)"
                            name="kichthuocram"
                            value={formData.kichthuocram}
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

export default RAMForm;
