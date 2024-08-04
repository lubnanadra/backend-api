const UsersModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createNewUser = async(req, res) => {
    const { 
        username, 
        password, 
        nama, 
        tanggal_lahir, 
        tinggi_badan, 
        jenis_kelamin 
    } = req.body;
    

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UsersModel.createNewUser({username, password: hashedPassword, nama, tanggal_lahir, tinggi_badan, jenis_kelamin});
     res.status(200).json({
        message: 'Pendaftaran Berhasil',
        data: req.body
     });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage:error.message,
        });
    }
   
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Cari pengguna berdasarkan username
        const user = await UsersModel.verifyUser( username, password );

        // Jika pengguna tidak ditemukan, kirim respons gagal
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        // Verifikasi password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Jika password tidak sesuai, kirim respons gagal
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Password tidak sesuai' });
        }

        // Buat token JWT
        const token = jwt.sign(
            { username: user.username},
            'secret_key',
            { expiresIn: '1h' }
        );

        // Kirim token JWT sebagai respons
        res.json({
            message: 'Login berhasil',
            token: token
        });
    } catch (error) {
        // Tangani kesalahan
        console.error('Server Error:', error);
        res.status(500).json({
            message: 'Gagal melakukan login',
            error: error.message
        });
    }
};


const getUserProfil = async (req, res) => {
    const { username } = req.params;
    try {
        const [rows] = await UsersModel.findUserByUsername(username);
        
        if (rows.length > 0) {
            const user = rows[0];
            res.json({
                message: 'Profil ditemukan',
                data: user
            });
        } else {
            res.status(404).json({
                message: 'Pengguna tidak ditemukan',
            });
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

const greetUser = async (req, res) => {
    const username = req.params.username;
    
    try {
        const user = await UsersModel.findUserByUsername(username);
        res.json({ message: `Hello, ${username}` });
    } catch (error) {
        console.error('Gagal Menyapa pengguna', error);
        res.status(500).json({message: 'Gagal Menyapa pengguna'});
    }
};

module.exports = {
    createNewUser,
    loginUser, 
    getUserProfil,
    greetUser
}