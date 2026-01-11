async function getProducts() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/products", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const products = await res.json();

  const table = document.getElementById("productTable");
  table.innerHTML = "";
  products.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.stock}</td>
        <td>${p.price}</td>
        <td>
          <button onclick="editProduct(${p.id})">Edit</button>
          <button onclick="deleteProduct(${p.id})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

async function addProduct(name, stock, price) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, stock, price })
  });
  if (res.ok) {
    alert("Produk berhasil ditambah!");
    getProducts();
  }
}

async function editProduct(id) {
  const newName = prompt("Nama baru:");
  const newStock = prompt("Stok baru:");
  const newPrice = prompt("Harga baru:");

  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name: newName, stock: newStock, price: newPrice })
  });

  if (res.ok) {
    alert("Produk berhasil diperbarui!");
    getProducts();
  }
}

async function deleteProduct(id) {
  if (!confirm("Yakin ingin hapus produk ini?")) return;

  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (res.ok) {
    alert("Produk berhasil dihapus!");
    getProducts();
  }
}
