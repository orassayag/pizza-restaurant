import mongoose, { Schema, Document } from 'mongoose';
import SEGMENTATION from '../enums/segmentation.enum';
import SIZE from '../enums/size.enum';
import STATUS from '../enums/status.enum';
import STAGE from '../enums/stage.enum';

interface Toppie {
  name: String;
  segmentation: SEGMENTATION;
}

interface Order extends Document {
  _id: mongoose.Types.ObjectId;
  userId: String;
  size: SIZE;
  toppies: Toppie[];
  stage: STAGE;
  previousStage: STAGE;
  status: String;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<Order> = new Schema<Order>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    size: {
      type: String,
      enum: SIZE,
      required: true,
      trim: true,
    },
    toppies: [
      {
        name: {
          type: String,
          required: true,
        },
        segmentation: {
          type: String,
          enum: SEGMENTATION,
          required: true,
        },
      },
    ],
    stage: {
      type: String,
      enum: STAGE,
      default: STAGE.PENDING,
      required: true,
    },
    previousStage: {
      type: String,
      enum: STAGE,
    },
    status: {
      type: String,
      enum: STATUS,
      default: STATUS.PENDING,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Order>('Order', OrderSchema);
