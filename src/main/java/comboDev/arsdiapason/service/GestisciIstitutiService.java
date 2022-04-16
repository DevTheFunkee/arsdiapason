package comboDev.arsdiapason.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import comboDev.arsdiapason.mybatis.mapper.IstitutoMapper;
import comboDev.arsdiapason.mybatis.mapper.RelPsicologoIstitutoMapper;
import comboDev.arsdiapason.mybatis.model.Istituto;
import comboDev.arsdiapason.mybatis.model.RelPsicologoIstituto;

@Service
public class GestisciIstitutiService {

	@Autowired
	private IstitutoMapper istitutoMapper;

	@Autowired
	private RelPsicologoIstitutoMapper relPsicologoIstitutoMapper;

	@Transactional(readOnly = true)
	public List<Istituto> getListaIstituti() {
		return istitutoMapper.findAll();
	}

	@Transactional(rollbackFor = Exception.class)
	public Istituto inserisciIstituto(Istituto istituto, Integer idPsicologo) {
		istitutoMapper.insert(istituto);
		RelPsicologoIstituto relPsicologoIstituto = new RelPsicologoIstituto();
		relPsicologoIstituto.setIdIstituto(istituto.getId());
		relPsicologoIstituto.setIdPsicologo(idPsicologo);
		relPsicologoIstitutoMapper.insert(relPsicologoIstituto);
		return istituto;
	}

	@Transactional(rollbackFor = Exception.class)
	public Istituto saveModIstituto(Istituto istituto) {
		istitutoMapper.updateByPrimaryKeySelective(istituto);
		return istituto;
	}

	@Transactional(rollbackFor = Exception.class)
	public void eliminaIstituto(Integer idIstituto) throws Exception {
		try {
			istitutoMapper.deleteByPrimaryKey(idIstituto);
		} catch (DataIntegrityViolationException e) {
			throw new Exception("",
					new Throwable("Non è possibile eliminare l'istituto in quanto collegato a dei bambini"));
		}
	}
}
