package com.ruptech.equipment;

import com.ruptech.equipment.entity.Delivery;
import com.ruptech.equipment.entity.TransferEvent;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.util.StringUtils;

import java.io.FileOutputStream;
import java.io.IOException;

public class XlsxUtils {

    public static void delivery2Xlsx(Iterable<Delivery> events, String ofUrl, String ofPath, String fileName) throws IOException {
        String[] columns = {
                "姓名(EID)",
                "Name",
                "员工号 Sap Number",
                "项目名 Project Name",
                "部门 Business Unit",
                "办公地点 Location",
                "日期 Effective Date",
                "资产编号Asset Tag",
                "序列号Serial Tag",
                "笔记本型号Laptop Model",
                "电源适配器&电源线 AC Power Adapter & Power cord(TBD)",
                "电脑锁 Security Cable (210CNY)",
                "电脑包 Bag(174CNY)",
                "鼠标 Mouse(105CNY)",
                "网线 Lan Cable(10CNY/M)",
                "领取签名图片 signature_image",
                "归还电源适配器&电源线 AC Power Adapter & Power cord(TBD)",
                "归还电脑锁 Security Cable (210CNY)",
                "归还电脑包 Bag(174CNY)",
                "归还鼠标 Mouse(105CNY)",
                "归还网线 Lan Cable(10CNY/M)",
                "归还签名图片 signature_image",
                "返还人 returned_by",
                "日期 return_date",
                "接受人 received_by",
                "单号 reference_number",
                "备注 remarks"
        };
        Workbook workbook = new XSSFWorkbook(); // new HSSFWorkbook() for generating `.xls` file

        /* CreationHelper helps us create instances for various things like DataFormat,
           Hyperlink, RichTextString etc, in a format (HSSF, XSSF) independent way */
        CreationHelper createHelper = workbook.getCreationHelper();

        // Create a Sheet
        Sheet sheet = workbook.createSheet("Delivery");

        // Create a Font for styling header cells
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 14);
        headerFont.setColor(IndexedColors.RED.getIndex());

        // Create a CellStyle with the font
        CellStyle headerCellStyle = workbook.createCellStyle();
        headerCellStyle.setFont(headerFont);

        // Create a Row
        Row headerRow = sheet.createRow(0);

        // Creating cells
        for (int i = 0; i < columns.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(columns[i]);
            cell.setCellStyle(headerCellStyle);
        }

        // Create Cell Style for formatting Date
        CellStyle dateCellStyle = workbook.createCellStyle();
        dateCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd-MM-yyyy"));

        // Create Other rows and cells with employees data
        int rowNum = 1;
        for (Delivery e : events) {
            Row row = sheet.createRow(rowNum++);

            row.createCell(0).setCellValue(null2Empty(e.getEid()));
            row.createCell(1).setCellValue(null2Empty(e.getFullname()));
            row.createCell(2).setCellValue(null2Empty(e.getSapNumber()));
            row.createCell(3).setCellValue(null2Empty(e.getProjectName()));
            row.createCell(4).setCellValue(null2Empty(e.getBusinessUnit()));
            row.createCell(5).setCellValue(null2Empty(e.getLocation()));
            row.createCell(6).setCellValue(null2Empty(e.getEffectiveDate()));
            row.createCell(7).setCellValue(null2Empty(e.getAssetTag()));
            row.createCell(8).setCellValue(null2Empty(e.getSerialTag()));
            row.createCell(9).setCellValue(null2Empty(e.getLaptopModel()));
            row.createCell(10).setCellValue(null2Empty(e.getAcPowerAdapter()));
            row.createCell(11).setCellValue(null2Empty(e.getSecurityCable()));
            row.createCell(12).setCellValue(null2Empty(e.getBag()));
            row.createCell(13).setCellValue(null2Empty(e.getMouse()));
            row.createCell(14).setCellValue(null2Empty(e.getLanCable()));
            row.createCell(15).setCellValue(ofUrl + null2Empty(e.getSignatureImage()));
            row.createCell(16).setCellValue(null2Empty(e.getReturnAcPowerAdapter()));
            row.createCell(17).setCellValue(null2Empty(e.getReturnSecurityCable()));
            row.createCell(18).setCellValue(null2Empty(e.getReturnBag()));
            row.createCell(19).setCellValue(null2Empty(e.getReturnMouse()));
            row.createCell(20).setCellValue(null2Empty(e.getReturnLanCable()));
            row.createCell(21).setCellValue(ofUrl + null2Empty(e.getReturnSignatureImage()));
            row.createCell(22).setCellValue(null2Empty(e.getReturnBy()));
            row.createCell(23).setCellValue(null2Empty(e.getReturnDate()));
            row.createCell(24).setCellValue(null2Empty(e.getReceivedBy()));
            row.createCell(25).setCellValue(null2Empty(e.getReferenceNumber()));
            row.createCell(26).setCellValue(null2Empty(e.getRemarks()));
        }

        // Resize all columns to fit the content size
        for (int i = 0; i < columns.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Write the output to a file
        FileOutputStream fileOut = new FileOutputStream(ofPath + fileName);
        workbook.write(fileOut);
        fileOut.close();

        // Closing the workbook
        workbook.close();
    }

    public static void transferEvent2Xlsx(Iterable<TransferEvent> events, String ofUrl, String ofPath, String fileName) throws IOException {
        String[] columns = {
                "自EID",
                "至EID",
                "日期 Effective Date",
                "资产编号Asset Tag",
                "领取签名图片 signature_image",
                "备注 remarks"
        };
        Workbook workbook = new XSSFWorkbook(); // new HSSFWorkbook() for generating `.xls` file

        /* CreationHelper helps us create instances for various things like DataFormat,
           Hyperlink, RichTextString etc, in a format (HSSF, XSSF) independent way */
        CreationHelper createHelper = workbook.getCreationHelper();

        // Create a Sheet
        Sheet sheet = workbook.createSheet("Transfer");

        // Create a Font for styling header cells
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 14);
        headerFont.setColor(IndexedColors.RED.getIndex());

        // Create a CellStyle with the font
        CellStyle headerCellStyle = workbook.createCellStyle();
        headerCellStyle.setFont(headerFont);

        // Create a Row
        Row headerRow = sheet.createRow(0);

        // Creating cells
        for (int i = 0; i < columns.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(columns[i]);
            cell.setCellStyle(headerCellStyle);
        }

        // Create Cell Style for formatting Date
        CellStyle dateCellStyle = workbook.createCellStyle();
        dateCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd-MM-yyyy"));

        // Create Other rows and cells with employees data
        int rowNum = 1;
        for (TransferEvent e : events) {
            Row row = sheet.createRow(rowNum++);

            row.createCell(0).setCellValue(null2Empty(e.getEid()));
            row.createCell(1).setCellValue(null2Empty(e.getOwnerEid()));
            row.createCell(2).setCellValue(null2Empty(e.getEffectiveDate()));
            row.createCell(3).setCellValue(null2Empty(e.getAssetTags()));
            row.createCell(4).setCellValue(ofUrl + null2Empty(e.getSignatureImage()));
            row.createCell(5).setCellValue(null2Empty(e.getRemarks()));
        }

        // Resize all columns to fit the content size
        for (int i = 0; i < columns.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Write the output to a file
        FileOutputStream fileOut = new FileOutputStream(ofPath + fileName);
        workbook.write(fileOut);
        fileOut.close();

        // Closing the workbook
        workbook.close();
    }

    private static String null2Empty(Object o) {
        if (StringUtils.isEmpty(o))
            return "";
        else
            return o.toString();
    }
}
