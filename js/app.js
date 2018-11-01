const displacy = new displaCy('http://localhost:8000', {
    container: '#displacy',
    format: 'spacy',
    distance: 150,
    offsetX: 100
});

function doPOSTag() {
    inputSentence = $('#sentenceInput').val()
    console.log('click');
    
    $.ajax({
        type: "POST",
        url: "https://y23blf12y4.execute-api.eu-central-1.amazonaws.com/prod/pos",
        data: {
            "sentence": inputSentence
        },
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
            parse = data
            displacy.render(parse, {
                color: '#ff0000'
            });
        }
    });
};

//$('#postag').click(doPOSTag);

$(document).foundation();
$('#inputForm').on('submit', doPOSTag);

