package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.mybatis.model.Psicologo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import comboDev.arsdiapason.service.UserService;

import java.util.Collection;
import java.util.List;

@RestController
public class UserController implements BasicController  {

    @Autowired
    UserService userService;

    @GetMapping("/login")
    public Collection<? extends GrantedAuthority> login(Authentication authentication) {
        return authentication.getAuthorities();
    }

    @PostMapping("/createAccount")
    public void createAccount(@RequestBody Psicologo psicologo) {
        psicologo.setRole("USER");
        userService.createAccount(psicologo);
    }

}