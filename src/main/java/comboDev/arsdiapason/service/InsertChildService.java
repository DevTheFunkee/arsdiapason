package comboDev.arsdiapason.service;

import comboDev.arsdiapason.mybatis.mapper.BambinoMapper;
import comboDev.arsdiapason.mybatis.model.Bambino;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsertChildService {

    @Autowired
    private BambinoMapper bambinoMapper;

    public void insertChild(Bambino bambino) {
        bambinoMapper.insert(bambino);
    }
}
