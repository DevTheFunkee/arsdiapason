package comboDev.arsdiapason.service;

import comboDev.arsdiapason.mybatis.mapper.BambinoMapper;
import comboDev.arsdiapason.mybatis.mapper.RelPsicologoBambinoMapper;
import comboDev.arsdiapason.mybatis.model.Bambino;
import comboDev.arsdiapason.mybatis.model.RelPsicologoBambino;
import comboDev.arsdiapason.mybatis.model.RelPsicologoBambinoExample;
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

    @Transactional(readOnly = true)
    public List<Bambino> childsList(Integer idPsicologo) {

        RelPsicologoBambinoExample relPsicologoBambinoExample = new RelPsicologoBambinoExample();
        relPsicologoBambinoExample.createCriteria().andIdPsicologoEqualTo(idPsicologo);
        List<RelPsicologoBambino> relations = relPsicologoBambinoMapper.selectByExample(relPsicologoBambinoExample);

        List<Bambino> bambini = new ArrayList<>();
        for (RelPsicologoBambino relation: relations) {
            Bambino bambino = bambinoMapper.selectByPrimaryKey(relation.getIdBambino());
            if(bambino != null){
                bambini.add(bambino);
            }
        }
        return bambini;
    }
}
