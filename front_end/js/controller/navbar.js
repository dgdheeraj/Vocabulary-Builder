(function(){

    angular
      .module("VocBuild")
      .controller("navctrl", function($window){
          self=this;

            
            
            self.redirect=function(val){
                var re = new RegExp("username" + "=([^;]+)");
                var value = re.exec(document.cookie);
                var login=0;
                try{
                    var e=value[0];
                    login=1;
                }
                catch(err)
                {
                    console.log("Not logged in ");
                    login=0;
                }
                if(val== 'home')
                    $window.location.href="/index.html";
                else if(val=='quiz' && login == 0)
                    $window.location.href="/login.html";
                else if(val=='quiz' && login == 1)
                    $window.location.href="/quiz.html";
                else if(val == 'login')
                    $window.location.href="/login.html";
                else if(val == 'register')
                    $window.location.href="/register.html";
                
            }

          });
  
 
    
})();