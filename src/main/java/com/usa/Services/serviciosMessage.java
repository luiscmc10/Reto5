
package com.usa.Services;

import com.usa.Model.Message;
import com.usa.Repository.MessageRepositorio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class serviciosMessage {
    
    @Autowired
    private MessageRepositorio metodosCrud;
    
    public List<Message> getAll(){
        return metodosCrud.getAll();
    }
    
    public Optional<Message> getMessage(int idMessage){
        return metodosCrud.getMessage(idMessage);
    }
    
    public Message save(Message message){
        if(message.getIdMessage()==null){
            return metodosCrud.save(message);
        }else{
            Optional<Message> evt=metodosCrud.getMessage(message.getIdMessage());
            if(evt.isEmpty()){
                return metodosCrud.save(message);
            }else{
                return message;
            }
        }
    }
    
    public Message update(Message message){
        if (message.getIdMessage()!=null){
            Optional<Message> evt = metodosCrud.getMessage(message.getIdMessage());
            if (!evt.isEmpty()){
                if (message.getMessageText()!=null){
                    evt.get().setMessageText(message.getMessageText());
                }
                metodosCrud.save(evt.get());
                return evt.get();
            }else {
                return message;
            }
        }else {
            return message;
        }
    }
    
    public boolean deleteMessage(int id){
        Boolean del = getMessage(id).map(message -> {
            metodosCrud.delete(message);
            return true;
        }).orElse(false);
        return del;
    }
}
