package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.dto.DatiSchede;
import comboDev.arsdiapason.dto.TestBalconi;
import comboDev.arsdiapason.service.TestBalconiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;


@RestController
public class TestBalconiController implements BasicController  {

    @Autowired
    private TestBalconiService testBalconiService;

    @PostMapping("/getDatiSchede")
    public DatiSchede getDatiSchede(@RequestParam(required = false) Integer idBambino) {
        return testBalconiService.getDatiSchede(idBambino);
    }

    @PostMapping("/saveTest")
    public void saveTest(@RequestBody TestBalconi testBalconi) {
        testBalconiService.saveTest(testBalconi);
    }

}