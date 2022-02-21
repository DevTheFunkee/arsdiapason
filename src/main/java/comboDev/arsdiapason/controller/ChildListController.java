package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.mybatis.model.Bambino;
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
        return childListService.childsList((Integer) authentication.getDetails());
    }

}