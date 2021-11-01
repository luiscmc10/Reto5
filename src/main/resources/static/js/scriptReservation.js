//Manejador "POST"
function agregarReservation() {
    let elemento = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        status: $("#status").val()
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://150.230.86.78:8080/api/Reservation/save",
        //url: "http://localhost:8080/api/Reservation/save",
        data: dataToSend,
        datatype: "json",

        success: function(response) {
            console.log(response);
            //Limpiar Campos
            $("#resultado5").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");

            //Listar Tabla

            alert("Se ha guardado Correctamente!")
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se guardo Correctamente!")
        }
    });
}


//Manejador GET
function listarReservation() {
    $.ajax({
        url: "http://150.230.86.78:8080/api/Reservation/all",
        //url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {

            for (i = 0; i < response.length; i++) {
                var misItems = response;
                for (i = 0; i < misItems.length; i++) {
                    console.log(misItems[i]);
                    $("#miListaReservation").append("<tr>");
                    $("#miListaReservation").append("<td>" + misItems[i].startDate + "</td>");
                    $("#miListaReservation").append("<td>" + misItems[i].devolutionDate + "</td>");
                    $("#miListaReservation").append("<td>" + misItems[i].status + "</td>");
                    $("#miListaReservation").append('<td><button class = "botonReservation2" onclick="borrarReservation(' + misItems[i].idReservation + ')">Borrar Reserva!</button></td>');
                    $("#miListaReservation").append('<td><button class = "botonReservation2" onclick="cargarDatosReservation(' + misItems[i].idReservation + ')">Editar Reserva!</button></td>');
                    $("#miListaReservation").append('<td><button class = "botonReservation2" onclick="actualizarReservation(' + misItems[i].idReservation + ')">Actualizar Reserva!</button></td>');
                    $("#miListaReservation").append("</tr>");
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

//Manejador DELETE
function borrarReservation(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: "http://150.230.86.78:8080/api/Reservation/" + idElemento,
        //url: "http://localhost:8080/api/Reservation/" + idElemento,
        type: 'DELETE',
        contentType: "application/JSON",
        success: function(response) {
            console.log(response);
            $("#miListaReservation").empty();

            alert("se ha Eliminado Correctamente!")
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });
}

//Capturar informacion para Actualizar
function cargarDatosReservation(id) {
    $.ajax({
        dataType: 'json',
        url: "http://150.230.86.78:8080/api/Reservation/" + id,
        //url: "http://localhost:8080/api/Reservation/" + id,
        type: 'GET',

        success: function(response) {
            console.log(response);
            var item = response;

            $("#startDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#status").val(item.status);

        },

        error: function(jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function actualizarReservation(idElemento) {
    var elemento = {
        idReservation: idElemento,
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        status: $("#status").val(),
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype: 'json',
        data: dataToSend,
        contentType: "application/JSON",
        url: "http://150.230.86.78:8080/api/Reservation/update",
        //url: "http://localhost:8080/api/Reservation/update",
        type: "PUT",

        success: function(response) {
            console.log(response);
            $("#miListaReservation").empty();
            alert("se ha Actualizado Correctamente!")

            //Limpiar Campos
            $("#resultado5").empty();

            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Actualizo Correctamente!")
        }
    });
}