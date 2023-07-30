
const { connect } = require('mongoose');
require('dotenv').config()
const Product = require('./model')

const addProduct = async (req, res) => {
 
    const {title,brand,price ,category,thumbnail,images,rating, description} = req.body;
    try {
        await connect(process.env.MONGODB_URL)


        const checkDuplicate = await Product.exists({ title: title })

                if (checkDuplicate)
        
                    res.status(409).json({
        
                        message: "product already existing"
        
                    })
                    else{ await Product.create({title,brand,price ,category,thumbnail,images,rating, description} )

                    res.status(201).json({
                        message: "product successfully  created "
                    })}

          
    } catch (error) {
                res.status(500).json({
                    message: error.message
        
                })
            }


}

const getAllProducts = async(req, res) => {

    try {
        await connect(process.env.MONGODB_URL)
      const product  = await  Product.find()
      res.status(200).json(
          {
            product: product  
          }
      )
        
    }
    catch (error) {
        res.status(500).json(
            {
                message: error.message
            }
        )
  
    }

}
const Productbyname = async (req, res) => {

    const { name } = req.query
  
  
    try {
      await connect(process.env.MONGODB_URL)
      const product = await Product.findOne({ title: name })
      if (product) {
          res.status(200).json({
              product: product
          });
      } else {
          res.status(404).json({
              message: "Product not found"
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}
  const Productbyid = async (req, res) => {

    // const { id } = req.params       is trha b kr skty h 
    const { id } = req.params      
  
    try {
      await connect(process.env.MONGODB_URL)
      const product = await Product.findOne({ _id: id })
      if (product) {
          res.status(200).json({
              product: product
          });
      } else {
          res.status(404).json({
              message: "Product not found"
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}

  const ProductbyCategory = async (req, res) => {

    const { category } = req.query
  
    try {
      await connect(process.env.MONGODB_URL)
      const product = await Product.findOne({ category: category })
      if (product) {
          res.status(200).json({
              product: product
          });
      } else {
          res.status(404).json({
              message: "Product not found"
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}

  const ProductbyBrand = async (req, res) => {

    const { brand } = req.query
  
  
    try {
      await connect(process.env.MONGODB_URL)
      const product = await Product.findOne({ brand: brand })
      if (product) {
          res.status(200).json({
              product: product
          });
      } else {
          res.status(404).json({
              message: "Product not found"
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}
  const deleteProduct = async (req,res)=>{

    const {title} = req.body
    try {
      await connect(process.env.MONGODB_URL)
      const result = await Product.deleteOne({ title: title })
      if (result.deletedCount > 0) {
          res.status(200).json({
              message: "Product deleted successfully"
          });
      } else {
          res.status(404).json({
              message: "Product not found"
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}

  const updateProduct = async (req,res)=>{

    const {_id, title,brand,price ,category,thumbnail,images,rating} = req.body

    const filter = {_id}
    const update = {title,brand,price ,category,thumbnail,images,rating}
    
    try {
      await connect(process.env.MONGODB_URL)
      const result = await Product.findOneAndUpdate(filter, update)
      if (result) {
          res.status(200).json({
              message: "Product updated successfully"
          });
      } else {
          res.status(404).json({
              message: "Product not found"
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}

module.exports = {addProduct,getAllProducts,Productbyname,Productbyid,ProductbyCategory,ProductbyBrand,deleteProduct,updateProduct}
// module.exports = {getAllProducts,addProduct ,Productbyname,Productbyid,ProductbyCategory,ProductbyBrand,deleteProduct,updateProduct}
