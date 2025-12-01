export function Register() {
  return (
    <section className="maxWidth m-auto">
      <h2 className="text-rosa mt-5 fs-1">Register</h2>

      <form
        class="mt-5 p-3 fs-4 bg-gris rounded shadow"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Aquí iría la lógica de login 🙂");
        }}
      >
        <div class="form-group mt-2">
          <label for="email">Dirección email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Introduce email"
          ></input>
          <small id="emailHelp" class="form-text text-muted">
            Nunca compartiremos su email con nadie.
          </small>
        </div>
        <div class="form-group mt-2">
          <label for="password">Contraseña</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Contraseña"
          ></input>
        </div>
    
        <button type="submit" class="btn btn-primary mt-3 fs-4">
          Submit
        </button>
      </form>
    </section>
  );
}
