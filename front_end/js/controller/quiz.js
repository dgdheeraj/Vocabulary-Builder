(function(){
    angular.module("VocBuild").controller("quizCtrl",function($http){
        // self=this;
        var vm=this;
        vm.quizQuestions  = [
            {
              type: "text",
              text: "How much can a loggerhead weigh?",
              possibilities: [
                  {
                      answer: "Up to 20kg"
                  },
                  {
                      answer: "Up to 115kg"
                  },
                  {
                      answer: "Up to 220kg"
                  },
                  {
                      answer: "Up to 500kg"
                  }
              ],
              selected: null,
              correct: null
            },
            {
              type: "text",
              text: "What is the typical lifespan of a Green Sea Turtle?",
              possibilities: [
                  {
                      answer: "150 years"
                  },
                  {
                      answer: "10 years"
                  },
                  {
                      answer: "80 years"
                  },
                  {
                      answer: "40 years"
                  }
              ],
              selected: null,
              correct: null
            },
            {
              type: "text",
              text: "Which of these turtles are herbivores?",
              possibilities: [
                  {
                      answer: "Loggerhead Turtle"
                  },
                  {
                      answer: "Hawksbill Turtle"
                  },
                  {
                      answer: "Leatherback Turtle"
                  },
                  {
                      answer: "Green Turtle"
                  }
              ],
              selected: null,
              correct: null
            }
        ];
        var a={
            "ques":"4"
        }
        $http.post("http://localhost:5000/api/quiz",a).then(function(response)
									{
                    console.log(response.data);
                    // vm.quizQuestions=response.data;
                    console.log(response.data.records)
        });
        // console.log(vm.quizQuestions[0]["text"])
        // console.log(vm.quizQuestions)
        //Quiz Logic--------------------------------------------------------        
        vm.activeq=0;
        vm.setActiveQuestion=setActiveQuestion;
        vm.error=false;
        vm.finalise=false;
        function setActiveQuestion(index){
            /*if(index==undefined)
            {
                console.log(self.activeq);
                var breakout =false;
                var a=self.activeq;
                var b=false;
                var quizLen=self.quizQuestions.length-1;
                while(!breakout)
                {
                    a=a<quizLen?++a:0;
                    // self.activeq= self.activeq < quizLen?++self.activeq:0;
                    // console.log(self.activeq);
                    if(self.activeq=0)
                    {
                        // self.error=true;
                        b=true;
                    }
                    if(self.quizQuestions[self.activeq].selected==null)
                    {
                        breakout=true;
                    }
                }
                self.activeq=a;
                self.error=b;
                // console.log(self.activeq);
            }*/
            var a=vm.activeq;
            var b=false;
            var quizLen=vm.quizQuestions.length-1;
            if(index==undefined)
            {
                a=a<quizLen?++a:0;
                // self.activeq=a;
            }
            else
            {
                vm.activeq=index;
                return;
            }
            vm.activeq=a;
        }

        var numQuesAnswered=0;
        vm.questionAnswered=function(){
            var e=vm.error;
            var f=vm.finalise;
            var flag=0;
            var quizLen=vm.quizQuestions.length;
            var a=vm.quizQuestions
            // console.log(self.quizQuestions[self.activeq].selected);
            if(vm.quizQuestions[vm.activeq].selected!==null){
                numQuesAnswered++;
                // console.log(numQuesAnswered,quizLen);
                if(numQuesAnswered >= quizLen){

                    for( var i=0; i< quizLen;i++)
                    {
                        if(a[i].selected==null)
                        {
                            // console.log("callefef");
                            setActiveQuestion(i);
                            this.flag=1;
                            return;
                        }
                    }
                    // self.error=false;
                    // self.finalise= true;
                    e=false;
                    f=true;
                    // return;
                    // console.log("here");
                }

            }
            vm.error=e;
            vm.finalise=f;
            if(e==false && f==true)
                return;
            // console.log(flag);
            if(flag==0)
            {
                // console.log("Wh");
                vm.setActiveQuestion();
            }    
        }

        
        vm.ans=new Array(vm.quizQuestions.length);
        for( var i=0;i<vm.quizQuestions.length;i++)
        {
            vm.ans[i]=Math.floor(Math.random() * 4); 
        }
        vm.correct=new Array(vm.quizQuestions.length);
        vm.disflag=false;
        

        vm.MarkQuiz=MarkQuiz;
        function MarkQuiz(index){
            var q=vm.quizQuestions;
            var a=vm.ans;
            var c=vm.correct;
            if(q[index]===a[index])
                c[index]=true;
            else
                c[index]=false;
            vm.disflag=c[index];
            console.log(vm.disflag)
        };


        vm.selectAnswer=function(index){
            vm.quizQuestions[vm.activeq].selected=index;
            MarkQuiz(index);

        }
        //================================================================
        // self.counter=100;




    })
})();