const mongoose =  require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },
        
        gender: {
            type: mongoose.SchemaTypes.Mixed,
            required: true
        },

        price: {
            type: Number,
            required: true,
            default: 0
        },

        defaultColor: {
            type: String,
            required: true
        }
    }, 

    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product