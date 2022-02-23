package comboDev.arsdiapason.service;

import comboDev.arsdiapason.model.DatiRegistrazione;
import comboDev.arsdiapason.mybatis.mapper.PsicologoMapper;
import comboDev.arsdiapason.mybatis.mapper.UtenteMapper;
import comboDev.arsdiapason.mybatis.model.Psicologo;
import comboDev.arsdiapason.mybatis.model.Utente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {

    @Autowired
    private UtenteMapper utenteMapper;
    @Autowired
    private PsicologoMapper psicologoMapper;

    public Utente login(String username, String password) {
        return utenteMapper.selectByPrimaryKey(username, password);
    }

    @Transactional(rollbackFor = Exception.class)
    public void createAccount(DatiRegistrazione datiRegistrazione) throws Exception {
        Pattern pattern = Pattern.compile("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$");
        Matcher matcher = pattern.matcher(datiRegistrazione.getPassword());
        if(matcher.find()) {
            Psicologo psicologo = new Psicologo();
            psicologo.setNome(datiRegistrazione.getNome());
            psicologo.setCognome(datiRegistrazione.getCognome());
            psicologoMapper.insert(psicologo);
            Utente utente = new Utente();
            utente.setIdPsicologo(psicologo.getId());
            utente.setUsername(datiRegistrazione.getUsername());
            utente.setPassword(datiRegistrazione.getPassword());
            utente.setRole("USER");
            utenteMapper.insert(utente);
        } else {
            throw new Exception("", new Throwable("La password non rispetta i requisiti richiesti"));
        }
    }
}
