(function(){
    angular.module("VocBuild").controller("quizCtrl",function(){
        self=this;
        self.quizQuestions  = [
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
        
        self.notes=[
            {id:1,label:"First Note",done:false},
            {id:2,label:"Second Note",done:true},
            {id:3,label:"Third Note",done:true},
            {id:3,label:"Fourth Note",done:false},
        ];
        
        self.activeq=0;
        self.setActiveQuestion=setActiveQuestion;
        self.error=false;
        self.finalise=false;
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
            var a=self.activeq;
            var b=false;
            var quizLen=self.quizQuestions.length-1;
            if(index==undefined)
            {
                a=a<quizLen?++a:0;
                // self.activeq=a;
            }
            else
            {
                self.activeq=index;
                return;
            }
            self.activeq=a;
        }

        var numQuesAnswered=0;
        self.questionAnswered=function(){
            var e=self.error;
            var f=self.finalise;
            var flag=0;
            var quizLen=self.quizQuestions.length;
            var a=self.quizQuestions
            // console.log(self.quizQuestions[self.activeq].selected);
            if(self.quizQuestions[self.activeq].selected!==null){
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
            self.error=e;
            self.finalise=f;
            if(e==false && f==true)
                return;
            // console.log(flag);
            if(flag==0)
            {
                // console.log("Wh");
                self.setActiveQuestion();
            }    
        }

        
        self.ans=new Array(self.quizQuestions.length);
        for( var i=0;i<self.quizQuestions.length;i++)
        {
            self.ans[i]=Math.floor(Math.random() * 4); 
        }
        self.correct=new Array(self.quizQuestions.length);
        self.disflag=false;
        

        self.MarkQuiz=MarkQuiz;
        function MarkQuiz(index){
            var q=self.quizQuestions;
            var a=self.ans;
            var c=self.correct;
            if(q[index]===a[index])
                c[index]=true;
            else
                c[index]=false;
            self.disflag=c[index];
            console.log(self.disflag)
        };


        self.selectAnswer=function(index){
            self.quizQuestions[self.activeq].selected=index;
            MarkQuiz(index);

        }




    })
})();