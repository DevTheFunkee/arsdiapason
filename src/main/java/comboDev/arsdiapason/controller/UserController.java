package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.mybatis.model.Psicologo;
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
    UserService userService;

    @GetMapping("/login")
    public Psicologo login(Authentication authentication) {
        return (Psicologo) authentication.getDetails();
    }

    @PostMapping("/createAccount")
    public void createAccount(@RequestBody Psicologo psicologo) {
        psicologo.setRole("USER");
        userService.createAccount(psicologo);
    }

}