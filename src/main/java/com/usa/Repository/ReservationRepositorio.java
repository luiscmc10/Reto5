
package com.usa.Repository;

import com.usa.Controller.custom.CountClient;
import com.usa.Interface.interfaceReservation;
import com.usa.Model.Client;
import com.usa.Model.Reservation;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReservationRepositorio {
    
    @Autowired
    private interfaceReservation crud;
    
    public List<Reservation> getAll(){
        return (List<Reservation>) crud.findAll();
    }
    
    public Optional<Reservation> getReservation(int id){
        return crud.findById(id);
    }
    
    public Reservation save(Reservation reservation){
        return crud.save(reservation);
    }
    
    public void delete(Reservation reservation){
        crud.delete(reservation);
    }
    
    public List<Reservation> getReservationByStatus(String status){
        return crud.findAllByStatus(status);
    }

    public List<Reservation> getReservationPeriod(Date dateOne, Date dateTwo) {
        return crud.findAllByStartDateAfterAndStartDateBefore(dateOne,dateTwo);
    }

    public List<CountClient> getTopClient(){
        List<CountClient> result = new ArrayList<>();
        List<Object[]> reporte = crud.countTotalReservationByClient();

        for(int i=0; i<reporte.size();i++){
            result.add(new CountClient((Long) reporte.get(i)[1],(Client) reporte.get(i)[0]));
        }

        return result;
    }

  }
