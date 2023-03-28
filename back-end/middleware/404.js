export default /**
 * 404 catch-all
 */
    (req, res, next) => res.status(404).json({status: 404, message: "Not Found"})
