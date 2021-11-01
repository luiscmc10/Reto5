
package com.usa.Interface;

import com.usa.Model.Reservation;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface interfaceReservation extends CrudRepository<Reservation, Integer>{
    
    //JPQL
    @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c group by c.client order by COUNT(c.client) DESC ")
    public List<Object[]> countTotalReservationByClient();

    //QUERY METHODS!
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date dateTwo);


    public List<Reservation> findAllByStatus(String status);
}
