package com.ruptech.equipment.controller;

import com.ruptech.equipment.ImageUtils;
import com.ruptech.equipment.XlsxUtils;
import com.ruptech.equipment.entity.Delivery;
import com.ruptech.equipment.entity.Dictionary;
import com.ruptech.equipment.respository.DeliveryRepository;
import com.ruptech.equipment.respository.DictionaryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.mail.MailParseException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.criteria.Predicate;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PUT},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/delivery")
public class DeliveryController {

    @Value("${online.files.path}")
    private String ofPath;
    @Value("${online.files.url}")
    private String ofUrl;

    @Autowired
    private DeliveryRepository deliveryRepository;
    @Autowired
    private DictionaryRepository dictionaryRepository;

    @PostMapping(path = "/")
    public @ResponseBody
    Delivery post(
            @RequestBody Delivery e
    ) {
        deliveryRepository.save(e);

        //加入到数据字典
        mergeDictionary("projectName", e.getProjectName());
        mergeDictionary("businessUnit", e.getBusinessUnit());
        mergeDictionary("laptopModel", e.getLaptopModel());
        return e;
    }

    private void mergeDictionary(String category, String data) {
        Specification<Dictionary> spec = (Specification<Dictionary>) (root, query, cb) -> {
            List<Predicate> list = new ArrayList<>();
            list.add(cb.equal(root.get("category").as(String.class), category));
            list.add(cb.equal(root.get("data").as(String.class), data));

            Predicate[] p2 = new Predicate[list.size()];
            query.where(cb.and(list.toArray(p2)));
            return query.getRestriction();
        };
        Optional<Dictionary> optDic = dictionaryRepository.findOne(spec);
        if (optDic.isPresent()) {
            dictionaryRepository.save(optDic.get().rankUp());
        } else {
            dictionaryRepository.save(Dictionary.as(category, data));
        }
    }

    @GetMapping(path = "/xlsx")
    public @ResponseBody
    Map<String, String> genXlsx() throws IOException {
        Iterable<Delivery> deliveries = deliveryRepository.findAll();
        String fileName = "/poi-generated-deliveries.xlsx";
        XlsxUtils.delivery2Xlsx(deliveries, ofUrl, ofPath, fileName);

        Map<String, String> xlsx = new HashMap();
        xlsx.put("fileName", fileName);
        return xlsx;
    }

    @PostMapping(path = "/{id}/{io}/signature")
    public @ResponseBody
    Delivery signature(@PathVariable Long id, @PathVariable String io, @RequestBody String data
    ) throws Exception {
        String imageName = String.format("delivery-%d-%s.png", id, io);
        File toFile = ImageUtils.saveImg(imageName, data, ofPath);

        //save data to  signatureImage
        Delivery e = deliveryRepository.findById(id).get();
        if ("borrow".equals(io)) {
            e.setSignatureImage(imageName);
        } else {
            e.setReturnSignatureImage(imageName);
        }
        deliveryRepository.save(e);

        // sendMail();
        return e;
    }

//    public void sendMail() {
//        SimpleMailMessage msg = new SimpleMailMessage();
//
//        msg.setTo("6055120@qq.com");
//        msg.setSubject("テストメール");
//        msg.setText("Spring Boot より本文送信");
//
//        this.sender.send(msg);
//    }
//    public void sendMimeMail(File image) {
//        MimeMessage message = this.sender.createMimeMessage();
//
//        try{
//            MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//            helper.setTo("6055120@qq.com");
//            helper.setSubject("テストメール");
//            helper.setText("Spring Boot より本文送信");
//
//            FileSystemResource file = new FileSystemResource(image);
//            helper.addAttachment(file.getFilename(), file);
//
//        }catch (MessagingException e) {
//            throw new MailParseException(e);
//        }
//        sender.send(message);
//    }
    @GetMapping(path = "/{id}")
    public @ResponseBody
    Optional<Delivery> get(@PathVariable Long id) {
        return deliveryRepository.findById(id);
    }

    @GetMapping(path = "/")
    public @ResponseBody
    Page<Delivery> getAll(
            @RequestParam(required = false) String eid,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        Page<Delivery> deliveries = this.deliveryRepository.findAll((Specification<Delivery>) (root, query, cb) -> {
            List<Predicate> list = new ArrayList<>();
            if (!StringUtils.isEmpty(eid)) {
                list.add(cb.equal(root.get("eid").as(String.class), eid));
            }

            Predicate[] p2 = new Predicate[list.size()];
            query.where(cb.and(list.toArray(p2)));
            return query.getRestriction();
        }, PageRequest.of(page, size, Sort.by(Sort.Order.desc("id"))));
        return deliveries;
    }
}
