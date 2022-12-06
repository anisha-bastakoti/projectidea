const express= require('express');
const router =express.Router();

router.get('/',(req,respo,)=>{
respo.render('./login');
});

module.exports = router;