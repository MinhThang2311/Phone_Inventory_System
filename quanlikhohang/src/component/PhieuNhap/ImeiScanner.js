import React, { useRef, useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import { Modal, Button } from "react-bootstrap";

const ImeiScanner = ({ show, handleClose, onScan }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); // State để lưu ảnh từ file

  useEffect(() => {
    if (show) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [show]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleScanFromCamera = () => {
    // Thêm thời gian chờ 5 giây trước khi chụp ảnh
    setTimeout(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageSrc = canvas.toDataURL("image/png");
      recognizeText(imageSrc);
    }, 1000); // Thời gian chờ 5 giây
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        recognizeText(reader.result); // Nhận diện ngay khi file được tải lên
      };
      reader.readAsDataURL(file);
    }
  };

  const recognizeText = (imageSrc) => {
    Tesseract.recognize(imageSrc, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        console.log("Văn bản nhận diện được:", text);
        // Tìm tất cả các chuỗi 15 số trong văn bản
        const imeiMatches = text.match(/\b\d{15}\b/g);
        if (imeiMatches && imeiMatches.length > 0) {
          // Lấy mã IMEI đầu tiên tìm thấy
          onScan(imeiMatches[0]);
          alert(`Đã tìm thấy mã IMEI: ${imeiMatches}`);
        } else {
          alert("Không tìm thấy mã IMEI.");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Quét Mã IMEI</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <video ref={videoRef} autoPlay style={{ width: "100%" }} />
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width={640}
          height={480}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-3"
        />

        {isCameraActive && (
          <Button onClick={handleScanFromCamera} className="mt-3">
            Quét IMEI từ Camera
          </Button>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImeiScanner;
