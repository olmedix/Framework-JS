// src/pages/LoginPage.jsx

export function Login() {
  return (
    <section className="page page-login">
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Aquí iría la lógica de login 🙂");
        }}
      >
        <label>
          Usuario
          <input name="user" />
        </label>
        <label>
          Password
          <input name="pass" type="password" />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}
