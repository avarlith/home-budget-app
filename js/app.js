$(function () {
    var counter = 0;
    var arrays = [];
    var namesArray = $('field-wrapper').find('input[name="text"');

    var income = $('#income');
    var summaryIncome = 0;

    var rentCost = $('#rent');
    var currentCost = $('#current');
    var gasCost = $('#gas');
    var phoneCost = $('#phone');
    var internetCost = $('#internet');
    var regularCosts = 0;
    var regularExpence = 0;
    var summaryRegularExpence = 0;

    var foodCost = $('#food');
    var clothesCost = $('#clothes');
    var cosmeticsCost = $('#cosmetics');
    var chemistryCost = $('#chemistry');
    var variantCosts = 0;
    var variantExpence = 0;
    var summaryVariantExpence = 0;

    var incomeSubmit = $('#incomeSubmit');
    var regularSubmit = $('#regularSubmit');
    var variantSubmit = $('#variantSubmit');
    var createNewRowBtn = $('#create-new-row');
    var addBtns = $('.addExpence');
    var countBtn = $('#count');

    var dataOfMonth = 0;
    var dataOfYear = $('#year-2017').find('div');

    createNewRowBtn.on('click', function (event) {
        event.preventDefault();
        var newRow = $('.notDisplay').find('.month').clone(true).addClass('m' + $(this).prev().val()).appendTo('.div-table');

        newRow.find('.div-cell').eq(0).text($(this).prev().val());

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

        dataOfMonth = $('.div-table').find('.div-row').last().find('.div-cell');

        summaryIncome += parseFloat(income.val());

        dataOfMonth.eq(4).text(parseFloat(income.val()));
        dataOfYear.eq(4).text(summaryIncome);
    });

    regularSubmit.on('click', function (event) {
        event.preventDefault();
        arrays.push($('form[class="regularExpence"]').serializeArray());

        regularCosts = $('.regularExpence').find('input[type="number"]');

        regularCosts.each(function () {
            regularExpence += parseFloat($(this).val());
        })

        summaryRegularExpence += regularExpence;

        regularCosts.each(function () {
            $(this).val('0.00');
        });

        dataOfMonth = $('.div-table').find('.div-row').last().find('.div-cell');
        dataOfMonth.eq(1).text(regularExpence);
        dataOfYear.eq(1).text(summaryRegularExpence);
        regularCosts = 0;
    });

    variantSubmit.on('click', function (event) {
        event.preventDefault();
        arrays.push($('form[class="variantExpence"]').serializeArray());

        variantCosts = $('.variantExpence').find('input[type=number]');

        variantCosts.each(function () {
            variantExpence += parseFloat($(this).val());
        })

        summaryVariantExpence += variantExpence;

        variantCosts.each(function () {
            $(this).val('0.00');
        });

        dataOfMonth = $('.div-table').find('.div-row').last().find('.div-cell');
        dataOfMonth.eq(2).text(variantExpence);
        dataOfYear.eq(2).text(summaryVariantExpence);
        variantExpence = 0;
    });

    countBtn.on('click', function (event) {
        event.preventDefault();

        dataOfMonth = $('.div-table').find('.div-row').last().find('.div-cell');

        var sumOfExpence = parseFloat(dataOfMonth.eq(1).text()) + parseFloat(dataOfMonth.eq(2).text());
        var summarySumOfExpence = parseFloat(dataOfYear.eq(1).text()) + parseFloat(dataOfYear.eq(2).text());

        dataOfMonth.eq(3).text(sumOfExpence);
        dataOfYear.eq(3).text(summarySumOfExpence);

        var rest = parseFloat(dataOfMonth.eq(4).text()) - sumOfExpence;
        var summaryRest = parseFloat(dataOfYear.eq(4).text()) - summarySumOfExpence;

        if (rest > 0) {
            dataOfMonth.eq(5).text('+' + rest);
            dataOfMonth.eq(5).addClass('savings');
        } else {
            dataOfMonth.eq(5).text(rest);
            dataOfMonth.eq(5).addClass('debit');
        }

         if (summaryRest > 0) {
            dataOfYear.eq(5).text('+' + rest);
            dataOfYear.eq(5).addClass('savings');
        } else {
            dataOfYear.eq(5).text(rest);
            dataOfYear.eq(5).addClass('debit');
        }
    });

});