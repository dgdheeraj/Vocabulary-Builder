(function(){

    angular
      .module("VocBuild")
      .controller("loginctrl", function($window){
          var vm=this;
          vm.submitlogin=function(){
            var a={
              username:"admin",
              passwd:"password",
            }
            // console.log(vm.usr);
            // console.log(a.username)
            if(a.username==vm.usr.username && a.passwd==vm.usr.passwd)
            {
              console.log("Success");
              document.cookie="username="+a.username+";login=1";
              console.log(document.cookie);
              $window.location.href="/index.html";
            }
          }
          
      });
  
 
    
})();