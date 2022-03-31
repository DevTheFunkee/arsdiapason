package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.dto.DatiUtente;
import comboDev.arsdiapason.mybatis.mapper.PsicologoMapper;
import comboDev.arsdiapason.mybatis.model.Psicologo;
import comboDev.arsdiapason.mybatis.model.Utente;
import comboDev.arsdiapason.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController implements BasicController  {

    @Autowired
    private UserService userService;
    @Autowired
    private PsicologoMapper psicologoMapper;

    @GetMapping("/login")
    public Psicologo login(Authentication authentication) {
        return psicologoMapper.selectByPrimaryKey((Integer) authentication.getDetails());
    }

    @PostMapping("/createAccount")
    public void createAccount(@RequestBody DatiUtente datiUtente) throws Exception {
        userService.createAccount(datiUtente);
    }

    @PostMapping("/confirmAccount")
    public Utente confirmAccount(@RequestBody DatiUtente datiUtente) throws Exception {
        return userService.confirmAccount(datiUtente);
    }

    @PostMapping("/sendResetPasswordEmail")
    public void sendResetPasswordEmail(@RequestBody DatiUtente datiUtente) throws Exception {
        userService.sendResetPasswordEmail(datiUtente);
    }

    @PostMapping("/resetPassword")
    public void resetPassword(@RequestBody DatiUtente datiUtente) throws Exception {
        userService.resetPassword(datiUtente);
    }

}