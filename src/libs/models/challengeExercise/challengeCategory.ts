import mongoose from "mongoose";

const ChallengeCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  totalWorkout: {
    type: Number,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

const ChallengeCategoryModel =
  mongoose.models.challengeCategoryexs ||
  mongoose.model("challengeCategoryexs", ChallengeCategorySchema);

export default ChallengeCategoryModel;
