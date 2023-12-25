const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')
const WishListController = require('../controllers/WishListController')
const UserController = require('../controllers/UserController')
const AuthVerification = require('../middleware/AuthVerification')
const CartListControlloer = require('../controllers/CartListControlloer')



//Product

router.get('/ProductBrandList', ProductController.ProductBrandList);
router.get('/ProductCategoryList', ProductController.ProductCategoryList);
router.get('/ProductSliderList', ProductController.ProductSliderList);
router.get('/ProductListByBrand/:BrandID', ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:CategoryID', ProductController.ProductListByCategory);
router.get('/ProductListBySimiler/:Keyword', ProductController.ProductListBySimiler);
router.get('/ProductListByKeyword/:Keyword', ProductController.ProductListByKeyword);
router.get('/ProductListByRemark/:Remark', ProductController.ProductListByRemark);
router.get('/ProductDetails/:ProductID', ProductController.ProductDetails);
router.get('/ProductReviewList/:ProductID', ProductController.ProductReviewList);
router.get('/UserOTP/:email', UserController.UserOTP)
router.get('/VerifyLogin/:email/:otp', UserController.VerifyLogin)
router.get('/UserLogout', AuthVerification, UserController.UserLogout)
router.post('/SaveProfile', AuthVerification, UserController.SaveProfile)
router.get('/ReadProfile', AuthVerification, UserController.ReadProfile)
router.get('/SaveWishList', AuthVerification, WishListController.SaveWishList)
router.delete('/RemoveWishListh', AuthVerification, WishListController.RemoveWishList)
router.get('/WishList',AuthVerification,WishListController.WishList)

router.post('/SaveCartList', AuthVerification, CartListControlloer.SaveCartList)
router.post('/RemoveCartList',AuthVerification, CartListControlloer.RemoveCartList)
router.get('/CartList',AuthVerification, CartListControlloer.RemoveCartList)





module.exports = router;  