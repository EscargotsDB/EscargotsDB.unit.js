/*

  Class power by Ricardo
  git Rick-49
  --version: 1.0

  ATENÇÃO (1): esta class esta utilizando sync False para as chamadas, que não e muito indicado, pois, 
  para listas muito grandes de dados pode ser menos performática aconselho a utilizar a 
  metodologia de callback e sync True nas chamadas em AJAX 

  ATENÇÃO (2):
  Lembre-se de deixar ativado o CORS no escargotsBD

*/
class EscargotsDB{
    constructor(host, port, debug){
        this.host = host;
        this.port = port;
        this.debug = debug;
    }

    // variables
    payload_data = '';
    qryCollection = '';
    qryViews = '';
    qryFields = '';
    qryText = '';

    
    set(collection,key){
        var retorno;
        $.ajax({
            url:'http://'+this.host+':'+this.port+'/set?collection='+collection+'&key='+key,
            method:'POST',
            data: JSON.stringify(this.payload_data),
            datatype:'json',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            async: false,
         }).done(function(result){
            retorno = result.result;  
         });   
         return retorno;
         
    }


    get(collection,key){
        var retorno;
        $.ajax({
            url:'http://'+this.host+':'+this.port+'/get?collection='+collection+'&key='+key,
            method:'GET',
            datatype:'json',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            async: false,
         }).done(function(result){
            retorno = result;  
         });   
         return retorno;
         
    }    
    

    send_list(ListName,collection,key){
        var retorno;
        $.ajax({
            url:'http://'+this.host+':'+this.port+'/send/list?name='+ListName+'&collection='+collection+'&key='+key,
            method:'GET',
            datatype:'json',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            async: false,
         }).done(function(result){
            retorno = result.result;
         });   
         return retorno;
         
    } 
    
    
    get_list(ListName,collection){
        var retorno;
        $.ajax({
            url:'http://'+this.host+':'+this.port+'/get/list?name='+ListName+'&collection='+collection,
            method:'GET',
            datatype:'json',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            async: false,
         }).done(function(result){
            retorno = result;  
         });   
         return JSON.parse(retorno);
         
    }


    del(collection,key){
        var retorno;
        $.ajax({
            url:'http://'+this.host+':'+this.port+'/del?collection='+collection+'&key='+key,
            method:'GET',
            datatype:'json',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            async: false,
         }).done(function(result){
            retorno = result;  
         });   
         return retorno;
         
    }    
    
    
    query(){
        var retorno;
        var payload_query;
        var checkQry = true;
        payload_query = {
            collection:this.qryCollection,
            views:this.qryViews, 
            fields:this.qryFields,
            query:this.qryText,            
        }
        // Verifica se os valores foram informados
        if (this.qryCollection.length == 0){
            checkQry = false;
        }
        if (this.qryViews.length == 0){
            checkQry = false;
        }    
        if (this.qryFields.length == 0){
            checkQry = false;
        }     
        if (this.qryText.length == 0){
            checkQry = false;
        }               
        if (checkQry == true){
            $.ajax({
                url:'http://'+this.host+':'+this.port+'/query',
                method:'POST',
                data: JSON.stringify(payload_query),
                datatype:'json',
                contentType: 'application/json; charset=utf-8',
                cache: false,
                async: false,
            }).done(function(result){
                retorno = result;  
            });   
            return JSON.parse(retorno);
        } else {
            console.log('ERRO: Verifique as propriedades obrigatórias da query');
            return [];
        }
         
    }    


}