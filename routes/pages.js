const express = require('express');
const User = require('../core/user');
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();

// Get the index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.redirect('/home');
        return;
    }
    // IF not we just send the index page.
    res.render('index', {title:"My application"});
})

// Get home page
router.get('/home', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('home', {opp:req.session.opp, name:user.fullname});
        return;
    }
    res.redirect('/');
});

// Post login data
router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.email, req.body.password, function(result) {
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/home');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
        }
    })

});


// Post register data
router.post('/register', (req, res, next) => {
    // prepare an object containing all user inputs.

    const { email, fullname, password, 'confirm-password': confirmPassword } = req.body;

    // Kiểm tra username đã tồn tại chưa
    /*user.find(username, function(existingUser) {
        if (existingUser != null) {
            // Nếu tìm thấy username đã tồn tại, trả về thông báo lỗi
            return res.render('index', { 
                title: "My application", 
                errorMessage: "Username is already taken.",
                showAlert: true // Cờ để hiển thị alert trên frontend
            });
        }
    });*/

    // XÁC NHẬN MẬT KHẨU
    if (password != null && confirmPassword != null && password !== confirmPassword) {
        return res.render('index', { 
            title: "My application", 
            errorMessage: "Xác nhận mật khẩu không đúng!",
            showAlert: true,
        });
    }


    // CHECK EMAIL
    if (email != null && email.length > 64) {
        return res.render('index', { 
            title: "My application", 
            errorMessage: "Email không quá 64 kí tự",
            showAlert: true // Cờ để hiển thị alert trên frontend
        });
    }

    if (!email.includes('@') && email != null) {
        return res.render('index', { 
            title: "My application", 
            errorMessage: "email phải chứa kí tự @",
            showAlert: true // Cờ để hiển thị alert trên frontend
        });
    }

    // Kiểm tra mật khẩu: ít nhất 8 ký tự, chứa ít nhất 1 chữ hoa và 1 số
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Định dạng mật khẩu
    if (!passwordRegex.test(password) && password != null) {
        return res.render('index', { 
            title: "My application", 
            errorMessage: "Password must be at least 8 characters long, contain at least one uppercase letter and one number.",
            showAlert: true // Cờ để hiển thị alert trên frontend
        });
    }

    let userInput = {
        email: req.body.email,
        fullname: req.body.fullname,
        password: req.body.password
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/home');
            });

        }else {
            console.log('Error creating a new user ...');
        }
    });

});


// Get loggout page
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;