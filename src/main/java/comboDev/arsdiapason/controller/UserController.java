package comboDev.arsdiapason.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import comboDev.arsdiapason.service.UserService;

import java.util.Collection;

@RestController
public class UserController implements BasicController  {

    @Autowired
    UserService userService;

    @GetMapping("/login")
    public Collection<? extends GrantedAuthority> login(Authentication authentication) {
        return authentication.getAuthorities();
    }

    @GetMapping("/createAccount")
    public void insertUser(@RequestParam(value = "username") String user,
                           @RequestParam(value = "psw") String psw) {
        userService.insertUser(user, psw);
    }

}