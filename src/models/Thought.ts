import { Schema, model, Document, Types } from 'mongoose';

interface IReaction {
  reactionId: Schema.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
}

const reactionSchema = new Schema<IReaction>({
  reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const thoughtSchema = new Schema<IThought>({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [reactionSchema]
}, {
  toJSON: { virtuals: true },
  id: false
});

const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;