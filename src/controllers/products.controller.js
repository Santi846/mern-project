import productsModel from "../models/products.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await productsModel.find({user:req.user.id});
        if(products){
            console.log("Obtención de productos exitosa");
            res.json({message:"Productos existentes", products});
        }
        else{
            console.log("No se pudieron obtener productos");
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(400).send("Error al solicitar los productos existentes");
    }
};

export const getUniqueProduct = async (req, res) => {

   try {
    const product = await productsModel.findById(req.params.id);
    console.log("data", product);
    if(product){
        console.log("Obtención de producto exitosa");
        res.json({message:"Producto coincidente", product});
    }
    else{
        console.log("No se pudo obtener el producto solicitado");
    }
   } catch (error) {
    console.log("Error: ", error);
    res.status(400).send("Error al encontrar el producto solicitado");
   }
};



export const createProduct = async (req, res) => {

    const {title, description, stock, prize, weight, amount} = req.body;

   try {
    const newProduct = new productsModel({
        title,
        description,
        stock,
        prize,
        weight,
        amount,
        user: req.user.id
    });

    const productSaved = await newProduct.save();

    if(productSaved){
        res.json({message:"Producto creado con éxito", productSaved});
    }
   } catch (error) {
    console.log("Error: ", error);
    res.status(400).send("Error en la creación de un producto");
   }
};

export const updateProduct = async (req, res) => {
    try {
        //identifier, data
        const product = await productsModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(product){
            console.log("Actualización de producto exitosa");
            res.json({message:"Producto actualizado", product});
        }
        else{
            console.log("No se pudo actualizar el producto solicitado");
        }
       } catch (error) {
        console.log("Error: ", error);
        res.status(400).send("Error al encontrar el producto a actualizar");
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await productsModel.findByIdAndDelete(req.params.id);
        if(product){
            console.log("Eliminación de producto exitosa");
            return res.sendStatus(204);
        }
        else{
            console.log("No se pudo eliminar el producto solicitado");
        }
       } catch (error) {
        console.log("Error: ", error);
        res.status(400).send("Error al encontrar el producto a eliminar");
    }
};