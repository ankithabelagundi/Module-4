import validator from 'validator';


export const validateUser = (req, res, next) => {
const { name, email, password, age } = req.body;


if (!name || name.trim() === '') {
return res.status(400).json({ message: 'Name is required' });
}


if (!email || !validator.isEmail(email)) {
return res.status(400).json({ message: 'Valid email is required' });
}


if (!password || password.length < 8) {
return res.status(400).json({ message: 'Password must be at least 8 characters' });
}


if (age !== undefined && (isNaN(age) || age < 18)) {
return res.status(400).json({ message: 'Age must be a number and >= 18' });
}


next();
};