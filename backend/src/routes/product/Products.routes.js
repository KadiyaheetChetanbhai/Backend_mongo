import { createCategory,getCategories,updateCategory,deleteCategory } from "../../controllers/productControllers/category.controllers.js";
import { Router } from "express";

const router=Router();
  

router.post("/createCategory",protect,createCategory);
router.get("/categories",getCategories);
router.put("/updateCategory/:id",updateCategory);
router.delete("/deleteCategory/:id",deleteCategory);


// for products routes
import { addProduct,getProducts,updateProduct,deleteProduct } from "../../controllers/productControllers/productItems.controllers.js";
import { protect } from "../../middleware/authMiddleware.js";
router.post("/:id/addProducts",protect,addProduct);
router.get("/:id/products",getProducts);
router.put("/:id/updateProduct/:id",updateProduct);
router.delete("/:cid/deleteProduct/:id",deleteProduct);

export default router ;