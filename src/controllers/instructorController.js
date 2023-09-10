const courseModel = require('../models/courseModel');
const instructorModel = require('../models/instructorModel');
const path = require('path');

//signup page for user
module.exports.signup = function(req,res){
    return res.render('instructor');
}

//inserting new user
module.exports.Create = function(req,res){
    const user = req.body;
    if(req.file)user.avatar = path.join(instructorModel.avatarPath,req.file.filename);

    instructorModel.create(user,function(err,user){
        if(user){
            res.cookie('email',req.body.email);
            return res.redirect('/user/profile');
        }else{
            return res.redirect('/');
        }
    });
}


//handling post login request
module.exports.login = function(req,res){
    //check if cookie exist only then allow this field
    if(req.cookies.email != undefined){
        //he has already logged in
        //just show him the profile page
        console.log('inside login cookie present');
        return res.redirect('/user/profile');
    }else{
        //check if credentials are right
        instructorModel.findOne({email:req.body.email},function(err,user){
            if(user && user.password===req.body.password){
                //credentials matched
                //set cookies
                console.log(req.body.email)
                return res.cookie('email',req.body.email,{
                    maxAge:24*60*60*1000
                }).redirect('/user/profile');
            }else{
                return res.redirect('/');
            }
        })
    }
}
//showing courses
module.exports.profile = function(req,res){
    if(req.cookies.email != undefined){
        instructorModel.findOne({'email':req.cookies.email}).populate('courses').exec(function(err,updUser){
            if(updUser){
                return res.render('profile',{
                    user:updUser
                })
            }else{
                return res.redirect('/');
            }
        })
    }else{
        return res.redirect('/');
    }
}
module.exports.signout = function(req,res){
    return res.clearCookie('email').redirect('/');
}