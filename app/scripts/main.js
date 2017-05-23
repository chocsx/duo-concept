var Double = {
  init : function(){
    Double.ajaxForm('[name=formContato]');
  },
  ajaxForm: function(selector, cb){
    $('body').on('submit', selector, function(){
      var $self = $(this);
      if($self.data('enviando')) return false;

      $self.data('enviando', true);

      var callback = function(resp){
        $self.data('enviando', false);

        if(cb) return cb(resp, $self);

        if(resp.success == true){
          swal('Obrigado pelo Contato!', resp.msg, 'success');
          $self[0].reset();
        }
        if(resp.success == false){
          swal('Ops! Algo de errado aconteceu...', resp.msg, 'error')
        }
      }

      $.ajax({
        url: $self.attr('action'),
        type: 'post',
        dataType: 'json',
        data: $self.serializeArray(),
        success: callback,
        error: function(){
          callback:({success: false, msg:'Nao foi possivel enviar a mensagem via formulario'})
        }
      })

      return false;
    })
  }
}
$(document).ready(function(){
    $(Double.init)
    $('button.hamburger').click(function(){
        $('nav.menu-suspenso').toggleClass('open');
        $('.hamburger').toggleClass('is-active');

    });
    
    $('.slider').slick({
      autoplay: false,
      infinite: true,
      arrows: true,
      nextArrow: '<i class="arrow-right"></i>',
      prevArrow: '<i class="arrow-left"></i>',
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
    });

    $('.menu-suspenso a, .scrollTop').click(function(e){
        e.preventDefault();
        var id = $(this).attr('href'),
          targetOffeset = $(id).offset().top;
        $('html, body').animate({
          scrollTop: targetOffeset
        },500);
        $('nav.menu-suspenso').removeClass('open');
        $('.hamburger').removeClass('is-active');
    });
});
