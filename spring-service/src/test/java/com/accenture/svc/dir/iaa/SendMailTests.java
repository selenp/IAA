package com.accenture.svc.dir.iaa;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.test.context.junit4.SpringRunner;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SendMailTests {

    @Autowired
    JavaMailSender sender;
    @Value("${spring.mail.username}")
    private String fromEmail;
    @Value("${spring.mail.person}")
    private String fromPerson;

    @Test
    public void sendSimpleMail() throws Exception {
        MimeMessage message = this.sender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        InternetAddress from = new InternetAddress(fromEmail, fromPerson);
        helper.setFrom(from);
        helper.setCc(from);
        helper.setTo("6055120@qq.com,oizhaolei@qq.com".split(","));

        helper.setSubject("Receipt：Ordinary User's Device Retrieval");
        helper.setText("Dear user: \nThe attachment is the table of equipment responsibilities. If you have any question, please contact the IT department.");

        String filename = "application.yml";
        helper.addAttachment(filename, new ClassPathResource(filename));

        sender.send(message);
    }

}
