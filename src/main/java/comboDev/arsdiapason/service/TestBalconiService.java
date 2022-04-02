package comboDev.arsdiapason.service;

import comboDev.arsdiapason.dto.DatiSchede;
import comboDev.arsdiapason.dto.TestBalconi;
import comboDev.arsdiapason.mybatis.mapper.BambinoMapper;
import comboDev.arsdiapason.mybatis.mapper.ProvaSchedaMapper;
import comboDev.arsdiapason.mybatis.mapper.RelBambinoSchedaMapper;
import comboDev.arsdiapason.mybatis.mapper.SchedaMapper;
import comboDev.arsdiapason.mybatis.model.Bambino;
import comboDev.arsdiapason.mybatis.model.RelBambinoScheda;
import comboDev.arsdiapason.mybatis.model.RelBambinoSchedaExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class TestBalconiService {

    @Autowired
    private BambinoMapper bambinoMapper;
    @Autowired
    private SchedaMapper schedaMapper;
    @Autowired
    private ProvaSchedaMapper provaSchedaMapper;
    @Autowired
    private RelBambinoSchedaMapper relBambinoSchedaMapper;

    @Transactional(readOnly = true)
    public DatiSchede getDatiSchede(Integer idBambino) {
        DatiSchede datiSchede = new DatiSchede();
        if(idBambino != null) {
            datiSchede.setBambino(bambinoMapper.selectByPrimaryKey(idBambino));
            RelBambinoSchedaExample relBambinoSchedaExample = new RelBambinoSchedaExample();
            relBambinoSchedaExample.createCriteria().andIdBambinoEqualTo(idBambino);
            datiSchede.setRelBambinoSchede(relBambinoSchedaMapper.selectByExample(relBambinoSchedaExample));
        }
        datiSchede.setSchede(schedaMapper.selectByExample(null));
        datiSchede.setProveSchede(provaSchedaMapper.selectByExample(null));
        return datiSchede;
    }

    @Transactional(rollbackFor = Exception.class)
    public void saveTest(TestBalconi testBalconi) {
        for (Byte idProvaScheda: testBalconi.getIdsProvaSceda()) {
            RelBambinoScheda relBambinoScheda = new RelBambinoScheda();
            relBambinoScheda.setIdBambino(testBalconi.getBambino().getId());
            relBambinoScheda.setIdProvaScheda(idProvaScheda);
            relBambinoSchedaMapper.insertSelective(relBambinoScheda);
        }
        Bambino bambino = testBalconi.getBambino();
        bambino.setDataTest(testBalconi.getBambino().getDataTest());
        bambino.setId(testBalconi.getBambino().getId());
        bambino.setTestFinito(true);
        bambinoMapper.updateByPrimaryKey(bambino);
    }

}
