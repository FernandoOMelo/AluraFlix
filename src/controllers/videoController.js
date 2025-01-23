import db from '../config/dbConnect.js';

class VideoController {
    static async getAllVideos(req, res){
        const sql = 'SELECT * FROM VIDEOS';
    
        db.all(sql, [], (err, rows) => {
            if (err){
                res.status(400).json({ error: err.message});
                return;
            } else {
                res.status(200).json({
                    ok: true,
                    data: rows
                });
            };
        });
    };

    static async getVideoById(req, res){
        const sql = 'SELECT * FROM VIDEOS WHERE ID = ?';
        const params = [req.params.id];
        db.get(sql, params, (err, row) => {
            if (err){
                res.status(400).json({ ok: false, error: err.message});
            } else {
                if (!row){
                    res.status(404).json({ ok: false , message: 'Vídeo não encontrado.'});
                } else {
                    res.status(200).json({ ok: true, data: row});
                };
            };
        });
    };

    static async createVideo(req, res){
        const sql = 'INSERT INTO VIDEOS (TITULO, DESCRICAO, URL) VALUES (?, ?, ?)';
        const params = [req.body.titulo, req.body.descricao, req.body.url];
        
        if (!req.body.titulo || !req.body.descricao || !req.body.url){
            res.status(400).json({ ok: false, error: 'Os campos: (TITULO, DESCRICAO, URL) são de preenchimento obrigatório para o cadastro de um novo livro.'});
            return;
        } else{ 
            db.run(sql, params, function(err) {
                if (err){
                    res.status(400).json({ok: false, error: err.message});
                } else {
                    db.get(`SELECT * FROM VIDEOS WHERE ID = ${this.lastID}`, function (err, row){
                        if (err){
                            throw err.message;
                        } else {
                            res.status(200).json({ok: true, message: 'Video cadastrado com sucesso!', data: row});
                        };
                    });
                };
            });
        };
    };

    static async updateVideo(req, res) {
        const sql = 'UPDATE VIDEOS SET TITULO = ?, DESCRICAO = ?, URL = ? WHERE ID = ?';
        const params = [req.body.titulo, req.body.descricao, req.body.url, req.params.id];
        if (!req.body.titulo || !req.body.descricao || !req.body.url){
            res.status(400).json({ ok: false, error: 'Os campos: (TITULO, DESCRICAO, URL) são de preenchimento obrigatório para a atualização de um novo livro.'});
            return;
        } else{ 
            db.run(sql, params, function(err){
                if (err){
                    res.status(400).json({ ok: false, error: err.message});
                } else {
                    res.status(200).json({ ok: true, message: 'Vídeo foi atualizado com sucesso.', data: this.changes});
                };
            });
        };
    };

    static async deleteVideo(req, res) {
        const sql = `DELETE FROM VIDEOS WHERE ID = ${req.params.id}`;
        db.exec(sql, (err) => {
            if (err){
                res.status(400).json({ ok: false, error: err.message});
            } else {
                res.status(200).json({ ok: true, message: 'O vídeo foi deletado com sucesso.'});
            };
        });
    };
};

export default VideoController;

