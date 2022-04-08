$(() => {
  $(".info-list li").click(function () {
    $(this).addClass("selected").siblings("li").removeClass("selected");
    $(".info-content div").hide();
    $("." + $(this).data("class")).fadeIn();
  });
  let scrollButton = $(".sTop");
  $(window).scroll(function () {
    $(this).scrollTop() >= 500 ? scrollButton.show(1000) : scrollButton.hide(1000);
  });
  scrollButton.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
  
});
