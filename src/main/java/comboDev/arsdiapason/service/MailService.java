package comboDev.arsdiapason.service;

import comboDev.arsdiapason.dto.DatiUtente;
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

    public void sendAuthenticationEmail(DatiUtente datiUtente, int temporaryCode) {
        String email;
        try {
            email = URLEncoder.encode(datiUtente.getEmail(), StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e.getCause());
        }
        String link = datiUtente.getAppUrl() + "/#/confirmAccount/" + email + "/" + temporaryCode;
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(datiUtente.getEmail());
        msg.setSubject("Arsdiapason - Conferma registrazione");
        msg.setText("Ciao\nPer terminare la registrazione clicca qui: " + link);
        javaMailSender.send(msg);
    }

    public void sendResetPasswordEmail(DatiUtente datiUtente, int temporaryCode) {
        String email;
        try {
            email = URLEncoder.encode(datiUtente.getEmail(), StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e.getCause());
        }
        String link = datiUtente.getAppUrl() + "/#/resetPassword/" + email + "/" + temporaryCode;
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(datiUtente.getEmail());
        msg.setSubject("Arsdiapason - Reimposta password");
        msg.setText("Ciao\nPer reimpostare la password clicca qui: " + link);
        javaMailSender.send(msg);
    }

}
