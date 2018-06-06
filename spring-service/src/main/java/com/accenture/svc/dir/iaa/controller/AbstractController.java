package com.accenture.svc.dir.iaa.controller;

import com.accenture.svc.dir.iaa.entity.Admin;
import com.accenture.svc.dir.iaa.entity.Dictionary;
import com.accenture.svc.dir.iaa.respository.AdminRepository;
import com.accenture.svc.dir.iaa.respository.DictionaryRepository;
import com.accenture.svc.dir.iaa.respository.TransferEventRepository;
import com.accenture.svc.dir.iaa.respository.DeliveryRepository;
import com.accenture.svc.dir.iaa.respository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.Predicate;

class AbstractController {
    @Value("${admin.password.sha256.key}")
    String keyString;
    @Value("${online.files.path}")
    String ofPath;
    @Value("${online.files.url}")
    String ofUrl;
    @Value("${system.emails}")
    String systemEmails;
    @Value("${spring.mail.username}")
    String fromEmail;

    @Autowired
    AdminRepository adminRepository;
    @Autowired
    DictionaryRepository dictionaryRepository;

    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    JavaMailSender sender;
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    TransferEventRepository transferEventRepository;

    static SimpleDateFormat yyyyMM = new SimpleDateFormat("yyyy/MM");
    static SimpleDateFormat dd = new SimpleDateFormat("dd");

    Admin ensureAuthorization(JpaSpecificationExecutor<Admin> adminRepository, String authorization) {
        String prefix = "Bearer ";
        if (authorization.length() > prefix.length()) {
            String token = authorization.substring(prefix.length());
            Specification<Admin> spec = (Specification<Admin>) (root, query, cb) -> {
                query.where(cb.equal(root.get("token").as(String.class), token));
                return query.getRestriction();
            };
            Optional<Admin> optAccount = adminRepository.findOne(spec);
            if (optAccount.isPresent()) {
                return optAccount.get();
            }
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "no auth");
    }


    void mergeDictionary(DictionaryRepository dictionaryRepository, String category, String data) {
        if (StringUtils.isEmpty(data)) {
            return;
        }
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
}
