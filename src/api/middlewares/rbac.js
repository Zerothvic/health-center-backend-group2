/**
 * Middleware to restrict access based on user roles
 * @param {...string} allowedRoles - List of roles permitted to access the route
 */

    const authorize = (...allowedRoles) => {
        return (req, res, next) => {

            // Safety measure to ensure authenticate middleware ran first
            if (!req.user || !req.user.role) {
            return res.status(500).json({ message: 'Auth context missing. Ensure authenticate middleware is applied.' });
            }

            const hasAccess = allowedRoles.includes(req.user.role);

            if (!hasAccess) {
            return res.status(403).json({ message: `Access denied. Role '${req.user.role}' does not have permission.` });
            }

            next();
        };
    };

    export {
        authorize
    }