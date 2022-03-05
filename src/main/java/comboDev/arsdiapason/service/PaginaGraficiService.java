package comboDev.arsdiapason.service;

import comboDev.arsdiapason.dto.ResultChildTest;
import comboDev.arsdiapason.mybatis.mapper.BambinoMapper;
import comboDev.arsdiapason.mybatis.mapper.ProvaSchedaMapper;
import comboDev.arsdiapason.mybatis.mapper.RelBambinoSchedaMapper;
import comboDev.arsdiapason.mybatis.mapper.RelPsicologoBambinoMapper;
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
    private RelPsicologoBambinoMapper relPsicologoBambinoMapper;
    @Autowired
    private RelBambinoSchedaMapper relBambinoSchedaMapper;
    @Autowired
    private ProvaSchedaMapper provaSchedaMapper;

    @Transactional(readOnly = true)
    public List<ResultChildTest> getAllTests(Integer idPsicologo) {
        RelPsicologoBambinoExample relPsicologoBambinoExample = new RelPsicologoBambinoExample();
        relPsicologoBambinoExample.createCriteria().andIdPsicologoEqualTo(idPsicologo);
        List<RelPsicologoBambino> relations = relPsicologoBambinoMapper.selectByExample(relPsicologoBambinoExample);

        List<ResultChildTest> resultChildTests = new ArrayList<>();

        for(RelPsicologoBambino relation: relations) {

            ResultChildTest resultChildTest = new ResultChildTest();

            BambinoExample bambinoExample = new BambinoExample();
            bambinoExample.createCriteria().andIdEqualTo(relation.getIdBambino()).andTestFinitoEqualTo(true);
            List<Bambino> bambini = bambinoMapper.selectByExample(bambinoExample);

            if (bambini.size() == 1) {
                Bambino bambino = bambini.get(0);

                RelBambinoSchedaExample relBambinoSchedaExample = new RelBambinoSchedaExample();
                relBambinoSchedaExample.createCriteria().andIdBambinoEqualTo(bambino.getId());
                List<RelBambinoScheda> relBambinoSchedaList = relBambinoSchedaMapper.selectByExample(relBambinoSchedaExample);

                List<ProvaScheda> provaSchedas = new ArrayList<>();
                for (RelBambinoScheda relBambinoScheda : relBambinoSchedaList) {
                    ProvaScheda provaScheda = provaSchedaMapper.selectByPrimaryKey(relBambinoScheda.getIdProvaScheda());
                    if (provaScheda != null) {
                        provaSchedas.add(provaSchedaMapper.selectByPrimaryKey(relBambinoScheda.getIdProvaScheda()));
                    }
                }
                if (provaSchedas.size() > 0) {
                    resultChildTest.setProveSchede(provaSchedas);
                    resultChildTest.setBambino(bambino);
                    resultChildTests.add(resultChildTest);
                }
            }
        }
        return resultChildTests;
    }

}
