import { createCategory,getCategories,updateCategory,deleteCategory,getallCategory } from "../../controllers/productControllers/category.controllers.js";
import { Router } from "express";

const router=Router();
  

router.post("/createCategory",protect,createCategory);
router.get("/categories",getCategories);
router.get("/allcategories",getallCategory);
router.put("/updateCategory/:id",updateCategory);
router.delete("/deleteCategory/:id",deleteCategory);


// for products routes
import { addProduct,getProducts,updateProduct,deleteProduct,getallproducts } from "../../controllers/productControllers/productitems.controllers.js";
import { protect } from "../../middleware/authMiddleware.js";
router.post("/:id/addProducts",protect,addProduct);
router.get("/:id/products",getProducts);
router.get("/:id/allproducts",getallproducts);

router.put("/:id/updateProduct/:id",updateProduct);
router.delete("/:cid/deleteProduct/:id",deleteProduct);

export default router ;