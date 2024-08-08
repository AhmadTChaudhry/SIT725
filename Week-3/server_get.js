    const express= require("express");
    const app= express();
    app.use(express.static('public'))

    const port=3040;
    app.listen(port,()=> {
        console.log("Server running on "+port);
    })
    
    