var express = require('express');
var router = express.Router();
var bookBankDB = require('../../database/db.js');
// const sendMail = require('.././acceptRequestMail.js');

router.route('/:userId').get(function (req, res) {
	var userId = req.params.userId;
	bookBankDB.getUserProfie(userId, function (err, profile) {
		if (err) throw err;
		console.log('the returned profile', profile);
		res.json(profile);
	});
});
//----------------- Add  new Book (bluePrint then donated) -------------
router.route('/:userId/addBlueprintDonatedBook').post(function (req, res) {
	// var { name, description, imgUrl, uniId, userId } = req.body;
	const dataFromClient = req.body;
	// console.log(dataFromClient);
	// console.log(req.body);
	var bluePrintBookInfo = {
		bookName: dataFromClient.name,
		bookCover: dataFromClient.imgUrl,
		bookDescription: dataFromClient.description,
		universityId: dataFromClient.universityId,
		createdAt: Date.now()
	};
	var donatedBookInfo = {
		userId: dataFromClient.userId,
		bookId: '',
		availability: true,
		createdAt: Date.now()
	};
	// console.log(bluePrintBookInfo);
	// console.log(donatedBookInfo);
	// res.json('body here is ');
	//-------------Create New BluePrint doc (Book Doc)-------------------
	bookBankDB.saveBook(bluePrintBookInfo, function (err, bluePrintBook) {
		if (err) throw err;
		console.log('New Blueprint book has been adde successfully!' + bluePrintBook);
		var bluePrintId = bluePrintBook._id;
		console.log(bluePrintId);
		donatedBookInfo['bookId'] = bluePrintId;
		console.log(donatedBookInfo);
		//-------------Create New DonatedBook doc-------------------
		bookBankDB.saveDonatedBook(donatedBookInfo, function (err, newDonatedBook) {
			if (err) {
				throw err;
			}
			console.log('new donated book has been added ' + newDonatedBook);
			var response = {
				bluePrint: bluePrintBook,
				Donated: newDonatedBook
			};
			res.json(response);
		});
	});
});
//----------------- Add  new Book donated -------------
router.route('/:userId/AddDonatedBook').post(function (req, res) {
	const dataFromClient = req.body;
	var donatedBookInfo = {
		userId: dataFromClient.userId,
		bookId: dataFromClient.bookId,
		availability: true,
		createdAt: Date.now()
	};
	//-------------Create New DonatedBook doc-------------------
	bookBankDB.saveDonatedBook(donatedBookInfo, function (err, newDonatedBook) {
		if (err) {
			throw err;
		}
		console.log('new donated book has been added ', newDonatedBook);
		res.json(newDonatedBook);
	});
});
//-------------get bluePrint books of user's donated books -------------------
router.route('/:userId/donatedBooksAsBluePrints').get(function (req, res) {
	const userId = req.params.userId;
	bookBankDB.getDonatedBooksOfUser(userId, function (err, donatedBooksOfUser) {
		if (err) {
			throw err;
		}
		console.log(donatedBooksOfUser);
		var bluePrintBooksId = donatedBooksOfUser.map(function (donatedBook) {
			return donatedBook.bookId;
		});
		bookBankDB.getAllBluePrintBooksdonatedByUser(bluePrintBooksId, function (err, bluePrintBooksdonatedByUser) {
			if (err) {
				throw err;
			}
			res.json(bluePrintBooksdonatedByUser);
		});
	});
});

//=======================================
//----Temp Route for books Requestes-----
//=======================================
router.route('/:userId/requestedBooks').get(function (req, res) {
	const userId = req.params.userId;

	bookBankDB.getRequestedBooks(userId, function (err, requestedBooks) {
		if (err) throw err;
		console.log(requestedBooks);
		res.json(requestedBooks);
	});
});

//==================================================
//----Temp Route for books Requested by the user-----
//====================================================

//----------Get Books requested by the user using the new schema for requested Books-----------------
router.route('/:userId/booksRequestedByTheUser').get(function (req, res) {
	const userId = req.params.userId;

	bookBankDB.getBooksRequestedByTheUser(userId, function (err, requestedBooksByTheUser) {
		if (err) throw err;
		console.log(requestedBooksByTheUser);
		res.json(requestedBooksByTheUser);
	});
});

//-------------ACCEPT BOOK REQUEST--------------
router.route('/:userId/requestedBooks/:donatedBookId/AcceptRequest').post(function (req, res) {
	const userId = req.params.userId;
	const donatedBookId = req.params.donatedBookId;
	const requesterId = req.body.requesterId;

	bookBankDB.updateRequestedBookToAccepted(requesterId, userId, donatedBookId, function (err, requestedBookAccepted) {
		if (err) throw err;
		// res.json(requestedBookAcceped);
		console.log(requestedBookAccepted);
		var acceptedDonatedBookId = requestedBookAccepted.donatedBookId;
		bookBankDB.makeDonatedBookUnavailable(acceptedDonatedBookId, function (err, donatedBook) {
			if (err) throw err;
			res.json({
				requestedBookAccepted: requestedBookAccepted,
				donatedBook: donatedBook
			});
		});
	});

	// sendMail(req.body.requesterEmail, req.body.requesterName, req.body.bookName);
});

//-------------IGNORE BOOK REQUEST--------------
router.route('/:userId/requestedBooks/:donatedBookId/IgnoreRequest').post(function (req, res) {
	const userId = req.params.userId;
	const donatedBookId = req.params.donatedBookId;
	const requesterId = req.body.requesterId;
	bookBankDB.updateRequestedBookToIgnored(requesterId, userId, donatedBookId, function (err, requestedBookIgnored) {
		if (err) throw err;
		res.json(requestedBookIgnored);
	});
});


//----------------edit profile picture ---------------
router.route('/:userId/editeProfilePic').post(function (req, res) {
	const userId = req.params.userId;
	const userAvatar = req.body.userAvatar;
	const profileId = req.body.profileId;
	// const newProfile = {
	// 	userId: userId,
	// 	universityId: '',
	// 	userAvatar: userAvatar
	// };
	bookBankDB.editProfile(profileId, userAvatar, function (err, profile) {
		if (err) {
			throw err;
		}
		console.log('this profile was edited', profile);
		res.json(profile);
	});
});
module.exports = router;
