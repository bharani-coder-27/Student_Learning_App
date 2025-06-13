import db from '../configDB/db.js';
import bcrypt from 'bcrypt';

export const insertUser = async (user, callback) => {
    const password = await bcrypt.hash(user.password, 10);

    const q="INSERT INTO user (`name`,`email`,`password`,`phone_no`,`dob`) VALUES (?)";
    const values=[
        user.name,
        user.email,
        password,
        user.phone_no,
        user.dob
    ];
    db.query(q,[values],callback);
};

export const fetchUser = (email, callback) => {
    const q="SELECT * FROM user WHERE email=?";
    db.query(q, [email], callback);
}