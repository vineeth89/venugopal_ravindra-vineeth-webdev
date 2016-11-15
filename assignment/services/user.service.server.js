/**
 * Created by Vineeth on 10/31/16.
 */

module.exports = function(app,models) {
    app.post("/api/user",createUser);
    app.get("/api/user",findUser);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);


    function trimUser(user){
        user.username = user.username.trim();
        user.paswrod = user.password.trim();
        user.password_verify = user.password_verify.trim();
        return user;
    }

    function createUser(req,res) {
        var user = req.body;
        user = trimUser(user);
        var id = Math.floor(Math.random() * 999);
        id = id.toString();
        var obj = {
            username: user.username,
            password: user.password,
            firstName: "",
            lastName: ""
        }
        models.userModel.createUser(obj)
            .then(function(user) {
                res.send(user);
            }, function(err) {
                res.sendStatus(400).send(error);
        });
    }
    function findUser(req,res){
        var params = req.query;
        if(params.username && params.password) {
            findUserByCredentials(params.username,params.password,res);
        }
        else if(params.username) {
            var result = findUserByUsername(params.username);
            if(!result)
                res.send("0");
            else
                res.send(result);
        }
    }
    function findUserByCredentials(username,password,res) {
        findUserByUsername(username)
            .then(function(succ){
                if(succ.length>0) {
                    if(succ[0].password === password)
                        res.send(succ[0]);
                    else
                        res.send("0");
                } else
                    res.send("0");
            },function(err){
                res.sendStatus(404).send(err);
            });
    }

    function findUserByUsername(username){
        return models.userModel.findUserByUsername(username);
    }
    function findUserById(req,res) {
        var userId = req.params.userId;
        models.userModel.findUserById(userId)
            .then(function(user){
                res.send(user[0]);
            },function(err){
                res.sendStatus(404).send(err);
        });
    }
    function updateUser(req,res) {
        var user = req.body;
        models.userModel.updateUser(user._id,user)
            .then(function(succ){
                res.send(user);
            },function(err){
                res.sendStatus(404).send(err);
            });
    }
    function deleteUser(req,res) {
        models.userModel.deleteUser(uid)
            .then(function(succ){
                res.sendStatus(200).send(succ);
            },function(err){
                res.sendStatus(404).send(err);
        });
    };
}