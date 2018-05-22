package com.ruptech.equipment.controller;

import com.ruptech.equipment.ImageUtils;
import com.ruptech.equipment.XlsxUtils;
import com.ruptech.equipment.entity.TransferEvent;
import com.ruptech.equipment.respository.DictionaryRepository;
import com.ruptech.equipment.respository.TransferEventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.criteria.Predicate;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PUT},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/transfer-event")
public class TransferEventController {

    @Value("${online.files.path}")
    private String ofPath;
    @Value("${online.files.url}")
    private String ofUrl;

    @Autowired
    private TransferEventRepository transferEventRepository;
    @Autowired
    private DictionaryRepository dictionaryRepository;

    @PostMapping(path = "/")
    public @ResponseBody
    TransferEvent post(
            @RequestBody TransferEvent e
    ) {
        transferEventRepository.save(e);
        return e;
    }

    @GetMapping(path = "/xlsx")
    public @ResponseBody
    Map<String, String> genXlsx() throws IOException {
        Iterable<TransferEvent> transferEvents = transferEventRepository.findAll();
        String fileName = "/poi-generated-transfer-events.xlsx";
        XlsxUtils.transferEvent2Xlsx(transferEvents, ofUrl, ofPath, fileName);

        Map<String, String> xlsx = new HashMap();
        xlsx.put("fileName", fileName);
        return xlsx;
    }

    @PostMapping(path = "/{id}/{io}/signature")
    public @ResponseBody
    TransferEvent signature(@PathVariable Long id, @PathVariable String io, @RequestBody String data
    ) throws Exception {
        String imageName = String.format("transfer-event-%d-%s.png", id, io);
        ImageUtils.saveImg(imageName, data, ofPath);

        //save data to  signatureImage
        TransferEvent e = transferEventRepository.findById(id).get();
        e.setSignatureImage(imageName);
        transferEventRepository.save(e);

        return e;
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody
    Optional<TransferEvent> get(@PathVariable Long id) {
        return transferEventRepository.findById(id);
    }

    @GetMapping(path = "/")
    public @ResponseBody
    Page<TransferEvent> getAll(
            @RequestParam(required = false) String eid,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        Page<TransferEvent> transferEvents = this.transferEventRepository.findAll((Specification<TransferEvent>) (root, query, cb) -> {
            List<Predicate> list = new ArrayList<>();
            if (!StringUtils.isEmpty(eid)) {
                list.add(cb.equal(root.get("eid").as(String.class), eid));
            }

            Predicate[] p2 = new Predicate[list.size()];
            query.where(cb.and(list.toArray(p2)));
            return query.getRestriction();
        }, PageRequest.of(page, size, Sort.by(Sort.Order.desc("id"))));
        return transferEvents;
    }
}
