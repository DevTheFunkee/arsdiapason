package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.mybatis.model.Bambino;
import comboDev.arsdiapason.mybatis.model.Psicologo;
import comboDev.arsdiapason.service.ChildListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChildListController implements BasicController  {

    @Autowired
    ChildListService childListService;

    @PostMapping("/childsList")
    public List<Bambino> childsList(Authentication authentication) {
        Psicologo psicologo = (Psicologo) authentication.getDetails();
        return childListService.childsList(psicologo.getId());
    }

}