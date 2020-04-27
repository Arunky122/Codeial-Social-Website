const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render("user_profile",{
            title:"User Profile",
            profile_user:user
        });
    });

   
}

// render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    });
}

// render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeial | Sign up"
    });
}

// get the sign up data

module.exports.create = function(req,res){
     if(req.body.password != req.body.confirm_password){
         return res.redirect('back');
     }

     User.findOne({email: req.body.email},function(err,user){
         if(err){
             console.log("error in finding user in siging up");
             return;
         }

         if(!user){
             User.create(req.body,function(err,user){
                 if(err){
                     console.log('Error in creating user while siging up');
                     return;
                 }
                 return res.redirect('/users/sign-in');
             });
         }else{
             return res.redirect('back');
         }
     });

    }

// sign in and create a session
module.exports.createSession = function(req,res){
    
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}