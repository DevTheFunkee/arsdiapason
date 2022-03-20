package comboDev.arsdiapason.service;

import comboDev.arsdiapason.dto.DatiRegistrazione;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendAuthenticationEmail(DatiRegistrazione datiRegistrazione, int temporaryCode) {
        String email;
        try {
            email = URLEncoder.encode(datiRegistrazione.getEmail(), StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e.getCause());
        }
        String link = datiRegistrazione.getAppUrl() + "/#/confirmAccount/" + email +"/"+ temporaryCode;
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(datiRegistrazione.getEmail());
        msg.setSubject("Conferma registrazione a Arsdiapason");
        msg.setText("Ciao\nPer terminare la registrazione clicca qui: " + link);
        javaMailSender.send(msg);
    }

}
