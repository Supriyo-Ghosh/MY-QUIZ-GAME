class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide()
    background("yellow")
    fill('blue')
    textSize(20)
    text("Result of the quiz",340,50)
    text("---------------------------",320,65)
    Contestant.getContestantInfo()
    if(allContestants!==undefined){  
      var display_Answers=230
      fill(0)
      textSize(20)
      text("*Notes: Contestant who answered correct are highlighted in green color!",130,230)  
    
      for(var cnst in allContestants){
        var correctAns="2"
        if(correctAns===allContestants[cnst].answer){

          fill("green")
        }
        else{
          fill("red")
        }
        display_Answers+=30
        textSize(20)
        text(allcontestants[cnst].name+": "+allcontestants[cnst].answer,250,display_Answers)
      }
    }
    
    
  }

}
