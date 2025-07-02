import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = ({ onScan }) => {
    
    const [error, setError] = useState(null);

    return (
        <div style={{ maxWidth: 400 }}>
            <QrReader 
                onResult={(result, error) => {
                    if(!result) {
                        onScan(result?.text);
                    }
                    if(!!error) {
                        setError(error.message);
                    }
                }}
                constraints={{ facingMode: 'environment' }}
                style={{width: '100%'}}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default QRScanner;