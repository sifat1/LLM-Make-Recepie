import { useState } from "react";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatRecipe = (rawRecipe) => {
    // Extract the "generated_text" from the response and format it for better readability
    const recipeText = rawRecipe.generated_text;

    return recipeText
      .split("\n")  // Split by newlines
      .filter((line) => line.trim())  // Remove any empty lines
      .map((line, index) => <li key={index}>{line}</li>);  // Return list items
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecipe("");

    try {
      const response = await fetch("http://localhost:5000/Recipe/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe.");
      }

      const data = await response.json();  // Assuming the response is in JSON format
      setRecipe(formatRecipe(data));  // Format the response text properly
    } catch (err) {
      setError("There was an error generating the recipe: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 805, margin: "2rem auto", padding: "1.5rem", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>🍳 Recipe Generator</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (e.g., Chicken, Rice, Tomatoes)"
          rows={5}
          style={{
            width: "100%",
            padding: "0.8rem",
            fontSize: "1rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            resize: "vertical",
          }}
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.8rem 1.2rem",
            fontSize: "1rem",
            backgroundColor: loading ? "#ddd" : "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
      </form>

      {error && <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>{error}</p>}

      {recipe && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <h3 style={{ color: "#333" }}>Generated Recipe:</h3>
          <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>{recipe}</ul>
        </div>
      )}
    </div>
  );
}

export default App;
