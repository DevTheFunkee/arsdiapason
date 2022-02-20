package comboDev.arsdiapason.service;

import comboDev.arsdiapason.mybatis.mapper.PsicologoMapper;
import comboDev.arsdiapason.mybatis.model.Psicologo;
import comboDev.arsdiapason.mybatis.model.PsicologoExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private PsicologoMapper psicologoMapper;

    public Psicologo login(String username, String password) {
        PsicologoExample psicologoExample = new PsicologoExample();
        psicologoExample.createCriteria().andUsernameEqualTo(username).andPasswordEqualTo(password);
        List<Psicologo> psicologos = psicologoMapper.selectByExample(psicologoExample);
        if(psicologos.size() == 1) {
            return psicologos.get(0);
        }
        return null;
    }

    public void createAccount(Psicologo psicologo) {
        psicologoMapper.insert(psicologo);
    }
}
