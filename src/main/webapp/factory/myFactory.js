app.factory("myFactory", function(){
    var savedData = {};
    
    function set(data){
        savedData = data;
    }
    
    function get(){
        return savedData;
    }
    
    return savedData;
});