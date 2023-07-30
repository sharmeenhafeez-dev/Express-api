const express= require ('express')
const router = express.Router()
const{addProduct,getAllProducts,Productbyname,Productbyid,ProductbyCategory,ProductbyBrand,deleteProduct,updateProduct} = require('./Controller')
// const{getAllProducts,addProduct,Productbyname,Productbyid,ProductbyCategory,ProductbyBrand,deleteProduct,updateProduct} = require('./Controller')


// getallroductes
router.get('/products', getAllProducts)

// addroductes
router.post('/addproduct', addProduct)

//get product by name

router.get('/get-product-name', Productbyname)// quary method

// //get product by id
router.get('/get-product-id/:id', Productbyid)// perams method

// //get product by category

router.get('/get-products-category', ProductbyCategory)// quary method

// //get product by brand
router.get('/get-products-brand',  ProductbyBrand)// perams method

// //delete product
router.delete('/delete-product', deleteProduct)

// //update product
router.put('/update-product', updateProduct)

module.exports = router
