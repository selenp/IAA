package com.accenture.svc.dir.iaa.controller;

import com.accenture.svc.dir.iaa.EncryptUtils;
import com.accenture.svc.dir.iaa.entity.Admin;

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

import java.util.Map;

import javax.naming.NamingException;
import javax.naming.ldap.LdapContext;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PUT},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/api/account")
public class AccountController extends AbstractController {

    /**
     * Login
     */
    @PostMapping(path = "/api-login-account")
    public @ResponseBody
    Map<String, Object> login(@RequestBody Admin d) throws Exception {
        String userid = d.getUserid();
        String password = d.getPassword();

        Specification<Admin> spec = (Specification<Admin>) (root, query, cb) -> {
            query.where(cb.equal(root.get("userid").as(String.class), userid));
            return query.getRestriction();
        };

        Admin account = adminRepository.findOne(spec).get();

        Map<String, Object> map = null;
        try {
            Map<String, Object> conf = getConf("system.ldap.%");
            LdapContext ctx = getLdapContext((String) conf.get("system.ldap.url"), String.format((String) conf.get("system.ldap.principal"), userid), password);
            map = ldapSearchOne(ctx, conf, userid);
        } catch (NamingException e) {
            log.error(e);
        }

        if (map != null) {
            String token = EncryptUtils.sha256(account.getUserid() + System.currentTimeMillis(), keyString);
            account.setPassword(null);
            account.setToken(token);
            adminRepository.save(account);

            map.put("status", "ok");
            map.put("type", "account");
            map.put("token", token);
            map.put("currentAuthority", account.getRoles());
            return map;
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "no auth");
    }

    /**
     * Current Account
     */
    @GetMapping(path = "/currentUser")
    public @ResponseBody
    Map<String, Object> currentUser(@RequestHeader("Authorization") String authorization) {
        Admin admin = ensureAuthorization(adminRepository, authorization);
        Map<String, Object> map = null;
        try {
            Map<String, Object> conf = getConf("system.ldap.%");
            LdapContext ctx = getLdapContext(
                    (String) conf.get("system.ldap.url"),
                    conf.get("system.ldap.username") != null ? String.format((String) conf.get("system.ldap.principal"), conf.get("system.ldap.username")) : null,
                    (String) conf.get("system.ldap.password")
            );
            map = ldapSearchOne(ctx, conf, admin.getUserid());
            map.putAll(admin.toMap());
        } catch (NamingException e) {
            log.error(e);
        }

        return map;
    }

}
