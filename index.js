const express= require("express");
const app= express();
const mysql = require('mysql');
const cors =require("cors")

app.use(cors({
    origin: 'https://dncateringysuministros.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
  }));
app.use(express.json());

/*const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"inventario_diana_nino"
})
*/
const db = mysql.createConnection({
    host: 'dncateringysuministros.com',
    user: 'u658950660_diana',
    password: 'W|8M04x>O',
    database: 'u658950660_inv_diana_nino'
    
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL en Hostinger');
});

app.get("/test", (req, res) => {
    db.query('SELECT * FROM local', (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(result);
    });
});
// ---------------------------------------------------------
// CRUD LOCAL
// ---------------------------------------------------------
app.post("/create_local",(req,res)=>{
    const name= req.body.name;
    const pasword = req.body.pasword;
    const type_local = req.body.type;
    const base = req.body.base;
    
    db.query('INSERT INTO local(nombre,pasword,tipo,base) values(?,?,?,?)',[name,pasword,type_local,base],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_local")
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})

app.get("/see_all_locals",(req,res)=>{
    db.query('SELECT * FROM local',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_locals ")
        }else{
            res.send(result)
        }
    })
})

app.put("/update_local",(req,res)=>{
    const id=req.body.id;
    const name= req.body.name;
    const pasword = req.body.pasword;
    const type_local = req.body.type;
    const base = req.body.base;

    db.query('UPDATE local SET nombre=?,pasword=?,tipo=?,base=? WHERE id=?',[name,pasword,type_local,base,id],
    (err,result)=>{
    if(err){
        console.log("ocurrio un error update_local ")
    }else{
        res.send(result)
        // res.send("Local Actualizado con exito")
    }
})
})

app.delete("/delete_local/:id",(req,res)=>{
    const id=req.params.id;
    
    db.query('DELETE  FROM local WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(id)
            console.log("ocurrio un error en delete_local")
            console.log(err)
        }else{
        res.send(result)
        // res.send("Local eliminado con exito!!")
    }
    })
})
// ---------------------------------------------
// CRUD CATEGORIA
// ---------------------------------------------
app.post("/create_category",(req,res)=>{
    const name= req.body.name;
    const type_local = req.body.type;
    
    db.query('INSERT INTO categoria_comida (nombre,tipo_local) values(?,?)',[name,type_local],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_category")
            console.log(err.message())
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})


app.get("/see_all_categories",(req,res)=>{
    db.query('SELECT * FROM categoria_comida ',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_categories")
        }else{
            res.send(result)
        }
    })
})

app.put("/update_category",(req,res)=>{
    const name= req.body.name;
    const type_local = req.body.type;
    const id_categoria= req.body.id_category;
    db.query('UPDATE categoria_comida SET nombre=?,tipo_local=? WHERE id_categoria=?',[name,type_local,id_categoria],
    (err,result)=>{
    if(err){
        console.log("ocurrio un error en update_category")
    }else{
        res.send(result)
        // res.send("Local Actualizado con exito")
    }
})
})

app.delete("/delete_category/:id",(req,res)=>{
    const id=req.params.id;
    
    db.query('DELETE  FROM categoria_comida  WHERE id_categoria=?',id,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en delete_caytegory")
        }else{
        res.send(result)
        // res.send("Local eliminado con exito!!")
    }
    })
})

// --------------------------
// CRUD PROVEEDOR
// ---------------------------------------------
app.post("/create_suplier",(req,res)=>{
    const name= req.body.name;
    const phone = req.body.phone;
    const municip = req.body.municip;
    
    db.query('INSERT INTO proveedor (nombre,cel,municipio) values(?,?,?)',[name,phone,municip],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_suplier")
            console.log(err.message())
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})


app.get("/see_all_supliers",(req,res)=>{
    db.query('SELECT * FROM proveedor ',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_supliers")
        }else{
            res.send(result)
        }
    })
})

app.put("/update_suplier",(req,res)=>{
    const name= req.body.name;
    const phone = req.body.phone;
    const id_suplier= req.body.id_suplier;
    const municip = req.body.municip;
    db.query('UPDATE proveedor SET nombre=?,cel=?,municipio=?  WHERE id=?',[name,phone,municip,id_suplier],
    (err,result)=>{
    if(err){
        console.log("ocurrio un error en update_suplier")
    }else{
        res.send(result)
        // res.send("Local Actualizado con exito")
    }
})
})

app.delete("/delete_suplier/:id",(req,res)=>{
    const id=req.params.id;
    
    db.query('DELETE  FROM proveedor  WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en delete_suplier")
        }else{
        res.send(result)
        // res.send("Local eliminado con exito!!")
    }
    })
})

// --------------------------
// CRUD PRODUCTO
// ---------------------------------------------
app.post("/create_product",(req,res)=>{
    const name= req.body.description;
    const category = req.body.category;
    const suplier = req.body.suplier;
    const unidad = req.body.unidad;
    const cantida_paquete_o_caja = req.body.cantida_paquete_o_caja;
    const unidad_x_paquete = req.body.unidad_x_paquete;
    const precio_caja_o_paquete_con_iva = req.body.precio_caja_o_paquete_con_iva;
    const precio_total = req.body.precio_total;
    const precio_compra_unidad = req.body.precio_compra_unidad;
    const precio_venta_aproximado = req.body.precio_venta_aproximado;
    const precio_venta_x_unidad = req.body.precio_venta_x_unidad;
    const utilidad = req.body.utilidad;

    db.query('INSERT INTO producto (descripcion,categoria,id_proveedor,unidad,cantidad_paquete_o_caja,unidad_x_paquete,precio_caja_o_paquete_con_iva,precio_total,precio_compra_unidad,precio_venta_aproximado,precio_venta_x_unidad,utilidad) values(?,?,?,?,?,?,?,?,?,?,?,?)',
    [name,category,suplier,unidad,cantida_paquete_o_caja,unidad_x_paquete,precio_caja_o_paquete_con_iva,precio_total,precio_compra_unidad,precio_venta_aproximado,precio_venta_x_unidad,utilidad],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_product")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})


app.get("/see_all_products",(req,res)=>{
    db.query('SELECT p.*,pro.nombre nombre_provedor FROM producto p join proveedor pro on p.id_proveedor=pro.id',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_products")
        }else{
            res.send(result)
        }
    })
})

app.put("/update_products",(req,res)=>{
    const id_product=req.body.id;
    const name= req.body.description;
    const category = req.body.category;
    const suplier = req.body.suplier;
    const unidad = req.body.unidad;
    const cantida_paquete_o_caja = req.body.cantida_paquete_o_caja;
    const unidad_x_paquete = req.body.unidad_x_paquete;
    const precio_caja_o_paquete_con_iva = req.body.precio_caja_o_paquete_con_iva;
    const precio_total = req.body.precio_total;
    const precio_compra_unidad = req.body.precio_compra_unidad;
    const precio_venta_aproximado = req.body.precio_venta_aproximado;
    const precio_venta_x_unidad = req.body.precio_venta_x_unidad;
    const utilidad = req.body.utilidad;
    db.query('UPDATE producto SET descripcion=?, categoria=?, id_proveedor=?, unidad=?, cantidad_paquete_o_caja=?, unidad_x_paquete=?, precio_caja_o_paquete_con_iva=?, precio_total=?, precio_compra_unidad=?, precio_venta_aproximado=?, precio_venta_x_unidad=?, utilidad=? WHERE id_producto=?',
    [name,category,suplier,unidad,cantida_paquete_o_caja,unidad_x_paquete,precio_caja_o_paquete_con_iva,precio_total,precio_compra_unidad,precio_venta_aproximado,precio_venta_x_unidad,utilidad,id_product]
    ,
    (err,result)=>{
    if(err){
        console.log("ocurrio un error en update_products")
    }else{
        res.send(result)
        // res.send("Local Actualizado con exito")
    }
})
})

app.delete("/delete_product/:id",(req,res)=>{
    const id=req.params.id;
    
    db.query('DELETE  FROM producto  WHERE id_producto=?',id,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en delete_product")
        }else{
        res.send(result)
        // res.send("Local eliminado con exito!!")
    }
    })
})

