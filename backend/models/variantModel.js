const mongoose =  require("mongoose");

const variantSchema = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },

        color: {
            type: String,
            required: true
        },

        colorCodes: {
            type: String,
            required: true
        },
        
        image: {
            type: String,
            required: true
        },

        stock: {
            sizeS : {type: Number, required: true, default: 0},
            sizeM : {type: Number, required: true, default: 0},
            sizeL : {type: Number, required: true, default: 0},
            sizeXL : {type: Number, required: true, default: 0},
            sizeXXL : {type: Number, required: true, default: 0}
        }

    }, 

    {
        timestamps: true
    }
)

const Variant = mongoose.model('Variant', variantSchema)

module.exports = Variant