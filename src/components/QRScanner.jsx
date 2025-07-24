import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = ({ onScan }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    // Initialize scanner
    scannerRef.current = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    }, false);

    // Render scanner and handle success/error
    scannerRef.current.render(
      (decodedText, decodedResult) => {
        onScan(decodedText); // success callback
      },
      (errorMessage) => {
        // Optional: console.warn("Scan error", errorMessage);
      }
    );

    return () => {
      // Cleanup scanner
      scannerRef.current.clear().catch((err) => {
        console.warn("Scanner clear error:", err);
      });
    };
  }, [onScan]);

  return (
    <div>
      <div id="qr-reader" style={{ width: '100%', maxWidth: 400 }} />
    </div>
  );
};

export default QRScanner;
