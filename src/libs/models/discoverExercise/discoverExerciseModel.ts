import mongoose from "mongoose";

const DiscoverExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "discovercCategoryexs",
  },
  discoveractions: [
    {
      discoveraction: {
        type: String,
        required: true,
      },
    },
  ],
  mistakes: [
    {
      mistake: {
        type: String,
        required: true,
      },
    },
  ],
  videoURL: {
    type: String,
  },
  duration: {
    type: Number,
    default : 0
  },
  reps: {
    type: Number,
    default : 0
  },
});

const DiscoverExerciseModel =
  mongoose.models.discoverExercises ||
  mongoose.model("discoverExercises", DiscoverExerciseSchema);

export default DiscoverExerciseModel;
