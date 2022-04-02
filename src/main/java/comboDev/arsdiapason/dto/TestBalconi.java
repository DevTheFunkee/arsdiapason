package comboDev.arsdiapason.dto;

import comboDev.arsdiapason.mybatis.model.Bambino;
import lombok.Data;

import java.util.List;

@Data
public class TestBalconi {
    private List<Byte> idsProvaSceda;
    private Bambino bambino;
}
