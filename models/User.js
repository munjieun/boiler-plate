const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { JsonWebTokenError } = require('jsonwebtoken');
//salt를 생성한 후, salt를 이용하여 비밀번호 암호화를 한다. saltRounds는 salt가 몇자리인지 정해준다.
const saltRounds = 10; 
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

//몽고DB에 save를 하기 전에 function 실행
userSchema.pre('save', function(next){
    var user = this;
    if (user.isModified('password')) {

        //비밀번호를 암호화 시킨다.
        //https://www.npmjs.com/package/bcrypt
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash;
                next()
            });
        });
    } else {
        next();
    }
    
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //cb 콜백
    //plainPassword = 123 / 암호화된 비밀번호 $2b$10$zh6g.C7EpAZdEiXHk7y8DuVkq77KMollXHZVl5M2lZEWNYDXCJuUy
    //plainPassword를 암호화해서 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    //https://www.npmjs.com/package/jsonwebtoken
    //jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema);

module.exports = {User};