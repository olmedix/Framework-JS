import { useState } from "../../core/hooks.js";


export function AddUser() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "User",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      alert("User added successfully");
    } catch (error) {
      setError("Error adding user:", error);
    }finally{
      setLoading(false);
    }

    
  }
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (loading) return <div className="maxWidth m-auto">Loading...</div>;
  if (error) return <div className="maxWidth m-auto">{error}</div>;

  return (
    <section className="maxWidth m-auto">
      <form onSubmit={handleSubmit}>
        <h2>Add user</h2>

        <div>
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="form-label">Surname:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="form-label">Role: {formData.role}</label>
          <select
            name="role"
            className="form-select"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">-- Choose option --</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Guest">Guest</option>
          </select>
        </div>

        <button class="btn btn-primary mt-3" type="submit">
          Enviar
        </button>
      </form>

    </section>
  );
}
