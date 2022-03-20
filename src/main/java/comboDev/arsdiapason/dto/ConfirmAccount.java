package comboDev.arsdiapason.dto;

import lombok.Data;

@Data
public class ConfirmAccount {
    private String email;
    private String password;
    private int temporaryCode;
}
