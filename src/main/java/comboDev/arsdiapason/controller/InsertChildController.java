package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.mybatis.model.Bambino;
import comboDev.arsdiapason.service.InsertChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InsertChildController implements BasicController  {

    @Autowired
    InsertChildService insertChildService;

    @PostMapping("/insertChild")
    public void insertChild(@RequestBody Bambino bambino) {
        insertChildService.insertChild(bambino);
    }

}