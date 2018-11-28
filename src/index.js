import $ from 'jquery';

window.jQuery = $;
window.$ = $;
import './scss/main.scss';


var cart = [];

$(document).on("click", "button", function () {
        var n = $(this).attr("id");
        console.log(n);
        if(n > 0 && n < 7) {
            $.ajax({
                url: 'https://nit.tron.net.ua/api/category/' + n,
                method: 'get',
                dataType: 'json',
                success: function (json) {
                    console.log('Loaded via AJAX!');
                    var s = "<div class='categoryArea'>" + "<div class='categoryName'>" + "Category: " + json.name + "</div></div>";
                    $(document.getElementById("productGrid")).html(s);
                },
                error: function (xhr) {
                    alert("An error occured: " + xhr.status + " " + xhr.statusText);
                },
            });
            $.ajax({
                url: 'https://nit.tron.net.ua/api/product/list/category/' + n,
                method: 'get',
                dataType: 'json',
                success: function (json) {
                    console.log('Loaded via AJAX!');
                    var s = "";
                    s += "<div class='jumbotron text-center'>";
                    for (var i in json) {
                        s += "<div class='jumbotron jumb-product-container mr-5 ml-5 list-inline-item list-inline'>" +
                            "<img src='" + json[i].image_url + "' class='img-fluid jumb-image rounded-image'>" +
                            "<h1 class='font-weight-bold mt-4'>" + json[i].name + "</h1>";
                        if (json[i].special_price != null) {
                            s += "<h2 class='font-weight-bold mt-4 d-inline-block mr-4 old-price'>" + json[i].price + "</h2>" +
                                "<h2 class='font-weight-bold mt-4 d-inline-block ml-4 new-price'>" + json[i].special_price + "</h2>";
                        } else {
                            s += "<h2 class='font-weight-bold mt-4 d-inline-block mr-4'>" + json[i].price + "</h2>";
                        }
                        s += "<button class='btn btn-dark mt-4 btn-lg btn-block' id='" + n + i + "'>" + "КУПИТЬ" + "</button>" + "</div>";
                    }
                    s += "</div>";
                    $(document.getElementById("productGrid").getElementsByClassName("categoryArea"))[0].insertAdjacentHTML("beforeend", s);
                },
                error: function (xhr) {
                    alert("An error occured: " + xhr.status + " " + xhr.statusText);
                },
            });
        }
    });
$(document).on("click", "button", function () {
    console.log(cart);
    var n = $(this).attr("id");
    console.log(n);
    if(n > 7) {
        for(var i = 0; i < cart.length; i++){
            if (cart[i].id == n) {
                cart[i].counter++;
                return;
            }
        }
        cart[cart.length] = {id: n, counter: 1};
    }
});

$.ajax({
    url: 'https://nit.tron.net.ua/api/category/list',
    method: 'get',
    dataType: 'json',
    success: function (json) {
        console.log('Loaded via AJAX!');
        var s = "";
        for (var i in json) {
            s += "<li class='ml-5 mr-5'> <button id='" + json[i].id + "'> <h1>" + json[i].name + "</h1></button></li>";
        }
        console.log(s);
        $(document.getElementById("myDropdown")).html(s);
    },
    error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});
$.ajax({
    url: 'https://nit.tron.net.ua/api/category/1',
    method: 'get',
    dataType: 'json',
    success: function (json) {
        console.log('Loaded via AJAX!');
        var s = "<div class='categoryArea'>" + "<div class='categoryName'>" + "Category: " + json.name + "</div></div>";
        $(document.getElementById("productGrid")).append(s);
    },
    error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});
$.ajax({
    url: 'https://nit.tron.net.ua/api/product/list/category/1',
    method: 'get',
    dataType: 'json',
    success: function (json) {
        console.log('Loaded via AJAX!');
        var s = "";
        s += "<div class='jumbotron text-center'>";
        for (var i in json) {
            s += "<div class='jumbotron jumb-product-container mr-5 ml-5 list-inline-item list-inline'>" +
                "<img src='" + json[i].image_url + "' class='img-fluid jumb-image rounded-image'>" +
                "<h1 class='font-weight-bold mt-4'>" + json[i].name + "</h1>";
            if (json[i].special_price != null) {
                s += "<h2 class='font-weight-bold mt-4 d-inline-block mr-4 old-price'>" + json[i].price + "</h2>" +
                    "<h2 class='font-weight-bold mt-4 d-inline-block ml-4 new-price'>" + json[i].special_price + "</h2>";
            } else {
                s += "<h2 class='font-weight-bold mt-4 d-inline-block mr-4'>" + json[i].price + "</h2>";
            }
            s += "<button class='btn btn-dark mt-4 btn-lg btn-block' id='" + 1 + i + "'>" + "КУПИТЬ" + "</button>" + "</div>";
        }
        s += "</div>";
        $(document.getElementById("productGrid").getElementsByClassName("categoryArea"))[0].insertAdjacentHTML("beforeend", s);
    },
    error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});


