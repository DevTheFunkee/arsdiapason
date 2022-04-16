package comboDev.arsdiapason.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import comboDev.arsdiapason.mybatis.mapper.IstitutoMapper;
import comboDev.arsdiapason.mybatis.model.Istituto;

@Service
public class GestisciIstitutiService {

	@Autowired
	private IstitutoMapper istitutoMapper;

	@Transactional(readOnly = true)
	public List<Istituto> getListaIstituti() {
		return istitutoMapper.selectAll();
	}

	@Transactional(rollbackFor = Exception.class)
	public Istituto inserisciIstituto(Istituto istituto) {
		istitutoMapper.insert(istituto);
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
	
	@Transactional(rollbackFor = Exception.class)
	public void inviaMail(Istituto istituto) throws Exception {
		try {
			
		} catch (Exception e) {
			throw new Exception("",
					new Throwable("Non è possibile inviare la mail all'istituo scelto"));
		}
	}
}
