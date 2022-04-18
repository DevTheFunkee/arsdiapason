package comboDev.arsdiapason.controller;

import comboDev.arsdiapason.dto.DatiIstituto;
import comboDev.arsdiapason.mybatis.model.Istituto;
import comboDev.arsdiapason.mybatis.model.RelPsicologoIstituto;
import comboDev.arsdiapason.service.GestisciIstitutiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GestisciIstitutiController implements BasicController  {

    @Autowired
    private GestisciIstitutiService gestisciIstitutiService;

    @PostMapping("/getListaIstituti")
    public List<Istituto> getListaIstituti() {
        return gestisciIstitutiService.getListaIstituti();
    }
    
    @PostMapping("/getIstitutoForExcel")
    public Istituto getListaIstitutiExcel(@RequestParam Integer idIstituto) {
        return gestisciIstitutiService.getIstituto(idIstituto);
    }

    @PostMapping("/inserisciIstituto")
    public Istituto inserisciIstituto(Authentication authentication, @RequestBody Istituto istituto) {
        return gestisciIstitutiService.inserisciIstituto(istituto, (Integer) authentication.getDetails());
    }

    @PostMapping("/saveModIstituto")
    public Istituto saveModIstituto(@RequestBody Istituto istituto) {
        return gestisciIstitutiService.saveModIstituto(istituto);
    }

    @PostMapping("/eliminaIstituto")
    public void eliminaIstituto(Authentication authentication, @RequestParam Integer idIstituto) throws Exception {
        gestisciIstitutiService.eliminaIstituto(idIstituto,(Integer) authentication.getDetails());
    }
    
	@PostMapping("/inviaMailIstituto")
	public void inviaMailIstituto(Authentication authentication, @RequestBody DatiIstituto istituto) throws Exception {
		gestisciIstitutiService.inviaMail(istituto,(Integer) authentication.getDetails());
	}
	
	@PostMapping("/getCode")
	public RelPsicologoIstituto getCodice(@RequestParam Integer idIstituto, @RequestParam Integer idPsicologo) throws Exception {
		return gestisciIstitutiService.getCodice(idIstituto, idPsicologo);
	}
}