import { useState } from "../../core/hooks.js";

export function UpdateUser() {
  let user = localStorage.getItem("userToUpdate");
  if (user) user = JSON.parse(user);

  const [formData, setFormData] = useState(user);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok){ 
        setSuccess(true);
        localStorage.removeItem("userToUpdate");
      }else throw new Error("Failed to update user");
    } catch(error) {
      setError("Error updating user:", error);
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="maxWidth m-auto">
      <h2 className="text-center fs-1 text-danger">Update User</h2>

      {success && <p className="text-success fs-2 fw-bold">User updated successfully!</p>}

      {user && (
        <form onSubmit={handleSubmit}>

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
      )}
    </section>
  );
}
