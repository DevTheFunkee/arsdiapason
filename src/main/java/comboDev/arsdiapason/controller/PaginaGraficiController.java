package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.dto.ResultChildTest;
import comboDev.arsdiapason.service.PaginaGraficiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PaginaGraficiController implements BasicController  {

    @Autowired
    private PaginaGraficiService paginaGraficiService;

    @PostMapping("/getAllTests")
    public List<ResultChildTest> getAllTests(Authentication authentication) {
        return paginaGraficiService.getAllTests((Integer) authentication.getDetails());
    }

}