import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  COMMANDS,
  USBPrinter,
} from "react-native-thermal-receipt-printer-image-qr";
import GetArabicBase64 from "./GetArabicBase64";
import GetArabicBase64TableContent from "./GetArabicBase64TableContent";
import GetArabicBase64TableHeader from "./GetArabicBase64TableHeader";
import GetArabicBase64LeftRight from "./GetArabicBase64LeftRight";
import GetArabicBase64LeftRightLoop from "./GetArabicBase64LeftRightLoop";

import QRCodeComponent from "./qr-code";
import PrintCanvas from "./PrintCanvas";

export default function App() {
  const [printers, setPrinters] = useState([]);
  const ref = useRef({
    storeName: "",
    locationName: "",
    dateAndTime: "",
    time: "",
    invoice: "",
    duplicateInvoice: "",
    description: "",
    unitPrice: "",
    qty: "",
    total: "",
    totalTaxableAmount: "",
    totalVat: "",
    tableHead: "",
    totalAmount: "",
    tableContent: "",
    breakup: "",
    qr: "",
  });

  useEffect(() => {
    USBPrinter.init()
      .then(() => {
        console.log("initiated");
        USBPrinter.getDeviceList()
          .then((deviceList) => {
            console.log(deviceList);
            setPrinters(deviceList);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function testPrint() {
    if (Platform.OS == "android") {
      //connect to printer
      console.log(printers[0]);
      console.log(
        "vendor_id: ",
        printers[0].vendor_id,
        "product_id:",
        printers[0].product_id
      );
      const printer = await USBPrinter.connectPrinter(
        printers[0].vendor_id,
        printers[0].product_id
      ).catch((err) => console.log(err));
      const Printer = USBPrinter;
      const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
      const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
      const CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_CT;

      Printer.printImageBase64(ref.current.storeName);
      Printer.printText(
        `${CENTER}${BOLD_ON}VAT NO. : 238723827328738${CENTER}${BOLD_OFF}`
      );
      Printer.printText(
        `${BOLD_ON}${CENTER}Ph. NO. : 9000000001${CENTER}${BOLD_OFF}`
      );
      Printer.printImageBase64(ref.current.locationName);
      Printer.printText(`${COMMANDS.HORIZONTAL_LINE.HR3_80MM}`);
      Printer.printImageBase64(ref.current.invoice);
      Printer.printImageBase64(ref.current.dateAndTime);
      Printer.printText(`${COMMANDS.HORIZONTAL_LINE.HR3_80MM}`);
      Printer.printImageBase64(ref.current.duplicateInvoice);
      Printer.printText(`${COMMANDS.HORIZONTAL_LINE.HR3_80MM}`);
      Printer.printImageBase64(`${ref.current.tableHead}`);
      Printer.printText(`${COMMANDS.HORIZONTAL_LINE.HR3_80MM}`);
      Printer.printImageBase64(`${ref.current.tableContent}`);
      Printer.printText(`${COMMANDS.HORIZONTAL_LINE.HR3_80MM}`);
      Printer.printImageBase64(`${ref.current.totalTaxableAmount}`);
      Printer.printImageBase64(`${ref.current.totalVat}`);
      Printer.printText(`${COMMANDS.HORIZONTAL_LINE.HR3_80MM}`);
      Printer.printImageBase64(`${ref.current.totalAmount}`);
      Printer.printText(`${COMMANDS.HORIZONTAL_LINE.HR3_80MM}`);
      Printer.printImageBase64(`${ref.current.breakup}`);
      Printer.printText(`${COMMANDS.HORIZONTAL_LINE.HR3_80MM}`);
      Printer.printImageBase64(`${ref.current.qr}`);

      // Printer.printImageBase64(base64);

      // Printer.printBill("", { cut: true });r

      // Printer.printImageBase64(base64);

      // Printer.printImage(
      //   `https://firebasestorage.googleapis.com/v0/b/chatty-a9023.appspot.com/o/np_file_66042.jpg?alt=media&token=19c44842-91f6-4a6e-8171-d24679dfdcc3`,
      //   {
      //     imageWidth: 300,
      //     imageHeight: 300,
      //   }
      // );
      // Printer.printText(`${CENTER}${BOLD_ON} BILLING ${BOLD_OFF}\n`);
      // Printer.printText(`${CENTER}${address}${OFF_CENTER}`);
      // Printer.printText("090 3399 031 555\n");
      // Printer.printText(`Date : 15- 09 - 2021 /15 : 29 : 57 / Admin`);
      // Printer.printText(`Product : Total - 4 / No. (1,2,3,4)\n`);
      // Printer.printText(
      //   `${CENTER}${COMMANDS.HORIZONTAL_LINE.HR_80MM}${CENTER}`
      // );
      // let orderList = [
      //   ["1. Kimon Mom ", "x2", "500$"],
      //   ["2. Sameer", "x4222", "500$"],
      //   ["3. Sutan", "x1", "30000000000000$"],
      // ];
      // let columnAlignment = [
      //   ColumnAlignment.LEFT,
      //   ColumnAlignment.CENTER,
      //   ColumnAlignment.RIGHT,
      // ];
      // let columnWidth = [46 - (7 + 12), 7, 12];
      // const header = ["Product list", "Qty", "Price"];
      // Printer.printColumnsText(header, columnWidth, columnAlignment, [
      //   `${BOLD_ON}`,
      //   "",
      //   "",
      // ]);
      // Printer.printText(
      //   `${CENTER}${COMMANDS.HORIZONTAL_LINE.HR3_80MM}${CENTER}`
      // );
      // for (let i in orderList) {
      //   Printer.printColumnsText(orderList[i], columnWidth, columnAlignment, [
      //     `${BOLD_OFF}`,
      //     "",
      //     "",
      //   ]);
      // }
      // Printer.printText(`\n`);
      // if (locationName.current) {
      //   Printer.printImageBase64(locationName.current);
      // }

      Printer.printBill(`${CENTER}Thank you\n`, { beep: false, cut: true });
      // console.log("connected to printer", printer, USBPrinter);
      // await printer.printImage(
      //   "https://firebasestorage.googleapis.com/v0/b/chatty-a9023.appspot.com/o/np_file_66042.jpg?alt=media&token=19c44842-91f6-4a6e-8171-d24679dfdcc3"
      // );
      // await USBPrinter.printText(
      //   `<D><C>PAID</C></D>
      // ---------------------------------
      // <C>PICKUP</C>
      // Promised: 10:00AM
      // ---------------------------------
      // Kimono Mom & Sameer
      // Bihar
      // Order ID: #1
      // Placed 2:00AM
      // ---------------------------------
      // Sameer
      // Phone: +91-7007688265
      // ---------------------------------
      // ITEM                       TOTAL
      // ---------------------------------
      // Kimono 1                   SAR10
      // ---------------------------------

      // <D>Sub Total     SAR 10</D>
      // <D>Tax (7.5%)    SAR 20</D>
      // <D>Total         SAR 30</D>\n\n\n`,
      //   { cut: true }
      // );
      console.log("printed");
      // print text
    }
  }

  return (
    <>
      <PrintCanvas valueRef={ref} order={{}} />
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            marginTop: 100,
            backgroundColor: "purple",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => testPrint()}
        >
          <Text style={{ color: "#fff" }}>Test print</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
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
