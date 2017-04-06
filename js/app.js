$(function () {
    var results = $('#results');
    if (localStorage.getItem("#results")) {
        results.html(localStorage.getItem("#results"));
    };

    var arrays = [];
    if (localStorage.getItem("arrays")) {
        arrays = JSON.parse(localStorage.getItem("arrays"));
    };

    var income = $('#income');
    var summaryIncome = 0;

    var rentCost = $('#rent');
    var currentCost = $('#current');
    var gasCost = $('#gas');
    var phoneCost = $('#phone');
    var internetCost = $('#internet');
    var regularCosts = 0;
    var regularExpense = 0;
    var summaryRegularExpense = 0;

    var foodCost = $('#food');
    var clothesCost = $('#clothes');
    var cosmeticsCost = $('#cosmetics');
    var chemistryCost = $('#chemistry');
    var variantCosts = 0;
    var variantExpense = 0;
    var summaryVariantExpense = 0;

    var summarySumOfExpense = 0;

    var incomeSubmit = $('#incomeSubmit');
    var regularSubmit = $('#regularSubmit');
    var variantSubmit = $('#variantSubmit');
    var createNewMonthBtn = $('#create-new-month');
    var createNewYearBtn = $('#create-new-year');
    var addBtns = $('.addExpense');
    var countBtn = $('#count');
    var searchBtn = $('#resultVisualization');

    var dataOfMonth = 0;
    var dataOfYear = 0;

    var regExpNum = /^[0-9]+$/;
    var regExpChar = /^[a-zA-Z\s]*$/;

    function isValidYear(input) {
        if (input.val().length == 4 && regExpNum.test(input.val())) {
            return true;
        } else {
            input.val("Incorrect data").css('background-color', 'mediumvioletred');
            return false;
        }
    }

    function isValidMonth(input) {
        if (input.val().length == 2 && regExpNum.test(input.val())) {
            return true;
        } else {
            input.val("Incorrect data").css('background-color', 'mediumvioletred');
            return false;
        }
    }

    function isValidCost(input) {
        if (input.val() > -1) {
            return true;
        } else {
            input.css('background-color', 'mediumvioletred');
            var message = $('<span>Incorrect data</span>').css('color', 'mediumvioletred');
            input.after(message);
            message.fadeOut(2000);
            return false;
        }
    }

    function isValidNewExpense(input) {
        if (regExpChar.test(input.val())) {
            return true;
        } else {
            input.val("Incorrect data").css('background-color', 'mediumvioletred');
            return false;
        }
    }

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

        var sumOfExpense = (parseFloat(dataOfMonth.eq(1).text()) + parseFloat(dataOfMonth.eq(2).text())).toFixed(2);
        summarySumOfExpense = (parseFloat(dataOfYear.eq(1).text()) + parseFloat(dataOfYear.eq(2).text())).toFixed(2);

        dataOfMonth.eq(3).text(sumOfExpense);
        dataOfYear.eq(3).text(summarySumOfExpense);

        var rest = (parseFloat(dataOfMonth.eq(4).text()) - sumOfExpense).toFixed(2);
        var summaryRest = (parseFloat(dataOfYear.eq(4).text()) - summarySumOfExpense).toFixed(2);

        if (rest > -1) {
            dataOfMonth.eq(5).text('+' + rest);
            dataOfMonth.eq(5).addClass('savings').removeClass('debit');
        } else {
            dataOfMonth.eq(5).text(rest);
            dataOfMonth.eq(5).addClass('debit').removeClass('savings');
        }

        if (summaryRest > -1) {
            dataOfYear.eq(5).text('+' + summaryRest);
            dataOfYear.eq(5).addClass('savings').removeClass('debit');
        } else {
            dataOfYear.eq(5).text(summaryRest);
            dataOfYear.eq(5).addClass('debit').removeClass('savings');
        }
        localStorage.setItem("#results", results.html());
        localStorage.setItem("arrays", JSON.stringify(arrays));
    }



    createNewYearBtn.on('click', function (event) {
        event.preventDefault();
        animateBtn($(this));

        var validYear = isValidYear($(this).prev());
        if (validYear) {
            $(this).prev().css('background-color', '#3b444b');
            var newRow = $('.notDisplay').find('.year').clone(true).addClass('y' + $(this).prev().val()).appendTo('.settlement');
            newRow.find('div').eq(0).text($(this).prev().val());
        }

    });

    createNewMonthBtn.on('click', function (event) {
        event.preventDefault();
        animateBtn($(this));

        var validMonth = isValidMonth($(this).prev());
        if (validMonth) {
            $(this).prev().css('background-color', '#3b444b');
            var newRow = $('.notDisplay').find('.month').clone(true).addClass('m' + $(this).prev().val()).appendTo('.settlement');
            newRow.find('div').eq(0).text($(this).prev().val());
        }

    });

    searchBtn.on('click', function (event) {
        event.preventDefault();

        animateBtn($(this));

        var searchItem = $('#searchItem').val();
        var findItem = [];
        var sum = 0;
        var allExpenses = $('#results').find('.all').text();

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
        var n = (parseFloat(sum) / parseFloat(allExpenses)) * 100;
        console.log(summarySumOfExpense);
        console.log(n);

        $('.visual').animate({
            width: n + "%"
        }, 2000);


    });

    addBtns.on('click', function (event) {
        event.preventDefault();
        animateBtn($(this));

        var nameCost = $(this).prev();
        var validNewExpense = isValidNewExpense(nameCost);
        if (validNewExpense) {
            nameCost.css('background-color', '#3b444b');
            var nameCostValue = nameCost.val().replace(/\s/g, "-");
            var label = $('<label for="' + nameCostValue + '" class="col-3">' + nameCostValue + '</label>');
            var input = $('<input type="number" name="' + nameCostValue + '" id="' + nameCostValue + '" class="col-6" value="0.00">');
            var button = $('<button class="col-1 removeExpense">X</button>');
            var newDiv = $('<div class="row"></div>');

            newDiv.append(label);
            newDiv.append(input);
            newDiv.append(button);
            $(this).parent().before(newDiv);
            nameCost.val('');
        }

    });

    incomeSubmit.on('click', function (event) {
        event.preventDefault();
        animateBtn($(this));

        var inputYear = $('form[class="col-12 incomeForm"]').find('.year');
        var inputMonth = $('form[class="col-12 incomeForm"]').find('.month');
        var cost = $('form[class="col-12 incomeForm"]').find('input[type=number]');

        var validYearMonthCost = isValidYear(inputYear) && isValidMonth(inputMonth) && isValidCost(cost);
        if (validYearMonthCost) {
            inputMonth.css('background-color', '#3b444b');
            inputYear.css('background-color', '#3b444b');
            cost.css('background-color', '#3b444b');
            arrays.push( $('form[class="col-12 incomeForm"]').serializeArray());
            console.log(arrays);
            dataOfMonth = $('.settlement').find('.month').last().find('div');
            dataOfYear = $('.settlement').find('.year').last().find('div');

            summaryIncome += parseFloat(income.val());

            dataOfMonth.eq(4).text(parseFloat(income.val()).toFixed(2));
            dataOfYear.eq(4).text(summaryIncome.toFixed(2));
            income.val('0.00');

            calculate();
        }

    });

    regularSubmit.on('click', function (event) {
        event.preventDefault();
        animateBtn($(this));

        var inputYear = $('form[class="col-12 regularExpense"]').find('.year');
        var inputMonth = $('form[class="col-12 regularExpense"]').find('.month');
        var validYearMonth = isValidYear(inputYear) && isValidMonth(inputMonth);

        var regularCosts = $('.regularExpense').find('input[type="number"]');
        var validCost = false;
        regularCosts.each(function () {
            return validCost = isValidCost($(this));
        })

        if (validYearMonth && validCost) {
            inputMonth.css('background-color', '#3b444b');
            inputYear.css('background-color', '#3b444b');
            regularCosts.each(function () {
                $(this).css('background-color', '#3b444b');
            });

            var newObject = $('form[class="col-12 regularExpense"]').serializeArray();
            arrays.push(newObject);
            console.log(arrays);


            regularCosts.each(function () {
                regularExpense += parseFloat($(this).val());
            })

            summaryRegularExpense += regularExpense;

            regularCosts.each(function () {
                $(this).val('0.00');
            });

            dataOfMonth = $('.settlement').find('.month').last().find('div');
            dataOfYear = $('.settlement').find('.year').last().find('div');

            dataOfMonth.eq(1).text(regularExpense.toFixed(2));
            dataOfYear.eq(1).text(summaryRegularExpense.toFixed(2));
            regularExpense = 0;

            calculate();
        }
    });

    variantSubmit.on('click', function (event) {
        event.preventDefault();
        animateBtn($(this));

        var inputYear = $('form[class="col-12 variantExpense"]').find('.year');
        var inputMonth = $('form[class="col-12 variantExpense"]').find('.month');
        var validYearMonth = isValidYear(inputYear) && isValidMonth(inputMonth);

        var variantCosts = $('.variantExpense').find('input[type=number]');
        var validCost = false;
        variantCosts.each(function () {
            return validCost = isValidCost($(this));
        })

        if (validYearMonth && validCost) {
            inputMonth.css('background-color', '#3b444b');
            inputYear.css('background-color', '#3b444b');
            variantCosts.each(function () {
                $(this).css('background-color', '#3b444b');
            });

            arrays.push($('form[class="col-12 variantExpense"]').serializeArray());

            variantCosts.each(function () {
                variantExpense += parseFloat($(this).val());
            })

            summaryVariantExpense += variantExpense;

            variantCosts.each(function () {
                $(this).val('0.00');
            });

            dataOfMonth = $('.settlement').find('.month').last().find('div');
            dataOfYear = $('.settlement').find('.year').last().find('div');

            dataOfMonth.eq(2).text(variantExpense.toFixed(2));
            dataOfYear.eq(2).text(summaryVariantExpense.toFixed(2));
            variantExpense = 0;

            calculate();
        }
    });

});