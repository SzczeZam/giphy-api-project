var topics = ['cats','dogs','endorphins','cute animals','motivation']  

var API_KEY = 'KcIutgRHpXi85QG3IKY3GUbvfEOrIzS5'




function renderBtn(){
    for (var i = 0; i < topics.length; i++) {
        let newBtn = $('<button/>', {
            type: 'submit',
            class: 'gifBtn',
            'data-topic' : topics[i],
            text: topics[i],
            id: topics[i],
        })
        console.log(topics[i])
        $('#button-bar').append(newBtn)
    }
}

function displayGifs(){
    var topic = $(this).attr('data-topic')
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + topic + '&rating=pg13&limit=10&api_key=' + API_KEY
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(response){
        for (var i = 0; i < response.data.length; i++){
            var linkAnimate = response.data[i].images.fixed_width.url
            var linkStill = response.data[i].images.fixed_width_still.url
            var newImage = $('<img />', {
                src: linkStill,
                class: 'gifs',
                'data-state': 'still',
                'data-still': linkStill,
                'data-animate': linkAnimate,
            })
            $('#gif-display').prepend(newImage)
        }
    })
}


$('#button-bar').on('click','.gifBtn', displayGifs)
renderBtn()

$('#gif-display').on('click', '.gifs', function(e){
    var state = $(this).attr('data-state')
    var still = $(this).attr('data-still')
    var animate = $(this).attr('data-animate')
    console.log('You Clicked ' + $(this))
    if (state === 'still') {

        $(this).attr('src', animate)
        $(this).attr('data-state', 'animate')
    } else if (state === 'animate') {
        $(this).attr('src', still)
        $(this).attr('data-state', 'still')
    }
})
