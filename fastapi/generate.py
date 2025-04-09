import json
from transformers import pipeline, GPT2LMHeadModel, GPT2Tokenizer

# Load the fine-tuned model and tokenizer
model = GPT2LMHeadModel.from_pretrained("/app/fine_tuned_model")
tokenizer = GPT2Tokenizer.from_pretrained("/app/fine_tuned_model")

if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

# Create a text generation pipeline
generator = pipeline("text-generation", model=model, tokenizer=tokenizer)

def generate_text(prompt):
    generated_text = generator(prompt, max_length=300, num_return_sequences=1, pad_token_id=tokenizer.eos_token_id)
    return generated_text[0]['generated_text']
