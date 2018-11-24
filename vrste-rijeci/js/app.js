const displacy = new displaCy('http://localhost:17777', {
    container: '#displacy',
    format: 'spacy',
    distance: 150,
    offsetX: 100,
    bg: 'inherit'
});

function doPOSTag() {
    $('#displacyLoader').show();

    inputSentence = $('#sentenceInput').val();
    
    $.ajax({
        type: "POST",
        url: "https://y23blf12y4.execute-api.eu-central-1.amazonaws.com/prod/pos",
        data: {
            "sentence": inputSentence
        },
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        headers: {
            'x-api-key': 'TwWmLpW0Xj9Kkheo5UpHB6c01ZR7RxAd3BZyfLmS'
        },
        success: function(data, textStatus, jqXHR) {
            parse = data
            displacy.render(parse, {
                color: '#ff0000'
            });
            $('#sentenceInput').blur();
            $('#scrollInfo').show();
        },
        error: function() {
            alert('Došlo je do pogreške. Molimo pokušajte ponovo.');
        },
        complete: function() {
            $('#displacyLoader').hide();
        }
    });
    return false; // very important
};

//$('#postag').click(doPOSTag);

$('#displacyLoader').hide();
$('#scrollInfo').hide();
$(document).foundation();
$('#inputForm').on('submit', doPOSTag);
