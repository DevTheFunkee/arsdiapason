package comboDev.arsdiapason.service;

import comboDev.arsdiapason.model.DatiSchede;
import comboDev.arsdiapason.mybatis.mapper.BambinoMapper;
import comboDev.arsdiapason.mybatis.mapper.ProvaSchedaMapper;
import comboDev.arsdiapason.mybatis.mapper.SchedaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TestBalconiService {

    @Autowired
    private BambinoMapper bambinoMapper;
    @Autowired
    private SchedaMapper schedaMapper;
    @Autowired
    private ProvaSchedaMapper provaSchedaMapper;

    @Transactional(readOnly = true)
    public DatiSchede getDatiSchede(Integer idBambino) {
        DatiSchede datiSchede = new DatiSchede();
        datiSchede.setBambino(bambinoMapper.selectByPrimaryKey(idBambino));
        datiSchede.setSchede(schedaMapper.selectByExample(null));
        datiSchede.setProveSchede(provaSchedaMapper.selectByExample(null));
        return datiSchede;
    }

}
