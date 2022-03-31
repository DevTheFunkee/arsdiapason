package comboDev.arsdiapason.service;

import comboDev.arsdiapason.mybatis.mapper.IstitutoMapper;
import comboDev.arsdiapason.mybatis.model.Istituto;
import comboDev.arsdiapason.mybatis.model.IstitutoExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class GestisciIstitutiService {

    @Autowired
    private IstitutoMapper istitutoMapper;

    @Transactional(readOnly = true)
    public List<Istituto> getListaIstituti(Integer idPsicologo) {
        IstitutoExample istitutoExample = new IstitutoExample();
        List ids = Arrays.asList(new Integer[] { idPsicologo, 0 });
        istitutoExample.createCriteria().andIdPsicologoIn(ids);
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
    public void eliminaIstituto(Integer idIstituto) throws Exception {
        try {
            istitutoMapper.deleteByPrimaryKey(idIstituto);
        } catch (DataIntegrityViolationException e) {
            throw new Exception("", new Throwable("Non è possibile eliminare l'istituto in quanto collegato a dei bambini"));
        }
    }
}
