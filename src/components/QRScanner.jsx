import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = ({ onScan }) => {
  const qrRef = useRef();
  const scannerRef = useRef(null);

  useEffect(() => {
    const startScanner = async () => {
      try {
        scannerRef.current = new Html5Qrcode("qr-reader");
        await scannerRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScan(decodedText);
          },
          (errorMessage) => {
            // silent error
          }
        );
      } catch (err) {
        console.error("QR Scanner failed to start:", err);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current.clear())
          .catch((err) => {
            console.warn("Scanner stop error (may be safe to ignore):", err);
          });
      }
    };
  }, [onScan]);

  return (
    <div>
      <div id="qr-reader" ref={qrRef} style={{ width: '100%', maxWidth: 400 }} />
    </div>
  );
};

export default QRScanner;
