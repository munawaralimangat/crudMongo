const passport = require('passport')
const User = require('../model/model')
const bcrypt = require('bcryptjs')
const flash = require('connect-flash')


//for register page
const registerView = async (req, res) => {
    const message = ""
    res.render('register', { show: false, message });
}

//post request that handles register
const registerUser = async (req, res) => {
    const { name, email, password, confirm } = req.body;
    console.log(req.body)
    try {
        let message = ""
        if (!name || !email || !password || !confirm) {
            message = "Please fill all fields"
            res.render('register', { show: true, message })
            return false;
        }
        //confirming passwords
        if (password !== confirm) {
            message = "Password must match"
            res.render('register', { show: true, message })
            return false;
        } else {
            //validation
            User.findOne({ email: email }).then((user) => {
                if (user) {
                    message = "User already exist"
                    res.render('register', {
                        name,
                        email,
                        password,
                        confirm,
                        message,
                        show: true
                    });
                    return false
                } else {
                    //validation
                    const newUser = new User({
                        name,
                        email,
                        password,
                    });
                    //password hashing
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash
                            newUser
                                .save()
                                .then(res.redirect('/login'))
                                .catch((err) => console.log(err))
                        })
                    })
                }
            })
        }
    } catch (err) {
        console.log(err)
    }

}


//for view

const loginView = async (req, res) => {
    let message = "";
    const error = req.flash('error');
    if (error.length > 0) {
        message = error[0];
        res.render('login', { show: true, message });
    } else {
        res.render('login', { show: false, message: false });
    }
}

// const loginView = async (req, res) => {
//     let message = ""
//     const error = req.flash('error')
//     if (error) {
//         message = error
//         console.log(message)
//         res.render('login', {show:error ? true : false, message });
//     } else {
//         res.render('login',{show:false,message:false});
//     }
// }


//logging in function
const loginUser = (req, res, next) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        const message = "Please fill in all fields";
        return res.render("login", {
            email,
            password,
            message,
            show: true
        });
    }

    // Use passport.authenticate as middleware
    passport.authenticate('local', {
        successRedirect: '/dashbord',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res); 
};






//_________________________________________________________

// const loginUser = (req, res, next) => {
//     const { email, password } = req.body
//     try {
//         //required
//         let message = "Please fill in all fields"
//         if (!email || !password) {
//             res.render("login", {
//                 email,
//                 password,
//                 message,
//                 show: true
//             })
//         } else {

//             passport.authenticate('local', {
//                 successRedirect: '/dashbord',
//                 failureRedirect: '/login',
//                 failureFlash: true
//             })(req, res,next);
//         }
//     } catch (err) {
//         throw (err => console.log(err))
//     }
// }


//export
module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser
};
