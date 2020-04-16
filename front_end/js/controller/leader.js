(function(){

    angular
      .module("VocBuild")
      .controller("leaderctrl", function($window,$http,$timeout){
            var vm=this;
            vm.func0=func0;
            vm.res=null;
            vm.t=1;
            $timeout(func0, 10);
            function func0()
            {
                // console.log("First Image Loaded")
                try
                {

                    $http.get("http://localhost:5000/api/leaderboard").then(function(response)
                    {
                        console.log("Refreshed");
                        vm.res=response.data;
                        // console.log(response.status);
                        if(response.status==200)
                        {
                            vm.t=1;
                            console.log(3000*vm.t);
                            $timeout(func0, 3000*vm.t);
                        }
                        else
                        {
                            vm.t=vm.t*2;
                            // console.log(vm.t+3000);
                            $timeout(func0, 3000*vm.t);
                        }
                    },function(err){
                        console.log("Here");
                        vm.t=vm.t*2;
                        console.log(vm.t*3000);
                        $timeout(func0, 3000*vm.t);
                    });
                    // .error(function(response){
                        // console.log("Here");
                        // vm.t=vm.t*2;
                        // console.log(vm.t*3000);
                        // $timeout(func0, 3000*vm.t);
                    // });
                }
                catch
                {
                    // vm.t=vm.t*2;
                    // console/.log(vm.t*3000);
                    // $timeout/(func0, 3000*vm.t);
                }
            }
           
        });
  
 
    
})();