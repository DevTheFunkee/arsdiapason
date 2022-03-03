package comboDev.arsdiapason.service;

import comboDev.arsdiapason.dto.ResultChildTest;
import comboDev.arsdiapason.mybatis.mapper.BambinoMapper;
import comboDev.arsdiapason.mybatis.mapper.ProvaSchedaMapper;
import comboDev.arsdiapason.mybatis.mapper.RelBambinoSchedaMapper;
import comboDev.arsdiapason.mybatis.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaginaGraficiService {

    @Autowired
    private BambinoMapper bambinoMapper;
    @Autowired
    private RelBambinoSchedaMapper relBambinoSchedaMapper;
    @Autowired
    private ProvaSchedaMapper provaSchedaMapper;

    @Transactional(readOnly = true)
    public List<ResultChildTest> getTestsByIstituto(Integer idIstituto) {
        List<ResultChildTest> resultChildTests = new ArrayList<>();
        ResultChildTest resultChildTest = new ResultChildTest();
        BambinoExample bambinoExample = new BambinoExample();
        bambinoExample.createCriteria().andIdIstitutoEqualTo(idIstituto);
        List<Bambino> bambini = bambinoMapper.selectByExample(bambinoExample);
        for (Bambino bambino: bambini) {
            RelBambinoSchedaExample relBambinoSchedaExample = new RelBambinoSchedaExample();
            relBambinoSchedaExample.createCriteria().andIdBambinoEqualTo(bambino.getId());
            List<RelBambinoScheda> relBambinoSchedas = relBambinoSchedaMapper.selectByExample(relBambinoSchedaExample);
            List<ProvaScheda> provaSchedas = new ArrayList<>();
            for (RelBambinoScheda relBambinoScheda: relBambinoSchedas) {
                ProvaScheda provaScheda = provaSchedaMapper.selectByPrimaryKey(relBambinoScheda.getIdProvaScheda());
                if(provaScheda != null) {
                    provaSchedas.add(provaSchedaMapper.selectByPrimaryKey(relBambinoScheda.getIdProvaScheda()));
                }
            }
            if(provaSchedas.size() > 0) {
                resultChildTest.setProveSchede(provaSchedas);
                resultChildTest.setBambino(bambino);
                resultChildTests.add(resultChildTest);
            }
        }
        return resultChildTests;
    }

}
