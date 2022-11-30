package comboDev.arsdiapason.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import comboDev.arsdiapason.dto.DatiIstituto;
import comboDev.arsdiapason.mybatis.model.Istituto;
import comboDev.arsdiapason.mybatis.model.Psicologo;
import comboDev.arsdiapason.mybatis.model.RelPsicologoIstituto;
import comboDev.arsdiapason.service.GestisciIstitutiService;

@RestController
public class GestisciIstitutiController implements BasicController {

	@Autowired
	private GestisciIstitutiService gestisciIstitutiService;

	@PostMapping("/getListaIstituti")
	public List<Istituto> getListaIstituti(Authentication authentication) {
		return gestisciIstitutiService.getListaIstituti((Integer) authentication.getDetails());
	}
	
	
	@PostMapping("/getListaIstitutiCompleta")
	public List<Istituto> getListaIstitutiCompleta(Authentication authentication) {
		return gestisciIstitutiService.getListaIstitutiCompleta((Integer) authentication.getDetails());
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
		gestisciIstitutiService.eliminaIstituto(idIstituto, (Integer) authentication.getDetails());
	}

	@PostMapping("/inviaMailIstituto")
	public void inviaMailIstituto(Authentication authentication, @RequestBody DatiIstituto istituto) throws Exception {
		gestisciIstitutiService.inviaMail(istituto, (Integer) authentication.getDetails());
	}
	
	@PostMapping("/inviaMailAdmin")
	public void inviaMailAdmin(Authentication authentication, @RequestBody DatiIstituto istituto) throws Exception {
		gestisciIstitutiService.inviaMailAdmin(istituto, (Integer) authentication.getDetails());
	}

	@PostMapping("/getCode")
	public RelPsicologoIstituto getCodice(@RequestParam Integer idIstituto, @RequestParam Integer idPsicologo)
			throws Exception {
		return gestisciIstitutiService.getCodice(idIstituto, idPsicologo);
	}

	@PostMapping("/getIstituoPsicologo")
	public List<Istituto> getIstitutoPsicologo()
			throws Exception {
		return gestisciIstitutiService.getIstituoPsicologo();
	}

	@PostMapping("/saveRelationIstitutoPsicologo")
	public void saveRelationPsicologoIstituto(@RequestParam Integer idIstituto, @RequestParam Integer idPsicologo)
			throws Exception {
		gestisciIstitutiService.updateIstituoPsicologo(idIstituto, idPsicologo);
	}
	
	@PostMapping("/addPsicologoRelationInsitute")
	public void addRelationPsicologoIstituto(@RequestParam Integer idPsicologo, @RequestParam Integer idIstituto)
			throws Exception {
		gestisciIstitutiService.addPsicologoToInstitute(idPsicologo , idIstituto);
	}
	
    
    @PostMapping("/deletePsicologoFromInsitute")
    public void deletePsicologoFromInsititute(@RequestParam Integer idPsicologo, @RequestParam Integer idIstituto) throws Exception {
         gestisciIstitutiService.deletePsicologoFromInstitute(idPsicologo, idIstituto);
    }
}