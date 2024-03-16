# Bookshelf Apps
- memasukkan data buku ke dalam rak 
- memindahkan data buku antar rak 
- menghapus data buku dari rak 

### 5 kriteria
1. mampu nambahin data buku baru 
```javaScript
//data merupakan objek js dgn struktur: 
{
  id: string | number,
  title: string,
  author: string,
  year: number,
  isComplete: boolean,
}

//data rillnya
{
  id: 3657848524,
  title: 'Harry Potter and the Philosopher\'s Stone',
  author: 'J.K Rowling',
  year: 1997,
  isComplete: false,
}
```
- pake timestamp untuk id unik buku `+newDate()`

2. Memiliki 2 Rak Buku -> belum selesai dibaca & selesai dibaca 
- Rak buku "Belum selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai false.
- Rak buku "Selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai true.

3. Dapat Memindahkan Buku antar Rak
- Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dipindahkan di antara keduanya.

4. Dapat Menghapus Data Buku
- Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dihapus.

5. Manfaatkan localStorage dalam Menyimpan Data Buku
Data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat bertahan walaupun halaman web ditutup.
Dengan begitu, Anda harus menyimpan data buku pada localStorage.

### Saran utk nilai tinggi
- Tambahkan fitur pencarian untuk mem-filter buku yang ditampilkan pada rak sesuai dengan title buku yang dituliskan pada kolom pencarian.

- Berkreasilah dengan membuat proyek Bookshelf Apps tanpa menggunakan project starter.

- Menuliskan kode dengan bersih.
    - Bersihkan comment dan kode yang tidak digunakan.
    - Indentasi yang sesuai.

- Terdapat improvisasi fitur seperti (pilih satu): 
    - Custom Dialog ketika menghapus buku.
    - Dapat edit buku.
    - dsb.