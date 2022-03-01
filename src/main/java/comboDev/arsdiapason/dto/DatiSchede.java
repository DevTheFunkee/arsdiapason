package comboDev.arsdiapason.dto;

import comboDev.arsdiapason.mybatis.model.Bambino;
import comboDev.arsdiapason.mybatis.model.ProvaScheda;
import comboDev.arsdiapason.mybatis.model.Scheda;
import lombok.Data;

import java.util.List;

@Data
public class DatiSchede {
    Bambino bambino;
    List<Scheda> schede;
    List<ProvaScheda> proveSchede;
}
