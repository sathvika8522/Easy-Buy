//om namah shivaya
const exp = require('express')
const addToCartapp = exp.Router()
const ExceptionHandlerObj = require('express-async-handler')
addToCartapp.use(exp.json())

/*add to cart*/
addToCartapp.post("/addtocart",ExceptionHandlerObj(async(req,res)=>
{
    var addToCartCollectionObj = req.app.get("addToCartCollectionObj")
    var newusercartobj = req.body
    var newuserproductobj = req.body.productObj
    var userobj = await addToCartCollectionObj.findOne({username:newusercartobj.username})
    if(userobj===null)
    {
        let products=[]
        products.push(newusercartobj.productObj)
        await addToCartCollectionObj.insertOne({username:newusercartobj.username,products})
        res.send({message:"your order is added to cart successfully"})
    }
    else
    {
       /*serching for any product existing with same id*/
        let sameId = newuserproductobj['ind'];
        let flag=0
        let sameIdObj = userobj['products'].map(ele=>
        {
            if(ele.ind===sameId)
            {
                ele.noOfItems++
                flag=1
                return ele;
            }
            else{
                return ele;
            }
        })
        if(flag===0)
        {
            userobj.products.push(newusercartobj.productObj)
            await addToCartCollectionObj.updateOne({username:newusercartobj.username},{$set:{...userobj}})
            res.send({message:"your order is added to cart sucessfully :)"})
        }
        else
        {
            userobj.products.splice(0,(userobj.products).length)
            userobj.products=sameIdObj
            //updatingPresentProduct={username:newusercartobj.username,sameIdObj}
            await addToCartCollectionObj.updateOne({username:newusercartobj.username},{$set:{...userobj}})
            res.send({message:"your same order is added to cart sucessfully :)"})
        }
        
    }

}))

/*getting cart products*/
addToCartapp.get('/getCartItems/:un',ExceptionHandlerObj(async(req,res)=>
{
    let addToCartCollectionObj = req.app.get("addToCartCollectionObj")
    let cartUserName = req.params.un
    let cartUserProducts = await addToCartCollectionObj.findOne({username:cartUserName})
    if(cartUserProducts===null)
    {
        res.send({message:"you haven't selected any Item yet :("})
    }
    else
    {
        res.send({message:cartUserProducts})
    }

}))

/*updating the count of items*/
addToCartapp.put('/updateCartItemsCount',ExceptionHandlerObj(async(req,res)=>
{
   
}))

module.exports = addToCartapp