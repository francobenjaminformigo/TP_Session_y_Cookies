const { validationResult } = require("express-validator")

module.exports = {
    main: (req, res) => {
        res.render('index')
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        
        if (errors.isEmpty()) {
            let { name, backgroundColor, email, age } = req.body;
            let on = req.body.remember;
            if(on){
                res.cookie('backgroundColor', req.body.backgroundColor, {maxAge:120000});
                res.cookie("name", req.body.name ,{maxAge:120000});
            }
            req.session.user = {
                backgroundColor,
                name
            };
            res.render('index', {
                name,
                backgroundColor,
                email,
                age,
                userData: req.body
            })
        } else {
            res.render('index', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    user: (req, res) => {
        res.render('user',{
            backgroundColor: req.session.user.backgroundColor,
            name: req.session.user.name,
        })      
    },
    userReset: (req, res) => {
        req.session.destroy();
        res.clearCookie('name');
        res.clearCookie('backgroundColor');
        res.redirect("/");
    }
}