package comboDev.arsdiapason.dto;

import lombok.Data;

@Data
public class DatiIstituto {
	private Integer id;
	private String nome;
	private String regione;
	private String provincia;
	private String comune;
	private String indirizzo;
	private String mail;
	private String appUrl;
}
