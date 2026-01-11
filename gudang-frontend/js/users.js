async function getUsers() {
  const token = localStorage.getItem("token");
  
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}` 
      }
    });

    if (!res.ok) throw new Error("Gagal mengambil data user. Pastikan server aktif dan Anda adalah Admin.");
    
    const users = await res.json(); // Mengambil data asli dari database backend
    const table = document.getElementById("userTable");
    table.innerHTML = "";
    
    users.forEach(u => {
      table.innerHTML += `
        <tr>
          <td>${u.id}</td>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${u.role}</td>
          <td>
            <button onclick="editUser(${u.id})">Edit</button>
            <button onclick="deleteUser(${u.id})">Hapus</button>
          </td>
        </tr>
      `;
    });
  } catch (err) {
    alert(err.message);
  }
}

async function deleteUser(id) {
  if (!confirm("Yakin ingin menghapus user ini secara permanen?")) return;
  
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (res.ok) {
      alert("User berhasil dihapus dari database!");
      getUsers(); // Refresh tabel
    } else {
      throw new Error("Gagal menghapus user.");
    }
  } catch (err) {
    alert(err.message);
  }
}

async function editUser(id) {
  const newName = prompt("Masukkan Nama Baru:");
  const newEmail = prompt("Masukkan Email Baru:");
  if (!newName || !newEmail) return;

  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ name: newName, email: newEmail })
    });

    if (res.ok) {
      alert("Data user berhasil diperbarui!");
      getUsers();
    }
  } catch (err) {
    alert("Gagal mengupdate user.");
  }
}