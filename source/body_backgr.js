var anchor = document.getElementById('anchor');

var body = document.getElementsByTagName('body')[0];



anchor.addEventListener('mouseover',function(){body.style.background = "white";})
anchor.addEventListener('mouseout',function(){body.style.background = "gray";})
