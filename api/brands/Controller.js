const { connect } = require('mongoose');
require('dotenv').config()
const Category = require('./model');
const Brand = require('./model');

const addBrand = async (req, res) => {

    const {  BrandName,  BrandImage } = req.body;

    try {
        await connect(process.env.MONGODB_URL)
                                                 //database name ,    jo hmny di ya wo name h
        const checkDuplicate = await Brand.exists({ BrandName: BrandName })

        if (checkDuplicate)

            res.status(409).json({

                message: "Brand already existing"

            })
        else {                  
            await Brand.create({ BrandName, BrandImage })
            res.status(201).json({
                message: "Brand created succssfully"

            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message

        })
    }
}

const allBrands = async (req, res) => {

    try {
        await connect(process.env.MONGODB_URL)
      const brand  = await  Brand.find()
      res.status(200).json(
          {
           brand: brand  
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

const Brandbyname = async (req, res) => {

    const { name } = req.query
  
  
    try {
        await connect(process.env.MONGODB_URL)
        const brand = await Brand.findOne({ BrandName: name })
        if (brand) {
            res.status(200).json({
                brand: brand
            });
        } else {
            res.status(404).json({
                message: "Brand Not Found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


  const Brandbyid = async (req, res) => {

    // const { id } = req.params       is trha b kr skty h 
    const { _id } = req.params      

  try {
    await connect(process.env.MONGODB_URL)

      //       // const category = await Category.findOne({ _id:id })

    const brand = await Brand.findOne({ _id })
    if (brand) {
        res.status(200).json({
            brand: brand
        });
    } else {
        res.status(404).json({
            message: "Brand Not Found"
        });
    }
} catch (error) {
    res.status(500).json({
        message: error.message
    });
}
}
  const deleteBrand = async (req,res)=>{

    const {BrandName} = req.body
    try {
      await connect(process.env.MONGODB_URL)
      const result = await Brand.deleteOne({ BrandName: BrandName })
      if (result.deletedCount > 0) {
          res.status(200).json({
              message: "Brand deleted successfully"
          });
      } else {
          res.status(404).json({
              message: "Brand not found"
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}

  const updateBrand = async (req,res)=>{

    const {_id, BrandName,BrandImage} = req.body

    const filter = {_id}
    const update = { BrandName , BrandImage}
    
    try {
      await connect(process.env.MONGODB_URL)
      const brand = await Brand.findOneAndUpdate(filter, update)
      if (brand) {
          res.status(200).json({
              message: "Brand updated successfully"
          });
      } else {
          res.status(404).json({
              message: "Brand not found"
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}
module.exports = {addBrand,allBrands ,Brandbyname,Brandbyid,deleteBrand,updateBrand}