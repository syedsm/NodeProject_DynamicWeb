const regisadmin = require('../models/reg')


exports.login = (req, res) => {
    // res.send('Thhis is the admin page ')

    res.render('./admin/login.ejs',{message:'',css:''})
}
exports.logincheck = async (req, res) => {
    //  console.log(req.body)
   const {usname,pass}=req.body
    const usercheck = await regisadmin.findOne({ username: usname })
    // console.log(usercheck)
    if (usercheck!==null){
        if(usercheck.password==pass){
            req.session.isAuth=true
            res.redirect('/admin/dashboard')
        }else{
            res.render('admin/login.ejs',{message: 'Wrong Credentials',css:'danger'})
        }
    }
    else{
        res.render('admin/login.ejs',{message: 'Wrong Credentials',css:'danger'})
        }

}
exports.dashboard=(req,res)=>{
res.render('admin/dashboard.ejs')
}
exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/admin')
}