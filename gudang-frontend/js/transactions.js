async function getTransactions() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/transactions", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const transactions = await res.json();

  const tbody = document.getElementById("tabel");
  tbody.innerHTML = "";
  transactions.forEach(t => {
    tbody.innerHTML += `
      <tr>
        <td>${t.jenis}</td>
        <td>${t.productName}</td>
        <td>${t.quantity}</td>
        <td>
          <button onclick="deleteTransaction(${t.id})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

async function deleteTransaction(id) {
  if (!confirm("Yakin ingin hapus transaksi ini?")) return;

  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (res.ok) {
    alert("Transaksi berhasil dihapus!");
    getTransactions();
  }
}
