// vocabulary: array containing the vocabulary as json elements
function getVocabularyTable(vocabulary){

    var vocabulary_table = "";

    for(var i = 0; i < vocabulary.length; i++){
//        var row = "<div class='wordbox'>" + "<div>" + vocabulary[i]["hanzi"] + "</div>" + "<div>" + vocabulary[i]["pinyin"] + "</div>" + "<div>" + vocabulary[i]["translation"] + "</div>" + "</div>";
        var row = "<div class='wordbox col-2 col-lg-2 col-md-1 col-sm-1'>" + "<div class='hanzi'>" + vocabulary[i]["hanzi"] + "</div>" + "<div>" + vocabulary[i]["pinyin"] + "</div>" + "</div>";
        vocabulary_table = vocabulary_table + row;
    }

    return vocabulary_table;
}
function showVocabulary(){

    var target_element = document.getElementById("hanziposter");

    if(target_element.innerHTML == ""){
        var questions_answers_corrected_table = getVocabularyTable(vocabulary);
        target_element.innerHTML = questions_answers_corrected_table;
    }else{
        target_element.innerHTML = "";
    }

}

//****************************************************
var vocabulary = data.vocabulary

console.log("vocabulary.length", vocabulary.length)
console.log("vocabulary", vocabulary)

//var vocabulary_table = getHanziPosterTable(vocabulary);

showVocabulary();