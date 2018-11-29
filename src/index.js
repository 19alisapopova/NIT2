import $ from 'jquery';

window.jQuery = $;
window.$ = $;
import './scss/main.scss';

var cart = [];
var object;

getAllCategories();
getProducts(1);

$(document).on("click", "button", function () {
    var n = $(this).attr("id");
    console.log(n);
    if (n > 0 && n < 7) {
        getCategory(n);
        getProducts(n);
    }
});
$(document).on("click", "button", function () {
    console.log(cart);
    var n = $(this).attr("id");
    if (n > 7) {
        var numbers = (n + "").split("");
        var n1 = numbers[0];
        var n2 = numbers[1];
        if (n1 == 1){
            $.ajax({
                url: 'https://nit.tron.net.ua/api/product/list/',
                method: 'get',
                dataType: 'json',
                success: function (json) {
                    console.log('Loaded via AJAX!');
                    object = json[n2];
                    for (var i = 0; i < cart.length; i++) {
                        if (cart[i].obj.name == object.name) {
                            cart[i].counter++;
                            return;
                        }
                    }
                    cart[cart.length] = {obj: object, counter: 1};
                    console.log(object);
                },
                error: function (xhr) {
                    alert("An error occured: " + xhr.status + " " + xhr.statusText);
                },
            });
        } else {
            $.ajax({
                url: 'https://nit.tron.net.ua/api/product/list/category/' + n1,
                method: 'get',
                dataType: 'json',
                success: function (json) {
                    console.log('Loaded via AJAX!');
                    object = json[n2];
                    for (var i = 0; i < cart.length; i++) {
                        if (cart[i].obj.name == object.name) {
                            cart[i].counter++;
                            return;
                        }
                    }
                    cart[cart.length] = {obj: object, counter: 1};
                    console.log(object);
                },
                error: function (xhr) {
                    alert("An error occured: " + xhr.status + " " + xhr.statusText);
                },
            });
        }
    }
});
$(document).on("click", "a", function () {
    var id = $(this).attr("id");
    if (id == "cartToggle") {
        var s = "";
        s += "<div class='modal-dialog modal-dialog-centered'>" +
            "<div class='modal-content'>" +
            "<div class='modal-body m-5'>" +
            "<h1 class='text-uppercase font-weight-bold text-center m-5'> корзина </h1>";
        for (var f = 0; f < cart.length; f++) {
            s += "<div class='mb-5 ml-5 mr-5'> <h2 class='text-uppercase font-weight-bold d-inline-block'> \> " + cart[f].obj.name + " --> (" + cart[f].counter + "шт.)" + "</h2>";
            s += "</div>"
        }
        if (cart.length == 0) s += "<h2 class='text-uppercase font-weight-bold m-5'> корзина пуста. </h2>";
        var money = 0;
        for(var m = 0; m < cart.length; m++){
            if(cart[m].obj.special_price != null){
                money += cart[m].obj.special_price * cart[m].counter;
            } else {
                money += cart[m].obj.price * cart[m].counter;
            }
        }
        s += "<h1 class='text-uppercase font-weight-bold ml-5 mr-5 mb-5 text-danger'> Сумма покупки: " + money + "</h1>";
        s += "<div class='form-group m-5'>" +
             "<label for='name' class='h3'> Имя: </label>" +
             "<input type='text' class='form-control form-control-lg' id='name'>" +
             "</div>" +
             "<div class='form-group m-5'>" +
             "<label for='phone' class='h3'> Телефон: </label>" +
             "<input type='number' class='form-control form-control-lg' id='phone'>" +
             "</div>" +
             "<div class='form-group m-5'>" +
             "<label for='email' class='h3'> E-mail: </label>" +
             "<input type='email' class='form-control form-control-lg' id='email'>" +
             "</div>";
        s += "<button class='btn btn-lg btn-danger text-uppercase font-weight-bold ml-5' id='order'> оформить заказ </button>"
        s += "<div class='modal-footer m-5'>" +
            "<button type='button' class='btn btn-default btn-block' data-dismiss='modal'> ЗАКРЫТЬ</button>" +
            "</div> </div> </div> </div>";
        $(document.getElementById("cart")).html(s);
    }
})
$(document).on("click", "button", function () {
    var id = $(this).attr("id");
    if(id == "order"){
        var name = $(document.getElementById("name"));
        var phone = $(document.getElementById("phone"));
        var email = $(document.getElementById("email"));
        if(cart.length == 0){
            alert("Для заказа добавьте в корзину как минимум 1 товар.");
            return;
        }
        if(!name.val() || !phone.val() || !email.val()){
            alert("Заполните все необходимые поля!");
            return;
        }
        var postData = "name=" + name.val() + "&email=" + email.val() + "&phone=" + phone.val();
        for(var n = 0; n < cart.length; n++){
            postData += "&products[" + cart[n].obj.id + "]=" + cart[n].counter;
        }
        postData += "&token=-d08BTAUcg2JXqITPVeg";
        $.ajax({
            url: 'https://nit.tron.net.ua/api/order/add',
            method: 'post',
            dataType: 'json',
            data: postData,
            success: function (json) {
                console.log(json);
                alert("Заказ сформирован.");
                location.reload();
            },
            error: function (xhr) {
                alert("An error occured: " + xhr.status + " " + xhr.statusText);
            },
        });
        cart = [];
    }
});

