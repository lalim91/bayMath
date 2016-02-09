var input_storage = [''];
var current_index = 0;
var clear = false;


$(document).ready(function(){

    eye_blink_init();

    $('.number>button').on('click', function(){//get the values of number and store them in store_number function
        store_number($(this).text());
    });

    $('.operator>button').on('click', function(){
        store_operator($(this).text());
    });

    $('#equal>button').on('click', function(){
        clear = true;
        do_math();
        update_display();
    });

    $('#clear>button').on('click', function(){
        clear = true;
        clear_display();
    });

    $('.negative>button').on('click', function(){

    })
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
    input_storage[current_index] += button_value;
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

//@purpose:changing input_storage[current_index] to negative; change the display to negative
//@params:
//button_value
//@return
//none
//@global
//input_storage: where everything clicked will be stored in strings
//current_index: the index of the most current position; where we are right now



//@purpose:display whatever is in the array input_storage
//@params:
    //none
//@return
    //none
//@global
    //input_storage: where everything clicked will be stored in strings
function update_display() {
    var output = "";
    for (var i = 0; i < input_storage.length; i++) {
        output += input_storage[i];
    }
    $('#display').text(output);
}

//@purpose:clear the display
//@params:
//none
//@return
//none
//@global
//input_storage: where everything clicked will be stored in strings

function clear_display(){
    input_storage = [''];
    current_index = 0;
    update_display();
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
    function choose_equation(op1, op2, operator) {
        var result;
        switch (operator) {
            case '+':
                result = op1 + op2;
                break;
            case "-":
                result = op1 - op2;
                break;
            case 'x':
                result = op1 * op2;
                break;
            case '/':
                result = op1 / op2;
                break;
        }
        return result;
    }

//@purpose: iterate through input_storage to find what ops and operator
//@params:
    //none
//@return
    //none
//@global
    //input_storage: where everything clicked will be stored in strings
    //current_index: the index of the most current position; where we are right now
    function do_math() {
        var num1 = null,
            num2 = null,
            operator = null,
            op_array = ['+', "-", 'x', '/'],
            result=null;
        for (var i = 0; input_storage.length > 1 && i < input_storage.length; i++) {
            if (!isNaN(input_storage[i])) {
                if (num1 == null) {
                    num1 = parseFloat(input_storage[i]);
                } else {
                    num2 = parseFloat(input_storage[i]);
                }
            } else if (op_array.indexOf(input_storage[i]) > (-1)) {
                operator = input_storage[i];
            }
            if (num1!=null && num2!=null && operator!=null){
                result= choose_equation(num1, num2, operator);
                input_storage[i]=result;
                input_storage.splice(0,2);
                i = -1;
                num1= null;
                num2= null;
                operator= null;
            }
        }
        update_display();
        fist_bump()
    }

function fist_bump(){
    $("#fist_bump")[0].play();
}
function eye_blink_init(){
    var x = Math.floor(Math.random()*14000)+1000;
    setTimeout(eye_blink,x);
    //console.log('eye blink started');
}
function eye_blink(){
    //console.log('eye blink called');
    $('.eye').toggleClass('eye_blink');
    if($('.eye').hasClass('eye_blink')){
        setTimeout(eye_blink,500);
        //console.log('blinking, starting unblink timer')
    }else{
        //console.log('unblinking, setting next blink')
        var x = Math.floor(Math.random()*4000)+1000;
        setTimeout(eye_blink,x);
    }



}

