//Manejador "POST"
function agregarCliente() {
    let elemento = {
        name: $("#name3").val(),
        email: $("#email").val(),
        age: $("#age").val()
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        data: dataToSend,
        url: "http://150.230.86.78:8080/api/Client/save",
        //url: "http://localhost:8080/api/Client/save",
        type: "POST",

        success: function(response) {
            console.log(response);
            //Limpiar Campos
            $("#resultado3").empty();
            $("#name3").val("");
            $("#email").val("");
            $("#age").val("");

            //Listar Tabla

            alert("¡Se ha guardado Correctamente!")
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se gauardo Correctamente!")
        }
    });
}


//Manejador GET
function listarCliente() {
    $.ajax({
        url: "http://150.230.86.78:8080/api/Client/all",
        //url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {

            for (i = 0; i < response.length; i++) {
                var misItems = response;
                for (i = 0; i < misItems.length; i++) {
                    console.log(misItems[i]);
                    $("#miListaClient").append("<tr>");
                    $("#miListaClient").append("<td>" + misItems[i].name + "</td>");
                    $("#miListaClient").append("<td>" + misItems[i].email + "</td>");
                    $("#miListaClient").append("<td>" + misItems[i].age + "</td>");
                    $("#miListaClient").append('<td><button class = "botonCliente2" onclick="borrarCliente(' + misItems[i].idClient + ')">Borrar Cliente!</button></td>');
                    $("#miListaClient").append('<td><button class = "botonCliente2" onclick="cargarDatosCliente(' + misItems[i].idClient + ')">Editar Cliente!</button></td>');
                    $("#miListaClient").append('<td><button class = "botonCliente2" onclick="actualizarCliente(' + misItems[i].idClient + ')">Actualizar Cliente!</button></td>');
                    $("#miListaClient").append("</tr>");
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

//Manejador DELETE
function borrarCliente(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: "http://150.230.86.78:8080/api/Client/" + idElemento,
        //url: "http://localhost:8080/api/Client/" + idElemento,
        type: 'DELETE',
        contentType: "application/json",
        success: function(response) {
            console.log(response);
            $("#miListaClient").empty();

            alert("se ha Eliminado Correctamente!")
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });
}

//Capturar informacion para Actualizar
function cargarDatosCliente(id) {
    $.ajax({
        dataType: 'json',
        url: "http://150.230.86.78:8080/api/Client/" + id,
        //url: "http://localhost:8080/api/Client/" + id,
        type: 'GET',

        success: function(response) {
            console.log(response);
            var item = response;

            $("#name3").val(item.name);
            $("#email").val(item.email);
            $("#age").val(item.age);

        },

        error: function(jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function actualizarCliente(idElemento) {
    let elemento = {
        idClient: idElemento,
        name: $("#name3").val(),
        email: $("#email").val(),
        age: $("#age").val()
    }

    console.log(elemento);
    let dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype: 'json',
        data: dataToSend,
        contentType: "application/json",
        url: "http://150.230.86.78:8080/api/Client/update",
        //url: "http://localhost:8080/api/Client/update",
        type: "PUT",

        success: function(response) {
            //console.log(response);
            $("#miListaClient").empty();
            alert("se ha Actualizado Correctamente!")

            //Limpiar Campos
            $("#resultado3").empty();
            $("#name3").val("");
            $("#email").val("");
            $("#age").val("");


        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Actualizo Correctamente!")
        }
    });
}