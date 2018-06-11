package com.accenture.svc.dir.iaa.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.AttributesMapper;
import org.springframework.ldap.core.ContextMapper;
import org.springframework.ldap.core.DirContextAdapter;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

import static org.springframework.ldap.query.LdapQueryBuilder.query;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PUT},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/api/ldap")
public class LdapController {
    String ldapBase = "dc=springframework,dc=org";
    Log log = LogFactory.getLog(LdapController.class);

    @Autowired
    private LdapTemplate ldapTemplate;

    public List<String> getAllPersonNames() {
        return ldapTemplate.search(
                query().where("objectclass").is("person"),
                (AttributesMapper<String>) attrs -> (String) attrs.get("cn").get());
    }

    @RequestMapping("/all")
    public @ResponseBody
    String indexall() {
        return getAllPersonNames().toString();
    }

    public String findPersonName(String dn) {
        return ldapTemplate.lookup(dn, (AttributesMapper<String>) attrs -> {
            log.warn(attrs);
            return (String) attrs.get("cn").get();
        });
    }

    @GetMapping(path = "/uid/{uid}")
    public @ResponseBody
    String indexsearch(@PathVariable String uid) {
        return findPersonName(String.format("uid=%s,ou=people,%s", uid, ldapBase));
    }


    public Map findPersonNameC(String dn) {
        return ldapTemplate.lookup(dn, (ContextMapper<Map>) ctx -> {
            DirContextAdapter context = (DirContextAdapter) ctx;

            log.warn(((DirContextAdapter) ctx).getAttributes());
            Map<String, Object> map = new HashMap();
            map.put("uid", context.getStringAttribute("uid"));
            map.put("cn", context.getStringAttribute("cn"));

            return map;
        });
    }

    @GetMapping(path = "/find/{uid}")
    public @ResponseBody
    Map indexsearch2(@PathVariable String uid) {
        Map map;
        try {
            map = findPersonNameC(String.format("uid=%s,ou=people,%s", uid, ldapBase));
        } catch (Exception e) {
            log.error(e);
            map = new HashMap();
            map.put("uid","");
            map.put("cn","");
        }
        return map;
    }
}
