const livetest = ((req, res) =>  
{
    const name = req.params.user
    res.send(name)

    
    // mariadb.pool.query("SELECT * FROM user").then((value) => {
    //     res.send(value[0]["username"])
    // })
})

module.exports = {
    livetest,
}