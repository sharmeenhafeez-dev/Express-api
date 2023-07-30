const {Schema,model} = require ('mongoose')

const productSchema = new Schema(
    {
      title :{
                type:String,
                 required : true
               },
               brand :{
                type:String,
                 required : true,
                 unique : true
               },
               price :{
                type:String,
                 required : true
               },

               images: {
                type: Array,
                required: true,
           
            },

               description:{
                type:String,
                 required : true
               },
              category:{
                type:String,
                 required : true
               },
              rating:{
                type:String,
                 required : true
               },
               thumbnail:{
                type:String,
                 required : true
               },
          

    }
)


const Product = model ('product', productSchema)

module.exports = Product