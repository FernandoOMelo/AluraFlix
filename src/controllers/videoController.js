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
        db.run(sql, params, (err) => {
            if (err){
                res.status(400).json({ok: false, error: err.message});
            } else {
                res.status(200).json({ok: true, message: `O Vídeo ${this} foi cadastrado com sucesso!`});
            };
        });
    };

    static async updateVideo(req, res) {
        const sql = 'UPDATE VIDEOS SET TITULO = ?, DESCRICAO = ?, URL = ? WHERE ID = ?';
        const params = [req.body.titulo, req.body.descricao, req.body.url, req.params.id];
        db.run(sql, params, (err) => {
            if (err){
                res.status(400).json({ ok: false, error: err.message});
            } else {
                res.status(200).json({ ok: true, message: 'Vídeo foi atualizado com sucesso,'});
            };
        });
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

