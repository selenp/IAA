package com.accenture.svc.dir.iaa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

import javax.naming.ldap.LdapContext;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PUT},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/api/ldap")
public class LdapController extends AbstractController {
    /**
     * 测试环境里面<code>system.ldap</code>的值如下：
     * <code>{
     * "url": "ldap://localhost:8389",
     * "base": "dc=springframework,dc=org",
     * "principal": "uid=%s,dc=springframework,dc=org",
     * "user": null,
     * "password": null,
     * "filter": "(&(objectClass=person)(uid=%s))"
     * }</code>
     * 正式环境里面<code>system.ldap</code>的值如下：
     * <code>{
     * "url": "ldap://10.254.161.147:389",
     * "base": "ou=people,dc=dir,dc=svc,dc=accenture,dc=com",
     * "principal": "cn=%s,ou=people,dc=dir,dc=svc,dc=accenture,dc=com",
     * "user": "di.a.gao",
     * "password": "Gdi0906#",
     * "filter": "(&(objectClass=person)(cn=%s))"
     * }</code>
     */
    @GetMapping(path = "/search/{uid}")
    public @ResponseBody
    Map<String, Object> search(@PathVariable String uid) {
        try {
            Map<String, Object> conf = getLdapConf();

            LdapContext ctx = getLdapContext(
                    (String) conf.get("system.ldap.url"),
                    conf.get("system.ldap.username") != null ? String.format((String) conf.get("system.ldap.principal"), conf.get("system.ldap.username")) : null,
                    (String) conf.get("system.ldap.password")
            );

            Map<String, Object> map = ldapSearchOne(ctx, conf, uid);
            return map;
        } catch (Exception e) {
            log.error(e);
            return null;
        }
    }
}
