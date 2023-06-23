import React, { useEffect, useRef, useState } from "react";
import ViewShot from "react-native-view-shot";
import { Text, View } from "react-native";
import fs from "react-native-fs";

export default function GetArabicBase64TableHeader({ onChange, columns }) {
  const captureRef = useRef();
  const [base64String, setBase64String] = useState(null);
  useEffect(() => {
    (async () => {
      if (captureRef.current) {
        const imageUri = await captureRef.current.capture({
          result: "tmpfile",
          width: 400,
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
        maxWidth: 400,
      }}
    >
      <View style={{ flexDirection: "row", width: 400 }}>
        {columns?.map((column) => {
          return (
            <View
              style={{
                width: 420 / 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, lineHeight: 16, textAlign: "center" }}
              >
                {column.en}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "800",
                  lineHeight: 14,
                  textAlign: "center",
                }}
              >
                {column.ar}
              </Text>
            </View>
          );
        })}
      </View>
    </ViewShot>
  );
}
