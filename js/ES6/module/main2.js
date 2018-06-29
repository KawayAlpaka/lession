import {Hello,name1,name2} from "./common.mjs";
import("/module-b.mjs")
  .then(module => {
    console.log(`module:`);
    console.log(module);
  })
  .catch(err => {
    console.log(`err:`);
    console.log(err);
  });

Hello("Jim");
Hello(name1);
Hello(name2);