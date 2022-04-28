package comboDev.arsdiapason.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import comboDev.arsdiapason.mybatis.customMapper.CustomMapper;
import comboDev.arsdiapason.mybatis.mapper.BambinoMapper;
import comboDev.arsdiapason.mybatis.mapper.RelPsicologoBambinoMapper;
import comboDev.arsdiapason.mybatis.mapper.RelPsicologoIstitutoMapper;
import comboDev.arsdiapason.mybatis.model.Bambino;
import comboDev.arsdiapason.mybatis.model.RelPsicologoBambino;
import comboDev.arsdiapason.mybatis.model.RelPsicologoIstituto;

@Service
public class InsertChildService {

	@Autowired
	private BambinoMapper bambinoMapper;
	@Autowired
	private RelPsicologoBambinoMapper relPsicologoBambinoMapper;
	@Autowired
	private CustomMapper customMapper;
	@Autowired
	private RelPsicologoIstitutoMapper relPsicologoIstitutoMapper;

	@Transactional(readOnly = true)
	public List<String> findSezioni(Integer idIstituto) {
		return customMapper.findSezioni(idIstituto);
	}

	@Transactional(rollbackFor = Exception.class)
	public void insertChild(Bambino bambino, Integer idPsicologo) {
		if (bambino.getSezione() != null) {
			bambino.setSezione(bambino.getSezione().toUpperCase());
		}
		bambinoMapper.insertSelective(bambino);
		RelPsicologoBambino relPsicologoBambino = new RelPsicologoBambino();
		relPsicologoBambino.setIdBambino(bambino.getId());
		relPsicologoBambino.setIdPsicologo(idPsicologo);
		relPsicologoBambinoMapper.insert(relPsicologoBambino);
	}

	@Transactional(rollbackFor = Exception.class)
	public void insertChildsForExcel(List<Bambino> bambini, Integer idPsicologo) {
		for (Bambino bambino : bambini) {
			if (bambino.getSezione() != null) {
				bambino.setSezione(bambino.getSezione().toUpperCase());
			}
			bambinoMapper.insertSelective(bambino);
			RelPsicologoBambino relPsicologoBambino = new RelPsicologoBambino();
			relPsicologoBambino.setIdBambino(bambino.getId());
			relPsicologoBambino.setIdPsicologo(idPsicologo);
			relPsicologoBambinoMapper.insert(relPsicologoBambino);
		}

		RelPsicologoIstituto relPsicologoIstituto = new RelPsicologoIstituto();
		relPsicologoIstituto.setIdIstituto(bambini.stream().findFirst().get().getIdIstituto());
		relPsicologoIstituto.setIdPsicologo(idPsicologo);
		relPsicologoIstituto.setCaricato("Y");
		relPsicologoIstitutoMapper.updateByPrimaryKey(relPsicologoIstituto);
	}

	public void deleteChild(Integer idBambino, Integer idPsicologo) {
		relPsicologoBambinoMapper.deleteByPrimaryKey(idPsicologo, idBambino);
		bambinoMapper.deleteByPrimaryKey(idBambino);

	}

	@Transactional(rollbackFor = Exception.class)
	public void insertChilds(List<Bambino> bambini, Integer idPsicologo) {
		for (Bambino bambino : bambini) {
			if (bambino.getSezione() != null) {
				bambino.setSezione(bambino.getSezione().toUpperCase());
			}
			bambinoMapper.insertSelective(bambino);
			RelPsicologoBambino relPsicologoBambino = new RelPsicologoBambino();
			relPsicologoBambino.setIdBambino(bambino.getId());
			relPsicologoBambino.setIdPsicologo(idPsicologo);
			relPsicologoBambinoMapper.insert(relPsicologoBambino);
		}
	}

}
