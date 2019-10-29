$(document).ready(function(){
    
    $(".new-card").one( "click", function(){
        var currentCard = $(this);
        
        var url = "https://opentdb.com/api.php?amount=1"
        
        if ($(this).hasClass("art")){
            url+= "&category=25";
        } else if ($(this).hasClass("cs")){
            url+= "&category=18";
        } else if ($(this).hasClass("books")){
            url+= "&category=10";
        }

        if ($(this).hasClass("easy")){
            url+="&difficulty=easy";
        } else if ($(this).hasClass("medium")){
            url+="&difficulty=medium";
        } else if ($(this).hasClass("hard")){
            url+="&difficulty=hard";
        } 
        url += "&type=multiple"
        $.get(url, function(data){
            var result = data.results[0];
            console.log(result)
            currentCard.find('.card-title').replaceWith(`<h5>` + result.question + `</h5>`);
            var realAnswer = Math.floor(Math.random() * result.incorrect_answers.length); 
            var answers = "";
            for (var i = 0; i < result.incorrect_answers.length; i++) {
                if (i === realAnswer){
                    answers+= `<p class="card-text answer correct"><label>`+ result.correct_answer +`</label> <input type="radio" name="answer" value="correct"></p>`;
                } else {
                    answers+=`<p class="card-text answer"><label>`+ result.incorrect_answers[i] +`</label> <input type="radio" name="answer" value="incorrect"></p>`;
                }
                
            }
            currentCard.find('.answers').replaceWith(answers)
            console.log(realAnswer)

        })
        $(this).children().children().slideDown();
        
    });
    $("input[name='answer']").click( function(){
        console.log(this)
        if ($(this).hasClass(correct)){
            alert("That's correct!");
            $(this).addClass("correctlyAnswered");
            $(this).siblings(".answer").addClass(".greyed");
        } else {
            $(this).addClass("greyed");
            $(this).siblings(".answer").addClass(".greyed");
            $(this).siblings(".correct").addClass(".strike");
        }
    })
    
});



// {"response_code":0,"results":
//         [
//             {"category":"Science: Computers",
//             "type":"multiple",
//             "difficulty":"easy",
//             "question":"This mobile OS held the largest market share in 2012.",
//             "correct_answer":"iOS",
//             "incorrect_answers":
//                 [
//                     "Android",
//                     "BlackBerry",
//                     "Symbian"
//                 ]
//             },

//             {"category":"Science: Computers","type":"multiple","difficulty":"hard","question":"What vulnerability ranked #1 on the OWASP Top 10 in 2013?","correct_answer":"Injection ","incorrect_answers":["Broken Authentication","Cross-Site Scripting","Insecure Direct Object References"]},{"category":"Science: Computers","type":"multiple","difficulty":"easy","question":"In computing, what does MIDI stand for?","correct_answer":"Musical Instrument Digital Interface","incorrect_answers":["Musical Interface of Digital Instruments","Modular Interface of Digital Instruments","Musical Instrument Data Interface"]}]}