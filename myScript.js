var input_storage = [''];
var current_index = 0;


$(document).ready(function(){

    $('.number').on('click', function(){//get the values of number and store them in store_number function
        store_number($(this).text());
    });

    $('.operator').on('click', function(){
        store_operator($(this).text());
    });

    $('#equal').on('click', function(){
       do_math();
    });

});

//@purpose:store numbers that are clicked in a variable; update display
//@params:
    //button_value
//@return
    //none
//@global
    //input_storage: where everything clicked will be stored in strings
    //current_index: the index of the most current position; where we are right now
function store_number(button_value){
    input_storage[current_index] = button_value;
    update_display();
}

//@purpose:store operators that are clicked in a variable; update display
//@params:
    //button_value
//@return
    //none
//@global
    //input_storage: where everything clicked will be stored in strings
    //current_index: the index of the most current position; where we are right now
function store_operator(button_value){
    current_index +=1;
    input_storage[current_index] = button_value;
    current_index +=1;
    input_storage[current_index] = "";
    update_display();
}

//@purpose:display whatever is in the array input_storage
//@params:
    //none
//@return
    //none
//@global
    //input_storage: where everything clicked will be stored in strings
function update_display(){
    var array_to_str = "";
    for(var i=0; i<input_storage.length; i++){
        array_to_str += input_storage[i];
    }
    $('#display').text(array_to_str);
}

//@purpose: do math based from parameters; decide which equation to use
//@params:
    //op1: first operand
    //op2: second operand
    //operator: the operator to perform
//@return
    //the result of math
//@global
    //input_storage: where everything clicked will be stored in strings
    //current_index: the index of the most current position; where we are right now
function