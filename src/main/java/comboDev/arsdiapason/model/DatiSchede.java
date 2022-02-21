package comboDev.arsdiapason.model;

import comboDev.arsdiapason.mybatis.model.ProvaScheda;
import comboDev.arsdiapason.mybatis.model.Scheda;
import lombok.Data;

import java.util.List;

@Data
public class DatiSchede {
    List<Scheda> schede;
    List<ProvaScheda> proveSchede;
}
