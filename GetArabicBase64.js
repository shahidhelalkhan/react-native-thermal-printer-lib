import React, { useEffect, useRef, useState } from "react";
import ViewShot from "react-native-view-shot";
import { Text } from "react-native";
import fs from "react-native-fs";

export default function GetArabicBase64({ arText, enText, onChange }) {
  const captureRef = useRef();
  const [base64String, setBase64String] = useState(null);
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
  return (
    <ViewShot
      ref={captureRef}
      style={{
        position: "absolute",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "700", lineHeight: 17 }}>
        {enText}
      </Text>
      <Text style={{ fontWeight: "800", fontSize: 18, lineHeight: 17 }}>
        {arText}
      </Text>
    </ViewShot>
  );
}
