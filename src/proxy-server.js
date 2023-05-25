// import express, { json } from 'express';
// import axios from 'axios';

// const app = express();
// const PORT = 3000; // Proxy sunucusu için kullanacağınız port numarası

// app.use(json());

// app.get('/api', async (req, res) => {
//   const url = req.query.url; // URL'i parametre olarak alın

//   try {
//     const response = await axios.get(`https://api.ip2whois.com/v2?key=0607942437A13C55233425498F4F2AFD&domain=${url}`); // URL'i kullanarak isteği hedef API'ye yönlendirin
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Hata oluştu' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Proxy sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
// });
