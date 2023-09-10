const courseModel = require('../models/courseModel');
const instructorModel = require('../models/instructorModel');
const path = require('path');
const fs = require('fs');
//course sign up page
module.exports.home = function(req,res){
    return res.render('course');
}

//course post create request
//inserting the course into db
module.exports.Create = function(req,res){
    const course = req.body;
    let courseAvatar = null;
    if(req.file) courseAvatar = path.join(courseModel.avatarPath,req.file.filename);
    courseModel.create({
        name:course.name,
        duration:course.duration,
        price:course.price,
        eligibility:course.eligibility,
        avatar:courseAvatar
    },function(err,course){
        if(course){
            //add this courseid into the courses array of instructor
            //instructor this time is logged in so use his email from cookies
            const email = req.cookies.email;
            instructorModel.findOne({email:email}, function(err,user){
                if(user){
                    user.courses.push(course['_id']);
                    user.save();
                    course.instructor = user['_id'];
                    course.save();
                    return res.redirect('/user/profile');
                }else{
                    return res.redirect('/');
                }
            })
        }else{
            return res.redirect('back');
        }
    })
}
module.exports.postUpdate = function(req,res){
    if(!req.cookies.email){
        //go login first
        return res.redirect('/');
    }else{
        //show all the fields of course and let user type everything then update those fields which are not null
        courseModel.findOne({'_id':req.params.id},function(err,course){
        if(course){
            //update
            let newCourse;
            for(let key in req.body){
                if(req.body[key]){
                    course[key] = req.body[key];
                }
            }
            console.log(req.file);
            if(req.file){
                removefile(course.avatar)
                course.avatar = path.join(courseModel.avatarPath,req.file.filename);
            }
            console.log("course",course);
            course.save();
            return res.redirect('/user/profile');
        }else{
            return res.redirect('/user/profile');
        }
    });
    }
}
module.exports.getUpdate = function(req,res){
    if(!req.cookies.email){
        return res.redirect('back');
    }else{
        console.log(req.params.id);
        return res.render('update',{
            id:req.params.id
        });
    }
}
module.exports.delete = function(req,res){
    if(req.cookies.email){
        courseModel.findOne({'_id':req.params.id},function(err,course){
            if(err){
                return res.redirect('back');
            }else{
                let instructorID = course.instructor;
                removefile(course.avatar);
                courseModel.deleteOne(course);
                instructorModel.findOne({'_id':instructorID},function(err,user){
                    if(err){
                        return res.redirect('back');
                    }else{
                        let newArray=[];
                        for(let key in user.courses){
                            if(user.courses[key] == req.params.id)continue;
                            newArray.push(user.courses[key]);
                        }
                        user.courses = newArray;
                        user.save();
                        return res.redirect('back');
                    }
                })
            }
        })
    }else{
        return res.redirect('/');
    }
}
function removefile(paath){
        if(paath){
            let filePath = path.join(__dirname,'..',paath);
            if(fs.existsSync(filePath))fs.unlinkSync(filePath);
        }
}