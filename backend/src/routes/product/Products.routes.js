import { createCategory,getCategories,updateCategory,deleteCategory, getspecifiedCategory } from "../../controllers/productControllers/category.controllers.js";
import { Router } from "express";

const router=Router();
  

router.post("/createCategory",protect,createCategory);
router.get("/categories",getCategories);
router.get("/specifiedCategory/:id",getspecifiedCategory);
router.put("/updateCategory/:id",updateCategory);
router.delete("/deleteCategory/:id",deleteCategory);


// for products routes
import { addProduct,getProducts,updateProduct,deleteProduct,getspecifiedproducts } from "../../controllers/productControllers/productitems.controllers.js";
import { protect } from "../../middleware/authMiddleware.js";
import productUpload  from "../../multerConfig/productConfig.js";

router.post("/addProducts/:id",[protect,productUpload.single("product_image")],addProduct);  //here id to be removed
router.get("/products/:id",getProducts);
router.get("/specifiedproducts/:id",getspecifiedproducts);

router.put("/updateProduct/:id",updateProduct);
router.delete("/deleteProduct/:id",deleteProduct);

export default router ;