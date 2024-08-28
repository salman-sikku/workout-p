import mongoose, { Schema } from "mongoose";

const ChallengeExerciseSchema = new Schema(
  {
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
    totalCalorie: {
      type: Number,
    },
    categoryType: {
      type: String,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TrainCategoryModel =
  mongoose.models.trainCategoryExs ||
  mongoose.model("trainCategoryExs", ChallengeExerciseSchema);

export default TrainCategoryModel;
