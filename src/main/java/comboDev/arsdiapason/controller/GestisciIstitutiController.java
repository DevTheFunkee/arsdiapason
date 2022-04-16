package comboDev.arsdiapason.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import comboDev.arsdiapason.mybatis.model.Istituto;
import comboDev.arsdiapason.service.GestisciIstitutiService;

@RestController
public class GestisciIstitutiController implements BasicController {

	@Autowired
	private GestisciIstitutiService gestisciIstitutiService;

	@PostMapping("/getListaIstituti")
	public List<Istituto> getListaIstituti() {
		return gestisciIstitutiService.getListaIstituti();
	}

	@PostMapping("/inserisciIstituto")
	public Istituto inserisciIstituto(@RequestBody Istituto istituto) {
		return gestisciIstitutiService.inserisciIstituto(istituto);
	}

	@PostMapping("/saveModIstituto")
	public Istituto saveModIstituto(@RequestBody Istituto istituto) {
		return gestisciIstitutiService.saveModIstituto(istituto);
	}

	@PostMapping("/eliminaIstituto")
	public void eliminaIstituto(@RequestParam Integer idIstituto) throws Exception {
		gestisciIstitutiService.eliminaIstituto(idIstituto);
	}
	

	@PostMapping("/inviaMailIstituto")
	public void inviaMailIstituto(@RequestBody Istituto istituto) throws Exception {
		gestisciIstitutiService.inviaMail(istituto);
	}

}