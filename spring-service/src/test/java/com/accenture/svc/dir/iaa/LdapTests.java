package com.accenture.svc.dir.iaa;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

public class LdapTests {

    String server = "ldap://10.254.161.147:389";
    String base = "ou=people,dc=dir,dc=svc,dc=accenture,dc=com";
    String user = "cn=di.a.gao,ou=people,dc=dir,dc=svc,dc=accenture,dc=com";
    String password = "Gdi0906#";
    String filter = "(&(objectClass=user)(cn=%s))";
    String search = "di.a.gao";

    private static SearchControls getSimpleSearchControls() {
        SearchControls searchControls = new SearchControls();
        searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
        searchControls.setTimeLimit(30000);
        //String[] attrIDs = {"objectGUID"};
        //searchControls.setReturningAttributes(attrIDs);
        return searchControls;
    }

    public void main(String[] args) {

        try {

            LdapContext ctx = getLdapContext(server, user, password);
            Map<String, Object> map = searchOne(ctx, base, filter, search);
            System.out.println(map);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private Map<String, Object> searchOne(LdapContext ctx, String base, String filter, String uid) throws NamingException {
        NamingEnumeration<?> namingEnum = ctx.search(
                base,
                String.format(filter, uid),
                getSimpleSearchControls());
        Map<String, Object> map = new HashMap();
        if (namingEnum.hasMore()) {
            SearchResult result = (SearchResult) namingEnum.next();
            Attributes attrs = result.getAttributes();

            NamingEnumeration<String> iDs = attrs.getIDs();
            while (iDs.hasMore()) {
                String id = iDs.next();
                System.out.println(String.format("attr -> %s: %s", id, attrs.get(id).get()));

                map.put(id, attrs.get(id).get());
            }
        }
        namingEnum.close();
        return map;
    }

    private LdapContext getLdapContext(String url, String user, String password) throws NamingException {
        Hashtable env = new Hashtable();
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, url);
        if (user != null) {
            env.put(Context.SECURITY_PRINCIPAL, user);
        }
        if (password != null) {
            env.put(Context.SECURITY_CREDENTIALS, password);
        }
        LdapContext ctx = new InitialLdapContext(env, null);
        ctx.setRequestControls(null);

        return ctx;
    }
}
