import { App } from "vue";


export default {
  install(app:App){
    app.directive("model11312",{
      created(){
        console.log("model11312");
        // return null
      }
      // mounted(el,binding,vnode){
      //   console.log(el);
      //   console.log(binding);
      //   console.log(vnode);
      // }
    })
  }
}