package comboDev.arsdiapason.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import comboDev.arsdiapason.dto.DatiIstituto;
import comboDev.arsdiapason.mybatis.customMapper.CustomMapper;
import comboDev.arsdiapason.mybatis.mapper.IstitutoMapper;
import comboDev.arsdiapason.mybatis.mapper.PsicologoMapper;
import comboDev.arsdiapason.mybatis.mapper.RelPsicologoIstitutoMapper;
import comboDev.arsdiapason.mybatis.model.Istituto;
import comboDev.arsdiapason.mybatis.model.Psicologo;
import comboDev.arsdiapason.mybatis.model.RelPsicologoIstituto;
import comboDev.arsdiapason.mybatis.model.RelPsicologoIstitutoExample;

@Service
public class GestisciIstitutiService {

	@Autowired
	private IstitutoMapper istitutoMapper;

	@Autowired
	private PsicologoMapper psicologoMapper;

	@Autowired
	private RelPsicologoIstitutoMapper relPsicologoIstitutoMapper;

	@Autowired
	private MailService mailService;
	@Autowired
	private CustomMapper customMapper;

	@Transactional(readOnly = true)
	public List<Istituto> getListaIstituti(Integer idPsicologo) {
		RelPsicologoIstitutoExample relPsicologoIstitutoExample = new RelPsicologoIstitutoExample();
		relPsicologoIstitutoExample.createCriteria().andIdPsicologoEqualTo(idPsicologo);
		List<RelPsicologoIstituto> relPsiIstList = relPsicologoIstitutoMapper
				.selectByExample(relPsicologoIstitutoExample);
		List<Istituto> istituti = new ArrayList<>();
		for (RelPsicologoIstituto relPsicologoIstituto : relPsiIstList) {
			Istituto selectByPrimaryKey = istitutoMapper.selectByPrimaryKey(relPsicologoIstituto.getIdIstituto());
			selectByPrimaryKey.setCaricato(relPsicologoIstituto.getCaricato());
			istituti.add(selectByPrimaryKey);
		}
		return istituti;
	}
	@Transactional(readOnly = true)
	public List<Istituto> getListaIstitutiCompleta(Integer idPsicologo) {
		List<Istituto> listIst = customMapper.findAll();
		listIst.stream().forEach(i -> {
			RelPsicologoIstituto istituto = relPsicologoIstitutoMapper.selectByPrimaryKey(idPsicologo, i.getId());
			if(istituto != null) {
			i.setAssociato(Boolean.TRUE);
			i.setCaricato(istituto.getCaricato());
			}
			else {
			i.setAssociato(Boolean.FALSE);
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
					new Throwable("Non è possibile eliminare l'istituto in quanto collegato a dei bambini"));
		}
	}

	@Transactional(rollbackFor = Exception.class)
	public void inviaMail(DatiIstituto istituto, Integer idPsicologo) throws Exception {
		try {
			mailService.sendIstitutoEmail(istituto, idPsicologo);
		} catch (Exception e) {
			throw new Exception("",
					new Throwable("Non è possibile inviare la mail all'istituo scelto: " + e.getMessage()));
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
					new Throwable("Non è possibile eliminare l'istituto in quanto collegato a dei bambini"));
		}
	}

	public List<Istituto> getIstituoPsicologo() {
		List<Istituto> listIst = customMapper.findAll();

		listIst.stream().forEach(i -> {
			RelPsicologoIstitutoExample example = new RelPsicologoIstitutoExample();
			example.createCriteria().andIdIstitutoEqualTo(i.getId());
			List<RelPsicologoIstituto> istituto = relPsicologoIstitutoMapper.selectByExample(example);
			List<Psicologo> psicologhi = new ArrayList<>();
			for (RelPsicologoIstituto psiIst : istituto) {
				Psicologo psicologo = psicologoMapper.selectByPrimaryKey(psiIst.getIdPsicologo());
				psicologhi.add(psicologo);
				i.setPsicologhi(psicologhi);
			}

		});
		return listIst;
	}

	public void updateIstituoPsicologo(Integer idIstituto, Integer idPsicologo) {
		RelPsicologoIstituto relPsicologoIstituto = new RelPsicologoIstituto();
		relPsicologoIstituto.setIdIstituto(idIstituto);
		relPsicologoIstituto.setIdPsicologo(idPsicologo);
		customMapper.updateRelationByKey(relPsicologoIstituto);
	}

	public void deletePsicologoFromInstitute(Integer idPsicologo, Integer idIstituto) throws Exception {
		try {
			relPsicologoIstitutoMapper.deleteByPrimaryKey(idPsicologo, idIstituto);
		} catch (DataIntegrityViolationException e) {
			throw new Exception("",
					new Throwable("Non è possibile eliminare lo psicologo dall'istituto in quanto è collegato ad altri bambini"));
		}
	}

	public void addPsicologoToInstitute(Integer idPsicologo,Integer idIstituto ) throws Exception {
		try {
			RelPsicologoIstituto relazione = new RelPsicologoIstituto();
			relazione.setCaricato("N");
			relazione.setIdIstituto(idIstituto);
			relazione.setIdPsicologo(idPsicologo);
			relPsicologoIstitutoMapper.insert(relazione);
		} catch (Exception e) {
			throw new Exception("",
					new Throwable("Non è possibile aggiungere altri psicologhi"));
		}
		
	}
	@Transactional(rollbackFor = Exception.class)
	public void inviaMailAdmin(DatiIstituto istituto, Integer idPsicologo) throws Exception {
		try {
			mailService.sendAdminEmail(istituto, idPsicologo);
		} catch (Exception e) {
			throw new Exception("",
					new Throwable("Non è possibile inviare la mail all'istituo scelto: " + e.getMessage()));
		}
		
	}
}
