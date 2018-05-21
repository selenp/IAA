package com.ruptech.equipment.controller;

import com.ruptech.equipment.EncrypeUtils;
import com.ruptech.equipment.entity.Admin;
import com.ruptech.equipment.respository.AdminRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PUT},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/account")
public class AccountController {
    @Autowired
    private AdminRepository adminRepository;

    @Value("${admin.password.sha256.key}")
    private String keyString;

    @PostMapping(path = "/api-login-account")
    public @ResponseBody
    Map<String, String> login(@RequestBody Admin d) throws Exception {
        String userid = d.getUserid();
        String password = d.getPassword();

        Specification<Admin> spec = (Specification<Admin>) (root, query, cb) -> {
            query.where(cb.equal(root.get("userid").as(String.class), userid));
            return query.getRestriction();
        };
        Optional<Admin> optAccount = adminRepository.findOne(spec);

        Map<String, String> map = new HashMap();
        String hash = EncrypeUtils.sha256(password, keyString);
        Admin account = optAccount.get();
        if (account.getPassword().equals(hash)) {
            String token = EncrypeUtils.sha256(account.getUserid() + System.currentTimeMillis(), keyString);
            account.setToken(token);
            adminRepository.save(account);

            map.put("status", "ok");
            map.put("type", "account");
            map.put("token", token);
            map.put("currentAuthority", "admin");
            return map;
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "no auth");
    }

    @GetMapping(path = "/currentUser")
    public @ResponseBody
    Admin currentUser(@RequestHeader("Authorization") String authorization) {
        if (authorization.length() > 7) {
            String token = authorization.substring(7);
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
}
