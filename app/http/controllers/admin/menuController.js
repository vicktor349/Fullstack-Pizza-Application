const Menu = require("../../../models/menu")

function menuController() {
    return {
        index(req, res) {
           Menu.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, menu) => {
               if(req.xhr) {
                   return res.json(Menu)
               } else {
                return res.render('admin/menu')
               }
           })
        },
        create(req,res){
            const { name, image, price, size }   = req.body
            const menu = new Menu({
                name,
                image,
                price,
                size
            })
            menu.save().then(() =>{
                res.redirect('/admin/menu')
            }).catch(err =>{
                req.flash('error: Something went wrong!')
            })
        }
    }
}


module.exports = menuController