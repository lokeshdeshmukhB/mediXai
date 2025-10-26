import Paper from '../models/Paper.model.js';
import User from '../models/User.model.js';
import groq from '../config/groq.js';
import cloudinary from '../config/cloudinary.js';
import pdf from 'pdf-parse';
import fs from 'fs';

// @desc    Upload and summarize paper
// @route   POST /api/summarizer/upload
// @access  Private
export const uploadAndSummarize = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Please upload a PDF file'
      });
    }

    const userId = req.user._id;
    const file = req.file;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'pharmacacademy/papers',
      resource_type: 'raw'
    });

    // Extract text from PDF
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdf(dataBuffer);
    const extractedText = pdfData.text.substring(0, 8000); // Limit text for API

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    // Generate summary using Groq
    const prompt = `Analyze this research paper and provide a structured summary:

${extractedText}

Please provide:
1. Key Findings (2-3 sentences)
2. Methodology (2-3 sentences)
3. Conclusions (2-3 sentences)
4. Full Summary (1 paragraph)

Format as JSON:
{
  "keyFindings": "...",
  "methodology": "...",
  "conclusions": "...",
  "fullSummary": "..."
}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a research paper analysis expert. Provide clear, concise summaries.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 1500
    });

    const responseText = completion.choices[0]?.message?.content;
    
    let summary;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      summary = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      summary = {
        keyFindings: 'Summary generation in progress...',
        methodology: 'Summary generation in progress...',
        conclusions: 'Summary generation in progress...',
        fullSummary: responseText
      };
    }

    // Generate citations
    const title = file.originalname.replace('.pdf', '');
    const year = new Date().getFullYear();
    
    // const citations = {
    //   apa: `Author, A. (${year}). ${title}. Journal Name, 45(2), 123-145.`,
    //   mla: `Author, Name. "${title}." Journal Name 45.2 (${year}): 123-145.`,
    //   chicago: `Author, Name. "${title}." Journal Name 45, no. 2 (${year}): 123-145.`
    // };

    // Save to database
    const paper = await Paper.create({
      user: userId,
      title,
      originalFileName: file.originalname,
      fileUrl: result.secure_url,
      cloudinaryId: result.public_id,
      summary,
      // citations
    });

    // Update user stats
    await User.findByIdAndUpdate(userId, {
      $inc: { 'stats.papersSummarized': 1 }
    });

    res.status(200).json({
      status: 'success',
      data: paper
    });
  } catch (error) {
    console.error('Summarizer error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get user's saved papers
// @route   GET /api/summarizer/papers
// @access  Private
export const getSavedPapers = async (req, res) => {
  try {
    const papers = await Paper.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      status: 'success',
      data: papers
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single paper
// @route   GET /api/summarizer/papers/:id
// @access  Private
export const getPaper = async (req, res) => {
  try {
    const paper = await Paper.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!paper) {
      return res.status(404).json({
        status: 'error',
        message: 'Paper not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: paper
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete paper
// @route   DELETE /api/summarizer/papers/:id
// @access  Private
export const deletePaper = async (req, res) => {
  try {
    const paper = await Paper.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!paper) {
      return res.status(404).json({
        status: 'error',
        message: 'Paper not found'
      });
    }

    // Delete from Cloudinary
    if (paper.cloudinaryId) {
      await cloudinary.uploader.destroy(paper.cloudinaryId, { resource_type: 'raw' });
    }

    await paper.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Paper deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
