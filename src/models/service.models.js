import mongoose from "mongoose"
import paginate from "mongoose-paginate-v2"

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    available: {
        type: Boolean,
        default: true,
        index: true
    }
})

serviceSchema.plugin(paginate);

export const ServiceModel = mongoose.model("services", serviceSchema)
