package comboDev.arsdiapason.service;

import org.springframework.stereotype.Service;

@Service
public class UserService {


    public String findUser(String username, String psw) {
        /*
        try {
            return jdbcTemplate.queryForObject("SELECT role FROM users where username = '" + username + "' " +
                    "AND Password = '" + psw + "'", String.class);
        } catch(Exception e){
            return null;
        }*/
        return null;
    }

    public void insertUser(String username, String psw) {
        /*
        jdbcTemplate.update("INSERT INTO users (username, password, role)\n" +
                "VALUES ('"+username+"','"+psw+"','USER')");*/
    }
}
