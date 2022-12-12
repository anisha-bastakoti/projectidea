const express= require('express');
const router =express.Router();

router.get('/',(req,resp,)=>{
resp.render('./adminlogin');
});

module.exports = router;