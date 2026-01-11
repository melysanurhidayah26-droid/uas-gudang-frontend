// ====================== LOGIN ======================
async function login(email, password) {
  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error("Email atau password salah!");
    const data = await res.json();

    // simpan token JWT & role
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    alert("Login berhasil!");
    window.location.href = "dashboard.html";

  } catch (err) {
    alert(err.message);
  }
}

// ====================== SIGNUP ======================
async function signup(name, email, password, role, key) {
  try {
    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role, key })
    });

    if (!res.ok) throw new Error("Signup gagal! Cek input atau kata kunci role.");
    alert("Signup berhasil! Silakan login.");
    window.location.href = "index.html";

  } catch (err) {
    alert(err.message);
  }
}

// ====================== PROTEKSI HALAMAN ======================
function protectPage(requiredRole) {
  const role = localStorage.getItem("role");
  if (!role) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "index.html";
  } else if (requiredRole && role !== requiredRole) {
    alert("Anda tidak memiliki akses ke halaman ini!");
    window.location.href = "dashboard.html";
  }
}

// ====================== LOGOUT ======================
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  alert("Logout berhasil!");
  window.location.href = "index.html";
}
