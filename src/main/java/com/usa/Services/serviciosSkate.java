
package com.usa.Services;

import com.usa.Model.Skate;
import com.usa.Repository.SkateRepositorio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class serviciosSkate {
    
    @Autowired
    private SkateRepositorio metodosCrud;
    
    public List<Skate> getAll(){
        return metodosCrud.getAll();
    }
    
    public Optional<Skate> getSkate(int id){
        return metodosCrud.getSkate(id);
    }
    
    public Skate save(Skate skate){
        if(skate.getId()==null){
            return metodosCrud.save(skate);
        }else{
            Optional<Skate> evt=metodosCrud.getSkate(skate.getId());
            if(evt.isEmpty()){
               return metodosCrud.save(skate);
            }else{
                return skate;
            }
        }
    }
    
    public Skate update(Skate skate){
        if (skate.getId()!=null){
            Optional<Skate> evt = metodosCrud.getSkate(skate.getId());
            if (!evt.isEmpty()){
                if (skate.getName()!=null){
                    evt.get().setName(skate.getName());
                }
                if (skate.getBrand()!=null){
                    evt.get().setBrand(skate.getBrand());
                }
                if (skate.getYear()!=null){
                    evt.get().setYear(skate.getYear());
                }
                if (skate.getDescription()!=null){
                    evt.get().setDescription(skate.getDescription());
                }
                if (skate.getCategory()!=null){
                    evt.get().setCategory(skate.getCategory());
                }
                metodosCrud.save(evt.get());
                return evt.get();
            }else {
                return skate;
            }
        }else {
            return skate;
        }
    }
    
    public boolean deleteSkate(int id){
        Boolean del = getSkate(id).map(skate -> {
            metodosCrud.delete(skate);
            return true;
        }).orElse(false);
        return del;
    }
}
