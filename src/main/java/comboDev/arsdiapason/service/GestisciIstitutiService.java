package comboDev.arsdiapason.service;

import comboDev.arsdiapason.dto.DatiIstituto;
import comboDev.arsdiapason.mybatis.customMapper.CustomMapper;
import comboDev.arsdiapason.mybatis.mapper.IstitutoMapper;
import comboDev.arsdiapason.mybatis.mapper.RelPsicologoIstitutoMapper;
import comboDev.arsdiapason.mybatis.model.Istituto;
import comboDev.arsdiapason.mybatis.model.RelPsicologoIstituto;
import comboDev.arsdiapason.mybatis.model.RelPsicologoIstitutoExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class GestisciIstitutiService {

	@Autowired
	private IstitutoMapper istitutoMapper;

	@Autowired
	private RelPsicologoIstitutoMapper relPsicologoIstitutoMapper;

	@Autowired
	private MailService mailService;

	@Autowired
	private CustomMapper mapper;

	@Transactional(readOnly = true)
	public List<Istituto> getListaIstituti(Integer idPsicologo) {
		List<Istituto> listIst = mapper.findAll();
		listIst.stream().forEach(i -> {
			RelPsicologoIstituto istituto = relPsicologoIstitutoMapper.selectByPrimaryKey(idPsicologo, i.getId());
			if(istituto != null) {
			i.setCaricato(istituto.getCaricato());
			}
		});
		return listIst;
	}

	@Transactional(readOnly = true)
	public Istituto getIstituto(Integer idIstituto) {
		return istitutoMapper.selectByPrimaryKey(idIstituto);
	}

	@Transactional(rollbackFor = Exception.class)
	public Istituto inserisciIstituto(Istituto istituto, Integer idPsicologo) {
		int temporaryCode = ThreadLocalRandom.current().nextInt(100000, 1000000);
		istitutoMapper.insert(istituto);
		RelPsicologoIstituto relPsicologoIstituto = new RelPsicologoIstituto();
		relPsicologoIstituto.setIdIstituto(istituto.getId());
		relPsicologoIstituto.setIdPsicologo(idPsicologo);
		relPsicologoIstituto.setCodice(temporaryCode);
		relPsicologoIstituto.setCaricato("N");
		relPsicologoIstitutoMapper.insert(relPsicologoIstituto);
		return istituto;
	}

	@Transactional(rollbackFor = Exception.class)
	public Istituto saveModIstituto(Istituto istituto) {
		istitutoMapper.updateByPrimaryKeySelective(istituto);
		return istituto;
	}

	@Transactional(rollbackFor = Exception.class)
	public void eliminaIstituto(Integer idIstituto, Integer idPsicologo) throws Exception {
		try {
			relPsicologoIstitutoMapper.deleteByPrimaryKey(idPsicologo, idIstituto);
			istitutoMapper.deleteByPrimaryKey(idIstituto);
		} catch (DataIntegrityViolationException e) {
			throw new Exception("",
					new Throwable("Non ?? possibile eliminare l'istituto in quanto collegato a dei bambini"));
		}
	}

	@Transactional(rollbackFor = Exception.class)
	public void inviaMail(DatiIstituto istituto, Integer idPsicologo) throws Exception {
		try {
			mailService.sendIstitutoEmail(istituto, idPsicologo);
		} catch (Exception e) {
			throw new Exception("",
					new Throwable("Non ?? possibile inviare la mail all'istituo scelto: " + e.getMessage()));
		}
	}

	public RelPsicologoIstituto getCodice(Integer idIstituto, Integer idPsicologo) {
		RelPsicologoIstituto istituto = relPsicologoIstitutoMapper.selectByPrimaryKey(idPsicologo, idIstituto);
		return istituto;
	}

	public void eliminaIstituto(Integer idIstituto) throws Exception {
		try {
			istitutoMapper.deleteByPrimaryKey(idIstituto);
		} catch (DataIntegrityViolationException e) {
			throw new Exception("",
					new Throwable("Non ?? possibile eliminare l'istituto in quanto collegato a dei bambini"));
		}
	}
}
