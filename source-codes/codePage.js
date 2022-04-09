var html;
var to_view_on_load;


$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results== null){
        return "none";
    }
    else {
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
        console.log(html);
        $(".flipCardContainer.back").empty()
        
        $(".flipCardContainer.back").append("<textarea class='sourceCodeArea'>"+html+"</textarea>")
    });
    
    if($(".cardGrid").data("flip-model").isFlipped){
        $.getJSON('./data2.json', function(data) {
            html = data[code_name].html;
            $(".flipCardContainer.front").html(html);
            $(".flipCardContainer.back").empty()
            $(".flipCardContainer.back").append("<textarea class='sourceCodeArea'>"+html+"</textarea>")
        })
        $(".flipCardContainer")[0].scrollIntoView(function(){});
        $(".cardGrid")
        .flip(false);
        
        $(".codePreviewContainerText").css("zIndex","10");
        if($("#codePrompt").hasClass("buttonToggle2")){
            $(".flipCardContainer")[0].scrollIntoView(function(){});
            $("#codePrompt").removeClass("buttonToggle2");
            $("#codePrompt").empty();
            $("#codePrompt").append("View Source Code");
            $("#codePrompt").addClass("buttonToggle1");
            
        }
        
        
}else{
        $(".cardGrid")
    .flip(true,function(){
        $.getJSON('./data2.json', function(data) {
            html = data[code_name].html;
            $(".flipCardContainer.front").html(html);
            $(".flipCardContainer.back").empty()
            $(".flipCardContainer.back").append("<textarea class='sourceCodeArea'>"+html+"</textarea>")
        })
        $(".flipCardContainer")[0].scrollIntoView(function(){});
        $(".cardGrid").flip(false);
        
        $(".codePreviewContainerText").css("zIndex","10");
        
        if($("#codePrompt").hasClass("buttonToggle2")){
            $(".flipCardContainer")[0].scrollIntoView(function(){});
            $("#codePrompt").removeClass("buttonToggle2");
            $("#codePrompt").empty();
            $("#codePrompt").append("View Source Code");
            $("#codePrompt").addClass("buttonToggle1");
            
            
        }
        
    });
    }
    
    
});

// $(".flipCardContainer").click(function(){
//     var w = window.open();
  
//     $(w.document.body).html("<h1>test</h1>");
// })

$(".cardGrid").flip({
    trigger: "manual"
  });

$("#codePrompt").click(function(){
    if($("#codePrompt").hasClass("buttonToggle1") == true){
        $(".cardGrid")
        .flip(true);
        $("#codePrompt").removeClass("buttonToggle1");
        $("#codePrompt").addClass("buttonToggle2");
        $("#codePrompt").empty();
        $("#codePrompt").append("View Live Code");
       
    }else{
        $(".cardGrid")
        .flip(false);
        $("#codePrompt").removeClass("buttonToggle2");
        $("#codePrompt").addClass("buttonToggle1");
        $("#codePrompt").empty();
        $("#codePrompt").append("View Source Code");
    }
    
    // current = next
    // next = buffer;
    // buffer = current;
})
