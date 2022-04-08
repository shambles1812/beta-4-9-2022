$(".nav-item").click(function() {
    $(this).siblings().find("a").removeClass("active")
    $(this).find("a").addClass("active")
    console.log($(this).index())
    // $(".drinks-row").
    $("#drink-"+$(this).index()).siblings().addClass("hidden")
    $("#drink-"+$(this).index()).removeClass("hidden")
})