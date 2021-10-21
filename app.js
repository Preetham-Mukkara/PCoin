const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
  
app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
app.post("/test",(req,res)=>{
    res.send("posting arbitrary data!");
});
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));