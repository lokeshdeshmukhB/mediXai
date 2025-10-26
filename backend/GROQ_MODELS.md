# Groq Supported Models

## Current Model Used
**llama-3.3-70b-versatile**

This is the latest and most capable model from Meta's Llama family, optimized for versatile tasks.

## Alternative Models (if needed)

If you need to switch models, here are other supported options:

### Llama Models
- `llama-3.3-70b-versatile` - **Current** (Recommended for most tasks)
- `llama-3.1-8b-instant` - Faster, smaller model for quick responses
- `llama3-70b-8192` - Alternative 70B model
- `llama3-8b-8192` - Smaller, faster alternative

### Mixtral Models
- `mixtral-8x7b-32768` - Good for long context
- `gemma2-9b-it` - Google's Gemma model

### How to Change Model

Edit the model parameter in the controllers:

**Example in `chat.controller.js`:**
```javascript
const completion = await groq.chat.completions.create({
  messages: messages,
  model: 'llama-3.3-70b-versatile', // Change this line
  temperature: 0.7,
  max_tokens: 1024,
  top_p: 1,
  stream: false
});
```

## Model Capabilities

### llama-3.3-70b-versatile (Current)
- **Best for:** General purpose, complex reasoning
- **Context window:** 8,192 tokens
- **Speed:** Moderate
- **Quality:** Highest

### llama-3.1-8b-instant
- **Best for:** Quick responses, simple queries
- **Context window:** 8,192 tokens
- **Speed:** Fastest
- **Quality:** Good

## Important Notes

1. **Decommissioned Models:** 
   - `llama-3.1-70b-versatile` - No longer supported (replaced by 3.3)

2. **Rate Limits:** Check your Groq console for current rate limits

3. **Token Limits:** 
   - Input + Output tokens must be within model's context window
   - Adjust `max_tokens` parameter if needed

4. **Temperature Settings:**
   - Lower (0.1-0.3): More focused, deterministic
   - Medium (0.5-0.7): Balanced
   - Higher (0.8-1.0): More creative, varied

## Troubleshooting

### Model Decommissioned Error
If you see "model has been decommissioned", update to `llama-3.3-70b-versatile`

### Rate Limit Errors
- Check your Groq API quota
- Implement request throttling
- Consider upgrading your Groq plan

### Context Length Errors
- Reduce `max_tokens` parameter
- Trim conversation history for chat
- Use a model with larger context window

## References
- [Groq Documentation](https://console.groq.com/docs)
- [Model Deprecations](https://console.groq.com/docs/deprecations)
