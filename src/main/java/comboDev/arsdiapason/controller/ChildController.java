package comboDev.arsdiapason.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import comboDev.arsdiapason.mybatis.model.Bambino;
import comboDev.arsdiapason.service.ChildListService;
import comboDev.arsdiapason.service.InsertChildService;

@RestController
public class ChildController implements BasicController {

	@Autowired
	private InsertChildService insertChildService;

	@Autowired
	private ChildListService childListService;

	@PostMapping("/findSezioni")
	public List<String> findSezioni(@RequestParam Integer idIstituto) {
		return insertChildService.findSezioni(idIstituto);
	}

	@PostMapping("/insertChild")
	public void insertChild(Authentication authentication, @RequestBody Bambino bambino) {
		insertChildService.insertChild(bambino, (Integer) authentication.getDetails());
	}

	@PostMapping("/deleteChild")
	public void deleteChild(Authentication authentication, @RequestParam Integer idBambino) {
		insertChildService.deleteChild(idBambino, (Integer) authentication.getDetails());
	}

	@PostMapping("/insertChilds")
	public void insertChilds(Authentication authentication, @RequestBody List<Bambino> bambini) {
		insertChildService.insertChilds(bambini, (Integer) authentication.getDetails());
	}

	@PostMapping("/insertChildsForExcel")
	public void insertChildsForExcel(@RequestParam Integer idPsicologo, @RequestBody List<Bambino> bambini) {
		insertChildService.insertChildsForExcel(bambini, idPsicologo);
	}

	@PostMapping("/childsList")
	public List<Bambino> childsList(Authentication authentication) {
		return childListService.childsList((Integer) authentication.getDetails());
	}
	
	@PostMapping("/child")
	public Bambino child(@RequestParam Integer idBambino) {
		return childListService.child( idBambino);
	}

}