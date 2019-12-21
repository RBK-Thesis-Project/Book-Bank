var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sendMail = require('.././mail.js');

var router = express.Router();
const bookBankDB = require('../../database/db.js');

//------------------Serving the Homepage ------------------
router.route('/getData').get(function(req, res) {
	console.log('serving the Root rout');
	// console.log(req.body);
	var homePageData = {
		universities: [],
		recentBooks: [],
		allBooks: [],
		totalUsers: 0,
		totalDonatedBooks: 0,
		totalUniversities: 0
	};

	// --------- Find 4 random universities ---------
	bookBankDB.findRandomUnis(function(err, randomUnis) {
		if (err) throw err;
		// console.log(randomUnis);
		homePageData.universities = randomUnis;
		//--------- Find  recently added Books ---------
		bookBankDB.findRecentlyAddedBooks(function(err, books) {
			if (err) throw err;
			//console.log(books);
			homePageData.recentBooks = books;
			//--------- Find Number of Donated Books ---------
			bookBankDB.countDonatedBooks(function(err, numberOfDonatedBooks) {
				if (err) {
					throw err;
				}
				//console.log(numberOfDonatedBooks);
				homePageData.totalDonatedBooks = numberOfDonatedBooks;
				//--------- Find Number of Universities ---------
				bookBankDB.countUniversities(function(err, numberOfUnis) {
					if (err) {
						throw err;
					}
					//console.log(numberOfUnis);
					homePageData.totalUniversities = numberOfUnis;
					//--------- Find Number of Users ---------
					bookBankDB.countUsers(function(err, numberOfUsers) {
						if (err) {
							throw err;
						}
						// console.log(numberOfUsers);
						homePageData.totalUsers = numberOfUsers;
						//now homePageData have all the data from the database.
						bookBankDB.getAllBooks(function(err, allBooks) {
							if (err) {
								throw err;
							}
							homePageData.allBooks = allBooks;

							res.json(homePageData);
						});
					});
				});
			});
		});
	});
});

//------------------Get All Books (BluePrint books) ------------------
router.route('/allBooks').get(function(req, res) {
	var allBooksObj = {
		allBluePrintBooks: [],
		universities: []
	};
	bookBankDB.getAllBooks(function(err, allBooks) {
		if (err) throw err;

		allBooksObj.allBluePrintBooks = allBooks;

		bookBankDB.getAllUniversities(function(err, univs) {
			if (err) throw err;
			// console.log(univs);
			allBooksObj.universities = univs;
			res.json(allBooksObj);
		});
	});
});

//----------------------------input validation-------------------------------------------
const validateRegisterInput = require('../validation/signupValidation.js');
const validateLoginInput = require('../validation/loginValidation.js');
//---------------------------------------------------------------------------------------

//--------------Authentication--------------------
//------------------------------------------------
process.env.SECRET_KEY = 'secret';

router.route('/signup').post((req, res) => {
	let body = req.body;

	// Form validation
	const { errors, isValid } = validateRegisterInput(body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	var userInfo = {
		userName: body.userName,
		email: body.email,
		password: body.password
	};

	bookBankDB.User
		.findOne({
			email: body.email
		})
		.then((user) => {
			if (user) {
				return res.status(400).json({ msg: 'user already exists! Plz login' });
			}
			var user = new bookBankDB.User(userInfo);

			//-------create profile doc for the new user------------
			var newProfile = {
				userId: user._id,
				universityId: '',
				userAvatar: 'http://www.hts.jo/hts/assets/images/avatars/avatar1_big@2x.png'
			};
			bookBankDB.saveProfile(newProfile, function(err, profileDoc) {
				if (err) throw err;
				console.log(profileDoc);

				bcrypt.hash(body.password, 10, (err, hash) => {
					if (err) throw err;
					user.password = hash;
					console.log(hash);
					user
						.save()
						.then((user) => {
							const payload = {
								userId: user._id,
								userName: user.userName,
								email: user.email,
								userAvatar: profileDoc.userAvatar
							};
							let token = jwt.sign(
								payload,
								process.env.SECRET_KEY,
								{
									expiresIn: '24h'
								},
								(err, token) => {
									if (err) res.json({ success: false, token: token, user: user });
									res.json({ success: true, token: token, user: user });
								}
							);
						})
						.catch((err) => {
							res.send('error' + err);
						});
				});
			});
		});
	sendMail(req.body.email);
});

//--------------------------------------------
//---------------login------------------------
//--------------------------------------------
router.route('/login').post((req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	bookBankDB.User
		.findOne({
			email: req.body.email
		})
		.then((user) => {
			if (user) {
				if (bcrypt.compareSync(req.body.password, user.password)) {
					bookBankDB.findProfile(user._id, function(err, loggedInProfile) {
						if (err) throw err;
						console.log(loggedInProfile);
						const payload = {
							userId: user._id,
							userName: user.userName,
							email: user.email,
							password: user.password,
							userAvatar: loggedInProfile.userAvatar
						};

						let token = jwt.sign(payload, process.env.SECRET_KEY, {
							expiresIn: '24h'
						});
						// console.log(token);
						sendMail(req.body.email);
						res.json({ success: true, message: 'Authentication successful!', token: token, user: user });
					});
				} else {
					res.json({ success: false, error: 'check your password' });
				}
			} else {
				res.json({ success: false, error: 'invalid email or password \n join our website' });
			}
		})
		.catch((err) => {
			res.send('error: ' + err);
		});

	// console.log(req.body.email)
});
//-----

//----

//---- Populate data to data Base:

// router.route('/save').get(function(req, res) {
// 	bookBankDB.saveRequestedBook({
// 		requesterId: '5def8c69e1fe8904f2920c80',
// 		ownerId: '5def8dd49c5b52050c8ab00f',
// 		bookId: '5df10a71f27be3042b978df6',
// 		donatedBookId: '5df10a71f27be3042b978df7',
// 		createdAt: Date.now()
// 	});

// bookBankDB.saveNotification({
// 	senderId: '5def8c69e1fe8904f2920c80',
// 	recipientId: '5def8dd49c5b52050c8ab00f',
// 	text: 'Yasmin want to borrow your book',
// 	isRead: false,
// 	createdAt: Date.now()
// });
// bookBankDB.saveBook({
// 	bookName: 'Java',
// 	bookCover:
// 		'data:image/jpeg;base64,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',
// 	bookDescription: 'what a Book',
// 	universityId: '5def8e03576c2f05177ccb6d',
// 	createdAt: Date.now()
// });

// bookBankDB.saveDonatedBook({
// 	userId: '5def8dd49c5b52050c8ab00f',
// 	bookId: '5def97ed9b604d064bf719cb',
// 	availability: true,
// 	createdAt: Date.now()
// });

// bookBankDB.saveUser({
// 	userName: 'Nazih',
// 	email: 'nazih@test.com',
// 	password: '123'
// });

// bookBankDB.saveProfile({
// 	userId: '5def8dd49c5b52050c8ab00f',
// 	userName: 'Nazih',
// 	universityId: '5def8e03576c2f05177ccb6d',
// 	userAvatar:
// 		'https://cdn2.vectorstock.com/i/1000x1000/51/16/male-profile-avatar-with-brown-hair-vector-12055116.jpg'
// });

// bookBankDB.saveUniversity({
// 	universityName: 'Islamic University',
// 	universityImg:
// 		'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Islamic_Uni_Gaza.jpg/880px-Islamic_Uni_Gaza.jpg'
// });
// 	res.json('added successfully');
// });

module.exports = router;
