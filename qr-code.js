import React from "react";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { useRef, useState, useEffect } from "react";
import { createQRData } from "./zatca";

export default function QRCodeComponent({ onChange }) {
  const captureRef = useRef();
  const [base64String, setBase64String] = useState(null);
  const [qrData, setQrData] = useState("");
  useEffect(() => {
    const testData = {
      sellerName: "Shahid",
      vatNumber: "12345678910111",
      timestamp: "2022-01-02 10:30",
      total: "100.00",
      vatTotal: "15.00",
    };

    createQRData(testData).then((res) => {
      setQrData(res);
    });
  }, []);
  useEffect(() => {
    (async () => {
      if (captureRef.current) {
        const imageUri = await captureRef.current.capture({
          result: "tmpfile",
          width: 1000,
        });
        const base64 = await fs.readFile(imageUri, "base64");
        setBase64String(base64);
      }
    })();
  }, [captureRef.current]);

  useEffect(() => {
    if (base64String) {
      onChange(base64String);
    }
  }, [base64String]);

  console.log(qrData);
  return (
    <ViewShot
      ref={captureRef}
      style={{
        position: "absolute",
        alignItems: "center",
        backgroundColor: "#fff",
        maxWidth: 400,
      }}
    >
      <QRCode value={"sklajskjakjs"} />
    </ViewShot>
  );
}
