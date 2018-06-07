package com.accenture.svc.dir.iaa.controller;

import com.accenture.svc.dir.iaa.Utils;
import com.accenture.svc.dir.iaa.entity.TransferEvent;
import com.accenture.svc.dir.iaa.ImageUtils;
import com.accenture.svc.dir.iaa.XlsxUtils;
import com.accenture.svc.dir.iaa.XlsxWriter;
import com.accenture.svc.dir.iaa.entity.Task;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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
@RequestMapping(path = "/api/transfer-event")
public class TransferEventController extends AccountController {

    Log log = LogFactory.getLog(TransferEventController.class);

    @PostMapping(path = "/")
    public @ResponseBody
    TransferEvent post(
            @RequestBody TransferEvent e
    ) {
        log.error(e);
        transferEventRepository.save(e);

        if (e.getTaskId() != null) {
            Optional<Task> optTask = taskRepository.findById(e.getTaskId());
            if (optTask.isPresent()) {
                Task task = optTask.get();
                task.setProgress(Task.PROGRESS_FINISHED);
                taskRepository.save(task);
            }
        }
        return e;
    }

    @PostMapping(path = "/{id}/{io}/signature")
    public @ResponseBody
    TransferEvent signature(
            @PathVariable Long id,
            @PathVariable String io,
            @RequestBody String data) throws Exception {
        TransferEvent e = transferEventRepository.findById(id).get();

        String imageName = String.format("%s/transfer-%s-%s-%d-%s.png", yyyyMM.format(new Date()), dd.format(new Date()), e.getToEid(), id, io);
        File image = ImageUtils.saveImage(imageName, data, ofPath);

        //save data to  signatureImage
        e.setSignatureImage(imageName);
        transferEventRepository.save(e);

        sendMail(new String[]{Utils.eid2Email(e.getToEid()), Utils.eid2Email(e.getFromEid())}, image);
        return e;
    }


    public void sendMail(String to[], File image) {
        MimeMessage message = this.sender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(fromEmail);
            helper.setTo(Utils.concatArray(to, systemEmails.split(",")));
            helper.setSubject("回执单：IT设备取还");
            helper.setText(String.format("尊敬的 %s: \n附件是设备责任说明表， 如有疑问，请联系IT部门。", "6055120"));

            helper.addAttachment(image.getName(), image);

        } catch (Exception e) {
            throw new MailParseException(e);
        }
        sender.send(message);
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody
    Optional<TransferEvent> get(@PathVariable Long id) {
        return transferEventRepository.findById(id);
    }

    @GetMapping(path = {"/", "/xlsx"})
    public @ResponseBody
    Object getAll(
            @RequestParam(required = false) String eid,
            @RequestParam(required = false, defaultValue = "false") boolean xlsx,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) throws IOException {
        Specification<TransferEvent> spec = (root, query, cb) -> {
            if (!StringUtils.isEmpty(eid)) {
                List<Predicate> list = new ArrayList<>();
                list.add(cb.equal(root.get("fromEid").as(String.class), eid));
                list.add(cb.equal(root.get("toEid").as(String.class), eid));
                Predicate[] p2 = new Predicate[list.size()];
                query.where(cb.or(list.toArray(p2)));
            }

            return query.getRestriction();
        };
        if (xlsx) {
            Iterable<TransferEvent> transferEvents = transferEventRepository.findAll();
            String fileName = "poi-generated-transfer-events.xlsx";
            XlsxUtils.write2Xlsx(new File(ofPath, fileName), new XlsxWriter<TransferEvent>() {
                @Override
                public String[] getHeaders() {
                    return new String[]{
                            "自EID",
                            "至EID",
                            "日期 Effective Date",
                            "资产编号Asset Tag",
                            "领取签名图片 signature_image",
                            "备注 remarks"
                    };
                }

                @Override
                public Iterable getIterableData() {
                    return transferEvents;
                }

                @Override
                public Object getValue(int colIndex, TransferEvent data) {
                    switch (colIndex) {
                        case 0:
                            return data.getFromEid();
                        case 1:
                            return data.getToEid();
                        case 2:
                            return data.getBorrowDate();
                        case 3:
                            return data.getAssetTags();
                        case 4:
                            return StringUtils.isEmpty(data.getSignatureImage()) ? "" : ofUrl + data.getSignatureImage();
                        case 5:
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
            Page<TransferEvent> transferEvents = this.transferEventRepository.findAll(spec, pageable);
            return transferEvents;
        }
    }
}
