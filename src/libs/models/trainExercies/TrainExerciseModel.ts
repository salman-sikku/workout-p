import mongoose, { Schema, Document, Model } from 'mongoose';

interface ITrainExercise extends Document {
  name: string;
  category: mongoose.Schema.Types.ObjectId;
  interactions: { interaction: string }[];
  mistakes: { mistake: string }[];
  brathings: { tips: string }[];
  imgUrl: string;
  focusImg?: string;
  focusArea: string[];
  duration: number;
  reps: number;
}

const TrainigExerciseSchema: Schema<ITrainExercise> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'trainCategoryExs',
    },
    interactions: [
      {
        interaction: {
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
    brathings: [
      {
        tips: {
          type: String,
          required: true,
        },
      },
    ],
    imgUrl: {
      type: String,
      required: true,
    },
    focusImg: {
      type: String,
    },
    focusArea: {
      type: [String],
      default: [],
    },
    duration: {
      type: Number,
      default: 0,
    },
    reps: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const TainingExerciseModel: Model<ITrainExercise> =
  mongoose.models.trainingExercise ||
  mongoose.model<ITrainExercise>('trainingExercise', TrainigExerciseSchema);

export default TainingExerciseModel;
