import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  originalFileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String
  },
  summary: {
    keyFindings: {
      type: String
    },
    methodology: {
      type: String
    },
    conclusions: {
      type: String
    },
    fullSummary: {
      type: String
    }
  },
  category: {
    type: String,
    default: 'General'
  },
  citations: {
    apa: String,
    mla: String,
    chicago: String
  }
}, {
  timestamps: true
});

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;
