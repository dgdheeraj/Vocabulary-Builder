(function(){

    angular
      .module("VocBuild")
      .controller("navctrl", function($window){
          var vm=this;
          var re = new RegExp("username" + "=([^;]+)");
          var value = re.exec(document.cookie);
          vm.login=false;
          try{
              var e=value[0];
              vm.login=true;
          }
          catch(err)
          {
              console.log("Not logged in ");
              vm.login=false;
          }
          
          vm.logout=function(){
            document.cookie="username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            vm.login=false;
          }
            
            vm.redirect=function(val){
                var re = new RegExp("username" + "=([^;]+)");
                var value = re.exec(document.cookie);
                try{
                    var e=value[0];
                    vm.login=true;
                }
                catch(err)
                {
                    console.log("Not logged in ");
                    vm.login=false;
                }
                if(val== 'home')
                    $window.location.href="/index.html";
                else if(val=='quiz' && vm.login == false)
                    $window.location.href="/login.html";
                else if(val=='quiz' && vm.login == true)
                    $window.location.href="/quiz.html";
                else if(val == 'login')
                    $window.location.href="/login.html";
                else if(val == 'register')
                    $window.location.href="/register.html";
                else if(val == 'contact') 
                    $window.location.href="/contact.html";
                else if(val== 'Leaderboard')
                    $window.location.href="/leaderboard.html";
                else if(val== 'learn' && vm.login==true)
                    $window.location.href="/learn.html";
                else if(val== 'learn' && vm.login==false)
                    $window.location.href="/login.html";

                
                   
                
            }

          });
  
 
    
})();