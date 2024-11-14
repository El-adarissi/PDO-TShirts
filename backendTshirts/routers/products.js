const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const multer = require('multer');
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })

const uploadOptions = multer({ storage: storage })




// gets all users 
router.get('/users',async (req, res) => {
    try {
        const userList = await User.findAll();
        res.json(userList);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Get user by id
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id); 

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// gets all Products 
router.get('/products',async (req, res) => {
    try {
        const productList = await Product.findAll();
        res.json(productList);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Get Product by id
router.get('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id); 

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Add Product
router.post('/products', uploadOptions.array('images',10), async (req, res) => { 
    const files = req.files;
    console.log("-----------------------------------",typeof files)
    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No images in the request' });
    }

    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    const imageUrls = files.map(file => `${basePath}${file.filename}`);

    let colorOptions, sizeOptions;
    try {
        colorOptions = JSON.parse(req.body.colorOptions);
        sizeOptions = JSON.parse(req.body.sizeOptions);
    } catch (parseError) {
        return res.status(400).json({ message: 'Invalid JSON format for colorOptions or sizeOptions' });
    }

    try {
        const newProduct = await Product.create({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: imageUrls[0], 
            images: imageUrls, 
            oldprice: parseFloat(req.body.oldprice) || 0,
            price: parseFloat(req.body.price) || 0,
            rating: parseFloat(req.body.rating) || 0,
            isFeatured: req.body.isFeatured === 'true',
            Category: req.body.Category,
            colorOptions: colorOptions || {},
            sizeOptions: sizeOptions || {},
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Delete Product by ID
router.delete('/products/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Product.destroy({
            where: { id },
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Update Product by ID
router.put('/products/update/:id', uploadOptions.single('image'), async (req, res) => {
    const { id } = req.params;
    const file = req.file;

    let imagePath;
    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagePath = `${basePath}${fileName}`;
    }

    try {
        const updatedProductData = {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            oldprice: req.body.oldprice,
            price: req.body.price,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured,
            Category: req.body.Category,
        };

        if (imagePath) {
            updatedProductData.image = imagePath;
        }

        const updatedProduct = await Product.update(updatedProductData, {
            where: { id },
        });

        if (updatedProduct[0] === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports =router;