package com.accenture.svc.dir.iaa;

import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SimpleEmailTests {

    public static void main(String[] args) {
        String smtpHostServer = "10.254.161.152";
        String fromEmail = "is.isa.china.iw.assetmanagement@accenture.com";
        String toEmail = "is.isa.china.iw.assetmanagement@accenture.com";
        String replayEmail = "is.isa.china.iw.assetmanagement@accenture.com";

        System.out.println("SimpleEmail Start");

        Properties props = System.getProperties();

        props.put("mail.smtp.host", smtpHostServer);

        Session session = Session.getInstance(props, null);

        String subject = "SimpleEmail Testing Subject";
        String body = "SimpleEmail Testing Body";

        try {
            MimeMessage msg = new MimeMessage(session);

            //set message headers
            msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
            msg.addHeader("format", "flowed");
            msg.addHeader("Content-Transfer-Encoding", "8bit");

            msg.setFrom(new InternetAddress(fromEmail, "NoReply-JD"));

            msg.setReplyTo(InternetAddress.parse(replayEmail, false));

            msg.setSubject(subject, "UTF-8");

            msg.setText(body, "UTF-8");

            msg.setSentDate(new Date());

            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
            System.out.println("Message is ready");
            Transport.send(msg);

            System.out.println("EMail Sent Successfully!!");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
