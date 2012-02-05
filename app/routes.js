App.get("/", function(req, res) {
    res.render("index", { user : req.session.user });
});