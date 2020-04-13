(function(){

    angular
      .module("VocBuild")
      .controller("registerctrl", function(){
          self=this;
          var re = new RegExp("username" + "=([^;]+)");
          var value = re.exec(document.cookie);
          console.log(value[1]);//gives username
          var re = new RegExp("login" + "=([^;]+)");
          var value = re.exec(document.cookie);
          console.log(value[1])//gives login         

          self.submit=function(){
            console.log("Adh");
            console.log(self.usr.uname);
            console.log(self.usr.passwd);


          }
          
      });
  
 
    
})();