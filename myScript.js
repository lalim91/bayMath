


    //callback function defined
    function newFunc(type, value, item) {
        switch (value) {
            case undefined:
                $('#display_area').html("");
                break;
            default:
                $('#display_area').html(value);
                break;
        }
    }
    // my_calculator - creates a new calculator object
    var my_calculator = new calculator(newFunc);
    //after DOM load add click handlers to all buttons
    $(document).ready(function () {
        $('.btn').on('click', function () {
            var val = $(this).text();
            switch (val) {
                case 'AC':
                    my_calculator.allClear();
                    break;
                default:
                    my_calculator.addItem($(this).text());
                    break;
            }
        });
    });




//@purpose:display value of number in the display area
//@params:
    //type: 'itemAdded', 'calculated', 'error'
    //value: string or number
    //error
//returns:
