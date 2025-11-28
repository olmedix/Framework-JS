// ============================================
  //                GET (useEffect)
  // ============================================
  useEffect(() => {
    let aborted = false;

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Error al cargar los usuarios");

        const data = await res.json();

        if (!aborted) setUsers(data.data.users);
      } catch (err) {
        if (!aborted) setError(err.message);
      } finally {
        if (!aborted) setLoading(false);
      }
    }

    loadUsers();
    return () => (aborted = true);
  }, []);

  // ============================================
  //                  POST (Create)
  // ============================================
  async function createUser(newUser) {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Error creando usuario");

      const data = await res.json();

      // añadimos el nuevo usuario a la lista
      setUsers((old) => [...old, data.data.user]);

    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  }

  // ============================================
  //                  PUT (Update)
  // ============================================
  async function updateUser(id, updatedData) {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Error actualizando usuario");

      const data = await res.json();

      // Actualizar la lista en memoria
      setUsers((old) =>
        old.map((u) => (u._id === id ? data.data.user : u))
      );

    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  }

  // ============================================
  //                  DELETE
  // ============================================
  async function deleteUser(id) {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error eliminando usuario");

      // Quitar de la lista en memoria
      setUsers((old) => old.filter((u) => u._id !== id));

    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  }