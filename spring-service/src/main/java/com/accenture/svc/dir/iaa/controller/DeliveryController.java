package com.accenture.svc.dir.iaa.controller;

import com.accenture.svc.dir.iaa.ImageUtils;
import com.accenture.svc.dir.iaa.Utils;
import com.accenture.svc.dir.iaa.XlsxUtils;
import com.accenture.svc.dir.iaa.XlsxWriter;
import com.accenture.svc.dir.iaa.entity.Delivery;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.mail.MailParseException;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.mail.internet.MimeMessage;
import javax.persistence.criteria.Predicate;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PUT},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/api/delivery")
public class DeliveryController extends AbstractController {

    @PostMapping(path = "/")
    public @ResponseBody
    Delivery post(
            @RequestBody Delivery e) {
        deliveryRepository.save(e);

        //加入到数据字典
        mergeDictionary(dictionaryRepository, "projectName", "项目", e.getProjectName());
        mergeDictionary(dictionaryRepository, "businessUnit", "部门", e.getBusinessUnit());
        mergeDictionary(dictionaryRepository, "notebookModel", "笔记本型号", e.getNotebookModel());
        mergeDictionary(dictionaryRepository, "locationBuilding", "楼号", e.getLocationBuilding());
        mergeDictionary(dictionaryRepository, "locationFloor", "楼层", e.getLocationFloor());
        return e;
    }

    @PostMapping(path = "/{id}/{io}/signature")
    public @ResponseBody
    Delivery signature(
            @PathVariable Long id,
            @PathVariable String io,
            @RequestBody String data) throws Exception {
        Delivery e = deliveryRepository.findById(id).get();

        String imageName = String.format("%s/delivery-%s-%s-%s-%s.png", yyyyMM.format(new Date()), dd.format(new Date()), e.getAssetTag(), e.getEid(), io);
        File image = ImageUtils.saveImage(imageName, data, ofPath);

        //save data to  signatureImage
        if ("borrow".equals(io)) {
            e.setSignatureImage(imageName);
        } else {
            e.setReturnSignatureImage(imageName);
        }
        deliveryRepository.save(e);

        sendMail(new String[]{Utils.eid2Email(e.getEid())}, image);
        return e;
    }

    public void sendMail(String to[], File image) {
        MimeMessage message = this.sender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(fromEmail);
            helper.setTo(Utils.concatArray(to, systemEmails.split(",")));
            helper.setSubject("回执单：普通用户设备取还");
            helper.setText(String.format("尊敬的 %s: \n附件是设备责任说明表， 如有疑问，请联系IT部门。", "6055120"));

            helper.addAttachment(image.getName(), image);

        } catch (Exception e) {
            throw new MailParseException(e);
        }
        sender.send(message);
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody
    Optional<Delivery> get(@PathVariable Long id) {
        return deliveryRepository.findById(id);
    }

    @GetMapping(path = {"/", "/xlsx"})
    public @ResponseBody
    Object getAll(
            @RequestParam(required = false) String eid,
            @RequestParam(required = false) String assetTag,
            @RequestParam(required = false) String progress,
            @RequestParam(required = false) String dateRange,
            @RequestParam(required = false, defaultValue = "false") boolean xlsx,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) throws IOException {
        Specification<Delivery> spec = (root, query, cb) -> {
            List<Predicate> list = new ArrayList<>();
            if (!StringUtils.isEmpty(eid)) {
                list.add(cb.equal(root.get("eid").as(String.class), eid));
            }
            if (!StringUtils.isEmpty(assetTag)) {
                list.add(cb.equal(root.get("assetTag").as(String.class), assetTag));
            }
            if (!StringUtils.isEmpty(progress)) {
                list.add(cb.equal(root.get("progress").as(String.class), assetTag));
            }
            if (!StringUtils.isEmpty(dateRange)) {
                String[] range = dateRange.split(",");
                list.add(cb.between(root.get("borrowDate").as(String.class), range[0] + " 00:00:00", range[1] + "23:59:59"));
            }

            Predicate[] p2 = new Predicate[list.size()];
            query.where(cb.and(list.toArray(p2)));
            return query.getRestriction();
        };

        if (xlsx) {
            List<Delivery> deliveries = this.deliveryRepository.findAll(spec);
            String fileName = "poi-generated-deliveries.xlsx";
            XlsxUtils.write2Xlsx(new File(ofPath, fileName), new XlsxWriter<Delivery>() {
                @Override
                public String[] getHeaders() {
                    return new String[]{
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
                }

                @Override
                public Iterable<Delivery> getIterableData() {
                    return deliveries;
                }

                @Override
                public Object getValue(int colIndex, Delivery data) {
                    switch (colIndex) {
                        case 0:
                            return data.getEid();
                        case 1:
                            return data.getFullname();
                        case 2:
                            return data.getSapNumber();
                        case 3:
                            return data.getProjectName();
                        case 4:
                            return data.getBusinessUnit();
                        case 5:
                            return data.getLocation();
                        case 6:
                            return data.getBorrowDate();
                        case 7:
                            return data.getAssetTag();
                        case 8:
                            return data.getSerialTag();
                        case 9:
                            return data.getNotebookModel();
                        case 10:
                            return data.getAcPowerAdapter();
                        case 11:
                            return data.getSecurityCable();
                        case 12:
                            return data.getBag();
                        case 13:
                            return data.getMouseKeyboard() || data.getMouse();
                        case 14:
                            return data.getLanCable();
                        case 15:
                            return StringUtils.isEmpty(data.getSignatureImage()) ? "" : ofUrl + data.getSignatureImage();
                        case 16:
                            return data.getReturnAcPowerAdapter();
                        case 17:
                            return data.getReturnSecurityCable();
                        case 18:
                            return data.getReturnBag();
                        case 19:
                            return data.getReturnMouse();
                        case 20:
                            return data.getReturnLanCable();
                        case 21:
                            return StringUtils.isEmpty(data.getReturnSignatureImage()) ? "" : ofUrl + data.getReturnSignatureImage();
                        case 22:
                            return data.getReturnBy();
                        case 23:
                            return data.getReturnDate();
                        case 24:
                            return data.getReceivedBy();
                        case 25:
                            return data.getReferenceNumber();
                        case 26:
                            return data.getRemarks();
                        default:
                            return "";
                    }
                }
            });

            Map<String, String> map = new HashMap();
            map.put("fileName", fileName);
            return map;
        } else {
            PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("id")));
            Page<Delivery> deliveries = this.deliveryRepository.findAll(spec, pageable);
            return deliveries;
        }
    }
}
