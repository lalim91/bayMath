var input_storage = [''];//main storage array container
var current_index = 0;//index of current location in the index; (ex: the i in a for loop)


$(document).ready(function(){ //document.ready function

    eye_blink_init();//call eye_blink_init function;

    $('.number>button').on('click', function(){//on 'click' method: target class number>button
        store_number($(this).text());//get the values of number and store them in store_number() function
    });

    $('.operator>button').on('click', function(){//on 'click' method: target class operator>button
        store_operator($(this).text());//get the values of operator and store them in store_operator() function
    });

    $('#equal>button').on('click', function(){//on 'click' method: target id equal>button
        do_math();//call function do_math() function
        update_display();//call function update_display() function
    });

    $('#clear>button').on('click', function(){//on 'click' method: target id clear>button
        clear_display();//call clear_display() function
    });

    $('.negative>button').on('click', function(){//on 'click' method: target class negative>button
        negative_number(input_storage[current_index]);//call negative_number(input_storage[current_index])function; parameter: input_storage[current_index]
        update_display();//call update_display() function
    });

    $('.percent>button').on('click', function(){//on 'click' method: target class percent>button
        percentage(input_storage[current_index]);//call percentage(input_storage[current_index]); parameter: input_storage[current_index]
        update_display();//call update_display() function
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
function store_number(button_value){//declare function store_number(button_value);parameter: button_value
    if (typeof input_storage[current_index] == "number"){//if conditional: if: type of input_storage[current_index] is equal to "number"
        input_storage[current_index] = button_value;//button_value is assigned to input_storage[current_index]
    }else if (input_storage[current_index] == "error"){//else if:input_storage[current_index] is equal to "error"
        input_storage[current_index] = button_value;//input_storage[current_index] is assigned button value; resets the array
        } else{//else
        input_storage[current_index] += button_value;//button_value is added to input_storage[current_index]
    }
    update_display();//call update_display() function
}

//@purpose:store operators that are clicked in a variable; update display
//@params:
    //button_value
//@return
    //none
//@global
    //input_storage: where everything clicked will be stored in strings
    //current_index: the index of the most current position; where we are right now
function store_operator(button_value){//declare function store_operator(button_value);parameter: button_value
    if ((input_storage[current_index]) == ""){//if conditional: if: type of input_storage[current_index] is equal to "" (empty string)
        (input_storage[current_index-1]) = button_value;//input_storage[current_index-1] is assigned button value (-1 because current_index increments to a "" (empty string)
    }else if (input_storage[current_index] == "error"){//else if:input_storage[current_index] is equal to "error"
        clear_display();//call clear_display() function
    } else{//else
        current_index +=1;//increment current index by 1 (so the operator won't concatenate to num1)
        input_storage[current_index] = button_value;//button_value is assigned to input_storage[current_index]
        current_index +=1;//increment current index by 1 (so num2 won't concatenate to operator)
        input_storage[current_index] = "";//(empty string "") is assigned to input_storage[current_index] (so num2 won't be undefined
    }
    update_display();//call update_display() function
}

//@purpose:changing input_storage[current_index] to negative; change the display to negative
//@params:
//button_value
//@return
//none
//@global
//input_storage: where everything clicked will be stored in strings
//current_index: the index of the most current position; where we are right now
function negative_number(number){//declare function negative_number();
    if (number != 0) {{//if conditional: if: number does not equal zero
    input_storage[current_index] *= -1;//multiply input_storage[current_index] by (-1)
    }
}

//@purpose:change number into a percentage; multiplying the number by .01
//@params:
//button_value
//@return
//none
//@global
//input_storage: where everything clicked will be stored in strings
//current_index: the index of the most current position; where we are right now
function percentage(){//declare function percentage()
    input_storage[current_index]*=.01;//multiply input_storage[current_index] by (.01)
}


//@purpose:display whatever is in the array input_storage
//@params:
    //none
//@return
    //none
//@global
    //input_storage: where everything clicked will be stored in strings
function update_display(){//declare function update_display()
    var output = "";//declare local variable "output"; assign "" (empty string)
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
                if(op2==0 && op1 != 0){
                    return "error";
                }else{
                    result = op1 / op2;
                    break;
                }

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
        current_index = 0;
        fist_bump()
    }

//@purpose: play the audio clip from audio source
//@params:
    //none
//@return
    //none
//@global
    //none
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


