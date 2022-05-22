package comboDev.arsdiapason.service;

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
public class ChildListService {

    @Autowired
    private BambinoMapper bambinoMapper;
    @Autowired
    private RelPsicologoBambinoMapper relPsicologoBambinoMapper;
    @Autowired
    private ProvaSchedaMapper provaSchedaMapper;
    @Autowired
    private RelBambinoSchedaMapper relBambinoSchedaMapper;

    @Transactional(readOnly = true)
    public List<Bambino> childsList(Integer idPsicologo) {

        RelPsicologoBambinoExample relPsicologoBambinoExample = new RelPsicologoBambinoExample();
        relPsicologoBambinoExample.createCriteria().andIdPsicologoEqualTo(idPsicologo);
        List<RelPsicologoBambino> relations = relPsicologoBambinoMapper.selectByExample(relPsicologoBambinoExample);

        List<Bambino> bambini = new ArrayList<>();
        for(RelPsicologoBambino relation: relations) {
            Bambino bambino = bambinoMapper.selectByPrimaryKey(relation.getIdBambino());
            if(bambino != null) {
                bambini.add(bambino);
            }
        }
        return bambini;
    }

    @Transactional(readOnly = true)
    public Bambino child(Integer idBambino) {
        return bambinoMapper.selectByPrimaryKey(idBambino);
    }

    @Transactional(readOnly = true)
    public List<ProvaScheda> childTest(Integer idBambino) {
        RelBambinoSchedaExample relBambinoSchedaExample = new RelBambinoSchedaExample();
        relBambinoSchedaExample.createCriteria().andIdBambinoEqualTo(idBambino);
        List<RelBambinoScheda> relBambinoSchedaList = relBambinoSchedaMapper.selectByExample(relBambinoSchedaExample);

        List<ProvaScheda> provaSchedas = new ArrayList<>();
        for (RelBambinoScheda relBambinoScheda : relBambinoSchedaList) {
            ProvaScheda provaScheda = provaSchedaMapper.selectByPrimaryKey(relBambinoScheda.getIdProvaScheda());
            if (provaScheda != null) {
                provaSchedas.add(provaSchedaMapper.selectByPrimaryKey(relBambinoScheda.getIdProvaScheda()));
            }
        }
        return provaSchedas;
    }

}
