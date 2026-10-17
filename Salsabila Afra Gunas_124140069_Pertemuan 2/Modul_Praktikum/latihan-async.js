
console.log("=== LATIHAN ASYNC ===");

// 1. Mengambil data dari beberapa endpoint
const ambilData = async () => {
    try {
        const [usersResponse, postsResponse] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users"),
            fetch("https://jsonplaceholder.typicode.com/posts")
        ]);

        if (!usersResponse.ok || !postsResponse.ok) {
            throw new Error("Gagal mengambil data");
        }

        const users = await usersResponse.json();
        const posts = await postsResponse.json();

        return { users, posts };
    } catch (error) {
        console.error("Terjadi kesalahan:", error.message);
        return null;
    }
};

// 2. Retry sederhana dengan jeda bertambah
const tunggu = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

const fetchDenganRetry = async (url, percobaanMaks = 3) => {
    for (let percobaan = 1; percobaan <= percobaanMaks; percobaan++) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Permintaan gagal");
            }

            return await response.json();
        } catch (error) {
            if (percobaan === percobaanMaks) {
                throw error;
            }

            await tunggu(500 * 2 ** (percobaan - 1));
        }
    }
};

// 3. Loading state dan penanganan error
const tampilkanData = async () => {
    console.log("Loading...");

    try {
        const data = await fetchDenganRetry(
            "https://jsonplaceholder.typicode.com/users"
        );

        console.log("Data berhasil dimuat:", data);
    } catch (error) {
        console.error("Gagal memuat data:", error.message);
    } finally {
        console.log("Proses selesai.");
    }
};

// 4. Pagination
const ambilHalaman = async (halaman = 1, jumlah = 5) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${halaman}&_limit=${jumlah}`
    );

    if (!response.ok) {
        throw new Error("Gagal mengambil halaman");
    }

    return await response.json();
};

// 5. Debounce untuk pencarian
const debounce = (fungsi, jeda = 500) => {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fungsi(...args);
        }, jeda);
    };
};

const cariTeks = debounce(teks => {
    console.log("Mencari:", teks);
}, 500);

// Jalankan contoh
const jalankan = async () => {
    const data = await ambilData();

    if (data) {
        console.log("Jumlah pengguna:", data.users.length);
        console.log("Jumlah posting:", data.posts.length);
    }

    await tampilkanData();

    try {
        const halaman = await ambilHalaman(1, 5);
        console.log("Isi halaman pertama:", halaman);
    } catch (error) {
        console.error(error.message);
    }

    cariTeks("JavaScript");
};

jalankan();
