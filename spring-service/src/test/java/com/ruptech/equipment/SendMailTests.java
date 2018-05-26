package com.ruptech.equipment;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.test.context.junit4.SpringRunner;

import javax.mail.internet.MimeMessage;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SendMailTests {

    @Autowired
    JavaMailSender sender;
    @Value("${system.emails}")
    private String systemEmails;
    @Value("${spring.mail.username}")
    private String fromEmail;

    @Test
    public void sendSimpleMail() throws Exception {
        MimeMessage message = this.sender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(systemEmails.split(","));

        helper.setSubject("回执单：普通用户设备取还");
        helper.setText(String.format("尊敬的 %s: \n附件是设备责任说明表， 如有疑问，请联系IT部门。", "6055120"));

        String filename = "application-development.yml";
        helper.addAttachment(filename, new ClassPathResource(filename));

        sender.send(message);
    }

}
