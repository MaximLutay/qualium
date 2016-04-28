function remove_px( value ){

  var px_string_value  = value;
  var string_value = px_string_value.slice(0,-2);
  var int_value = parseInt(string_value);


  return int_value;
};
//return int_value;

function random_integer(from,to){
  return Math.floor(Math.random()*(to-from)+from );
};
//return random_integer;



function random_rgb_color(){
  var randomcolor = 'rgb('+random_integer(0,255)+','+random_integer(0,255)+','+random_integer(0,255)+')';
  return randomcolor;
};
//return random_rgb_color;


function create_inner_overlaper(parent_id){



  var parent = document.getElementById(parent_id);


  var parent_width = parent.offsetWidth;
  var parent_height = parent.offsetHeight;


  var overlaper = document.createElement("div");
  parent.appendChild(overlaper);



  overlaper.setAttribute('id','overlaper');
  overlaper.style.width = parent_width*2 + 10 +'px';
  overlaper.style.height = parent_height +'px';
  overlaper.style.marginLeft = -1*( parent_width*2) + 'px';

  return 'overlaper';
};
//return 'overlaper';


function divide_on_rows( element_id , n_of_rows ){
  var element = document.getElementById(element_id);
  var element_height = remove_px(element.style.height);

  var each_row_height = element_height/n_of_rows;


  for(var i = 0; i < n_of_rows + 1 ; i++){

    var temp = document.createElement('div');
    temp.setAttribute('id', 'row' + i);
    element.appendChild(temp);
    temp.style.height = each_row_height + 'px';

  };

  return each_row_height;
};
//return each_row_height;


function center_element_position(element_id){
      var window_width = window.innerWidth;
      var window_height = window.innerHeight;


      var element = document.getElementById(element_id);


      var element_width = element.offsetWidth;
      var element_height = element.offsetHeight;


      var element_top  = window_height/2 - element_height/2;
      var element_left = window_width/2 - element_width/2;

      element.style.top = element_top + "px";
      element.style.left = element_left + "px";

      console.log('top: '+ element_top );
      console.log('left: '+element_left);

};



function set_width_for_rows_rand_color(which_row_is_largest,n_of_rows,each_row_height){

  var overlap = document.getElementById('overlaper');
  var startwidth = remove_px(overlap.style.width);

  var row_color = random_rgb_color();


  for(var j = 0; j < n_of_rows + 1;j++){

      var temp = document.getElementById('row'+j);
      temp.style.background = row_color;

      if(j < which_row_is_largest){
        temp.style.width = startwidth - (which_row_is_largest - j)*each_row_height + 'px';
      }else if( j > which_row_is_largest ){
        temp.style.width = startwidth - (j - which_row_is_largest )*each_row_height + 'px';
      }else{
          temp.style.width = startwidth+'px';
      };

    };

    console.log(row_color);

    return row_color;

};
//return row_color;

function move_to_right(element_id,totalmove){
  var element = document.getElementById(element_id);
  var margin_start_state = remove_px(element.style.marginLeft);

  var increaser = 0;

  var move = setInterval(function(){
      element.style.marginLeft = margin_start_state + increaser + 'px';

      if(increaser>= totalmove){clearInterval(move);};

      increaser+=5;

    },1);

    margin_start_state = -800;

    return margin_start_state;
};
//return margin_start_state;


function hide_element(element_id){
  var element = document.getElementById(element_id);

  element.style.visibility = 'hidden';

};

function show_element(element_id){
  var element = document.getElementById(element_id);
  element.style.visibility = 'visible';
};



function animation(n_of_rows,each_row_height,element_id){
  var which_row_is_largest =  on_which_row_is_cursor(each_row_height);     //random_integer(0,n_of_rows+1);
  var next_container_color = set_width_for_rows_rand_color(which_row_is_largest,n_of_rows,each_row_height);
  var margin_start = move_to_right(element_id,800);
  var start = setTimeout(function(){ document.getElementById('viewarea').style.background = next_container_color;},800);
  hide_element(element_id);
  document.getElementById(element_id).style.marginLeft = margin_start+'px';
  show_element(element_id);
  console.log('animated');

};





function on_which_row_is_cursor(each_row_height){
  var element = document.getElementById('viewarea');


  var yPosition = event.clientY - remove_px(element.style.top);

  var height = element.style.height;
  var q = Math.floor( yPosition /each_row_height ) ;

  console.log('top='+element.style.top);
  console.log('y = '+yPosition);
  console.log('row = '+q);

  return q;

};





function all(){




var n = 20;
var overlaper = create_inner_overlaper('viewarea');//this is string id
var row_height = divide_on_rows('overlaper',n);//                 !GLOBAL


exec_on_click(n,row_height,overlaper);
console.log('event added');

};



function exec_on_click(n_of_rows,each_row_height,element_id){

var element = document.getElementById(element_id);
var viewarea = document.getElementById('viewarea');



viewarea.addEventListener( 'click',function(){animation(n_of_rows,each_row_height,element_id)} );



};







window.onload=function(){center_element_position('viewarea');all();backstl();};

window.onresize=function(){center_element_position('viewarea');};




