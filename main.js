$(document).ready(function(event) {

  Game()

  $('button').on('click', function(){
    $('.modal').css('display', 'none')
    location.reload();
  })
  $('body').click(function(e){
    $('.modal').css('display', 'none')
  })
  $('.modal').on('click', function(e){
    e.stopPropagation()
  })
})

const Game = function(){
  var randNum = GenNumber()
  console.log(`Random: ${randNum}`)
  $(document).keypress(function(e) {
    if(e.which == 13) {
      var $num = $('input').val()
      var okay = Validate($num)
      if (okay === true){
        $('input').val('')
        picas = 0
        fijas = 0
        randNum.split('').forEach(function(randValue, randIndex){
          $num.split('').forEach(function(value, index){
            if (randValue === value){
              randIndex === index ? fijas++ : picas++
            }
          })
        })
        $('tbody').append(`<tr><td>${$num}</td><td>${picas}</td><td>${fijas}</td></tr>`)
        if (fijas === randNum.length) {
          $('.modal').css('display', 'block').hide().fadeIn(800)
        }
      }
    }
  })
}


const GenNumber = function () {
  var rep = 0
  var num_arr = []

  for (var i = 1; i <= 4; i++) {
    rep = 0
    var current = Math.floor(Math.random()*10).toString()
    if (num_arr == []) {
      num_arr.push(current)
    } else {
      num_arr.forEach (function(value) {
        if (value === current) rep = 1
      })
      rep === 1 ? i-- : num_arr.push(current)
    }
  }
  var num_str = num_arr.join().replace(/,/g,'')
  return num_str
}

const Validate = function(arr) {
  var okay = false
  if (arr.length != 4) { $('h2').html('<span>El número ingresado debe ser de 4 dígitos</span>') }
  else {
    arr = arr.split('')
    rep = 0
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = (i+1); j < arr.length; j++) {
        if (arr[i] === arr[j]) rep = 1
      }
    }
    if (rep === 1) { $('h2').html('<span>No pueden haber números repetidos</span>') }
    else {
      $('h2').html('Ingresa cuatro dígitos diferentes y oprime Enter')
      okay = true
    }
  }
  return okay
}
