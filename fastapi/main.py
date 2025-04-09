from fastapi import FastAPI
from pydantic import BaseModel
from generate import generate_text

app = FastAPI()

class RecipeRequest(BaseModel):
    ingredients: str

@app.post("/generate")
def generate_recipe(request: RecipeRequest):
    prompt = f"Make a recipe with these ingredients: {request.ingredients}"
    generated_text = generate_text(prompt)
    return {"generated_text": generated_text}

    
