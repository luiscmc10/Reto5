$(document).ready(function(){
    $('ul.tabs li a:first').addClass('active'); //Activar la primera casilla del menu
    $('.tabs-container section').hide(); // Ocultar todos los contenidos
    $('.tabs-container section:first').show(); //Solo Mostrar el Primero de los contenidos

    //Cambiar de Casilla Activa
    $('ul.tabs li a').click(function(){
        $('ul.tabs li a').removeClass('active');
        $(this).addClass('active');
        $('.tabs-container section').hide();

        var activeTab = $(this).attr('href');
        $(activeTab).show();
        return false;
    });
});