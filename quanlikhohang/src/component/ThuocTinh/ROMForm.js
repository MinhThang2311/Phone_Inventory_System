import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Row, Col, Spinner, Alert } from 'react-bootstrap';

const ROMForm = () => {
    const [romData, setRomData] = useState([]);
    const [formData, setFormData] = useState({ madlrom: '', kichthuocrom: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    // Fetch dữ liệu dung lượng ROM
    useEffect(() => {
        const fetchRom = async () => {
            try {
                const response = await fetch('http://localhost:5000/rom-tt');
                const data = await response.json();
                setRomData(data);
                setLoading(false);
            } catch (err) {
                setError('Có lỗi xảy ra khi tải dữ liệu');
                setLoading(false);
            }
        };
        fetchRom();
    }, []);

    // Handler cho form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Thêm ROM
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { kichthuocrom } = formData;

        try {
            const response = await fetch('http://localhost:5000/rom-tt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ kichthuocrom }),
            });

            const data = await response.json();
            if (response.ok) {
                setRomData((prevData) => [
                    ...prevData,
                    { ...formData, madlrom: data.madlrom },
                ]);
                setFormData({ madlrom: '', kichthuocrom: '' });
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi thêm dung lượng ROM');
        }
    };

    // Cập nhật ROM
    const handleUpdate = async () => {
        const { kichthuocrom } = formData;

        try {
            const response = await fetch(`http://localhost:5000/rom-tt/${selectedId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ kichthuocrom }),
            });

            const data = await response.json();
            if (response.ok) {
                setRomData((prevData) =>
                    prevData.map((item) => (item.madlrom === selectedId ? { ...item, kichthuocrom } : item))
                );
                setFormData({ madlrom: '', kichthuocrom: '' });
                setSelectedId(null);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi cập nhật dung lượng ROM');
        }
    };

    // Xóa ROM
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/rom-tt/${selectedId}`, { method: 'DELETE' });
            if (response.ok) {
                setRomData((prevData) => prevData.filter((item) => item.madlrom !== selectedId));
                setFormData({ madlrom: '', kichthuocrom: '' });
                setSelectedId(null);
            } else {
                setError('Có lỗi xảy ra khi xóa dung lượng ROM');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi xóa dung lượng ROM');
        }
    };

    // Xử lý tìm kiếm
    const filteredData = romData.filter((item) =>
        item.kichthuocrom.toString().includes(searchTerm)
    );

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            <h4 style={{ backgroundColor: "#007bff", color: "white", padding: "10px", borderRadius: "5px" }}>
                Quản Lý Dung Lượng ROM
            </h4>
            {error && <Alert variant="danger">{error}</Alert>}
    
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm dung lượng ROM..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>
    
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã Dung Lượng ROM</th>
                        <th>Dung Lượng ROM (GB)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr
                            key={item.madlrom}
                            onClick={() => {
                                setSelectedId(item.madlrom);
                                setFormData(item);
                            }}
                            style={{
                                backgroundColor: selectedId === item.madlrom ? '#f5f5f5' : 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td>{item.madlrom}</td>
                            <td>{item.kichthuocrom}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
    
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Mã Dung Lượng ROM"
                            name="madlrom"
                            value={formData.madlrom}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            type="number"
                            placeholder="Dung Lượng ROM (GB)"
                            name="kichthuocrom" // Đảm bảo tên trường này khớp với dữ liệu
                            value={formData.kichthuocrom}
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

export default ROMForm;
