package comboDev.arsdiapason.service;

import comboDev.arsdiapason.model.DatiRegistrazione;
import comboDev.arsdiapason.mybatis.mapper.PsicologoMapper;
import comboDev.arsdiapason.mybatis.mapper.UtenteMapper;
import comboDev.arsdiapason.mybatis.model.Psicologo;
import comboDev.arsdiapason.mybatis.model.Utente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UtenteMapper utenteMapper;
    @Autowired
    private PsicologoMapper psicologoMapper;

    public Utente login(String username, String password) {
        return utenteMapper.selectByPrimaryKey(username, password);
    }

    public void createAccount(DatiRegistrazione datiRegistrazione) {
        Psicologo psicologo = new Psicologo();
        psicologo.setNome(datiRegistrazione.getNome());
        psicologo.setCognome(datiRegistrazione.getCognome());
        psicologoMapper.insert(psicologo);
        Utente utente =  new Utente();
        utente.setIdPsicologo(psicologo.getId());
        utente.setUsername(datiRegistrazione.getUsername());
        utente.setPassword(datiRegistrazione.getPassword());
        utente.setRole("USER");
        utenteMapper.insert(utente);
    }
}
