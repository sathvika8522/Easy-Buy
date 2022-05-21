//om namah shivaya
const exp = require('express')
const app = exp()
const path = require('path')
const mc = require('mongodb').MongoClient


//--------------------------connecting front end and backend-----------------------
app.use(exp.static(path.join(__dirname, './dist/firstproject/')))


/*----------------------------------importing our api-------------------------*/
const userapp = require('./APIS/user-api')
const prodapp = require('./APIS/product-api')
const addToCartapp = require('./APIS/addToCart-api')

//-----------------------------mongodb connection setting--------------------------
//data base url
const databaseurl='mongodb+srv://firstdb:firstdb@shankari.y5ud8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//----------------------------connecting to our database-------------------------------
mc.connect(databaseurl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>
{
    if(err)
    {
        console("err in connecting to database!!!!!!!!!!!!!!!!!!!!!!!!")
    }
    else
    {
        let databaseobj = client.db("my_first_database")
        let usercollectionobj = databaseobj.collection("usercollection")
        let productcollectionobj = databaseobj.collection("productcollection")
        let addToCartCollectionObj = databaseobj.collection("addToCartCollection")
        console.log("connected to database :))))) :)))) :))))))")

         /*---------------------------------setting collection names----------------------*/
         app.set("usercollectionobj",usercollectionobj)
         app.set("productcollectionobj",productcollectionobj)
         app.set("addToCartCollectionObj",addToCartCollectionObj)
    }
})


//-----------------------------------------using middleware to go to user-api-----------------------
app.use("/users",userapp)
app.use("/products",prodapp)
app.use("/cart",addToCartapp)



/*---------------------------- checking if path is correct or not------------------------*/
app.use((req, res, next) => {

    res.send({ message: `path ${req.url} is invalid` })
})




//assigning port number
const port=3000
app.listen(port,()=>console.log(`server listening in ${port}.....`))
