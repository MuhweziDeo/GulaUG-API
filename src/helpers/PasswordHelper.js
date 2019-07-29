import bcrypt from 'bcrypt';

class PasswordHelper {

    static async comparePassword(hashedPassword, password) {
        const verifyPassword  = await bcrypt.compare(password, hashedPassword);
        return verifyPassword;
    }

    static async hashPassword(password, salts) {
        const hashedPassword = await bcrypt.hash(password, salts);
        return hashedPassword;
    }
}

export default PasswordHelper;