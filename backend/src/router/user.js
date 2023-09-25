import express  from "express";
import {changePassword, forgotPassword, signin, signup, verifyConfirmationCode} from "../controller/user.js"
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verification-codes", verifyConfirmationCode); // api lấy mã xác thực để lấy mật khẩu
router.post("/forgot-password", forgotPassword); // api lấy lại mật khẩu
router.post("/change-password", changePassword); 

// router.post("/logout",logout)



export default router