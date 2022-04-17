package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.mybatis.model.Bambino;
import comboDev.arsdiapason.service.InsertChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InsertChildController implements BasicController  {

    @Autowired
    private InsertChildService insertChildService;

    @PostMapping("/findSezioni")
    public List<String> findSezioni(@RequestParam Integer idIstituto) {
        return insertChildService.findSezioni(idIstituto);
    }

    @PostMapping("/insertChild")
    public void insertChild(Authentication authentication, @RequestBody Bambino bambino) {
        insertChildService.insertChild(bambino, (Integer) authentication.getDetails());
    }
    @PostMapping("/insertChildsForExcel")
    public void insertChildsForExcel(Authentication authentication, @RequestBody Bambino bambino) {
        insertChildService.insertChild(bambino, (Integer) authentication.getDetails());
    }
    
    @PostMapping("/insertChilds")
    public void insertChilds(Authentication authentication, @RequestBody List<Bambino> bambini) {
        insertChildService.insertChilds(bambini, (Integer) authentication.getDetails());
    }

}