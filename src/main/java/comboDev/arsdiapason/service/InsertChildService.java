package comboDev.arsdiapason.service;

import comboDev.arsdiapason.mybatis.customMapper.CustomMapper;
import comboDev.arsdiapason.mybatis.mapper.BambinoMapper;
import comboDev.arsdiapason.mybatis.mapper.RelPsicologoBambinoMapper;
import comboDev.arsdiapason.mybatis.model.Bambino;
import comboDev.arsdiapason.mybatis.model.RelPsicologoBambino;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InsertChildService {

    @Autowired
    private BambinoMapper bambinoMapper;
    @Autowired
    private RelPsicologoBambinoMapper relPsicologoBambinoMapper;
    @Autowired
    private CustomMapper customMapper;

    @Transactional(readOnly = true)
    public List<String> findSezioni(Integer idIstituto) {
        return customMapper.findSezioni(idIstituto);
    }

    @Transactional(rollbackFor = Exception.class)
    public void insertChild(Bambino bambino, Integer idPsicologo) {
        if (bambino.getSezione() != null) {
            bambino.setSezione(bambino.getSezione().toUpperCase());
        }
        bambinoMapper.insertSelective(bambino);
        RelPsicologoBambino relPsicologoBambino = new RelPsicologoBambino();
        relPsicologoBambino.setIdBambino(bambino.getId());
        relPsicologoBambino.setIdPsicologo(idPsicologo);
        relPsicologoBambinoMapper.insert(relPsicologoBambino);
    }

}
