//Manejador "POST"
function agregarMensaje() {
    let elemento = {
        messageText: $("#messageText").val(),
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        data: dataToSend,
        url: "http://150.230.86.78:8080/api/Message/save",
        //url: "http://localhost:8080/api/Message/save",
        type: "POST",

        success: function(response) {
            console.log(response);
            //Limpiar Campos
            $("#resultado4").empty();
            $("#messageText").val("");

            //Listar Tabla

            alert("¡Se ha guardado Correctamente!")
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se guardo Correctamente!")
        }
    });
}


//Manejador GET
function listarMensaje() {
    $.ajax({
        url: "http://150.230.86.78:8080/api/Message/all",
        //url: "http://localhost:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {

            for (i = 0; i < response.length; i++) {
                var misItems = response;
                for (i = 0; i < misItems.length; i++) {
                    console.log(misItems[i]);
                    $("#miListaMessage").append("<tr>");
                    $("#miListaMessage").append("<td>" + misItems[i].messageText + "</td>");
                    $("#miListaMessage").append('<td><button class = "botonMessage2" onclick="borrarMensaje(' + misItems[i].idMessage + ')">Borrar Mensaje!</button></td>');
                    $("#miListaMessage").append('<td><button class = "botonMessage2" onclick="cargarDatosMensaje(' + misItems[i].idMessage + ')">Editar Mensaje!</button></td>');
                    $("#miListaMessage").append('<td><button class = "botonMessage2" onclick="actualizarMensaje(' + misItems[i].idMessage + ')">Actualizar Mensaje!</button></td>');
                    $("#miListaMessage").append("</tr>");
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

//Manejador DELETE
function borrarMensaje(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: "http://150.230.86.78:8080/api/Message/" + idElemento,
        //url: "http://localhost:8080/api/Message/" + idElemento,
        type: 'DELETE',
        contentType: "application/JSON",
        success: function(response) {
            console.log(response);
            $("#miListaMessage").empty();

            alert("se ha Eliminado Correctamente!")
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });
}

//Capturar informacion para Actualizar
function cargarDatosMensaje(id) {
    $.ajax({
        dataType: 'json',
        url: "http://150.230.86.78:8080/api/Message/" + id,
        //url: "http://localhost:8080/api/Message/" + id,
        type: 'GET',

        success: function(response) {
            console.log(response);
            var item = response;

            $("#messageText").val(item.messageText);
        },

        error: function(jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function actualizarMensaje(idElemento) {
    var elemento = {
        idMessage: idElemento,
        messageText: $("#messageText").val(),

    }

    console.log(elemento);
    var dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype: 'json',
        data: dataToSend,
        contentType: "application/JSON",
        url: "http://150.230.86.78:8080/api/Message/update",
        //url: "http://localhost:8080/api/Message/update",
        type: "PUT",

        success: function(response) {
            console.log(response);
            $("#miListaMessage").empty();
            alert("se ha Actualizado Correctamente!")

            //Limpiar Campos
            $("#resultado4").empty();
            $("#id3").val("");
            $("#messageText").val("");

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Actualizo Correctamente!")
        }
    });
}