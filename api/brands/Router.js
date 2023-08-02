const app = require('express')

const router = app.Router()

const {addBrand,allBrands ,Brandbyname,Brandbyid,deleteBrand,updateBrand} = require ('./controller')


router.post('/add-brand', addBrand)
router.get('/all-brands',allBrands)
router.get('/brandbyname', Brandbyname)// quary method
router.get('/brandbyid/:_id', Brandbyid)// perams method
router.delete('/delete-brand', deleteBrand)
router.put('/update-brand', updateBrand)

module.exports = router