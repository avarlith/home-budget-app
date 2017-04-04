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

    var summarySumOfExpence = 0;

    var incomeSubmit = $('#incomeSubmit');
    var regularSubmit = $('#regularSubmit');
    var variantSubmit = $('#variantSubmit');
    var createNewMonthBtn = $('#create-new-month');
    var createNewYearBtn = $('#create-new-year');
    var addBtns = $('.addExpence');
    var countBtn = $('#count');
    var searchBtn = $('#resultVisualization');

    var dataOfMonth = 0;
    var dataOfYear = 0;

    function animateBtn(btn) {
        btn.animate({
            opacity: 0.25
        }, 500, function () {
            btn.animate({
                opacity: 1
            }, 500)
        });
    }

    function calculate() {
        dataOfMonth = $('.settlement').find('.month').last().find('div');
        dataOfYear = $('.settlement').find('.year').last().find('div');

        var sumOfExpence = (parseFloat(dataOfMonth.eq(1).text()) + parseFloat(dataOfMonth.eq(2).text())).toFixed(2);
        summarySumOfExpence = (parseFloat(dataOfYear.eq(1).text()) + parseFloat(dataOfYear.eq(2).text())).toFixed(2);

        dataOfMonth.eq(3).text(sumOfExpence);
        dataOfYear.eq(3).text(summarySumOfExpence);

        var rest = (parseFloat(dataOfMonth.eq(4).text()) - sumOfExpence).toFixed(2);
        var summaryRest = (parseFloat(dataOfYear.eq(4).text()) - summarySumOfExpence).toFixed(2);

        if (rest > 0) {
            dataOfMonth.eq(5).text('+' + rest);
            dataOfMonth.eq(5).addClass('savings').removeClass('debit');
        } else {
            dataOfMonth.eq(5).text(rest);
            dataOfMonth.eq(5).addClass('debit').removeClass('savings');
        }

        if (summaryRest > 0) {
            dataOfYear.eq(5).text('+' + summaryRest);
            dataOfYear.eq(5).addClass('savings').removeClass('debit');
        } else {
            dataOfYear.eq(5).text(summaryRest);
            dataOfYear.eq(5).addClass('debit').removeClass('savings');
        }
    }

    createNewYearBtn.on('click', function (event) {
        event.preventDefault();

        animateBtn($(this));

        var newRow = $('.notDisplay').find('.year').clone(true).addClass('y' + $(this).prev().val()).appendTo('.settlement');

        newRow.find('div').eq(0).text($(this).prev().val());

    });

    createNewMonthBtn.on('click', function (event) {
        event.preventDefault();

        animateBtn($(this));

        var newRow = $('.notDisplay').find('.month').clone(true).addClass('m' + $(this).prev().val()).appendTo('.settlement');

        newRow.find('div').eq(0).text($(this).prev().val());

    });

    searchBtn.on('click', function (event) {
        event.preventDefault();

        animateBtn($(this));

        var searchItem = $('#searchItem').val();
        var findItem = [];
        var sum = 0;

        for (i = 0; i < arrays.length; i++) {
            $.map(arrays[i], function (value, key) {
                if (value.name == searchItem) {
                    findItem.push(value.value);
                }
            });
        }

        $.map(findItem, function (n) {
            sum += parseFloat(n);
        });
        console.log(sum);
        var n = (parseFloat(sum) / parseFloat(summarySumOfExpence)) * 100;
        console.log(summarySumOfExpence);
        console.log(n);

        $('.visual').animate({
            width: n + "%"
        }, 2000);


    });

    addBtns.on('click', function (event) {
        console.log(addBtns);
        event.preventDefault();

        animateBtn($(this));

        var nameCost = $(this).prev();
        var label = $('<label for="' + nameCost.val() + '" class="col-3">' + nameCost.val() + '</label>');
        var input = $('<input type="number" name="' + nameCost.val() + '" id="' + nameCost.val() + '" class="col-6" value="0.00">');
        var button = $('<button class="col-1 removeExpence">X</button>');
        var newDiv = $('<div class="row"></div>');

        newDiv.append(label);
        newDiv.append(input);
        newDiv.append(button);
        $(this).parent().before(newDiv);
        nameCost.val('');

    });

    incomeSubmit.on('click', function (event) {
        event.preventDefault();

        animateBtn($(this));

        var newObject = $('form[class="col-12 incomeForm"]').serializeArray();
        arrays.push(newObject);
        console.log(arrays);
        dataOfMonth = $('.settlement').find('.month').last().find('div');
        dataOfYear = $('.settlement').find('.year').last().find('div');

        summaryIncome += parseFloat(income.val());

        dataOfMonth.eq(4).text(parseFloat(income.val()));
        dataOfYear.eq(4).text(summaryIncome.toFixed(2));
        
        calculate();
    });

    regularSubmit.on('click', function (event) {
        event.preventDefault();

        animateBtn($(this));

        var newObject = $('form[class="col-12 regularExpence"]').serializeArray();
        arrays.push(newObject);
        console.log(arrays);
        regularCosts = $('.regularExpence').find('input[type="number"]');

        regularCosts.each(function () {
            regularExpence += parseFloat($(this).val());
        })

        summaryRegularExpence += regularExpence;

        regularCosts.each(function () {
            $(this).val('0.00');
        });

        dataOfMonth = $('.settlement').find('.month').last().find('div');
        dataOfYear = $('.settlement').find('.year').last().find('div');

        dataOfMonth.eq(1).text(regularExpence.toFixed(2));
        dataOfYear.eq(1).text(summaryRegularExpence.toFixed(2));
        regularExpence = 0;

        calculate();
    });

    variantSubmit.on('click', function (event) {
        event.preventDefault();

        animateBtn($(this));

        arrays.push($('form[class="col-12 variantExpence"]').serializeArray());

        variantCosts = $('.variantExpence').find('input[type=number]');

        variantCosts.each(function () {
            variantExpence += parseFloat($(this).val());
        })

        summaryVariantExpence += variantExpence;

        variantCosts.each(function () {
            $(this).val('0.00');
        });

        dataOfMonth = $('.settlement').find('.month').last().find('div');
        dataOfYear = $('.settlement').find('.year').last().find('div');

        dataOfMonth.eq(2).text(variantExpence.toFixed(2));
        dataOfYear.eq(2).text(summaryVariantExpence.toFixed(2));
        variantExpence = 0;

        calculate();
    });

});