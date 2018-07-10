package com.accenture.svc.dir.iaa.controller;

import com.accenture.svc.dir.iaa.entity.Admin;
import com.accenture.svc.dir.iaa.entity.Dictionary;
import com.accenture.svc.dir.iaa.respository.AdminRepository;
import com.accenture.svc.dir.iaa.respository.AnnouncementRepository;
import com.accenture.svc.dir.iaa.respository.DeliveryRepository;
import com.accenture.svc.dir.iaa.respository.DictionaryRepository;
import com.accenture.svc.dir.iaa.respository.TaskRepository;
import com.accenture.svc.dir.iaa.respository.TransferEventRepository;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;
import javax.persistence.criteria.Predicate;

class AbstractController {
    static SimpleDateFormat yyyyMMDD = new SimpleDateFormat("yyyy-MM-dd");
    static SimpleDateFormat yyyyMM = new SimpleDateFormat("yyyy/MM");
    static SimpleDateFormat dd = new SimpleDateFormat("dd");
    Log log = LogFactory.getLog(AbstractController.class);
    JsonParser springParser = JsonParserFactory.getJsonParser();
    @Value("${admin.password.sha256.key}")
    String keyString;
    @Value("${online.files.path}")
    String ofPath;
    @Value("${online.files.url}")
    String ofUrl;
    @Value("${spring.mail.username}")
    String fromEmail;
    @Value("${spring.mail.person}")
    String fromPerson;
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
    AnnouncementRepository announcementRepository;
    @Autowired
    TransferEventRepository transferEventRepository;

    private static SearchControls getSimpleSearchControls() {
        SearchControls searchControls = new SearchControls();
        searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
        searchControls.setTimeLimit(30000);
        //String[] attrIDs = {"objectGUID"};
        //searchControls.setReturningAttributes(attrIDs);
        return searchControls;
    }

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

    void mergeDictionary(DictionaryRepository dictionaryRepository, String category, String categoryName, String data) {
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
            dictionaryRepository.save(Dictionary.as(category, categoryName, data));
        }
    }

    Map<String, Object> ldapSearchOne(LdapContext ctx, Map<String, Object> conf, String uid) throws NamingException {
        String base = (String) conf.get("system.ldap.base");
        String filter = String.format((String) conf.get("system.ldap.filter"), uid);
        log.info(String.format("ldapSearchOne -> %s, %s", base, filter));
        NamingEnumeration<?> namingEnum = ctx.search(
                base,
                filter,
                getSimpleSearchControls());
        Map<String, Object> map = new HashMap();
        if (namingEnum.hasMore()) {
            SearchResult result = (SearchResult) namingEnum.next();
            Attributes attrs = result.getAttributes();

            NamingEnumeration<String> iDs = attrs.getIDs();
            while (iDs.hasMore()) {
                String id = iDs.next();
                //log.error(String.format("attr -> %s: %s", id, attrs.get(id).get()));

                map.put(id, attrs.get(id).get());
            }
        }
        namingEnum.close();
        ctx.close();
        log.info(map);
        return map;
    }

    Map<String, Object> getLdapConf() {
        List<Dictionary> dictionaries = dictionaryRepository.findAll((Specification<Dictionary>) (root, query, cb) -> query
                .where(cb.like(root.get("category").as(String.class), "system.ldap.%"))
                .getRestriction());

        Map<String, Object> map = new HashMap<>();
        for (Dictionary dictionary : dictionaries) {
            map.put(dictionary.getCategory(), dictionary.getData());
        }

        return map;
    }

    LdapContext getLdapContext(String url, String principal, String password) throws NamingException {
        log.info(String.format("getLdapContext -> %s, %s, %s", url, principal, password));
        Hashtable env = new Hashtable();
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, url);
        if (principal != null) {
            env.put(Context.SECURITY_PRINCIPAL, principal);
        }
        if (password != null) {
            env.put(Context.SECURITY_CREDENTIALS, password);
        }
        LdapContext ctx = new InitialLdapContext(env, null);
        ctx.setRequestControls(null);

        return ctx;
    }
}
