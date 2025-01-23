import sqlite from 'sqlite3';

const db = new sqlite.Database('./database/AluraFlix.db', (err) => {
    if (err) {
        console.error(`Ocorreu um erro ao conectar com o banco de dados: ${err.message}`);
        return;
    } else {
        console.log('Conectado com sucesso ao banco de dados"');
    };
});

export default db;
