// ================
// Puerto
// ================
process.env.PORT = process.env.PORT || 3000;

// ================
// Entorno
// ================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================
// Vencimiento del token
// ================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días        
//process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.CADUCIDAD_TOKEN = '48h';

// ================
// seed de autenticación
// ================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ================
// Google Client Id
// ================
process.env.CLIENT_ID = process.env.CLIENT_ID || '370874250224-6vgfrnjtmsb8rlpp4asbep5390tmu5eo.apps.googleusercontent.com';

// ================
// Base de datos
// ================
let urlDB;


if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;