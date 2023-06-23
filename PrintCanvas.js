import React from "react";
import { StyleSheet, View } from "react-native";
import GetArabicBase64 from "./GetArabicBase64";
import GetArabicBase64LeftRight from "./GetArabicBase64LeftRight";
import GetArabicBase64LeftRightLoop from "./GetArabicBase64LeftRightLoop";
import GetArabicBase64TableContent from "./GetArabicBase64TableContent";
import GetArabicBase64TableHeader from "./GetArabicBase64TableHeader";
import QRCodeComponent from "./qr-code";

export default function PrintCanvas({ valueRef: ref, order }) {
  return (
    <>
      <GetArabicBase64
        arText={"متجر بعد الحياة - فرع الظلام"}
        enText={"AfterLife Convenience Store - Darkness Branch"}
        onChange={(base64) => {
          ref.current.storeName = base64;
        }}
      />

      <GetArabicBase64
        arText={"یک متن جعلی"}
        enText={"Darkness - Outer Spaces"}
        onChange={(base64) => {
          ref.current.locationName = base64;
        }}
      />

      <GetArabicBase64LeftRight
        arText={"فاتورة#"}
        enText={"Invoice#"}
        val={"#872187"}
        onChange={(base64) => {
          ref.current.invoice = base64;
        }}
      />
      <GetArabicBase64LeftRight
        arText={"تاريخ"}
        enText={"Date & time"}
        val={"2023-06-21 11:25:09"}
        onChange={(base64) => {
          ref.current.dateAndTime = base64;
        }}
      />

      <GetArabicBase64
        arText={"یک متن جعلی"}
        enText={"Simplified Invoice"}
        onChange={(base64) => {
          ref.current.duplicateInvoice = base64;
        }}
      />
      <GetArabicBase64TableHeader
        onChange={(b64) => (ref.current.tableHead = b64)}
        columns={[
          { ar: "الوصف", en: "Description.en" },
          { en: "Unit Price", ar: "سعر الوحدة" },
          { en: "Qty", ar: "الكمية" },
          { en: "Total", ar: "الإجمالي" },
        ]}
      />

      <GetArabicBase64TableContent
        onChange={(b64) => (ref.current.tableContent = b64)}
        items={[
          [
            { ar: "الوصف", en: "Rogan Juice" },
            { en: "100", ar: "" },
            { en: "1", ar: "" },
            { en: "100", ar: "" },
          ],
          [
            { ar: "الوصف", en: "Parle" },
            { en: "100", ar: "" },
            { en: "1", ar: "" },
            { en: "100", ar: "" },
          ],
          [
            { ar: "الوصف", en: "Kurkure" },
            { en: "100", ar: "" },
            { en: "1", ar: "" },
            { en: "100", ar: "" },
          ],
        ]}
      />
      <GetArabicBase64LeftRight
        arText={"تاريخ"}
        enText={"Total Taxable Amount"}
        val={"1000"}
        onChange={(base64) => {
          ref.current.totalTaxableAmount = base64;
        }}
      />
      <GetArabicBase64LeftRight
        arText={"تاريخ"}
        enText={"Total VAT"}
        val={"1000"}
        onChange={(base64) => {
          ref.current.totalVat = base64;
        }}
      />
      <GetArabicBase64LeftRight
        arText={"تاريخ"}
        enText={"Total Amount"}
        val={"1000"}
        onChange={(base64) => {
          ref.current.totalAmount = base64;
        }}
      />

      <GetArabicBase64LeftRightLoop
        columns={[
          { text: "Cash", val: "100" },
          { text: "Card", val: "2000" },
        ]}
        onChange={(base64) => {
          ref.current.breakup = base64;
        }}
      />
      <QRCodeComponent
        onChange={(base64) => {
          ref.current.qr = base64;
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
