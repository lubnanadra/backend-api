const IMB = require('../models/imb');

const kalkulatorimb = (berat_badan, tinggi_badan) => {
    const tinggi_meter = tinggi_badan / 100;
    const imb = berat_badan / (tinggi_meter * tinggi_meter);

    let kategori, deskripsi;

    if (imb < 17) {
        kategori = 'Kurus-Berat';
        deskripsi = 'Kurus-Berat adalah keadaan dimana terjadi kekurangan gizi karena kurangnya asupan zat gizi yang masuk ke tubuh';
    } else if (imb >= 17 && imb < 18.4) {
        kategori = 'Kurus-Ringan';
        deskripsi = 'Kurus-Ringan adalah keadaan dimana terjadi kekurangan gizi karena kurangnya asupan zat gizi yang masuk ke tubuh.';
    } else if (imb >= 18.5 && imb < 25) {
        kategori = 'Ideal';
        deskripsi = 'Ideal adalah keadaan tubuh yang proporsional antara berat badan dan tinggi badan.';
    } else if (imb >= 25.1 && imb < 27) {
        kategori = 'Gemuk';
        deskripsi = 'Gemuk adalah keadaan dimana terjadi kelebihan berat badan.';
    } else {
        kategori = 'Obesitas';
        deskripsi = 'Obesitas adalah keadaan dimana terjadi kelebihan berat badan yang signifikan.';
    }

    return { imb: imb.toFixed(2), kategori, deskripsi };
};

const IMBotomatis = async (req, res) => {
    const { berat_badan, tinggi_badan } = req.body;

    if (!berat_badan || !tinggi_badan) {
       return res.status(400).json({ message: 'Masukkan berat badan (kg) dan tinggi badan (cm)' });
    }

    try {
        // Hitung BMI berdasarkan data sensor
        const { imb, kategori, deskripsi } = kalkulatorimb(berat_badan, tinggi_badan);

        res.json({
            imb,
            kategori,
            deskripsi
        });
    } catch (error) {
        console.error('Gagal  menghitung IMB:', error);
        res.status(500).json({ message: 'Gagal  menghitung IMB' });
    }
};

const IMBManual = async (req, res) => {
    const { berat_badan, tinggi_badan } = req.body;

    if (!berat_badan || !tinggi_badan) {
       return res.status(400).json({ message: 'Masukkan berat badan (kg) dan tinggi badan (cm)' });
    }

    // Kalkulator IMB
    const { imb, kategori, deskripsi } = kalkulatorimb(berat_badan, tinggi_badan);

    res.json({
        berat_badan,
        tinggi_badan,
        imb,
        kategori,
        deskripsi
    });
};

module.exports = {
    IMBotomatis,
    IMBManual
};
