package com.ruptech.equipment.controller;

import com.ruptech.equipment.entity.Dictionary;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.DELETE},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/dictionary")
public class DictionaryController extends AccountController {

    @DeleteMapping(path = "/{id}")
    public @ResponseBody
    void delete(@PathVariable Integer id) {
        dictionaryRepository.deleteById(id);
    }

    /**
     * 所有数据、字典格式
     */
    @GetMapping(path = "/_all")
    public @ResponseBody
    Iterable<Dictionary> dictionary() {
        return this.dictionaryRepository.findAll();
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
            if (!StringUtils.isEmpty(category)) {
                list.add(cb.equal(root.get("category").as(String.class), category));
            }

            Predicate[] p2 = new Predicate[list.size()];
            query.where(cb.and(list.toArray(p2)));
            return query.getRestriction();
        }, PageRequest.of(page, size));
        return admins;
    }
}
