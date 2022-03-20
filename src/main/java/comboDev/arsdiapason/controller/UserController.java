package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.dto.ConfirmAccount;
import comboDev.arsdiapason.dto.DatiRegistrazione;
import comboDev.arsdiapason.mybatis.mapper.PsicologoMapper;
import comboDev.arsdiapason.mybatis.model.Psicologo;
import comboDev.arsdiapason.mybatis.model.Utente;
import comboDev.arsdiapason.service.MailService;
import comboDev.arsdiapason.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ThreadLocalRandom;

@RestController
public class UserController implements BasicController  {

    @Autowired
    private UserService userService;
    @Autowired
    private PsicologoMapper psicologoMapper;
    @Autowired
    private MailService mailService;

    @GetMapping("/login")
    public Psicologo login(Authentication authentication) {
        return psicologoMapper.selectByPrimaryKey((Integer) authentication.getDetails());
    }

    @PostMapping("/createAccount")
    public void createAccount(@RequestBody DatiRegistrazione datiRegistrazione) throws Exception {
        int temporaryCode = ThreadLocalRandom.current().nextInt(100000, 1000000);
        userService.createAccount(datiRegistrazione, temporaryCode);
        mailService.sendAuthenticationEmail(datiRegistrazione, temporaryCode);
    }

    @PostMapping("/confirmAccount")
    public Utente confirmAccount(@RequestBody ConfirmAccount confirmAccount) throws Exception {
        return userService.confirmAccount(confirmAccount);
    }

}