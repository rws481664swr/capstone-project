export default /**
 * error catch-all
 */
    (err, req, res, next) => {
        console.error(err)
    res.status(err.status || 500).json({message: err.message || 'Server Error'})
}
