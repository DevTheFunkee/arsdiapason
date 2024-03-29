package comboDev.arsdiapason.service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.apache.commons.lang3.StringUtils;

import comboDev.arsdiapason.dto.DatiUtente;
import comboDev.arsdiapason.mybatis.mapper.PsicologoMapper;
import comboDev.arsdiapason.mybatis.mapper.UtenteMapper;
import comboDev.arsdiapason.mybatis.model.Psicologo;
import comboDev.arsdiapason.mybatis.model.PsicologoExample;
import comboDev.arsdiapason.mybatis.model.Utente;

@Service
public class UserService {

	@Autowired
	private UtenteMapper utenteMapper;
	@Autowired
	private PsicologoMapper psicologoMapper;
	@Autowired
	private MailService mailService;

	@Transactional(readOnly = true)
	public Utente login(String email, String password) throws Exception {
		Utente utente = utenteMapper.selectByPrimaryKey(email);
		if (BCrypt.checkpw(password, utente.getPassword())) {
			if (!utente.getActive()) {
				throw new Exception("",
						new Throwable("Utente non attivo, controllare la mail per completare la registrazione"));
			}
			return utente;
		} else {
			throw new Exception("", new Throwable("Password non corretta"));
		}
	}

	@Transactional(rollbackFor = Exception.class)
	public void createAccount(DatiUtente datiUtente, String regexPassword) throws Exception {
		Pattern pattern = Pattern.compile(regexPassword);
		Matcher matcher = pattern.matcher(datiUtente.getPassword());
		int temporaryCode = ThreadLocalRandom.current().nextInt(100000, 1000000);
		if (matcher.find()) {
			Psicologo psicologo = new Psicologo();
			psicologo.setNome(datiUtente.getNome());
			psicologo.setCognome(datiUtente.getCognome());
			psicologoMapper.insert(psicologo);
			Utente utente = new Utente();
			utente.setTemporaryCode(temporaryCode);
			utente.setIdPsicologo(psicologo.getId());
			utente.setEmail(datiUtente.getEmail());
			utente.setPassword(BCrypt.hashpw(datiUtente.getPassword(), BCrypt.gensalt()));
			utente.setRole("PSICOLOGO");
			utenteMapper.insertSelective(utente);
		} else {
			throw new Exception("", new Throwable("La password non rispetta i requisiti richiesti"));
		}
		mailService.sendAuthenticationEmail(datiUtente, temporaryCode);
	}

	public Utente confirmAccount(DatiUtente confirmAccount) throws Exception {
		Utente utente = utenteMapper.selectByPrimaryKey(confirmAccount.getEmail());
		if (!BCrypt.checkpw(confirmAccount.getPassword(), utente.getPassword())
				|| confirmAccount.getTemporaryCode() != utente.getTemporaryCode()) {
			throw new Exception("", new Throwable("Dati non corretti"));
		}
		utente.setActive(true);
		utente.setTemporaryCode(null);
		utenteMapper.updateByPrimaryKey(utente);
		return utente;
	}

	public void sendResetPasswordEmail(DatiUtente datiUtente) throws Exception {
		Utente utente = utenteMapper.selectByPrimaryKey(datiUtente.getEmail());
		if (utente != null) {
			int temporaryCode = ThreadLocalRandom.current().nextInt(100000, 1000000);
			utente.setTemporaryCode(temporaryCode);
			utenteMapper.updateByPrimaryKey(utente);
			mailService.sendResetPasswordEmail(datiUtente, temporaryCode);
		} else if (utente == null) {
			throw new Exception("", new Throwable("Mail non presente a sistema, è necessario registrarsi"));
		} else if (utente.getActive()) {
			throw new Exception("", new Throwable("Utente non attivo, controllare la mail per attivare l'utenza"));
		}
	}

	public Utente resetPassword(DatiUtente datiUtente) throws Exception {
		Utente utente = utenteMapper.selectByPrimaryKey(datiUtente.getEmail());
		if (utente == null || datiUtente.getTemporaryCode() != utente.getTemporaryCode()) {
			throw new Exception("", new Throwable("Dati non corretti"));
		}
		utente.setActive(true);
		utente.setPassword(BCrypt.hashpw(datiUtente.getPassword(), BCrypt.gensalt()));
		utente.setTemporaryCode(null);
		utenteMapper.updateByPrimaryKey(utente);
		return utente;
	}

	public List<Psicologo> getListaPsicologo() {
		PsicologoExample example = new PsicologoExample();
		return psicologoMapper.selectByExample(example);
	}

	public Psicologo login(Integer psicologoId, String admin) throws Exception {
		if(!StringUtils.isBlank(admin) && "admin".equalsIgnoreCase(admin)) {
			Utente utente = utenteMapper.selectByPrimaryKey(null);
			return psicologoMapper.selectByPrimaryKey(psicologoId);
		}
		else if(!StringUtils.isBlank(admin) && !"admin".equalsIgnoreCase(admin)) {
			throw new Exception("", new Throwable("dati non corretti per gestione admin"));
		}
		else if(StringUtils.isBlank(admin)) {
			return psicologoMapper.selectByPrimaryKey(psicologoId);
		}
		
		return psicologoMapper.selectByPrimaryKey(psicologoId);
	}


}
