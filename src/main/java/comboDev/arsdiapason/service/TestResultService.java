package comboDev.arsdiapason.service;

import comboDev.arsdiapason.mybatis.mapper.BambinoMapper;
import comboDev.arsdiapason.mybatis.mapper.ProvaSchedaMapper;
import comboDev.arsdiapason.mybatis.mapper.RelBambinoSchedaMapper;
import comboDev.arsdiapason.mybatis.mapper.SchedaMapper;
import comboDev.arsdiapason.mybatis.model.ProvaScheda;
import comboDev.arsdiapason.mybatis.model.RelBambinoScheda;
import comboDev.arsdiapason.mybatis.model.RelBambinoSchedaExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestResultService {

    @Autowired
    private BambinoMapper bambinoMapper;
    @Autowired
    private SchedaMapper schedaMapper;
    @Autowired
    private ProvaSchedaMapper provaSchedaMapper;
    @Autowired
    private RelBambinoSchedaMapper relBambinoSchedaMapper;

    @Transactional(readOnly = true)
    public List<ProvaScheda> getResultChildTest(Integer idBambino) {
        RelBambinoSchedaExample relBambinoSchedaExample = new RelBambinoSchedaExample();
        relBambinoSchedaExample.createCriteria().andIdBambinoEqualTo(idBambino);
        List<RelBambinoScheda> relBambinoSchedas = relBambinoSchedaMapper.selectByExample(relBambinoSchedaExample);
        List<ProvaScheda> provaSchedas = new ArrayList<>();
        for (RelBambinoScheda relBambinoScheda: relBambinoSchedas) {
            provaSchedas.add(provaSchedaMapper.selectByPrimaryKey(relBambinoScheda.getIdProvaScheda()));
        }
        return provaSchedas;
    }

}
