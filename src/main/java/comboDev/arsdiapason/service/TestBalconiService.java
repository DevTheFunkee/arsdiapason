package comboDev.arsdiapason.service;

import comboDev.arsdiapason.model.DatiSchede;
import comboDev.arsdiapason.mybatis.mapper.ProvaSchedaMapper;
import comboDev.arsdiapason.mybatis.mapper.SchedaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestBalconiService {

    @Autowired
    private SchedaMapper schedaMapper;
    @Autowired
    private ProvaSchedaMapper provaSchedaMapper;

    public DatiSchede getDatiSchede() {
        DatiSchede datiSchede = new DatiSchede();
        datiSchede.setSchede(schedaMapper.selectByExample(null));
        datiSchede.setProveSchede(provaSchedaMapper.selectByExample(null));
        return datiSchede;
    }

}
