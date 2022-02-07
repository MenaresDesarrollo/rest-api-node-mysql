const express = require ('express');
const { route } = require('express/lib/application');
const router = express.Router();

const mysqlConnection = require('../database.js');
//Principal
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM employes', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//segun ID
router.get('/:id', (req, res)=>{
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM employes WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

//insertar un dato
router.post('/', (req, res) => {
    const {id, name ,salary} = req.body;
    const query = `
        CALL employeAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, salary],(err, rows, fields) =>{
        if(!err) {
            res.json({Satatus: 'Employed Saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/:id', (req, res) => {
    const { name, salary } = req.body;
    const { id } = req.params;

    const query = 'CALL employeAddOrEdit(?, ?, ?)';
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'Employee Updated'});
        } else {
            console.log(err);
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM employes WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Employed delete'})
        } else {
            console.log(err)
        }
    })
});

module.exports = router;