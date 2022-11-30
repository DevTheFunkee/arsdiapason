package comboDev.arsdiapason.service;

import comboDev.arsdiapason.dto.DatiIstituto;
import comboDev.arsdiapason.dto.DatiUtente;
import comboDev.arsdiapason.mybatis.mapper.RelPsicologoIstitutoMapper;
import comboDev.arsdiapason.mybatis.model.Istituto;
import comboDev.arsdiapason.mybatis.model.RelPsicologoIstituto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    
    @Autowired
	private RelPsicologoIstitutoMapper relPsicologoIstitutoMapper;
    
    @Value("${admin.mail}")
    private String adminMail;

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
    
    public void sendIstitutoEmail(DatiIstituto istituto, int idPsicologo) {
    	RelPsicologoIstituto temporaryCode = relPsicologoIstitutoMapper.selectByPrimaryKey(idPsicologo, istituto.getId());
        String link = istituto.getAppUrl() + "/#/excelBambini/" + temporaryCode.getCodice() + "/" +istituto.getId() +"/" +idPsicologo;
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(istituto.getMail());
        msg.setSubject("Arsdiapason - Carica Excel Bambini");
        msg.setText("Ciao\nPer caricare l'excel clicca qui: " + link);
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

	public void sendAdminEmail(DatiIstituto istituto, Integer idPsicologo) {
        String link = istituto.getAppUrl() + "/#/excelBambini/"  +istituto.getId() +"/" +idPsicologo;
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(adminMail);
        msg.setSubject("Arsdiapason - Confermare associazione istituto-psicologo");
        msg.setText("Ciao\nPer conferma associazione fare il login: " + link);
        javaMailSender.send(msg);
		
	}

}
