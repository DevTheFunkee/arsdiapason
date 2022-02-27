package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.mybatis.model.ProvaScheda;
import comboDev.arsdiapason.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class TestResultController implements BasicController  {

    @Autowired
    private TestResultService testResultService;

    @PostMapping("/getResultChildTest")
    public List<ProvaScheda> getResultChildTest(@RequestParam Integer idBambino) {
        return testResultService.getResultChildTest(idBambino);
    }

}