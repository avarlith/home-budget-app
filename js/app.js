$(function () {
    var counter = 0;
    var arrays = [];
    var namesArray = $('field-wrapper').find('input[name="text"');

    var income = $('#income');

    var rentCost = $('#rent');
    var currentCost = $('#current');
    var gasCost = $('#gas');
    var phoneCost = $('#phone');
    var internetCost = $('#internet');
    var regularCosts = 0;
    var regularExpence = 0;

    var foodCost = $('#food');
    var clothesCost = $('#clothes');
    var cosmeticsCost = $('#cosmetics');
    var chemistryCost = $('#chemistry');
    var variantCosts = 0;
    var variantExpence = 0;

    var incomeSubmit = $('#incomeSubmit');
    var regularSubmit = $('#regularSubmit');
    var variantSubmit = $('#variantSubmit');
    var createNewRowBtn = $('#create-new-row');
    var addBtns = $('.addExpence');
    var countBtn = $('#count');


    var dataOfYear = $('#year-2017').find('div');

    createNewRowBtn.on('click', function(){
        $('.notDisplay').find('.month').clone().appendTo('.div-table');
    });

    addBtns.eq(0).on('click', function (event) {
        console.log(addBtns);
        event.preventDefault();
        counter += 1;
        var nameCost = $(this).prev();
        var label = $('<label for="regular' + counter + '">' + nameCost.val() + '</label>');
        var input = $('<input type="number" name="regular' + counter + '" id="regular' + counter + '" value="0.00">');
        var button = $('<button class="removeExpence">Usuń wydatek</button>');
        var newDiv = $('<div class="field-wrapper"></div>');

        newDiv.append(label);
        newDiv.append(input);
        newDiv.append(button);
        $(this).parent().before(newDiv);
        nameCost.val('');

    });

    addBtns.eq(1).on('click', function (event) {
        console.log(addBtns);
        event.preventDefault();
        counter += 1;
        var nameCost = $(this).prev();
        var label = $('<label for="variant' + counter + '">' + nameCost.val() + '</label>');
        var input = $('<input type="number" name="variant' + counter + '" id="variant' + counter + '" value="0.00">');
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
        arrays.push($('form[class="incomeForm"]').serializeArray());

        dataOfYear.eq(4).text(parseFloat(income.val()));
    });

    regularSubmit.on('click', function (event) {
        event.preventDefault();
        arrays.push($('form[class="regularExpence"]').serializeArray());

        regularCosts = $('.regularExpence').find('input[type="number"]');

        regularCosts.each(function () {
            regularExpence += parseFloat($(this).val());
        })

        dataOfYear.eq(1).text(regularExpence);
    });

    variantSubmit.on('click', function (event) {
        event.preventDefault();
        arrays.push($('form[class="variantExpence"]').serializeArray());

        variantCosts = $('.variantExpence').find('input[type=number]');

        variantCosts.each(function () {
            variantExpence += parseFloat($(this).val());
        })

        dataOfYear.eq(2).text(variantExpence);
    });

    countBtn.on('click', function (event) {
        event.preventDefault();
        createMonthSummary();
        var newSummaryCells = $('.month').find('.div-cell');

        var sumOfExpence = parseFloat(dataOfYear.eq(1).text()) + parseFloat(dataOfYear.eq(2).text());

        newSummaryCells.eq(3).text(sumOfExpence);

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