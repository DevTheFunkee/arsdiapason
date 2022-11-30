package comboDev.arsdiapason.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import comboDev.arsdiapason.dto.DatiUtente;
import comboDev.arsdiapason.mybatis.mapper.PsicologoMapper;
import comboDev.arsdiapason.mybatis.model.Psicologo;
import comboDev.arsdiapason.mybatis.model.Utente;
import comboDev.arsdiapason.service.UserService;

@RestController
public class UserController implements BasicController {

	@Autowired
	private UserService userService;
	@Autowired
	private PsicologoMapper psicologoMapper;

	private final String regexEmail = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
	private final String regexPassword = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!=%*?^&+#])[A-Za-z0-9@$!=%*?^&+#]{8,20}$";

	@GetMapping("/getRegex")
	public Map<String, String> getRegex() {
		Map<String, String> regex = new HashMap<>();
		regex.put("email", regexEmail);
		regex.put("password", regexPassword);
		return regex;
	}

    @GetMapping("/login")
    public Psicologo login(Authentication authentication) {
        return psicologoMapper.selectByPrimaryKey((Integer) authentication.getDetails());
    }

	@PostMapping("/createAccount")
	public void createAccount(@RequestBody DatiUtente datiUtente)
			throws Exception {
		userService.createAccount(datiUtente, regexPassword);
	}

	@PostMapping("/confirmAccount")
	public Utente confirmAccount(@RequestBody DatiUtente datiUtente) throws Exception {
		return userService.confirmAccount(datiUtente);
	}

	@PostMapping("/sendResetPasswordEmail")
	public void sendResetPasswordEmail(@RequestBody DatiUtente datiUtente) throws Exception {
		userService.sendResetPasswordEmail(datiUtente);
	}

	@PostMapping("/resetPassword")
	public void resetPassword(@RequestBody DatiUtente datiUtente) throws Exception {
		userService.resetPassword(datiUtente);
	}

	@PostMapping("/psicologoList")
	public List<Psicologo> getPsicologoList() throws Exception {
		return userService.getListaPsicologo();
	}
}