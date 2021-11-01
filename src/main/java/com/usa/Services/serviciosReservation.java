package com.usa.Services;

//import com.nimbusds.jose.shaded.json.parser.ParseException;
import com.usa.Controller.custom.CountClient;
import com.usa.Controller.custom.StatusAmount;
import com.usa.Model.Reservation;
import com.usa.Repository.ReservationRepositorio;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Clase Servicios Reservacion
 *
 * @author starp
 */
@Service
public class serviciosReservation {

    /**
     * Metodo llamado a Repositorio Reservacion
     */
    @Autowired
    private ReservationRepositorio metodosCrud;

    /**
     * Metodo Privado Lista Reservation
     *
     * @return
     */
    public List<Reservation> getAll() {
        return metodosCrud.getAll();
    }

    /**
     * Metodo Public Optional
     *
     * @param idReservation
     * @return
     */
    public Optional<Reservation> getReservation(int idReservation) {
        return metodosCrud.getReservation(idReservation);
    }

    /**
     * Metodo Guardar Datos de Reservation
     *
     * @param reservation
     * @return
     */
    public Reservation save(Reservation reservation) {
        if (reservation.getIdReservation() == null) {
            return metodosCrud.save(reservation);
        } else {
            Optional<Reservation> evt = metodosCrud.getReservation(reservation.getIdReservation());
            if (evt.isEmpty()) {
                return metodosCrud.save(reservation);
            } else {
                return reservation;
            }
        }
    }

    /**
     * Metodo Actualizar Datos de Reservation
     *
     * @param reservation
     * @return
     */
    public Reservation update(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            Optional<Reservation> evt = metodosCrud.getReservation(reservation.getIdReservation());
            if (!evt.isEmpty()) {
                if (reservation.getStartDate() != null) {
                    evt.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate() != null) {
                    evt.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getStatus() != null) {
                    evt.get().setStatus(reservation.getStatus());
                }
                metodosCrud.save(evt.get());
                return evt.get();
            } else {
                return reservation;
            }
        } else {
            return reservation;
        }
    }

    /**
     * Metodo Borrar Datos
     *
     * @param idReservation
     * @return
     */
    public boolean deleteReservation(int idReservation) {
        Boolean del = getReservation(idReservation).map(reservation -> {
            metodosCrud.delete(reservation);
            return true;
        }).orElse(false);
        return del;
    }
    
    /**
     * Conteo Clientes
     * @return 
     */
    public List<CountClient> getTopClient(){
        return metodosCrud.getTopClient();
    }

    /**
     * Cuenta cuantos Status de Reservations hay de completed y cancelled
     * @return new StatusAmount
     */
    public StatusAmount getStatusReport(){
        List<Reservation> completed = metodosCrud.getReservationByStatus("completed");
        List<Reservation> cancelled = metodosCrud.getReservationByStatus("cancelled");

        return new StatusAmount(completed.size(), cancelled.size());

    }

    /**
     * Entrega una fecha especifica
     * @param dato1 = dateOne
     * @param dato2 = dateTwo
     * @return new ArrayList<>()
     */
    public List<Reservation> getReservationPeriod(String dato1, String dato2){
        
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date dateOne = new Date();
        Date dateTwo = new Date();

        try {
            dateOne = parser.parse(dato1);
            dateTwo = parser.parse(dato2);
        }catch (java.text.ParseException evt){
            evt.printStackTrace();
        }
        if (dateOne.before(dateTwo)){
            return metodosCrud.getReservationPeriod(dateOne,dateTwo);
        }else {
            return new ArrayList<>();
        }
    }
}
