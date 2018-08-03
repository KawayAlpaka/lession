const config = {
  user: 'sa',
  password: '#!szMA@0168',
  server: '172.16.150.195', // You can use 'localhost\\instance' to connect to named instance
  database: 'test_mc',
  // options: {
  //     encrypt: true // Use this if you're on Windows Azure
  // }
};

const sql = require('mssql');

(async function () {
    try {
        let pool = await sql.connect(config)
        let result1 = await pool.request()
            // .input('input_parameter', sql.Int, value)
            .query('SELECT * FROM BMA_DictItem');
            
        console.dir(result1);
        console.dir(result1.recordsets);

        // Stored procedure
        
        // let result2 = await pool.request()
        //     .input('input_parameter', sql.Int, value)
        //     .output('output_parameter', sql.VarChar(50))
        //     .execute('procedure_name')
        
        // console.dir(result2)
    } catch (err) {
        // ... error checks
    }
})();

sql.on('error', err => {
    // ... error handler
});