import groq from '../config/groq.js';
import Chat from '../models/Chat.model.js';

// @desc    Send message to AI
// @route   POST /api/chat/message
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { message, chatId } = req.body;
    const userId = req.user._id;

    if (!message) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a message'
      });
    }

    let chat;
    
    // Find or create chat
    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, user: userId });
      if (!chat) {
        return res.status(404).json({
          status: 'error',
          message: 'Chat not found'
        });
      }
    } else {
      chat = await Chat.create({
        user: userId,
        messages: [],
        title: message.substring(0, 50) + '...'
      });
    }

    // Add user message to chat
    chat.messages.push({
      role: 'user',
      content: message
    });

    // Prepare conversation history for Groq
    const conversationHistory = chat.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add system message for pharmacy context
    const messages = [
      {
        role: 'system',
        content: `You are a knowledgeable pharmacy assistant helping pharmacy students and professionals. 
        Provide accurate, detailed information about drugs, mechanisms of action, interactions, side effects, 
        pharmacology, medicinal chemistry, and pharmacy practice. Always prioritize patient safety and 
        evidence-based information. If you're unsure about something, acknowledge it and suggest consulting 
        additional resources or healthcare professionals.`
      },
      ...conversationHistory
    ];

    // Get response from Groq
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    });

    const aiResponse = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    // Add AI response to chat
    chat.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    chat.lastMessage = Date.now();
    await chat.save();

    res.status(200).json({
      status: 'success',
      data: {
        chatId: chat._id,
        message: aiResponse,
        chat: chat
      }
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error processing your message'
    });
  }
};

// @desc    Get all chats for user
// @route   GET /api/chat
// @access  Private
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id })
      .sort({ lastMessage: -1 })
      .select('title lastMessage createdAt');

    res.status(200).json({
      status: 'success',
      data: chats
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single chat
// @route   GET /api/chat/:id
// @access  Private
export const getChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!chat) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: chat
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete chat
// @route   DELETE /api/chat/:id
// @access  Private
export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!chat) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Chat deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
