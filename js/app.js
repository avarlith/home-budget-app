$(function () {
    var yearSettlement = $('#yearSettlement');
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
    var variantSubmit = $('#variantSubmit');
    var regularSubmit = $('#regularSubmit');
    var count = $('#count');
    var dataOfYear = $('#year-2017').find('div');


    incomeSubmit.on('click', function (event) {
        event.preventDefault();
    });

    regularSubmit.on('click', function (event) {
        event.preventDefault();
        var regularExpence = parseFloat(rentCost.val()) + parseFloat(currentCost.val()) + parseFloat(gasCost.val()) + parseFloat(phoneCost.val()) + parseFloat(internetCost.val());

        dataOfYear.eq(1).text(regularExpence);
    });

    variantSubmit.on('click', function (event) {
        event.preventDefault();
        var variantExpence = parseFloat(foodCost.val()) + parseFloat(clothesCost.val()) + parseFloat(cosmeticsCost.val()) + parseFloat(chemistryCost.val());

        dataOfYear.eq(2).text(variantExpence);
    });

    count.on('click', function (event) {
        event.preventDefault();

        var sumOfExpence = regularExpence + variantExpence;

        dataOfYear.eq(3).text(sumOfExpence);
    });

});