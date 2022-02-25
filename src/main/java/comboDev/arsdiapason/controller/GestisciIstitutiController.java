package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.mybatis.model.Istituto;
import comboDev.arsdiapason.service.GestisciIstitutiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GestisciIstitutiController implements BasicController  {

    @Autowired
    private GestisciIstitutiService gestisciIstitutiService;

    @PostMapping("/getListaIstituti")
    public List<Istituto> getListaIstituti(Authentication authentication) {
        return gestisciIstitutiService.getListaIstituti((Integer) authentication.getDetails());
    }

    @PostMapping("/inserisciIstituto")
    public Istituto inserisciIstituto(Authentication authentication, @RequestBody Istituto istituto) {
        return gestisciIstitutiService.inserisciIstituto(istituto, (Integer) authentication.getDetails());
    }

}