// Contoh data produk
const products = [
    { id: 1, name: 'Beras', price: 15000 },
    { id: 2, name: 'Minyak Goreng', price: 20000 },
    { id: 3, name: 'Gula', price: 12000 },
    // Tambahkan produk lainnya sesuai kebutuhan
];

// Inisialisasi keranjang belanja
let cart = [];

// Fungsi untuk menampilkan produk
function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p class="price">Rp. ${product.price}</p>
            <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Fungsi untuk menampilkan keranjang belanja
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${item.name} - Rp. ${item.price}`;
        cartContainer.appendChild(cartItem);
        total += item.price;
    });

    totalElement.textContent = `Rp. ${total}`;
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({ id: product.id, name: product.name, price: product.price });
        displayCart();
    }
}

// Fungsi untuk checkout (contoh sederhana, dapat disesuaikan)
function checkout() {
    alert('Terima kasih atas pembelian Anda!');
    cart = [];
    displayCart();
}

// Fungsi untuk menambahkan data produk grosir
function tambahData() {
    const namaProduk = document.getElementById('nama').value;
    const hargaProduk = document.getElementById('produk').value;

    // Validasi input
    if (namaProduk.trim() === '' || hargaProduk.trim() === '') {
        alert('Nama produk dan harga tidak boleh kosong!');
        return;
    }

    // Tambahkan data ke array produk
    const newData = { id: products.length + 1, name: namaProduk, price: parseFloat(hargaProduk) };
    products.push(newData);

    // Perbarui tampilan produk dan tabel
    displayProducts();
    displayTableData();

    // Reset formulir
    document.getElementById('crud-form').reset();
}

// Fungsi untuk menampilkan data produk grosir dalam tabel
function displayTableData() {
    const dataTableBody = document.getElementById('data-body');
    dataTableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>Rp. ${product.price}</td>
            <td>
                <button onclick="editData(${product.id})">Edit</button>
                <button onclick="hapusData(${product.id})">Hapus</button>
            </td>
        `;
        dataTableBody.appendChild(row);
    });
}

// Fungsi untuk mengedit data produk grosir
function editData(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Tampilkan data produk pada formulir
        document.getElementById('nama').value = product.name;
        document.getElementById('produk').value = product.price;

        // Hapus data produk dari array
        products.splice(products.indexOf(product), 1);

        // Perbarui tampilan produk dan tabel
        displayProducts();
        displayTableData();
    }
}

// Fungsi untuk menghapus data produk grosir
function hapusData(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Hapus data produk dari array
        products.splice(products.indexOf(product), 1);

        // Perbarui tampilan produk dan tabel
        displayProducts();
        displayTableData();
    }
}

// Menampilkan produk dan data tabel saat halaman dimuat
displayProducts();
displayTableData();