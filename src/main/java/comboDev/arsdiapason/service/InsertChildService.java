package comboDev.arsdiapason.service;

import comboDev.arsdiapason.mybatis.mapper.BambinoMapper;
import comboDev.arsdiapason.mybatis.mapper.RelPsicologoBambinoMapper;
import comboDev.arsdiapason.mybatis.model.Bambino;
import comboDev.arsdiapason.mybatis.model.RelPsicologoBambino;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsertChildService {

    @Autowired
    private BambinoMapper bambinoMapper;
    @Autowired
    private RelPsicologoBambinoMapper relPsicologoBambinoMapper;

    public void insertChild(Bambino bambino, Integer idPsicologo) {
        bambinoMapper.insert(bambino);
        RelPsicologoBambino relPsicologoBambino = new RelPsicologoBambino();
        relPsicologoBambino.setIdBambino(bambino.getId());
        relPsicologoBambino.setIdPsicologo(idPsicologo);
        relPsicologoBambinoMapper.insert(relPsicologoBambino);
    }
}
