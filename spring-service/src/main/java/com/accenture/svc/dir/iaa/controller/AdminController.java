package com.accenture.svc.dir.iaa.controller;

import com.accenture.svc.dir.iaa.EncryptUtils;
import com.accenture.svc.dir.iaa.entity.Admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.Predicate;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.DELETE},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/api/admin")
public class AdminController extends AbstractController {

    @DeleteMapping(path = "/{id}")
    public @ResponseBody
    void delete(@PathVariable Integer id) {
        adminRepository.deleteById(id);
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody
    Optional<Admin> get(@PathVariable Integer id) {
        return adminRepository.findById(id);
    }

    /**
     * Create or Modify a User
     */
    @PostMapping(path = "/") // Map ONLY GET Requests
    public @ResponseBody
    Admin post(@RequestBody Admin d) {
        adminRepository.save(d);

        String[] roles = d.getRoles().split(",");
        String categoryName="角色";
        for (String role : roles) {
            mergeDictionary(dictionaryRepository, "role", categoryName, role);
        }
        return d;
    }

    /**
     * User Pagination
     */
    @GetMapping(path = "/")
    public @ResponseBody
    Page<Admin> getAll(
            @RequestParam(required = false) String userid,
            @RequestParam(required = false) String role,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        Page<Admin> admins = this.adminRepository.findAll((Specification<Admin>) (root, query, cb) -> {
            List<Predicate> list = new ArrayList<>();
            if (!StringUtils.isEmpty(userid)) {
                list.add(cb.equal(root.get("userid").as(String.class), userid));
            }
            if (!StringUtils.isEmpty(role)) {
                list.add(cb.like(root.get("roles").as(String.class), String.format("%%%s%%", role)));
            }

            Predicate[] p2 = new Predicate[list.size()];
            query.where(cb.and(list.toArray(p2)));
            return query.getRestriction();
        }, PageRequest.of(page, size, Sort.by(Sort.Order.desc("userid"))));
        return admins;
    }

}