// --------------------------
// CRUD ALIMENTO
// ---------------------------------------------
app.post("/create_aliment",(req,res)=>{
    const semana= req.body.semana;
    const dia= req.body.dia;
    const id_local= req.body.id_local
    const categoria= req.body.categoria;
    const nombre_alimento= req.body.nombre_alimento;
    const ingrediente= req.body.ingrediente;
    const unidad= req.body.unidad;
    const cantidad_x_plato= req.body.cantidad_x_plato;
    const total_personas= req.body.total_personas;
    const total_cantidad= req.body.total_cantidad;
    const id_proveedor= req.body.id_proveedor;
    const precio_x_unidad= req.body.precio_x_unidad;
    const precio_unitario_por_plato= req.body.precio_unitario_por_plato;
    const precio_compra_total= req.body.precio_compra_total;
   

    db.query('INSERT INTO alimento (id_local,semana,dia,categoria,nombre_alimento,ingrediente,unidad,cantidad_x_plato,total_personas,total_cantidad,id_proveedor,precio_x_unidad,precio_unitario_por_plato,precio_compra_total) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [id_local,semana,dia,categoria,nombre_alimento,ingrediente,unidad,cantidad_x_plato,total_personas,total_cantidad,id_proveedor,precio_x_unidad,precio_unitario_por_plato,precio_compra_total ],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_aliment")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})


app.get("/see_all_aliments",(req,res)=>{
    db.query('SELECT a.*,c.nombre nombre_categoria FROM alimento a join categoria_comida c on a.categoria=c.id_categoria;',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_aliments")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})

app.put("/update_aliment",(req,res)=>{
    const id_alimento=req.body.id_alimento;
    const semana= req.body.semana;
    const dia= req.body.dia;
    const categoria= req.body.categoria;
    const nombre_alimento= req.body.nombre_alimento;
    const ingrediente= req.body.ingrediente;
    const unidad= req.body.unidad;
    const cantidad_x_plato= req.body.cantidad_x_plato;
    const total_personas= req.body.total_personas;
    const total_cantidad= req.body.total_cantidad;
    const id_proveedor= req.body.id_proveedor;
    const precio_x_unidad= req.body.precio_x_unidad;
    const precio_unitario_por_plato= req.body.precio_unitario_por_plato;
    const precio_compra_total= req.body.precio_compra_total;
    
    
    db.query('UPDATE alimento SET semana=?,dia=?,categoria=?,nombre_alimento=?,ingrediente=?,unidad=?,cantidad_x_plato=?,total_personas=?,total_cantidad=?,id_proveedor=?,precio_x_unidad=?,precio_unitario_por_plato=?,precio_compra_total=? WHERE id_alimento=?',
    [semana,dia,categoria,nombre_alimento,ingrediente,unidad,cantidad_x_plato,total_personas,total_cantidad,id_proveedor,precio_x_unidad,precio_unitario_por_plato,precio_compra_total,id_alimento]
    ,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_aliment")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local Actualizado con exito")
        }
    })
})

app.delete("/delete_aliment/:id",(req,res)=>{
    const id=req.params.id;
    
    db.query('DELETE  FROM alimento  WHERE id_alimento=?',id,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en delete_aliment")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local eliminado con exito!!")
        }
    })
})
// --------------------------
// CRUD CAJA
// ---------------------------------------------
app.post("/create_cash_register",(req,res)=>{
    const id_local= req.body.id_local;
    const id_caja= req.body.id_caja; 
    const total= req.body.total; 
    db.query('INSERT INTO caja (id_caja,id_local,total) values(?,?,?)',
    [id_caja,id_local,total],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_cash_register")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})


app.get("/see_all_cash_register",(req,res)=>{
    db.query('SELECT * FROM caja ',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_cash_register")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})

app.put("/update_cash_register",(req,res)=>{
    const id_caja= req.body.id_caja;
    const id_local= req.body.id_local;
    const total= req.body.total;
    
    db.query('UPDATE caja SET id_local=?,total=?  WHERE id_caja=?',
    [id_local,total,id_caja]
    ,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_cash_register")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local Actualizado con exito")
        }
    })
})

app.delete("/delete_cash_register/:id",(req,res)=>{
    const id=req.params.id;
    
    db.query('DELETE  FROM caja  WHERE id_caja=?',id,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en delete_cash_register")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local eliminado con exito!!")
        }
    })
})
// --------------------------
// CRUD FACTURA
// ---------------------------------------------
app.post("/create_bill",(req,res)=>{
    const id_factura= req.body.id_factura;
    const date_bill= req.body.date_bill;
    const id_local= req.body.id_local;
   

    db.query('INSERT INTO factura (id_factura,fecha,id_local) values(?,?,?)',
    [id_factura,date_bill,id_local],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_bill")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})


app.get("/see_all_bills",(req,res)=>{
    db.query('SELECT * FROM factura ',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_bills")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})



app.put("/update_bill",(req,res)=>{
    const id_factura= req.body.id_factura;
    const date_bill= req.body.date_bill;
    const id_local= req.body.id_local;
    
    db.query('UPDATE factura SET fecha=?,id_local=?  WHERE id_factura=?',
    [date_bill,id_local,id_factura]
    ,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_bill")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local Actualizado con exito")
        }
    })
})

app.delete("/delete_bill/:id_factura/:id_local",(req,res)=>{
    const id_factura=req.params.id_factura;
    const id_local=req.params.id_local;
    
    db.query('DELETE  FROM factura  WHERE id_factura=? and id_local=?' ,[id_factura,id_local],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en delete_bill")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local eliminado con exito!!")
        }
    })
})

