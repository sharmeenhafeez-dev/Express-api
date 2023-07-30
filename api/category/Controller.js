const { connect } = require('mongoose');
require('dotenv').config()
const Category = require('./model')

const addCategory = async (req, res) => {

    const { CategoryName, CategoryImage } = req.body;

    try {
        await connect(process.env.MONGODB_URL)
                                                 //database name ,    jo hmny di ya wo name h
        const checkDuplicate = await Category.exists({ CategoryName: CategoryName })

        if (checkDuplicate)

            res.status(409).json({

                message: "category already existing"

            })
        else {                  
            await Category.create({ CategoryName, CategoryImage })
            res.status(201).json({
                message: "category created succssfully"

            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message

        })
    }
}

const allCatrgories = async(req, res) => {

    try {
        await connect(process.env.MONGODB_URL)
      const categories  = await  Category.find()
      res.status(200).json(
          {
            categories: categories  
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

const Categorybyname = async (req, res) => {

    const { name } = req.query
  
  
    try {
        await connect(process.env.MONGODB_URL)
        const category = await Category.findOne({ CategoryName: name })
        if (category) {
            res.status(200).json({
                category: category
            });
        } else {
            res.status(404).json({
                message: "Category not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


  const Categorybyid = async (req, res) => {

    // const { id } = req.params       is trha b kr skty h 
    const { _id } = req.params      

  try {
    await connect(process.env.MONGODB_URL)

      //       // const category = await Category.findOne({ _id:id })

    const category = await Category.findOne({ _id })
    if (category) {
        res.status(200).json({
            category: category
        });
    } else {
        res.status(404).json({
            message: "Category not found"
        });
    }
} catch (error) {
    res.status(500).json({
        message: error.message
    });
}
}
  const deleteCategory = async (req,res)=>{

    const {CategoryName} = req.body
    try {
      await connect(process.env.MONGODB_URL)
      const result = await Category.deleteOne({ CategoryName: CategoryName })
      if (result.deletedCount > 0) {
          res.status(200).json({
              message: "Category deleted successfully"
          });
      } else {
          res.status(404).json({
              message: "Category not found"
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}

  const updateCategory = async (req,res)=>{

    const {_id, CategoryName,CategoryImage} = req.body

    const filter = {_id}
    const update = { CategoryName , CategoryImage}
    
    try {
      await connect(process.env.MONGODB_URL)
      const result = await Category.findOneAndUpdate(filter, update)
      if (result) {
          res.status(200).json({
              message: "Category updated successfully"
          });
      } else {
          res.status(404).json({
              message: "Category not found"
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}
module.exports = { addCategory, allCatrgories ,Categorybyname ,Categorybyid,deleteCategory,updateCategory}