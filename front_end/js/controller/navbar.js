(function(){

    angular
      .module("VocBuild")
      .controller("navctrl", function($window){
          self=this;
            self.redirect=function(val){
                if(val== 'home')
                    $window.location.href="/index.html";
                else if(val=='quiz')
                    $window.location.href="/quiz.html";
                else if(val == 'login')
                    $window.location.href="/login.html";
                else if(val == 'register')
                    $window.location.href="/register.html";
                
            }

          });
  
 
    
})();