// --------------------------
// CRUD FACTURA_PRODUCTO
// ---------------------------------------------
app.post("/create_bill_product",(req,res)=>{
    const id_factura =req.body.id_factura;
    const id_producto= req.body.id_producto;
    const num_pedido=req.body.num_pedido;
    const id_local= req.body.id_local;
    const cantidad= req.body.cantidad;
    const precio_unitario= req.body.precio_unitario;
    const total= req.body.total;
    
    
    db.query('INSERT INTO factura_producto (id_factura,id_producto,id_local,num_pedido,cantidad,precio_unitario,total) values(?,?,?,?,?,?,?)',
    [id_factura,id_producto,id_local,num_pedido,cantidad,precio_unitario,total],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_bill_product")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})

app.get("/option_product_price",(req,res)=>{
    db.query('SELECT id_producto ,precio_venta_x_unidad FROM producto ',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en option_product_price")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})


app.get("/see_all_bills_products",(req,res)=>{
    db.query('SELECT * FROM factura_producto ',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_bills_products")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})

app.put("/update_bill_products",(req,res)=>{
    const id_factura =req.body.id_factura
    const id_producto= req.body.id_producto;
    const cantidad= req.body.cantidad;
    const precio_unitario= req.body.precio_unitario;
    const total= req.body.total;
    
    db.query('UPDATE factura_producto SET cantidad=?,precio_unitario=?,total=?  WHERE id_factura=? and id_producto=?',
    [cantidad,precio_unitario,total,id_factura,id_producto]
    ,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_bill_products")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local Actualizado con exito")
        }
    })
})

app.delete("/delete_bill_product/:id_producto/:id_factura/:num_pedido",(req,res)=>{
    const id_pro=req.params.id_producto;
    const id_fac=req.params.id_factura;
    const num_pedido=req.params.num_pedido
    
    db.query('DELETE  FROM factura_producto  WHERE id_factura=? and id_producto=? and num_pedido=?',[id_fac,id_pro,num_pedido],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en delete_bill_product")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local eliminado con exito!!")
        }
    })
})


// --------------------------
// CRUD cierre_caja
// ---------------------------------------------
app.post("/create_close_cash_register",(req,res)=>{
    const id_local =req.body.id_local;
    const fecha= req.body.fecha;
    const bill_100_000= req.body.bill_100_000;
    const bill_50_000= req.body.bill_50_000;
    const bill_20_000= req.body.bill_20_000;
    const bill_10_000= req.body.bill_10_000;
    const bill_5_000= req.body.bill_5_000;
    const bill_2_000= req.body.bill_2_000;
    const bill_1_000= req.body.bill_1_000;
    const mon_1_000= req.body.mon_1_000;
    const mon_500= req.body.mon_500;
    const mon_200= req.body.mon_200;
    const mon_100= req.body.mon_100;
    const mon_50= req.body.mon_50;
    const total= req.body.total;
   

    db.query('INSERT INTO cierre_caja (id_local,fecha_cierre,billetes_100_000,billetes_50_000,billetes_20_000,billetes_10_000,billetes_5_000,billetes_2_000,billetes_1_000,monedas_1_000,monedas_500,monedas_200,monedas_100,monedas_50,Total_ventas) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [id_local,fecha,bill_100_000,bill_50_000,bill_20_000,bill_10_000,bill_5_000,bill_2_000,bill_1_000,mon_1_000,mon_500,mon_200,mon_100,mon_50,total],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_close_cash_register")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})


app.get("/see_all_close_cash_register",(req,res)=>{
    db.query('SELECT * FROM cierre_caja ',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_close_cash_register")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})

app.put("/update_close_cash_register",(req,res)=>{
    const id_cierre_caja =req.body.id_cierre_caja;
    const id_caja =req.body.id_factura;
    const fecha= req.body.fecha;
    const bill_100_000= req.body.bill_100_000;
    const bill_50_000= req.body.bill_50_000;
    const bill_20_000= req.body.bill_20_000;
    const bill_10_000= req.body.bill_10_000;
    const bill_5_000= req.body.bill_5_000;
    const bill_2_000= req.body.bill_2_000;
    const bill_1_000= req.body.bill_1_000;
    const mon_1_000= req.body.mon_1_000;
    const mon_500= req.body.mon_500;
    const mon_200= req.body.mon_200;
    const mon_100= req.body.mon_100;
    const mon_50= req.body.mon_50;
    const total= req.body.total;
    
    db.query('UPDATE cierre_caja SET id_caja=?,fecha_cierre=?,billetes_100_000=?,billetes_50_000=?,billetes_20_000=?,billetes_10_000=?,billetes_5_000=?,billetes_2_000=?,billetes_1_000=?,monedas_1_000=?,monedas_500=?,monedas_200=?,monedas_100=?,monedas_50=?,Total_ventas=?  WHERE id_cierre_caja=? ',
    [id_caja,fecha,bill_100_000,bill_50_000,bill_20_000,bill_10_000,bill_5_000,bill_2_000,bill_1_000,mon_1_000,mon_500,mon_200,mon_100,mon_50,total,id_cierre_caja]
    ,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_close_cash_register")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local Actualizado con exito")
        }
    })
})

app.delete("/delete_close_cash_register/:id_cierre_caja",(req,res)=>{
    const id_cierre_caja=req.params.id_cierre_caja;
    
    db.query('DELETE  FROM cierre_caja  WHERE id_cierre_caja=? ',id_cierre_caja,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en delete_close_cash_register")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local eliminado con exito!!")
        }
    })
})


// --------------------------
// CRUD PRODUCTO_BODEGA
// ---------------------------------------------
app.post("/create_product_bodega",(req,res)=>{
    const id_producto =req.body.id_producto;
    const id_local =req.body.id_local;
    const cantidad_minima =req.body.cantidad_minima;
    
    db.query('INSERT INTO producto_bodega (id_producto, id_local, cantidad_en_bodega, cantidad_minima, cantidad_pedida,cantidad_total_pedida)         VALUES (?, ?, 0, ?, 0,0);',
    [id_producto,id_local,cantidad_minima],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_product_bodega")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})


app.get("/see_all_products_inventory/:id_local",(req,res)=>{
    const id_local =req.params.id_local;
    db.query('SELECT pb.*,l.nombre nombre_local,p.descripcion nombre_producto FROM producto_bodega pb join local l on pb.id_local=l.id join producto p on pb.id_producto=p.id_producto where l.id=?;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_products_inventory")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})

app.get("/options_product",(req,res)=>{
    db.query('SELECT id_producto,descripcion FROM producto ',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en options_product")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})

app.put("/update_products_inventory",(req,res)=>{
    const id_producto =req.body.id_producto;
    const id_local =req.body.id_local;
    const cantidad_minima =req.body.cantidad_minima;
    db.query('UPDATE producto_bodega SET  id_producto=?, cantidad_minima=?   WHERE id_producto=? and id_local=?',
    [id_producto,cantidad_minima,id_producto,id_local]
    ,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_products_inventory")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local Actualizado con exito")
        }
    })
})

app.delete("/delete_product_inventory/:id_product/:id_local",(req,res)=>{
    const id_product=req.params.id_product;
    const id_local=req.params.id_local;
    
    db.query('DELETE  FROM producto_bodega  WHERE id_producto=? and id_local=? ',[id_product,id_local],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en delete_product_inventory")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local eliminado con exito!!")
        }
    })
})

// --------------------------
// CRUD PEDIDOS PRODUCTO
// ---------------------------------------------
app.post("/create_pedido_product",(req,res)=>{
    const id_producto =req.body.id_producto;
    const id_local =req.body.id_local;
    const num_pedido =req.body.num_pedido;
    const fecha_pedido=req.body.fecha_pedido
    const cantidad_pedida =req.body.cantidad_pedida;
    const cantidad_pedida_unidad=req.body.cantidad_pedida_unidad;
    
    db.query('INSERT INTO pedidos_products (id_producto, id_local, num_pedido, cantidad_pedida,cantidad_pedida_unidad, cantidad_consumida,cantidad_consumida_unidad, cantidad_EXTRAVIADA_UNIDAD,cantidad_recibida,cantidad_recibida_unidad,fecha_pedido, fecha_vencimiento, fecha_ingreso) VALUES (?, ?,?,?,?,0,0, 0,0, 0, ?,null,null)',
    [id_producto,id_local,num_pedido,cantidad_pedida,cantidad_pedida_unidad,fecha_pedido],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_pedido_product")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})


app.get("/see_history_pedidos/:id_local",(req,res)=>{
    const id_local=req.params.id_local
    db.query('SELECT pp.*,l.nombre nombre_local,p.descripcion nombre_producto FROM pedidos_products pp join producto p on p.id_producto =pp.id_producto join local l on l.id=pp.id_local WHERE id_local=?;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_history_pedidos")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})

app.put("/update_pedidos_product",(req,res)=>{
    const id_producto =req.body.id_producto;
    const id_local =req.body.id_local;
    const num_pedido =req.body.num_pedido;
    const cantidad_pedida =req.body.cantidad_pedida;
    const cantidad_pedida_unidad=req.body.cantidad_pedida_unidad;
    db.query('UPDATE pedidos_products SET cantidad_pedida=?, cantidad_pedida_unidad=?  WHERE id_producto=? AND id_local=? AND num_pedido=?',
    [cantidad_pedida,cantidad_pedida_unidad,id_producto,id_local,num_pedido]
    ,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_pedidos_product")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local Actualizado con exito")
        }
    })
})

app.delete("/delete_pedidos_products/:id_producto/:id_local/:num_pedido",(req,res)=>{
    const id_producto=req.params.id_producto;
    const id_local=req.params.id_local;
    const num_pedido=req.params.num_pedido
    
    db.query('DELETE  FROM pedidos_products  WHERE id_producto=? and id_local=? AND num_pedido=?',
    [id_producto,id_local,num_pedido],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en delete_pedidos_products")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local eliminado con exito!!")
        }
    })
})

// --------------------------
// CRUD ALIMENTO_BODEGA
// ---------------------------------------------
app.post("/create_aliment_inventory",(req,res)=>{
    const id_alimento =req.body.id_alimento;
    const id_local =req.body.id_local;
    const cantidad_minima =req.body.cantidad_minima;
    
    db.query('INSERT INTO alimento_bodega (id_alimento,id_local,cantidad_bodega,cantidad_minima,cantidad_pedida,cantidad_total_pedida) VALUES (?, ?, 0, ?, 0,0)',
    [id_alimento,id_local,cantidad_minima],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en create_aliment_inventory")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local registrado con exito")
        }
    })
})


app.get("/see_all_aliments_inventory",(req,res)=>{
    db.query('SELECT * FROM alimento_bodega ',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_aliments_inventory")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})

app.get("/option_aliments",(req,res)=>{
    db.query('SELECT id_alimento,nombre_alimento FROM alimento ',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en option_aliments")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})

app.put("/update_aliment_inventory",(req,res)=>{
    const id_alimento =req.body.id_alimento;
    const id_local =req.body.id_local;
    const cantidad_minima =req.body.cantidad_minima;
    
    db.query('UPDATE alimento_bodega SET id_alimento=?, cantidad_minima=?  WHERE id_alimento=? and id_local=?',
    [id_alimento,cantidad_minima,id_alimento,id_local]
    ,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_aliment_inventory")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local Actualizado con exito")
        }
    })
})

app.delete("/delete_aliment_inventory/:id_alimento/:id_local",(req,res)=>{
    const id_alimento=req.params.id_alimento;
    const id_local=req.params.id_local;
    
    db.query('DELETE  FROM alimento_bodega  WHERE id_alimento=? and id_local=? ',[id_alimento,id_local],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en delete_aliment_inventory")
            console.log(err.message)
        }else{
            res.send(result)
            // res.send("Local eliminado con exito!!")
        }
    })
})

// --------------------------
// CHOSE LOCAL
// --------------------------

app.get("/see_name_locals",(req,res)=>{
    db.query('SELECT id,nombre FROM local',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error see_name_locals")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// SEE_RATING
// --------------------------

app.get("/see_rating",(req,res)=>{
    db.query('SELECT fp.id_local,l.nombre,SUM(fp.total) as "total_ventas" FROM factura_producto fp LEFT JOIN local l on l.id= fp.id_local GROUP BY fp.id_local ORDER BY 3 DESC;',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_rating")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// LOGIN page web !!! terminar
// --------------------------

app.post("/login",(req,res)=>{
    const username=req.body.user_name
    const password=req.body.password
    
    db.query('select * from users u where u.nombre_usuario=? and password =?',[username,password],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en login")
            console.log(err.message)
        }else{
            if (result.length >0){
                res.status(200).send(result[0]);
            }
            else{
                res.status(400).send('ocurrio un error usuario no existe');
            }
        }
    })
    

})


// --------------------------
// LOGIN DESCKTOP
// --------------------------


app.get("/see_login_data",(req,res)=>{
    db.query('SELECT id,nombre,pasword,tipo  FROM local',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_login_data")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// HISTORY_SALES
// --------------------------


app.get("/history_sales_for_name_product/:id_local", (req, res) => {
    const id_local = req.params.id_local;  // Cambiado de req.body a req.query
    db.query(
      'SELECT p.descripcion, fp.cantidad AS cantidad_total, fp.total, f.fecha FROM factura AS f JOIN factura_producto AS fp ON fp.id_factura = f.id_factura JOIN producto AS p ON fp.id_producto = p.id_producto WHERE f.id_local = ? and fp.id_local=? ORDER BY f.fecha;' ,
      [id_local,id_local],
      (err, result) => {
        if (err) {
          console.log("Ocurrió un error en history_sales_for_name_product");
          console.log(err.message);
          res.status(500).send("Error interno del servidor");
        } else {
          res.send(result);
        }
      }
    );
  });
  

// --------------------------
// SEE_SALES
// --------------------------


app.get("/see_sales_for_product",(req,res)=>{
    id_local=req.body.id_local
    db.query('SELECT p.descripcion, SUM(fp.cantidad) AS cantidad_total, SUM(fp.total) AS total_venta , f.fecha  FROM `factura_producto` AS fp   LEFT JOIN producto AS p ON fp.id_producto = p.id_producto  LEFT JOIN factura AS f ON fp.id_factura = f.id_factura  WHERE f.id_local = ?  GROUP BY p.descripcion; ',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_sales_for_product")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})


// --------------------------
// SEE_INVENTORY
// --------------------------


app.get("/see_inventory_exist/:id_local",(req,res)=>{
    id_local=req.params.id_local
    db.query('  SELECT p.descripcion,p.unidad,(pp.cantidad_pedida-pp.cantidad_recibida) as cantidad,pp.fecha_ingreso,pp.fecha_vencimiento,prov.nombre FROM `pedidos_products` pp LEFT JOIN producto p ON pp.id_producto=p.id_producto LEFT JOIN proveedor prov ON prov.id=p.id_proveedor WHERE pp.id_local=? AND (pp.cantidad_pedida-pp.cantidad_recibida)>0;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_inventory_exist")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// SEE_INVENTORY_INCOMPLET
// --------------------------


app.get("/see_inventory_incomplet/:id_local",(req,res)=>{
    id_local=req.params.id_local
    db.query('  SELECT p.descripcion as nombre_producto,p.unidad,(pp.cantidad_pedida-pp.cantidad_recibida) as cantidad,prov.nombre as nombre_proveedor, c.nombre as nombre_categoria FROM `pedidos_products` pp LEFT JOIN producto p ON pp.id_producto=p.id_producto LEFT JOIN proveedor prov ON prov.id=p.id_proveedor LEFT JOIN categoria_comida c ON p.categoria=c.id_categoria WHERE pp.id_local=? AND (pp.cantidad_pedida-pp.cantidad_recibida)>0;;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_inventory_incomplet")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// DATA_GRAFIC_VENTAS_X_CATEGORIA
// --------------------------

app.get("/data_grafic_sells_x_category/:id_local/:anio",(req,res)=>{
    anio=req.params.anio
    id_local=req.params.id_local
    db.query('   SELECT cat.nombre, SUM(fp.total) as total,YEAR(f.fecha) AS anio FROM factura_producto as fp JOIN producto as p ON fp.id_producto = p.id_producto JOIN categoria_comida as cat ON p.categoria = cat.id_categoria JOIN factura as f ON fp.id_factura = f.id_factura WHERE fp.id_local=? and f.id_local=? AND YEAR(f.fecha)=? GROUP BY cat.nombre;',[id_local,id_local,anio],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en data_grafic_sells_x_category")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// DATA_GRAFIC_PRODUCTS VS TOTAL SELLS
// --------------------------


app.get("/data_grafic_product_vs_total_sells/:id_local",(req,res)=>{
    id_local=req.params.id_local
    db.query(' SELECT p.descripcion, SUM(fp.total) as total FROM factura_producto as fp LEFT JOIN producto as p ON fp.id_producto = p.id_producto LEFT JOIN factura as f ON fp.id_factura = f.id_factura WHERE f.id_local=? and fp.id_local=? GROUP BY p.descripcion LIMIT 10;',[id_local,id_local],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en data_grafic_product_vs_total_sells")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})
// --------------------------
// INICIO GRAFICA DE GANACIAS VS GASTOS
// --------------------------
// DATA_GRAFIC_TOTAL_SALES
// --------------------------

app.get("/data_grafic_total_sales/:id_local/:anio",(req,res)=>{
    id_local=req.params.id_local
    anio=req.params.anio
    db.query('   SELECT year(f.fecha)as anio , MONTH(f.fecha) AS mes, SUM(fp.total) as total_ganancias FROM factura_producto AS fp JOIN factura AS f ON fp.id_factura =f.id_factura WHERE f.id_locaL=? and fp.id_local=? and year(f.fecha)=? GROUP BY mes;',[id_local,id_local,anio],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en data_grafic_total_sales")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})
// --------------------------
// DATA TOTAL EXPENSIVE GRAFIC GANANCIAS VS PERDIDAS 
// --------------------------
app.get("/data_grafic_total_expensive/:id_local/:anio",(req,res)=>{
    id_local=req.params.id_local;
    anio=req.params.anio;
    db.query('SELECT YEAR(pp.fecha_pedido) AS anio,MONTH(pp.fecha_pedido)AS mes,SUM(pp.cantidad_pedida*p.precio_total) AS total_costo FROM `pedidos_products` pp LEFT JOIN producto p ON p.id_producto=pp.id_producto WHERE pp.id_local=? AND YEAR(pp.fecha_pedido)=? GROUP BY mes;',[id_local,anio],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en data_grafic_total_expensive")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})
// FIN GRAFICA GANACIAS VS PERDIDAS
// --------------------------
// --------------------------
// DATA_GRAFIC_HISTORY_CLOSE_CASH_REGISTE
// --------------------------

app.get("/data_grafic_history_close_cash_register/:id_local/:year",(req,res)=>{
    id_local=req.params.id_local
    year=req.params.year

    db.query('  SELECT YEAR(cc.fecha_cierre) as anio, MONTH(cc.fecha_cierre) AS mes, SUM(cc.Total_ventas) as total_producido FROM cierre_caja AS cc WHERE cc.id_local=? and YEAR(cc.fecha_cierre)=? GROUP BY mes;',[id_local,year],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en data_grafic_history_close_cash_register")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// TOP 10
// --------------------------

app.get("/top_10/:id_local",(req,res)=>{
    id_local=req.params.id_local
    db.query('        SELECT p.descripcion AS nombre, sum(fp.cantidad) AS cantidad_total, sum(fp.total) AS venta_totals    FROM factura_producto AS fp   JOIN producto AS p ON fp.id_producto=p.id_producto   WHERE fp.id_local=?  GROUP BY nombre ORDER BY cantidad_total DESC LIMIT 10;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en top_10")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// BEST PRODUCT 
// --------------------------

app.get("/best_product/:id_local",(req,res)=>{
    id_local=req.params.id_local
    db.query('        SELECT p.descripcion AS nombre, sum(fp.cantidad) AS cantidad_total, sum(fp.total) AS venta_totals FROM factura_producto AS fp JOIN producto AS p ON fp.id_producto=p.id_producto WHERE fp.id_local=? GROUP BY nombre ORDER BY cantidad_total DESC LIMIT 1;       ',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en best_product")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// see_all_sales 
// --------------------------

app.get("/see_all_sales",(req,res)=>{
    id_local=req.body.id_local
    db.query('    SELECT p.descripcion, fp.cantidad AS cantidad_total, fp.total AS total_venta , f.fecha     FROM `factura_producto` AS fp   LEFT JOIN producto AS p ON fp.id_producto = p.id_producto    LEFT JOIN factura AS f ON fp.id_factura = f.id_factura    WHERE f.id_local = ? ;    ',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_all_sales")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// BEST_SUPLIER 
// --------------------------

app.get("/best_suplier/:id_categoria/:municipio/:municipio_comp",(req,res)=>{
    id_categoria=req.params.id_categoria
    municipio=req.params.municipio
    municipio_comp=req.params.municipio_comp
    db.query('    SELECT prov.nombre AS nombre_proveedor , prod.descripcion AS nombre_producto , prod.precio_compra_unidad AS precio_compra , prov.municipio FROM producto AS prod LEFT JOIN proveedor AS prov ON prod.id_proveedor=prov.id WHERE prod.categoria=? and prov.municipio  in  (?,?) and  prod.precio_compra_unidad>0 ORDER BY precio_compra ASC;',[id_categoria,municipio,municipio_comp],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en best_suplier")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})


// --------------------------
// UPDATE STOCK MINIMO PRODUCTO BODEGA
// --------------------------

app.put("/update_stock_minimo_producto",(req,res)=>{
    id_local=req.body.id_local;
    id_producto=req.body.id_producto;
    num_pedido=req.body.num_pedido
    cantidad_minima=req.body.cantidad_minima;
    db.query('  UPDATE producto_bodega AS pb SET pb.cantidad_minima=? WHERE pb.id_local=? and pb.id_producto=? and pb.num_pedido=? ',
    [cantidad_minima,id_local,id_producto,num_pedido],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_stock_minimo_producto")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// UPDATE PEDIDO PRODUCTO BODDEGA
// --------------------------

app.put("/update_cant_pedido_product",(req,res)=>{
    id_local=req.body.id_local;
    id_producto=req.body.id_producto;
    num_pedido=req.body.num_pedido;
    cantidad_pedida=req.body.cantidad_pedida;
    db.query('  UPDATE producto_bodega AS pb SET pb.cantidad_pedida=? WHERE pb.id_local=? and pb.id_producto=? and pb.num_pedido=? ',
    [cantidad_pedida,id_local,id_producto,num_pedido],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_cant_pedido_product")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// UPDATE CANTIDAS _PRODUCTO BODEGA
// --------------------------

app.put("/update_cantida_exist_producto_in_bodega",(req,res)=>{
    id_local=req.body.id_local;
    id_producto=req.body.id_producto;
    cantidad_existente=req.body.cantidad_existente;
    db.query('  UPDATE producto_bodega AS pb SET pb.cantidad_en_bodega=? WHERE pb.id_local=? and pb.id_producto=? ',
    [cantidad_existente,id_local,id_producto],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_cantida_exist_producto_in_bodega")
            console.log(err.message)
        }else{
            res.send(result)
        }
    })
})


// --------------------------
// UPDATE PRODUCTO IN BODEGA 
// MODIFICAR ESTO
// --------------------------

app.put("/update_producto_in_bodega_desktop",(req,res)=>{
    id_local=req.body.id_local;
    id_producto=req.body.id_producto;
    num_pedido=req.body.num_pedido;
    cantidad_recivida=req.body.cantidad_recibida;
    cantidad_recibida_unidad=req.body.cantidad_recibida_unidad;

    fecha_ingreso=req.body.fecha_ingreso;
    fecha_vencimiento=req.body.fecha_vencimiento;
    db.query('  UPDATE pedidos_products pb SET pb.cantidad_recibida=?, pb.cantidad_recibida_unidad=?, pb.fecha_ingreso=?, pb.fecha_vencimiento=? WHERE pb.id_local=? and pb.id_producto=? and pb.num_pedido=?;',
    [cantidad_recivida,cantidad_recibida_unidad,fecha_ingreso,fecha_vencimiento,id_local,id_producto,num_pedido],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en update_producto_in_bodega_desktop")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// SEE PRODUCT CLOSE EXPIRATION
// --------------------------

app.get("/see_product_close_expiration/:id_local",(req,res)=>{
    id_local=req.params.id_local
    db.query(' SELECT pro.descripcion,ped_pro.fecha_vencimiento FROM `pedidos_products` ped_pro LEFT JOIN producto pro ON pro.id_producto =ped_pro.id_producto WHERE ped_pro.id_local=? and ( ped_pro.cantidad_recibida- ped_pro.cantidad_consumida) > 0;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_product_close_expiration")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// SEE DATA BILL PRODUCTS
// --------------------------

app.get("/see_data_bill/:id_factura/:id_local",(req,res)=>{
    id_factura=req.params.id_factura;
    id_local=req.params.id_local;
    db.query('SELECT p.descripcion nombre_producto,fp.cantidad,p.precio_venta_x_unidad precio_unidad,(fp.cantidad*p.precio_venta_x_unidad) total FROM factura_producto fp JOIN producto p ON p.id_producto = fp.id_producto WHERE fp.id_factura=? and fp.id_local=?;',[id_factura,id_local],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_data_bill")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// SEE total BILL PRODUCTS
// --------------------------

app.get("/see_total_price_bill_products/:id_factura/:id_local",(req,res)=>{
    id_factura=req.params.id_factura;
    id_local=req.params.id_local;
    db.query('SELECT SUM(p.precio_venta_x_unidad*fp.cantidad) total FROM factura_producto fp JOIN producto p ON p.id_producto = fp.id_producto WHERE fp.id_factura=? and fp.id_local=? GROUP BY fp.id_factura;',[id_factura,id_local],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_total_price_bill_products")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// SEE NAME,CANTIDAD,PRECIO_VENTA BILL
// --------------------------

app.get("/see_data_bill_table/:id_factura",(req,res)=>{
    id_factura=req.params.id_factura;
    db.query(' SELECT p.descripcion nombre_producto,fp.cantidad,P.precio_venta_x_unidad FROM factura f LEFT JOIN factura_producto fp ON f.id_factura=fp.id_factura LEFT JOIN producto p ON p.id_producto = fp.id_producto WHERE f.id_factura=?;',id_factura,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_data_bill_table")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// SEE NAME,CANTIDAD,PRECIO_VENTA,TOTAL BILL
// --------------------------


app.get("/see_data_bill_table_desktop/:id_factura/:id_local",(req,res)=>{
    id_factura=req.params.id_factura;
    id_local=req.params.id_local;
    db.query('SELECT p.descripcion nombre_producto,fp.cantidad,P.precio_venta_x_unidad,(P.precio_venta_x_unidad*fp.cantidad) total FROM factura_producto fp JOIN producto p ON p.id_producto = fp.id_producto WHERE fP.id_factura=? and fp.id_local=?;',[id_factura,id_local],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_data_bill_table_desktop")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})


// --------------------------
// SEE NAME PRODUCTS BODEGA
// --------------------------

app.get("/see_name_product_bodega/:id_local",(req,res)=>{
    id_local=req.params.id_local;
    db.query(' SELECT p.descripcion nombre_producto FROM producto_bodega pb LEFT JOIN producto p ON p.id_producto = pb.id_producto WHERE pb.id_local=?;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_name_product_bodega")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// SEE PEDIDOS VALIDOS en INVENTARIO
// --------------------------

app.get("/see_pedidos_for_inventory/:id_local",(req,res)=>{
    id_local=req.params.id_local;
    db.query(' SELECT p.descripcion nombre_producto ,(pp.cantidad_recibida-pp.cantidad_consumida) cant_maxima,p.unidad,pro.nombre  FROM pedidos_products pp LEFT JOIN producto p ON p.id_producto = pp.id_producto LEFT JOIN proveedor pro ON p.id_proveedor=pro.id WHERE pp.id_local=? and (pp.cantidad_pedida-pp.cantidad_recibida)>0;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_pedidos_for_inventory")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})


// --------------------------
// ver pedidos
// --------------------------

app.get("/see_inventory_desktop/:id_local",(req,res)=>{
    id_local=req.params.id_local;
    db.query('SELECT pp.id_producto,pp.id_local,pp.num_pedido,p.descripcion nombre_producto ,(pp.cantidad_pedida-pp.cantidad_recibida) cant_maxima,pro.nombre nombre_proveedor,p.unidad,pp.cantidad_recibida FROM pedidos_products pp LEFT JOIN producto p ON p.id_producto = pp.id_producto LEFT JOIN proveedor pro ON p.id_proveedor=pro.id WHERE pp.id_local=? and (pp.cantidad_pedida-pp.cantidad_recibida)>0;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_inventory_desktop")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})
// --------------------------
// ver productos desktop
// --------------------------

app.get("/see_products_exists_desktop/:id_local",(req,res)=>{
    id_local=req.params.id_local;
    db.query(' SELECT p.descripcion nombre_producto ,(pp.cantidad_recibida-pp.cantidad_consumida) cant_maxima,pp.fecha_ingreso fecha_ingreso FROM pedidos_products pp LEFT JOIN producto p ON p.id_producto = pp.id_producto LEFT JOIN proveedor pro ON p.id_proveedor=pro.id WHERE pp.id_local=? and (pp.cantidad_recibida-pp.cantidad_consumida)>0;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_products_exists_desktop")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})


// --------------------------
// ver productos disponibles
// --------------------------

app.get("/see_products_exists/:id_local",(req,res)=>{
    id_local=req.params.id_local;
    db.query(' SELECT pp.id_producto,pp.id_local,pp.num_pedido,pp.cantidad_consumida_unidad,p.descripcion nombre_producto ,(pp.cantidad_recibida_unidad-pp.cantidad_consumida_unidad) cant_maxima, pp.fecha_vencimiento, p.precio_venta_x_unidad FROM pedidos_products pp JOIN producto p ON p.id_producto = pp.id_producto JOIN proveedor pro ON p.id_proveedor=pro.id WHERE pp.id_local=? and (pp.cantidad_recibida_unidad-pp.cantidad_consumida_unidad)>0;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_products_exists")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// ver anomalias en inventario
// --------------------------

app.get("/see_anomaly_inventory/:id_local",(req,res)=>{
    id_local=req.params.id_local;
    db.query(' SELECT pp.id_producto,pp.id_local,l.nombre nombre_local,pp.num_pedido,p.descripcion nombre_producto , pp.fecha_vencimiento, pp.cantidad_EXTRAVIADA cantidad, (pp.cantidad_EXTRAVIADA*p.precio_venta_x_unidad) total FROM pedidos_products pp LEFT JOIN producto p ON p.id_producto = pp.id_producto join local l on l.id=pp.id_local WHERE pp.id_local=? and pp.cantidad_EXTRAVIADA>0;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_anomaly_inventory")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})


// --------------------------
// ver facturas a eliminar
// --------------------------

app.get("/see_bill_to_eliminate/:id_factura/:id_local",(req,res)=>{
    id_factura=req.params.id_factura;
    id_local=req.params.id_local;
    db.query(' select f.id_factura,f.id_local,fp.id_producto,fp.num_pedido,p.descripcion nombre_producto,l.nombre nombre_local,fp.cantidad from factura f join factura_producto fp on f.id_factura=fp.id_factura join producto p on fp.id_producto=p.id_producto join local l on l.id=f.id_local where f.id_factura=? and f.id_local=?;',[id_factura,id_local],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_bill_to_eliminate")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// validador de cantidad de invetario anomalo
// --------------------------

app.get("/validation_invetory_anomaly/:id_local",(req,res)=>{
    id_local=req.params.id_local;
    db.query(' SELECT pp.id_producto, fp.num_pedido, p.descripcion nombre_producto, pp.fecha_vencimiento, fp.cantidad cantidad_maxima, f.id_local FROM pedidos_products pp JOIN producto p ON p.id_producto = pp.id_producto JOIN factura_producto fp ON pp.id_producto = fp.id_producto AND pp.num_pedido = fp.num_pedido JOIN factura f ON f.id_factura = fp.id_factura where f.id_local=?;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en validation_invetory_anomaly")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})
// --------------------------
// actualiza cantidad de invetario anomalo
// --------------------------

app.put("/update_cant_inventary_anomaly",(req,res)=>{
    const id_producto=req.body.id_producto;
    const id_local= req.body.id_local;
    const num_pedido = req.body.num_pedido;
    const cantidad_extraviada = req.body.cantidad_extraviada;
    const cantidad_extraviada_unidad= req.body.cantidad_extraviada_unidad;

    db.query('UPDATE pedidos_products pp SET pp.cantidad_EXTRAVIADA=?,pp.cantidad_EXTRAVIADA_UNIDAD=? WHERE pp.id_producto=? and pp.id_local=? and pp.num_pedido=?;',[cantidad_extraviada,cantidad_extraviada_unidad,id_producto,id_local,num_pedido],
    (err,result)=>{
    if(err){
        console.log("ocurrio un error en update_cant_inventary_anomaly")
    }else{
        res.send(result)
        // res.send("Local Actualizado con exito")
    }
})
})
// --------------------------
// actualiza cantidad de consumda desktop
// --------------------------
app.put("/update_cant_consumed",(req,res)=>{
    const id_producto=req.body.id_producto;
    const id_local= req.body.id_local;
    const num_pedido = req.body.num_pedido;
    const cantidad_consumida = req.body.cantidad_consumida;
    const cantidad_consumida_unidad = req.body.cantidad_consumida_unidad;

    db.query('UPDATE pedidos_products pp SET pp.cantidad_consumida = pp.cantidad_consumida + ?, pp.cantidad_consumida_unidad = pp.cantidad_consumida_unidad + ? WHERE pp.id_producto = ? AND pp.id_local = ? AND pp.num_pedido = ?;',[cantidad_consumida,cantidad_consumida_unidad,id_producto,id_local,num_pedido],
    (err,result)=>{
    if(err){
        console.log("ocurrio un error en update_cant_inventary_anomaly")
    }else{
        res.send(result)
        // res.send("Local Actualizado con exito")
    }
})
})

// --------------------------
// total dia por local
// --------------------------
app.get("/see_tota_sell_day_local/:id_local",(req,res)=>{
    id_local=req.params.id_local;
    db.query(' SELECT sum(total) total_venta_dia FROM `factura_producto` fp join factura f on f.id_factura=fp.id_factura WHERE f.id_local=? and f.fecha=CURRENT_DATE();',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en see_tota_sell_day_local")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// ultima factura
// --------------------------
app.get("/last_bill/:id_local",(req,res)=>{
    id_local=req.params.id_local;
    db.query(' SELECT id_factura ultima_factura FROM `factura` f WHERE id_local=? ORDER by id_factura desc limit 1;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en last_bill")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// ver cantidad vendidad por factura
// --------------------------
app.get("/cant_sell_in_bill/:id_factura",(req,res)=>{
    id_factura=req.params.id_factura;
    db.query(' SELECT id_producto,id_local,num_pedido,cantidad cantidad_consumida from factura_producto where id_factura=?;',id_factura,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en cant_sell_in_bill")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})
// --------------------------
// actualizacion inversa de actualiza cantidad de consumda desktop
// --------------------------
app.put("/update_cant_consumed_reverse",(req,res)=>{
    const id_producto=req.body.id_producto;
    const id_local= req.body.id_local;
    const num_pedido = req.body.num_pedido;
    const cantidad_consumida = req.body.cantidad_consumida;
    const cantidad_consumida_unidad = req.body.cantidad_consumida_unidad;

    db.query('UPDATE pedidos_products pp SET pp.cantidad_consumida=pp.cantidad_consumida-? , pp.cantidad_consumida_unidad=cantidad_consumida_unidad-? WHERE pp.id_producto=? and pp.id_local=? and pp.num_pedido=?;',[cantidad_consumida,cantidad_consumida_unidad,id_producto,id_local,num_pedido],
    (err,result)=>{
    if(err){
        console.log("ocurrio un error en update_cant_consumed_reverse")
    }else{
        res.send(result)
        // res.send("Local Actualizado con exito")
    }
})
})
// --------------------------
// ver cantidad consumida y estraviada inventario
// --------------------------
app.get("/cant_consum_and_lose_inventory/:id_local/:id_producto/:num_pedido",(req,res)=>{
    id_local=req.params.id_local;
    id_producto=req.params.id_producto;
    num_pedido=req.params.num_pedido;
    db.query(' SELECT cantidad_consumida,cantidad_EXTRAVIADA FROM `pedidos_products` WHERE id_local=? and id_producto=? and num_pedido=?;',[id_local,id_producto,num_pedido],
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en cant_consum_and_lose_inventory")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// ultima factura
// --------------------------
app.get("/last_pedido/:id_local",(req,res)=>{
    id_local=req.params.id_local;
    db.query(' SELECT num_pedido numero_ultimo_pedido FROM `pedidos_products` where id_local=? ORDER by num_pedido DESC LIMIT 1;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en last_pedido")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// ultima factura
// --------------------------
app.get("/last_local",(req,res)=>{
    db.query(' SELECT id id_local FROM `local` ORDER by id DESC limit 1;',
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en last_local")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// obtener_caja
// --------------------------
app.get("/obtain_box/:id_local",(req,res)=>{
    id_local=req.params.id_local;
    db.query(' select id_caja from caja where id_local=?;',id_local,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en obtain_box")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------
// obtener_cantidad_x_unidad
// --------------------------
app.get("/obtain_uni_x_paq/:id_producto",(req,res)=>{
    id_producto=req.params.id_producto;
    db.query(' select p.unidad_x_paquete from producto p WHERE id_producto=?;',id_producto,
    (err,result)=>{
        if(err){
            console.log("ocurrio un error en obtain_uni_x_paq")
            console.log(err.message)
        }else{
        res.send(result)
    }
    })
})

// --------------------------------------------------------------------
// VERIFICADOR DE PUERTO
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// ------------------------------------------------------------------