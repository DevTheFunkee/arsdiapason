package comboDev.arsdiapason.dto;

import lombok.Data;

@Data
public class DatiUtente {
    private String email;
    private String password;
    private int temporaryCode;
    private String nome;
    private String cognome;
    private String appUrl;
}
