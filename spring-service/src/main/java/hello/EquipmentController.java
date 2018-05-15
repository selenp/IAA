package hello;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller    // This means that this class is a Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PUT},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/equipment") // This means URL's start with /demo (after Application path)
public class EquipmentController {

    @Value("${signature.images.path}")
    private String signaturePath;
    @Value("${signature.images.url}")
    private String signatureUrl;

    @Autowired
    private EquipmentRepository equipmentRepository;

    @PostMapping(path = "/")
    public @ResponseBody
    Equipment post(
            @RequestBody Equipment e
    ) {
        equipmentRepository.save(e);
        return e;
    }

    @GetMapping(path = "/dictionary")
    public @ResponseBody
    Map<String, Iterable<String>> dictionary() {
        Iterable<String> projectNames = equipmentRepository.findProjectNames();
        Iterable<String> businessUnits = equipmentRepository.findBusinessUnits();
        Iterable<String> laptopModels = equipmentRepository.findLaptopModels();

        Map<String, Iterable<String>> dic = new HashMap();
        dic.put("projectNames", projectNames);
        dic.put("businessUnits", businessUnits);
        dic.put("laptopModels", laptopModels);

        return dic;
    }

    @GetMapping(path = "/xlsx")
    public @ResponseBody
    Map<String, String> genXlsx() throws IOException {
        String[] columns = {
                "姓名(EID)",
                "Name",
                "员工号 Sap Number",
                "项目名 Project Name",
                "部门 Business Unit",
                "办公地点 Location",
                "有效日期 Effective Date",
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
        Iterable<Equipment> equipments = equipmentRepository.findAll();
        Workbook workbook = new XSSFWorkbook(); // new HSSFWorkbook() for generating `.xls` file

        /* CreationHelper helps us create instances for various things like DataFormat,
           Hyperlink, RichTextString etc, in a format (HSSF, XSSF) independent way */
        CreationHelper createHelper = workbook.getCreationHelper();

        // Create a Sheet
        Sheet sheet = workbook.createSheet("Employee");

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
        for (Equipment e : equipments) {
            Row row = sheet.createRow(rowNum++);

            row.createCell(0).setCellValue(nullable(e.getEid()));
            row.createCell(1).setCellValue(nullable(e.getFullname()));
            row.createCell(2).setCellValue(nullable(e.getSapNumber()));
            row.createCell(3).setCellValue(nullable(e.getProjectName()));
            row.createCell(4).setCellValue(nullable(e.getBusinessUnit()));
            row.createCell(5).setCellValue(nullable(e.getLocation()));
            row.createCell(6).setCellValue(nullable(e.getEffectiveDate()));
            row.createCell(7).setCellValue(nullable(e.getAssetTag()));
            row.createCell(8).setCellValue(nullable(e.getSerialTag()));
            row.createCell(9).setCellValue(nullable(e.getLaptopModel()));
            row.createCell(10).setCellValue(nullable(e.getAcPowerAdapter()));
            row.createCell(11).setCellValue(nullable(e.getSecurityCable()));
            row.createCell(12).setCellValue(nullable(e.getBag()));
            row.createCell(13).setCellValue(nullable(e.getMouse()));
            row.createCell(14).setCellValue(nullable(e.getLanCable()));
            row.createCell(15).setCellValue(signatureUrl + nullable(e.getSignatureImage()));
            row.createCell(16).setCellValue(nullable(e.getReturnAcPowerAdapter()));
            row.createCell(17).setCellValue(nullable(e.getReturnSecurityCable()));
            row.createCell(18).setCellValue(nullable(e.getReturnBag()));
            row.createCell(19).setCellValue(nullable(e.getReturnMouse()));
            row.createCell(20).setCellValue(nullable(e.getReturnLanCable()));
            row.createCell(21).setCellValue(signatureUrl + nullable(e.getReturnSignatureImage()));
            row.createCell(22).setCellValue(nullable(e.getReturnBy()));
            row.createCell(23).setCellValue(nullable(e.getReturnDate()));
            row.createCell(24).setCellValue(nullable(e.getReceivedBy()));
            row.createCell(25).setCellValue(nullable(e.getReferenceNumber()));
            row.createCell(26).setCellValue(nullable(e.getRemarks()));
        }

        // Resize all columns to fit the content size
        for (int i = 0; i < columns.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Write the output to a file
        String fileName = "/poi-generated-file.xlsx";
        FileOutputStream fileOut = new FileOutputStream(signaturePath + fileName);
        workbook.write(fileOut);
        fileOut.close();

        // Closing the workbook
        workbook.close();
        Map<String, String> xlsx = new HashMap();
        xlsx.put("fileName", fileName);

        return xlsx;
    }

    private String nullable(Object o) {
        if (o == null)
            return "";
        else
            return o.toString();
    }

    @PostMapping(path = "/{id}/{io}/signature")
    public @ResponseBody
    Equipment signature(@PathVariable Long id, @PathVariable String io, @RequestBody String data
    ) throws Exception {
        String partSeparator = ",";
        String encodedImg = data.replaceAll("\"", "").trim().split(partSeparator)[1];

        String imageName = String.format("%d-%s.png", id, io);
        byte[] decodedImg = Base64.getDecoder().decode(encodedImg.getBytes(StandardCharsets.UTF_8));
        Path destinationFile = Paths.get(
                signaturePath,
                imageName);
        Files.write(destinationFile, decodedImg);

        //save data to  signatureImage
        Equipment e = equipmentRepository.findById(id).get();
        if ("borrow".equals(io)) {
            e.setSignatureImage(imageName);
        } else {
            e.setReturnSignatureImage(imageName);
        }
        equipmentRepository.save(e);

        return e;
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody
    Optional<Equipment> get(@PathVariable Long id) {
        return equipmentRepository.findById(id);
    }

    @GetMapping(path = "/")
    public @ResponseBody
    Iterable<Equipment> getAll(@RequestParam(required = false) String eid) {
        return equipmentRepository.findAll();
    }
}
