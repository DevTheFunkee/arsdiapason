package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.model.ResultChildTest;
import comboDev.arsdiapason.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TestResultController implements BasicController  {

    @Autowired
    private TestResultService testResultService;

    @PostMapping("/getResultChildTest")
    public ResultChildTest getResultChildTest(@RequestParam Integer idBambino) {
        return testResultService.getResultChildTest(idBambino);
    }

}