function getAllCategories() {
    $.ajax({
        url: 'https://nit.tron.net.ua/api/category/list',
        method: 'get',
        dataType: 'json',
        success: function (json) {
            console.log('Loaded via AJAX!');
            var s = "";
            var k = "<li class='ml-5 mr-5'> <button id='1'> <h1> All </h1></button></li>";
            for (var i in json) {
                s += "<li class='ml-5 mr-5'> <button id='" + json[i].id + "'> <h1>" + json[i].name + "</h1></button></li>";
            }
            //console.log(s);
            $(document.getElementById("myDropdown")).html(k);
            $(document.getElementById("myDropdown")).append(s);
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}

function getCategory(category) {
if(category == 1){
    var s = "<div class='categoryName'>" + "Category: All" + "</div>";
    $(document.getElementById("productGrid")).html(s);
} else
    {
        $.ajax({
            url: 'https://nit.tron.net.ua/api/category/' + category,
            method: 'get',
            dataType: 'json',
            success: function (json) {
                console.log('Loaded via AJAX!');
                var s = "<div class='categoryName'>" + "Category: " + json.name + "</div>";
                $(document.getElementById("productGrid")).html(s);
            },
            error: function (xhr) {
                alert("An error occured: " + xhr.status + " " + xhr.statusText);
            },
        });
    }
}

function getProducts(category) {
    if (category == 1) {
        $.ajax({
            url: 'https://nit.tron.net.ua/api/product/list',
            method: 'get',
            dataType: 'json',
            success: function (json) {
                console.log('Loaded via AJAX!');
                var s = "";
                s += "<div class='jumbotron text-center'>";
                for (var i in json) {
                    s += "<div class='jumbotron jumb-product-container mr-5 ml-5 list-inline-item list-inline'>" +
                        "<a data-toggle='modal' href='#" + category + i + "modal' class='text-dark'>" +
                        "<img src='" + json[i].image_url + "' class='img-fluid jumb-image rounded-image'>" +
                        "<h1 class='font-weight-bold mt-4'>" + json[i].name + "</h1>" + "</a>";
                    s += "<div class='modal fade' role='dialog' id='" + category + i + "modal'>" +
                        "<div class='modal-dialog modal-dialog-centered'>" +
                        "<div class='modal-content text-center'>" +
                        "<div class='modal-body m-5'>" +
                        "<h1 class='text-uppercase font-weight-bold text-center'>" + json[i].name + "</h1>" +
                        "<img src='" + json[i].image_url + "' class='img-fluid jumb-image rounded-image m-5'>" +
                        "<h2>" + json[i].description + "</h2>";
                    if (json[i].special_price != null) {
                        s += "<div><h2 class='font-weight-bold mt-4 d-inline-block mr-4 old-price'>" + json[i].price + "</h2>" +
                            "<h2 class='font-weight-bold mt-4 d-inline-block ml-4 new-price'>" + json[i].special_price + "</h2> </div>";
                    } else {
                        s += "<div><h2 class='font-weight-bold mt-4 d-inline-block mr-4'>" + json[i].price + "</h2> </div>";
                    }
                    s += "<button class='btn btn-danger mt-4 btn-lg' id='" + 1 + i + "'>" + "<h1> КУПИТЬ </h1>" + "</button> </div>" +
                        "<div class='modal-footer'>" +
                        "<button type='button' class='btn btn-default btn-block' data-dismiss='modal'> ЗАКРЫТЬ </button>" +
                        "</div>" + "</div>" + "</div>" + "</div>";
                    if (json[i].special_price != null) {
                        s += "<h2 class='font-weight-bold mt-4 d-inline-block mr-4 old-price'>" + json[i].price + "</h2>" +
                            "<h2 class='font-weight-bold mt-4 d-inline-block ml-4 new-price'>" + json[i].special_price + "</h2>";
                    } else {
                        s += "<h2 class='font-weight-bold mt-4 d-inline-block mr-4'>" + json[i].price + "</h2>";
                    }
                    s += "<button class='btn btn-dark mt-4 btn-lg btn-block' id='" + category + i + "'>" + "КУПИТЬ" + "</button>" + " </div>";
                }
                s += "</div>";
                //console.log(s);
                $(document.getElementById("productGrid").insertAdjacentHTML("beforeend", s));
            },
            error: function (xhr) {
                alert("An error occured: " + xhr.status + " " + xhr.statusText);
            },
        });
    } else {
        $.ajax({
            url: 'https://nit.tron.net.ua/api/product/list/category/' + category,
            method: 'get',
            dataType: 'json',
            success: function (json) {
                console.log('Loaded via AJAX!');
                var s = "";
                s += "<div class='jumbotron text-center'>";
                for (var i in json) {
                    s += "<div class='jumbotron jumb-product-container mr-5 ml-5 list-inline-item list-inline'>" +
                        "<a data-toggle='modal' href='#" + category + i + "modal' class='text-dark'>" +
                        "<img src='" + json[i].image_url + "' class='img-fluid jumb-image rounded-image'>" +
                        "<h1 class='font-weight-bold mt-4'>" + json[i].name + "</h1>" + "</a>";
                    s += "<div class='modal fade' role='dialog' id='" + category + i + "modal'>" +
                        "<div class='modal-dialog modal-dialog-centered'>" +
                        "<div class='modal-content text-center'>" +
                        "<div class='modal-body m-5'>" +
                        "<h1 class='text-uppercase font-weight-bold text-center'>" + json[i].name + "</h1>" +
                        "<img src='" + json[i].image_url + "' class='img-fluid jumb-image rounded-image m-5'>" +
                        "<h2>" + json[i].description + "</h2>";
                    if (json[i].special_price != null) {
                        s += "<div><h2 class='font-weight-bold mt-4 d-inline-block mr-4 old-price'>" + json[i].price + "</h2>" +
                            "<h2 class='font-weight-bold mt-4 d-inline-block ml-4 new-price'>" + json[i].special_price + "</h2> </div>";
                    } else {
                        s += "<div><h2 class='font-weight-bold mt-4 d-inline-block mr-4'>" + json[i].price + "</h2> </div>";
                    }
                    s += "<button class='btn btn-danger mt-4 btn-lg' id='" + 1 + i + "'>" + "<h1> КУПИТЬ </h1>" + "</button> </div>" +
                        "<div class='modal-footer'>" +
                        "<button type='button' class='btn btn-default btn-block' data-dismiss='modal'> ЗАКРЫТЬ </button>" +
                        "</div>" + "</div>" + "</div>" + "</div>";
                    if (json[i].special_price != null) {
                        s += "<h2 class='font-weight-bold mt-4 d-inline-block mr-4 old-price'>" + json[i].price + "</h2>" +
                            "<h2 class='font-weight-bold mt-4 d-inline-block ml-4 new-price'>" + json[i].special_price + "</h2>";
                    } else {
                        s += "<h2 class='font-weight-bold mt-4 d-inline-block mr-4'>" + json[i].price + "</h2>";
                    }
                    s += "<button class='btn btn-dark mt-4 btn-lg btn-block' id='" + category + i + "'>" + "КУПИТЬ" + "</button>" + " </div>";
                }
                s += "</div>";
               // console.log(s);
                $(document.getElementById("productGrid").insertAdjacentHTML("beforeend", s));
            },
            error: function (xhr) {
                alert("An error occured: " + xhr.status + " " + xhr.statusText);
            },
        });
    }
}




