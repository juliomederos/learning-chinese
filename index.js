// vocabulary: array containing the vocabulary as json elements
function getVocabularyTable(vocabulary){

    var vocabulary_table = "<table><th>hanzi</th><th>hanyu</th><th>translation</th>";

    for(var i = 0; i < vocabulary.length; i++){
        var row = "<tr>" + "<td>" + vocabulary[i]["hanzi"] + "</td>" + "<td>" + vocabulary[i]["pinyin"] + "</td>" + "<td>" + vocabulary[i]["translation"] + "</td>" + "</tr>";
        vocabulary_table = vocabulary_table + row;
    }

    vocabulary_table = vocabulary_table + "</table>";

    return vocabulary_table;
}

// Function to generate random number
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNRandomNumbers(total_words_in_vocabulary, n){

    var random_numbers = [];

    for(i = 0; random_numbers.length < n; i++){

        var random_number = getRandomNumber(0, total_words_in_vocabulary);

        if(random_numbers.indexOf(random_number) == -1){
            random_numbers.push(random_number);
        }
    }

    return random_numbers;

}

function getVocabularyPositions(vocabulary, positions){

    var n_elements_from_vocabulary = [];

    for(var i = 0; i < positions.length; i++){
        n_elements_from_vocabulary.push(vocabulary[positions[i]]);
    }

    return n_elements_from_vocabulary;

}

//function getElementsFromVocabulary(vocabulary, number_of_elements){
function getQuestionsAnswersFromVocabulary(vocabulary, number_of_elements){

    var random_numbers = getNRandomNumbers(vocabulary.length, number_of_elements);
    console.log("random_numbers", random_numbers);

    var n_elements_left = getVocabularyPositions(vocabulary, random_numbers);
    console.log("n_elements_left", n_elements_left);

    var shuffledArray = random_numbers.sort(() => Math.random() - 0.5);
    console.log("shuffledArray", shuffledArray);

    var n_elements_right = getVocabularyPositions(vocabulary, shuffledArray);
    console.log("n_elements_right", n_elements_right);

    var questions_answers = [];

//    var answers_index = {};
//
//    console.log("random_numbers--------", random_numbers);
//
//    for(var i = 0; i < number_of_elements; i++){
//        answers_index[random_numbers[i]] = shuffledArray.indexOf(random_numbers[i]);
//    }
//
//    console.log("answers_index", JSON.stringify(answers_index));

    for(var i = 0; i < number_of_elements; i++){
        //console.log("answers_index[i]", answers_index[i]);
        questions_answers.push({
            "question" : n_elements_left[i],
            "answer" : n_elements_right[i]
            });
    }

    console.log("questions_answers", questions_answers);

    return questions_answers;
}

function getQuestionsAnswersTable(questions_answers, question, answer){

    var vocabulary_table = "<table> <caption>Questions and answers</caption> <th>A</th> <th>" + question + "</th> <th>B</th> <th>" + answer + "</th>";

    for(var i = 0; i < questions_answers.length; i++){
        var row = "<tr>" + "<td>" + i + "</td>" + "<td>" + questions_answers[i]["question"][question] + "</td>" + "<td>" + i + "</td>" + "<td>" + questions_answers[i]["answer"][answer] + "</td>" + "</tr>";
        vocabulary_table = vocabulary_table + row;
    }

    vocabulary_table = vocabulary_table + "</table>";

    return vocabulary_table;
}

function getQuestionsAnswersCorrectedTable(questions_answers, question, answer){

    var vocabulary_table = "<table> <th>A</th> <th>" + question + "</th> <th>B</th> <th>" + answer + "</th>";

    for(var i = 0; i < questions_answers.length; i++){
        var row = "<tr>" + "<td>" + i + "</td>" + "<td>" + questions_answers[i]["question"][question] + "</td>" + "<td>" + i + "</td>" + "<td>" + questions_answers[i]["question"][answer] + "</td>" + "</tr>";
        vocabulary_table = vocabulary_table + row;
    }

    vocabulary_table = vocabulary_table + "</table>";

    return vocabulary_table;
}

function getQuestionsAnswersCorrectedRespectOrderTable(questions_answers, question, answer){

    var vocabulary_table = "<table> <th>A</th> <th>" + question + "</th> <th>B</th> <th>" + answer + "</th>";

    for(var i = 0; i < questions_answers.length; i++){
        var row = "<tr>" + "<td>" + i + "</td>" + "<td>" + questions_answers[i]["question"][question] + "</td>" + "<td>" + i + "</td>" + "<td>" + questions_answers[i]["question"][answer] + "</td>" + "</tr>";
        vocabulary_table = vocabulary_table + row;
    }

    vocabulary_table = vocabulary_table + "</table>";

    return vocabulary_table;
}

function showQuestionsAnswersCorrectedTable(){

    var target_element = document.getElementById("questions_answers_corrected_table");

    if(target_element.innerHTML == ""){
        var questions_answers_corrected_table = getQuestionsAnswersCorrectedTable(questions_answers, question, answer);
        target_element.innerHTML = questions_answers_corrected_table;
    }else{
        target_element.innerHTML = "";
    }

}

function generateQuestionsAnswersTable(){

    number_of_elements_to_play = document.getElementById("number_of_elements").value;
    questions_answers = getQuestionsAnswersFromVocabulary(vocabulary, number_of_elements_to_play)

    question = document.getElementById("question_select").value;
    answer = document.getElementById("answer_select").value;

    var questions_answers_table = getQuestionsAnswersTable(questions_answers, question, answer);

    var questions_answers_node = document.getElementById("questions_answers_table");
    questions_answers_node.innerHTML = questions_answers_table;

    document.getElementById("questions_answers_corrected_table").innerHTML = "";
    document.getElementById("questions_answers_AB_table").innerHTML = "";

}

function getAnswers(questions_answers){

    var answers = [];

    for(var i = 0; i < questions_answers.length; i++){

        var response_A = questions_answers[i]["question"]["hanzi"];

        var found = false;

        for(var j = 0; !found && j < questions_answers.length; j++){
            var response_B = questions_answers[j]["answer"]["hanzi"];

            if(response_A == response_B){
                found = true;
                console.log("response_A", response_A, "response_B", response_B, "iguales", response_A == response_B);
                answers.push({"A" : i, "B" : j});
            }
        }

    }

    console.log("answers -----", answers);

    return answers;

}

function getQuestionsAnswersABTable(answers){

    var table = "<table> <th>A</th> <th>B</th>";

    console.log("answers", answers);

    for(var i = 0; i < answers.length; i++){
        var row = "<tr>" + "<td>" + answers[i]["A"] + "</td>" + "<td>" + answers[i]["B"] + "</td>" + "</tr>";
        table += row;
    }

    table += "</table>";

    return table;
}

function showQuestionsAnswersABTable(){

    var target_element = document.getElementById("questions_answers_AB_table");

    if(target_element.innerHTML == ""){
        var questions_answers_corrected_table = getQuestionsAnswersABTable(getAnswers(questions_answers), question, answer);
        target_element.innerHTML = questions_answers_corrected_table;
    }else{
        target_element.innerHTML = "";
    }

}

//****************************************************
var vocabulary = data.vocabulary

console.log("vocabulary.length", vocabulary.length)
console.log("vocabulary", vocabulary)

var vocabulary_table = getVocabularyTable(vocabulary);

generateQuestionsAnswersTable();