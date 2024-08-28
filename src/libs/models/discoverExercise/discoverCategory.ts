import mongoose from "mongoose";

const DiscoverCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

const DiscoverCategoryModel = mongoose.models.discovercCategoryexs || mongoose.model('discovercCategoryexs', DiscoverCategorySchema)

export default DiscoverCategoryModel