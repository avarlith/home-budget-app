$(function () {
    var income = $('#income');

    var rentCost = $('#rent');
    var currentCost = $('#current');
    var gasCost = $('#gas');
    var phoneCost = $('#phone');
    var internetCost = $('#internet');

    var foodCost = $('#food');
    var clothesCost = $('#clothes');
    var cosmeticsCost = $('#cosmetics');
    var chemistryCost = $('#chemistry');

    var incomeSubmit = $('#incomeSubmit');

    var regularSubmit = $('#regularSubmit');
    
    var regularExpence = 0;
    var variantExpence = 0;

    var variantSubmit = $('#variantSubmit');


    var addBtns = $('.addExpence');
    var counter = 0;
    var countBtn = $('#count');

    var dataOfYear = $('#year-2017').find('div');

    addBtns.on('click', function (event) {
        console.log(addBtns);
        event.preventDefault();
        counter += 1;
        var nameCost = $(this).prev();
        var label = $('<label for="cost' + counter + '">' + nameCost.val() + '</label>');
        var input = $('<input type="number" name="cost' + counter + '" id="cost' + counter + '" value="0.00">');
        var button = $('<button class="removeExpence">Usuń wydatek</button>');
        var newDiv = $('<div class="field-wrapper"></div>');

        newDiv.append(label);
        newDiv.append(input);
        newDiv.append(button);
        $(this).parent().before(newDiv);
        nameCost.val('');

    });

    incomeSubmit.on('click', function (event) {
        event.preventDefault();
        dataOfYear.eq(4).text(parseFloat(income.val()));
    });

    regularSubmit.on('click', function (event) {
        event.preventDefault();

        var regularCosts = $('.regularExpence').find('input[type=number]');

        regularCosts.each(function(){
            regularExpence += parseFloat($(this).val());
        })
        
        dataOfYear.eq(1).text(regularExpence);
    });

    variantSubmit.on('click', function (event) {
        event.preventDefault();
        var variantCosts = $('.variantExpence').find('input[type=number]');

        variantCosts.each(function(){
            variantExpence += parseFloat($(this).val());
        })

        dataOfYear.eq(2).text(variantExpence);
    });

    countBtn.on('click', function (event) {
        event.preventDefault();
        var sumOfExpence = parseFloat(dataOfYear.eq(1).text()) + parseFloat(dataOfYear.eq(2).text());

        dataOfYear.eq(3).text(sumOfExpence);

        var rest = parseFloat(dataOfYear.eq(4).text()) - sumOfExpence;

        if (rest > 0) {
            dataOfYear.eq(5).text('+' + rest);
            dataOfYear.eq(5).addClass('savings');
        } else {
            dataOfYear.eq(5).text(rest);
            dataOfYear.eq(5).addClass('debit');
        }
    });

});