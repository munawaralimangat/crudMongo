const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

//loading module
const User = require('../server/model/model')

const loginCheck = passport => {
    passport.use(
      new LocalStrategy({ usernameField: "email" },(email, password, done) => {
        //Check customer
        User.findOne({ email: email })
          .then((user) => {
            if (!user) {
              console.log("wrong email");
              return done(null,false,{message:'wrong email'});
            }
            //Match Password
            bcrypt.compare(password, user.password, (error,isMatch) => {
              if (error) throw error;
              if (isMatch) {
                return done(null, user);
              } else {
                console.log("Wrong password");
                return done(null,false,{message:"wrong password"});
              }
            });
          })
          .catch((error) => console.log(error));
      })
    )
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(error => {
                console.error(error);
                done(error);
            });
    });
};
module.exports = {
    loginCheck,
}
