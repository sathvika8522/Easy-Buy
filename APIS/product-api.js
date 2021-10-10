const exp = require('express')
const prodapp = exp.Router()
const ExceptionHandlerObj = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
prodapp.use(exp.json())


//get using async await
prodapp.get("/getproducts", ExceptionHandlerObj(async(req,res)=>
{
    let productcollectionobj = req.app.get("productcollectionobj")
    let prodata = await productcollectionobj.find().toArray()
    if(prodata===null)
    {
        res.send({message:"no products are available currently"})
    } 
    else
    {
        res.send({message:prodata})
    }
}))




prodapp.get('/getproducts/:pn',ExceptionHandlerObj(async(req,res)=>
{
    let productcollectionobj = req.app.get("productcollectionobj")
    let pn = +(req.params.pn)
    let serchproduct = await productcollectionobj.findOne({ind:pn})
    if(serchproduct===null)
    {
        res.send({message:"no such product exists :("})
    }
    else
    {
        res.send({message:serchproduct})
    }
}))



prodapp.post("/createproducts",ExceptionHandlerObj(async(req,res)=>
{
    let productcollectionobj = req.app.get("productcollectionobj")
    newproduct = req.body
    let searchobj = await productcollectionobj.findOne({productname:newproduct.productname})
    if(searchobj===null)
    {
        await productcollectionobj.insertOne(newproduct)
        res.send({message:"posted successfully :)"})
    }
    else
    {
        res.send({message:"product already exists"})
    }
}))



prodapp.put("/updateproducts/:pn",ExceptionHandlerObj(async(req,res)=>
{ 
    let productcollectionobj = req.app.get("productcollectionobj")
    let pn = req.params.pn
    let searchobj = await productcollectionobj.updateOne({productname:pn},{$set:{...req.body}}) 
    res.send({message:"updated successfully :)"})

}))


prodapp.delete("/deleteproducts/:pn",ExceptionHandlerObj(async(req,res)=>
{
    let productcollectionobj = req.app.get("productcollectionobj")
    let pn = req.params.pn
    let searchobj = await productcollectionobj.findOne({productname:pn})
    if(searchobj===null)
    {
        res.send({message:"product doesn't exists :("})
    }
    else
    {
        await productcollectionobj.delete({productname:pn})
        res.send({message:"deleted successfully :)"})
    }
}))

prodapp.get("/getProductsByCategory/:category",ExceptionHandlerObj(async(req,res)=>
{
    let productcollectionobj = req.app.get("productcollectionobj")
    let category = req.params.category
    let searchproduct = await productcollectionobj.find({model:category}).toArray()
    if(searchproduct===null)
    {
        res.send({message:"no such product exists :("})
    }
    else
    {
        res.send({message:searchproduct})
    }
}))



module.exports=prodapp