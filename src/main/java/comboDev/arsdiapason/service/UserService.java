package comboDev.arsdiapason.service;

import comboDev.arsdiapason.dto.ConfirmAccount;
import comboDev.arsdiapason.dto.DatiRegistrazione;
import comboDev.arsdiapason.mybatis.mapper.PsicologoMapper;
import comboDev.arsdiapason.mybatis.mapper.UtenteMapper;
import comboDev.arsdiapason.mybatis.model.Psicologo;
import comboDev.arsdiapason.mybatis.model.Utente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
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

    @Transactional(readOnly = true)
    public Utente login(String username, String password) throws Exception {
        Utente utente = utenteMapper.selectByPrimaryKey(username);
        if(BCrypt.checkpw(password, utente.getPassword())){
            if(!utente.getActive()){
                throw new Exception("", new Throwable("Utente non attivo, controllare la mail per completare la registrazione"));
            }
            return utente;
        } else {
            throw new Exception("", new Throwable("Password non corretta"));
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void createAccount(DatiRegistrazione datiRegistrazione, int temporaryCode) throws Exception {
        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!=%*?^&+#])[A-Za-z\\d@$!=%*?^&+#]{8,20}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(datiRegistrazione.getPassword());
        if(matcher.find()) {
            Psicologo psicologo = new Psicologo();
            psicologo.setNome(datiRegistrazione.getNome());
            psicologo.setCognome(datiRegistrazione.getCognome());
            psicologoMapper.insert(psicologo);
            Utente utente = new Utente();
            utente.setTemporaryCode(temporaryCode);
            utente.setIdPsicologo(psicologo.getId());
            utente.setEmail(datiRegistrazione.getEmail());
            utente.setPassword(BCrypt.hashpw(datiRegistrazione.getPassword(), BCrypt.gensalt()));
            utente.setRole("USER");
            utenteMapper.insertSelective(utente);
        } else {
            throw new Exception("", new Throwable("La password non rispetta i requisiti richiesti"));
        }
    }

    public Utente confirmAccount(ConfirmAccount confirmAccount) throws Exception {
        Utente utente = utenteMapper.selectByPrimaryKey(confirmAccount.getEmail());
        if(!BCrypt.checkpw(confirmAccount.getPassword(), utente.getPassword())
                || confirmAccount.getTemporaryCode() != utente.getTemporaryCode()){
            throw new Exception("", new Throwable("Dati non corretti"));
        }
        utente.setActive(true);
        utente.setTemporaryCode(null);
        utenteMapper.updateByPrimaryKey(utente);
        return utente;
    }
}
