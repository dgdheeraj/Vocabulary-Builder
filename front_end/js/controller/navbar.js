(function(){

    angular
      .module("VocBuild")
      .controller("navctrl", function($window){
          self=this;

            var re = new RegExp("login" + "=([^;]+)");
            var value = re.exec(document.cookie);
            if(value===null)
            {
                document.cookie = "login=0";
            }
            console.log(value[1])//gives login   
            
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