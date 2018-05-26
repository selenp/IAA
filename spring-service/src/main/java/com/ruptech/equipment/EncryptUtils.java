package com.ruptech.equipment;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class EncryptUtils {

    public static String sha256(String s, String keyString)
            throws UnsupportedEncodingException, NoSuchAlgorithmException,
            InvalidKeyException {

        SecretKeySpec key = new SecretKeySpec((keyString).getBytes("UTF-8"),
                "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(key);

        byte[] bytes = mac.doFinal(s.getBytes("UTF-8"));

        return new String(Base64.getEncoder().encodeToString(bytes));

    }

}
