package comboDev.arsdiapason.mybatis.customMapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.type.JdbcType;

import comboDev.arsdiapason.mybatis.model.Bambino;
import comboDev.arsdiapason.mybatis.model.Istituto;
import comboDev.arsdiapason.mybatis.model.RelPsicologoIstituto;

@Mapper
public interface CustomMapper {

	@Select("SELECT DISTINCT sezione FROM bambino WHERE id_istituto = #{id}")
	List<String> findSezioni(@Param("id") Integer idIstituto);

	@Update({ "update rel_psicologo_istituto", "set caricato = #{caricato,jdbcType=VARCHAR},",
			"codice = #{codice,jdbcType=INTEGER}", "where id_psicologo = #{idPsicologo,jdbcType=INTEGER}",
			"and id_istituto = #{idIstituto,jdbcType=INTEGER}" })
	int updateByPrimaryKey(RelPsicologoIstituto record);

	@Update({ "update rel_psicologo_istituto", "set id_psicologo = #{idPsicologo,jdbcType=INTEGER},",
			"where id_psicologo = #{idPsicologo,jdbcType=INTEGER}",
			"and id_istituto = #{idIstituto,jdbcType=INTEGER}" })
	int updateRelationByKey(RelPsicologoIstituto record);

	@Select({ "select", "id, nome, regione, provincia, comune, indirizzo, mail", "from istituto" })
	@Results({ @Result(column = "id", property = "id", jdbcType = JdbcType.INTEGER, id = true),
			@Result(column = "nome", property = "nome", jdbcType = JdbcType.VARCHAR),
			@Result(column = "regione", property = "regione", jdbcType = JdbcType.VARCHAR),
			@Result(column = "provincia", property = "provincia", jdbcType = JdbcType.VARCHAR),
			@Result(column = "comune", property = "comune", jdbcType = JdbcType.VARCHAR),
			@Result(column = "indirizzo", property = "indirizzo", jdbcType = JdbcType.VARCHAR),
			@Result(column = "mail", property = "mail", jdbcType = JdbcType.VARCHAR) })
	List<Istituto> findAll();

	 @Select({
	        "select",
	        "id, id_istituto, sezione, nome, cognome, sesso, data_nascita, comune_nascita, ",
	        "comune_residenza, indirizzo_residenza, numero_fratelli, numero_sorelle, ordine_genitura, ",
	        "lavoro_padre, lavoro_madre, titolo_studio_padre, titolo_studio_madre, figlio_adottivo, ",
	        "note, test_finito, data_test",
	        "from bambino"
	    })
	    @Results({
	        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
	        @Result(column="id_istituto", property="idIstituto", jdbcType=JdbcType.INTEGER),
	        @Result(column="sezione", property="sezione", jdbcType=JdbcType.VARCHAR),
	        @Result(column="nome", property="nome", jdbcType=JdbcType.VARCHAR),
	        @Result(column="cognome", property="cognome", jdbcType=JdbcType.VARCHAR),
	        @Result(column="sesso", property="sesso", jdbcType=JdbcType.VARCHAR),
	        @Result(column="data_nascita", property="dataNascita", jdbcType=JdbcType.DATE),
	        @Result(column="comune_nascita", property="comuneNascita", jdbcType=JdbcType.VARCHAR),
	        @Result(column="comune_residenza", property="comuneResidenza", jdbcType=JdbcType.VARCHAR),
	        @Result(column="indirizzo_residenza", property="indirizzoResidenza", jdbcType=JdbcType.VARCHAR),
	        @Result(column="numero_fratelli", property="numeroFratelli", jdbcType=JdbcType.TINYINT),
	        @Result(column="numero_sorelle", property="numeroSorelle", jdbcType=JdbcType.TINYINT),
	        @Result(column="ordine_genitura", property="ordineGenitura", jdbcType=JdbcType.TINYINT),
	        @Result(column="lavoro_padre", property="lavoroPadre", jdbcType=JdbcType.VARCHAR),
	        @Result(column="lavoro_madre", property="lavoroMadre", jdbcType=JdbcType.VARCHAR),
	        @Result(column="titolo_studio_padre", property="titoloStudioPadre", jdbcType=JdbcType.VARCHAR),
	        @Result(column="titolo_studio_madre", property="titoloStudioMadre", jdbcType=JdbcType.VARCHAR),
	        @Result(column="figlio_adottivo", property="figlioAdottivo", jdbcType=JdbcType.CHAR),
	        @Result(column="note", property="note", jdbcType=JdbcType.VARCHAR),
	        @Result(column="test_finito", property="testFinito", jdbcType=JdbcType.BIT),
	        @Result(column="data_test", property="dataTest", jdbcType=JdbcType.DATE)
	    })
	List<Bambino> childFindAll();
}
