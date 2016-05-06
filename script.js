/**
 * Created by Lalim on 4/11/16.
 */
var calculator = function(){
    var self = this;
    var inputStorage = [''];
    var currentIndex = 0;

    this.storeNumber = function (buttonValue){
        if (typeof inputStorage[currentIndex] == 'number'){
            inputStorage[currentIndex] = buttonValue;
        }else if (inputStorage[currentIndex] == 'error'){
            inputStorage[currentIndex] =buttonValue;
        }else{
            inputStorage[currentIndex] += buttonValue;
        }
        self.updateDisplay();
    };

    this.storeOperator = function(buttonValue){
        if (inputStorage[currentIndex == '']){
            (inputStorage[currentIndex-1]) = buttonValue;
        }else if (inputStorage[currentIndex] == 'error'){
            self.clearDisplay();
        }else{
            currentIndex += 1;
            inputStorage[currentIndex] = buttonValue;
            currentIndex += 1;
            inputStorage[currentIndex] = '';
        }
        self.updateDisplay();
    };

    this.negativeNumber = function(number){
        if (number != 0) {
            inputStorage[currentIndex] *= -1;
        }
    };

    this.percentage = function(){
        inputStorage[currentIndex] *= .01;
    };

    this.updateDisplay = function(){
        var output = "";
        for (var i = 0; i < inputStorage.length; i++) {
            output += inputStorage[i];
        }
        $('.screen').text(output);
    };

    this.clearDisplay = function(){
        inputStorage = [''];
        current_index = 0;
        self.updateDisplay();
    };

    this.buttonClick = function(){
        var buttons = new buttonController();
        buttons.clickHandlers();
    };

    this.chooseEquation = function(op1, op2, operator){
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
                if (op2 == 0 && op1 != 0) {
                    return "error";
                } else {
                    result = op1 / op2;
                    break;
                }

        }
        return result;
    };

    this.doMath = function (){
        var num1 = null,
            num2 = null,
            operator = null,
            op_array = ['+', "-", 'x', '/'],
            result = null;
        for (var i = 0; inputStorage.length > 1 && i < inputStorage.length; i++) {
            if (!isNaN(inputStorage[i])) {
                if (num1 == null) {
                    num1 = parseFloat(inputStorage[i]);
                } else {
                    num2 = parseFloat(inputStorage[i]);
                }
            } else if (op_array.indexOf(inputStorage[i]) > (-1)) {
                operator = inputStorage[i];
            }
            if (num1 != null && num2 != null && operator != null) {
                result = self.chooseEquation(num1, num2, operator);
                inputStorage[i] = result;
                inputStorage.splice(0, 2);
                i = -1;
                num1 = null;
                num2 = null;
                operator = null;
            }
        }
        self.updateDisplay();
        currentIndex = 0;
        self.fistBump();
    };

    this.fistBump = function () {
        $("#fistBump")[0].play();
    };

    this.eyeBlinkInit = function () {
        var blink = Math.floor(Math.random() * 4000) + 1000;
        setTimeout(self.eyeBlink, blink);
    };

    this.eyeBlink = function (){
        var eye = $('.eye');
        eye.toggleClass('eyeBlink');
        if(eye.hasClass('eyeBlink')) {
            setTimeout(self.eyeBlink, 500);
        } else {
            self.eyeBlinkInit();
        }
    };





    var buttonController = function() {


        this.clickHandlers = function () {
            $('.number').on('click', function () {
                calc.storeNumber($(this).text());
            });

            $('.operator').on('click', function () {
                calc.storeOperator($(this).text());
            });

            $('.equal').on('click', function () {
                calc.doMath();
                calc.updateDisplay();
            });

            $('.clear').on('click', function () {
                calc.clearDisplay();
            });

            $('.negative').on('click', function () {
                calc.negativeNumber(inputStorage[currentIndex]);
                calc.updateDisplay();
            });

            $('.percent').on('click', function () {
                calc.percentage();
                calc.updateDisplay();
            });

        };
    }

};
var calc;
$(document).ready(function () {
    calc = new calculator();
    calc.buttonClick();
    calc.eyeBlinkInit();
});