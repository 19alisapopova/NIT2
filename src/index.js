import './scss/main.scss';

let arr = [];

$.ajax({
    url: 'https://nit.tron.net.ua/api/category/list',
    method: 'get',
    dataType: 'json',
    success: function(json){
        console.log('Loaded via AJAX!');
        for (let i = 0; i < json.length; i++){
            arr.push(Object.create(json[i]));
        }
    },
    error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});


let s = "";
for (let i in arr) {
    s += "<li>" + arr[i].name + "</li>";
}
$(document.getElementById("navbarCategories")).html(s);


//class='list-inline-item list-inline sticky-list-item m-5'