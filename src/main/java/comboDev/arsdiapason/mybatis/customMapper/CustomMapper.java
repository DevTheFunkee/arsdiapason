package comboDev.arsdiapason.mybatis.customMapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.type.JdbcType;

import comboDev.arsdiapason.mybatis.model.Istituto;

import java.util.List;

@Mapper
public interface CustomMapper {

    @Select("SELECT DISTINCT sezione FROM bambino WHERE id_istituto = #{id}")
    List<String> findSezioni(@Param("id") Integer idIstituto);
    
    
    
    
    @Select({
        "select",
        "id, nome, regione, provincia, comune, indirizzo, mail",
        "from istituto"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="nome", property="nome", jdbcType=JdbcType.VARCHAR),
        @Result(column="regione", property="regione", jdbcType=JdbcType.VARCHAR),
        @Result(column="provincia", property="provincia", jdbcType=JdbcType.VARCHAR),
        @Result(column="comune", property="comune", jdbcType=JdbcType.VARCHAR),
        @Result(column="indirizzo", property="indirizzo", jdbcType=JdbcType.VARCHAR),
        @Result(column="mail", property="mail", jdbcType=JdbcType.VARCHAR)
    })
    List<Istituto> findAll();
}
