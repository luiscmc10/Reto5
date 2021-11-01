
package com.usa.Model;

/**
 *  Autor : Luis Carlos Mendez
 *  
 */

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "skate")
/**
 * Clase Patinetas "Skate"
 */
public class Skate implements Serializable{
    /**
     * Declaracion de Variable Id Primaria
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * Declaracion de Variable Nombre "name"
     */
    private String name;
    /**
     * Declaracion de Variable Marca "brand"
     */
    private String brand;
    /**
     * Declaracion de Variable año "year"
     */
    private Integer year;
    /**
     * Declaracion de Variable descripcion
     */
    private String description;
    
    /**
     * Relacion con la Tabla "Category"
     */
    @ManyToOne
    @JoinColumn(name = "skateId")
    @JsonIgnoreProperties("skates")
    private Category category;

    /**
     * Relacion con la Tabla "Message"
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "skate")
    @JsonIgnoreProperties({"skate","client"})
    private List<Message> messages;
    
    /**
     * Relacion con la tabla "Reservation
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "skate")
    @JsonIgnoreProperties({"skate","client"})
    private List<Reservation> reservations;

    /**
     * Creacion de los Getter and Setter
     * @return 
     */
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

}
