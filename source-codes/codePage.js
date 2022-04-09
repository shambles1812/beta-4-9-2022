var html;
var to_view_on_load;


$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results == null){
        return "none"
    }
    else{
        return results[1];
    }
}

$( document ).ready(function() {
    console.log( "ready!" );
    to_view_on_load = $.urlParam('code_name');
    $.getJSON('./data2.json', function(data) {
        
        if (to_view_on_load in data){
            $("#"+to_view_on_load).click();
        }
        console.log("dataretrieved")
    });
    $(".codePreviewContainerText").css("zIndex","10");
});
$(".codeFlashCard").click(function() {
    var code_name = $(this).find("p").attr("value");
    console.log(code_name);
    $.getJSON('./data2.json', function(data) {
        html = data[code_name].html;
        
        $(".flipCardContainer.back").empty()
        $(".flipCardContainer.back").append("<textarea class='sourceCodeArea'>"+html+"</textarea>")
    })
    
    $(".cardGrid")
    .flip(true,function(){
        $(".flipCardContainer")[0].scrollIntoView(function(){});
        $(".cardGrid")
        .flip(false);
        $(".flipCardContainer.front").html(html);
        $(".codePreviewContainerText").css("zIndex","10");
    });
    
});

// $(".flipCardContainer").click(function(){
//     var w = window.open();
  
//     $(w.document.body).html("<h1>test</h1>");
// })
var current = true;
var next = false;
var buffer = true;
$(".cardGrid").flip({
    trigger: "manual"
  });

$("#codePrompt").click(function(){
    $(".cardGrid")
    .flip(current);
    current = next
    next = buffer;
    buffer = current;
})
