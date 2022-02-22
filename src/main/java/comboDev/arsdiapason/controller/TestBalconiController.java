package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.model.DatiSchede;
import comboDev.arsdiapason.service.TestBalconiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestBalconiController implements BasicController  {

    @Autowired
    private TestBalconiService testBalconiService;

    @PostMapping("/getDatiSchede")
    public DatiSchede getDatiSchede(Integer idBambino) {
        return testBalconiService.getDatiSchede(idBambino);
    }

}