// Mengambil data profil user yang sedang login
async function getProfile() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch("http://localhost:3000/api/profile", {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Gagal mengambil data profil.");

    const user = await res.json();
    
    // Tampilkan ke halaman
    document.getElementById("displayName").innerText = user.name;
    document.getElementById("displayEmail").innerText = user.email;
    document.getElementById("displayRole").innerText = user.role;

    // Isi nilai awal di form edit
    document.getElementById("editName").value = user.name;
    document.getElementById("editEmail").value = user.email;
  } catch (err) {
    alert(err.message);
  }
}

// Mengirim perubahan profil ke server
async function updateProfile() {
  const name = document.getElementById("editName").value;
  const email = document.getElementById("editEmail").value;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/api/profile", {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ name, email })
    });

    if (!res.ok) throw new Error("Gagal memperbarui profil.");

    alert("Profil berhasil diperbarui!");
    location.reload(); // Refresh untuk melihat perubahan
  } catch (err) {
    alert(err.message);
  }
}

// Fungsi pembantu untuk UI
function showEditForm() {
  document.getElementById("editForm").style.display = "block";
}

function hideEditForm() {
  document.getElementById("editForm").style.display = "none";
}