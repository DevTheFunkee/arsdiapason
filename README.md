Test application in Java 8, Spring boot and Angular 9

Instruction to run application:

install node.js and npm
launch from cmd: npm install copyfiles -g (needed only for point 5B)
from cmd go in client root and launch: npm install
make maven "clean install" of project
choose A or B:
A) for 2 server (BE e FE) (developer mode) from client root launch: "npm start"
   then launch the MAIN that is in java class TestApplication and set Enviroment variables.
   Application respond on url: http://localhost:4200/

B) for 1 server (BE) (production mode) from client root launch: "npm run build"
   then launch the MAIN that is in java class TestApplication and set Enviroment variables.
   Application respond on url: http://localhost:8080/
N.B. for send mail with gmail need to abilitate 2 step password in gmail and create the app code for mail service and set it like spring.mail.password in file application.properties
