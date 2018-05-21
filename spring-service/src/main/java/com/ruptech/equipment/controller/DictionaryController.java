package com.ruptech.equipment.controller;

import com.ruptech.equipment.entity.Admin;
import com.ruptech.equipment.entity.Dictionary;
import com.ruptech.equipment.respository.DictionaryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.Predicate;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PUT},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/dictionary")
public class DictionaryController {

    @Autowired
    private DictionaryRepository dictionaryRepository;

    @GetMapping(path = "/_all")
    public @ResponseBody
    Map<String, Iterable<String>> dictionary() {
        Iterable<Dictionary> projectNames = dictionaryRepository.findAll((root, query, cb) -> {
            query.where(cb.equal(root.get("category").as(String.class), "projectName"));
            return query.getRestriction();
        });
        Iterable<Dictionary> businessUnits = dictionaryRepository.findAll((root, query, cb) -> {
            query.where(cb.equal(root.get("category").as(String.class), "businessUnit"));
            return query.getRestriction();
        });
        Iterable<Dictionary> laptopModels = dictionaryRepository.findAll((root, query, cb) -> {
            query.where(cb.equal(root.get("category").as(String.class), "laptopModel"));
            return query.getRestriction();
        });

        Map<String, Iterable<String>> dic = new HashMap();
        dic.put("projectNames", dataList(projectNames));
        dic.put("businessUnits", dataList(businessUnits));
        dic.put("laptopModels", dataList(laptopModels));

        return dic;
    }

    private Iterable<String> dataList(Iterable<Dictionary> list) {
        List<String> dataList = new ArrayList<>();
        for (Dictionary d : list) {
            dataList.add(d.getData());
        }
        return dataList;
    }

    @GetMapping(path = "/")
    public @ResponseBody
    Page<Dictionary> getAll(
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        Page<Dictionary> admins = this.dictionaryRepository.findAll((Specification<Dictionary>) (root, query, cb) -> {
            List<Predicate> list = new ArrayList<>();
            if (category != null) {
                list.add(cb.equal(root.get("category").as(String.class), category));
            }

            Predicate[] p2 = new Predicate[list.size()];
            query.where(cb.and(list.toArray(p2)));
            return query.getRestriction();
        }, PageRequest.of(page, size));
        return admins;
    }
}
