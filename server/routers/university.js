var express = require('express');
var router = express.Router();
const bookBankDB = require('../../database/db.js');
const sendMail = require('.././sendRequestMail.js');
const checkToken = require(".././Authorization/middleware.js")

//---------------- Universities Page --------------------------
router.route('/').get(function (req, res) {
	bookBankDB.getAllUniversities(function (err, allUniversities) {
		if (err) throw err;
		//console.log(allUniversities);
		res.json(allUniversities);
	});
});

//----------------Items Page Route --------------------------
router.route('/:univId').get(function (req, res) {
	const univId = req.params.univId;
	var dataOfUniversityPage = {
		universityName: '',
		universityBooks: []
	};

	bookBankDB.getUniversityName(univId, function (err, univObj) {
		if (err) throw err;
		dataOfUniversityPage.universityName = univObj.universityName;

		bookBankDB.getBooksOfUniversity(univId, function (err, booksOFTheUniversity) {
			if (err) throw err;
			console.log(booksOFTheUniversity);
			dataOfUniversityPage.universityBooks = booksOFTheUniversity;
			res.json(dataOfUniversityPage);
		});
	});
});

//----------------Items Page Route --------------------------
router.route('/:univId/allBooks').get(function (req, res) {
	const univId = req.params.univId;

	bookBankDB.getBooksOfUniversity(univId, function (err, booksOFTheUniversity) {
		if (err) throw err;
		res.json(booksOFTheUniversity);
	});
	// });
});

//----------------- Item Page Route----------------------------
router.route('/:univId/book/:bookId').get(function (req, res) {
	console.log('serving the item page route');
	var bookId = req.params.bookId;

	var itemPageData = {
		bluePrintBook: {},
		universityNameOfBook: '',
		donatedBooks: [],
		donatedBooksOwners: []
	};

	//---- get bluePrint book ----
	bookBankDB.getbluePrintBook(bookId, function (err, bluePrintBook) {
		if (err) throw err;
		//console.log(bluePrintBook);
		itemPageData['bluePrintBook'] = bluePrintBook;

		bookBankDB.getUnivName(bluePrintBook.universityId, function (err, uniName) {
			if (err) {
				throw err;
			}
			itemPageData.universityNameOfBook = uniName;
			console.log(uniName);

			//---- get donated books of that bluePrint book ----
			bookBankDB.getDonatedBooks(bookId, function (err, donatedBooks) {
				if (err) throw err;

				//console.log(donatedBooks);
				itemPageData['donatedBooks'] = donatedBooks;

				//get Users Id of the donated books
				var usersId = donatedBooks.map(function (doc) {
					return doc.userId;
				});

				bookBankDB.getDonatedBooksOwnersName(usersId, function (err, profiles) {
					if (err) throw err;
					itemPageData['donatedBooksOwners'] = profiles;

					res.json(itemPageData);
				});
			});
		});
	});
});

//------------- create a requested book ----------------------------
router.route('/:univId/book/:bookId/sendBookRequest').post(function (req, res) {
	var requestedBook = req.body;
	var universityId = req.params.univId;
	// console.log(requestedBook)
	// var bookId = req.params.bookId;
	var requestedBookInfo = {
		requesterId: requestedBook.requesterId,
		requesterName: requestedBook.requesterName,
		requesterEmail: requestedBook.requesterEmail,
		ownerId: requestedBook.ownerId,
		ownerName: requestedBook.ownerName,
		ownerEmail:requestedBook.ownerEmail,
		bookId: requestedBook.bookId,
		bookName: requestedBook.bookName,
		bookCover: requestedBook.bookCover,
		donatedBookId: requestedBook.donatedBookId,
		universityName: requestedBook.universityName,
		universityId: requestedBook.universityId,
		isAccepted: false,
		isIgnored: false,
		createdAt: Date.now()
	};
	bookBankDB.saveRequestedBook(requestedBookInfo, function (err, requestedBook) {
		if (err) throw err;
		console.log(requestedBook);
		var ownerId = requestedBook.ownerId;
		bookBankDB.getOwnerEmailOfRequestedBook(ownerId, function (err, ownerDoc) {
			if (err) throw err;
			console.log('owner info of the requested book');
			var ownerEmail = ownerDoc.email;
			console.log(ownerEmail);
			// res.json({
			// 	requestedBook: requestedBook,
			// 	ownerEmail: ownerEmail
			// });
			sendMail(ownerEmail);
		});
	});
});

module.exports = router;
