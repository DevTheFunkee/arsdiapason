package comboDev.arsdiapason.service;

import comboDev.arsdiapason.mybatis.mapper.IstitutoMapper;
import comboDev.arsdiapason.mybatis.model.Istituto;
import comboDev.arsdiapason.mybatis.model.IstitutoExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GestisciIstitutiService {

    @Autowired
    private IstitutoMapper istitutoMapper;

    @Transactional(readOnly = true)
    public List<Istituto> getListaIstituti(Integer idPsicologo) {
        IstitutoExample istitutoExample = new IstitutoExample();
        istitutoExample.createCriteria().andIdPsicologoEqualTo(idPsicologo);
        return istitutoMapper.selectByExample(istitutoExample);
    }

    @Transactional(rollbackFor = Exception.class)
    public Istituto inserisciIstituto(Istituto istituto, Integer idPsicologo) {
        istituto.setIdPsicologo(idPsicologo);
        istitutoMapper.insert(istituto);
        return istituto;
    }

    @Transactional(rollbackFor = Exception.class)
    public Istituto saveModIstituto(Istituto istituto) {
        istitutoMapper.updateByPrimaryKeySelective(istituto);
        return istituto;
    }

    @Transactional(rollbackFor = Exception.class)
    public void eliminaIstituto(Integer idIstituto) {
        istitutoMapper.deleteByPrimaryKey(idIstituto);
    }
}
