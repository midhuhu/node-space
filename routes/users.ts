import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/user', function(req, res, next) {
  console.log('req', req)
  
  res.send('respond with a resource');
});

export default router;
