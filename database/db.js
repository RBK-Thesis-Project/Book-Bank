var mongoose = require('mongoose');
require('mongoose-query-random');
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//-------------------MongoURI----------------------------
const URI = 'mongodb+srv://bookbank:bookbank@book-bank-3ough.mongodb.net/test?retryWrites=true&w=majority';

//-------------------Connection Setup-------------------------
mongoose.connect(URI, function (err, db) {
	if (err) {
		console.log('Unable to connect to the server. Please start the server. Error:', err);
	} else {
		console.log('Mongoose Connected to Server successfully!');
	}
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	// we're connected!
	console.log("We're Connected: TAZ");
});

//=======================================================
//-------------------Book Schema-------------------------
//=======================================================
var booksSchema = mongoose.Schema({
	bookName: { type: String },
	bookCover: { type: String },
	bookDescription: { type: String },
	universityId: { type: String },
	createdAt: { type: Date, default: Date.now }
});

//-------------------Book Model-------------------------
let Book = mongoose.model('books', booksSchema);

var saveBook = function (book, callBack) {
	// console.log('in save function');
	var newBook = new Book({
		bookName: book.bookName,
		bookCover: book.bookCover,
		bookDescription: book.bookDescription,
		universityId: book.universityId,
		createdAt: book.createdAt
	});

	newBook.save(callBack);
};

//=======================================================
//-------------------Donated Book Schema-------------------------
//=======================================================
var donatedBooksSchema = mongoose.Schema({
	userId: { type: String },
	bookId: { type: String },
	availability: { type: Boolean },
	createdAt: { type: Date, default: Date.now }
});

//-------------------Donated Book Model-------------------------
let DonatedBook = mongoose.model('donated-books', donatedBooksSchema);

var saveDonatedBook = function (donatedBook, callBack) {
	console.log('in save function');
	var newDonatedBook = new DonatedBook({
		userId: donatedBook.userId,
		bookId: donatedBook.bookId,
		availability: donatedBook.availability,
		createdAt: donatedBook.createdAt
	});

	newDonatedBook.save(callBack);
};

// //=======================================================
// //-------------------Requested Book Schema---------------
// //=======================================================
// var requestedBooksSchema = mongoose.Schema({
// 	requesterId: { type: String }, // the user who sent the request.
// 	ownerId: { type: String }, // the who donated the book
// 	bookId: { type: String }, // Id of the BluePrint book
// 	donatedBookId: { type: String },
// 	isAccepted: { type: Boolean, default: false },
// 	isIgnored: { type: Boolean, default: false },
// 	createdAt: { type: Date, default: Date.now }
// });

// //-------------------Requested Book Model-------------------------
// let RequestedBook = mongoose.model('requested-books', requestedBooksSchema);

// var saveRequestedBook = function(requestedBook, callBack) {
// 	// console.log('in save function');
// 	var newRequestedBook = new RequestedBook({
// 		requesterId: requestedBook.requesterId,
// 		ownerId: requestedBook.ownerId,
// 		bookId: requestedBook.bookId,
// 		donatedBookId: requestedBook.donatedBookId,
// 		isAccepted: requestedBook.isAccepted,
// 		isIgnored: requestedBook.isIgnored,
// 		createdAt: requestedBook.createdAt
// 	});

// 	newRequestedBook.save(callBack);
// };

//=============NEW DESIGN FOR REQUESTED BOOKS SCHEMA========
//============================================================
//-----------------RequestedEdited Book Schema--------------
//============================================================
var requestedBooksSchema = mongoose.Schema({
	requesterId: { type: String },
	requesterName: { type: String }, //new
	requesterEmail: { type: String },
	ownerId: { type: String },
	ownerName: { type: String }, //new
	bookId: { type: String },
	bookName: { type: String }, //new
	bookCover: { type: String },
	donatedBookId: { type: String },
	universityName: { type: String },
	universityId:{type: String},
	isAccepted: { type: Boolean, default: false },
	isIgnored: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now }
});
//-------------------Requested Book EDITED Model-------------------------
let RequestedBook = mongoose.model('requestedBooks', requestedBooksSchema);
var saveRequestedBook = function (requestedBook, callBack) {
	// console.log('in save function');
	var newRequestedBook = new RequestedBook({
		requesterId: requestedBook.requesterId,
		requesterName: requestedBook.requesterName,
		requesterEmail: requestedBook.requesterEmail,
		ownerId: requestedBook.ownerId,
		ownerName: requestedBook.ownerName,
		ownerEmail: requestedBook.ownerEmail,
		bookId: requestedBook.bookId,
		bookName: requestedBook.bookName,
		bookCover: requestedBook.bookCover,
		donatedBookId: requestedBook.donatedBookId,
		universityName: requestedBook.universityName,
		universityId: requestedBook.universityId,
		isAccepted: requestedBook.isAccepted,
		isIgnored: requestedBook.isIgnored,
		createdAt: requestedBook.createdAt
	});
	newRequestedBook.save(callBack);
};
//===================
//===================

//=======================================================
//-------------------User Schema-------------------------
//=======================================================
var userSchema = mongoose.Schema({
	userName: { type: String },
	email: { type: String },
	password: { type: String }
});
//-------------------User Model-------------------------
var User = mongoose.model('user', userSchema);

var saveUser = function (user) {
	var newUser = new User({
		userName: user.userName,
		email: user.email,
		password: user.password
	});

	newUser.save(function (err, res) {
		if (err) {
			throw err;
		}
		console.log('this user was added now', res);
	});
};
//=======================================================
//-------------------Profile Schema-------------------------
//=======================================================

var profileSchema = mongoose.Schema({
	userId: { type: String },
	universityId: { type: String },
	userAvatar: { type: String }
});

//-------------------Profile Model-------------------------
var Profile = mongoose.model('profiles', profileSchema);

var saveProfile = function (profile, callBack) {
	var newProfile = new Profile({
		userId: profile.userId,
		universityId: profile.universityId,
		userAvatar: profile.userAvatar
	});

	newProfile.save(callBack);
};

//=======================================================
//-------------------University Schema-------------------
//=======================================================

var universitySchema = mongoose.Schema({
	universityName: { type: String },
	universityImg: { type: String }
});

//-------------------University Model----------------------
var University = mongoose.model('universities', universitySchema);

var saveUniversity = function (uni) {
	var newUniversity = new University({
		universityName: uni.universityName,
		universityImg: uni.universityImg
	});

	newUniversity.save(function (err, res) {
		if (err) {
			throw err;
		}
		console.log('this University has been was added', res);
	});
};

//=======================================================
//-------------------Notification Schema-------------------
//=======================================================

var notificationSchema = mongoose.Schema({
	senderId: { type: String },
	recipientId: { type: String }, // it represents ownerId when request book ... borrowerId when accept request
	text: { type: String },
	isRead: { type: Boolean },
	createdAt: { type: Date, default: Date.now }
});

//-------------------Notification Model----------------------
var Notification = mongoose.model('notifications', notificationSchema);

var saveNotification = function (notification) {
	var newNotification = new Notification({
		senderId: notification.senderId,
		recipientId: notification.recipientId,
		text: notification.text,
		isRead: notification.isRead,
		createdAt: notification.createdAt
	});

	newNotification.save(function (err, noti) {
		if (err) {
			throw err;
		}
		console.log('this Notification has been was added', noti);
	});
};

//=======================================================
//-------------------My function ------------------------
//=======================================================

//----------Find 4 random universities ---------
var findRandomUnis = function (callback) {
	University.find().random(4, true, callback);
};
//--------- Find  recently added Books ---------
var findRecentlyAddedBooks = function (callback) {
	Book.find().sort({ createdAt: 'desc' }).limit(4).exec(callback);
};

//--------- count Donated Books ---------
var countDonatedBooks = function (callBack) {
	DonatedBook.count({ availability: true }, callBack);
};

//--------- count Universities ---------
var countUniversities = function (callBack) {
	University.count({}, callBack);
};

//--------- count Users---------
var countUsers = function (callBack) {
	User.count({}, callBack);
};

//--------- get the books of a university---------
var getBooksOfUniversity = function (univId, callBack) {
	Book.find({ universityId: univId }).sort({ createdAt: 'desc' }).exec(callBack);
};

//---------get bluePrint book from its Id ---------
var getbluePrintBook = function (bluePrintId, callBack) {
	Book.findOne({ _id: bluePrintId }).exec(callBack);
};

//--------- get the donated books from the bluePrint Book Id ---------
var getDonatedBooks = function (bluePrintId, callBack) {
	DonatedBook.find({ bookId: bluePrintId, availability: true }).sort({ createdAt: 'asc' }).exec(callBack);
};

//-------- get usres names of donated books from profile collection -------
var getDonatedBooksOwnersName = function (usersId, callBack) {
	User.find({ _id: { $in: usersId } }, callBack);
};

//----- Git user's Profile ---------
var getUserProfie = function (userId, callBack) {
	Profile.findOne({ userId: userId }).exec(callBack);
};

// -------- get all Universities ---------
var getAllUniversities = function (callBack) {
	University.find({}).exec(callBack);
};

//-------get donated books as BluePrint books for a specific user -------------
var getDonatedBooksOfUser = function (userId, callBack) {
	DonatedBook.find({ userId: userId, availability: true }, callBack);
};
//--------------------------------------
var getAllBluePrintBooksdonatedByUser = function (bluePrintBooksId, callBack) {
	Book.find({ _id: { $in: bluePrintBooksId } }, callBack);
};
//------------get all books in the system --------------------------
var getAllBooks = function (callBack) {
	Book.find({}, callBack);
};
//------------get the university name --------------------------
var getUnivName = function (univId, callBack) {
	University.findOne({ _id: univId }).select('universityName').exec(callBack);
};
//------------get books requested from the user --------------------------
var getRequestedBooks = function (userId, callBack) {
	RequestedBook.find({ ownerId: userId, isAccepted: false, isIgnored: false }, callBack);
};
//----------find requesters name / owners name for a requeted book ----------
var findRequesterName = function (Ids, callBack) {
	User.find({ _id: { $in: Ids } }).select('userName').exec(callBack);
};
//-------------get books the user has requested -------------------------
var getBooksRequestedByTheUser = function (userId, callBack) {
	RequestedBook.find({ requesterId: userId }, callBack);
};
//-------------updated requested Book to be Accepted-------------------------
var updateRequestedBookToAccepted = function (requesterId, ownerId, requestedDonatedBookId, callBack) {
	RequestedBook.findOneAndUpdate(
		{ requesterId: requesterId, donatedBookId: requestedDonatedBookId, ownerId: ownerId },
		{ isAccepted: true },
		{ new: false }
	).exec(callBack);
};

//-------------updated requested Book to be IGNORED-------------------------
var updateRequestedBookToIgnored = function (requesterId, ownerId, requestedDonatedBookId, callBack) {
	RequestedBook.findOneAndUpdate(
		{ requesterId: requesterId, donatedBookId: requestedDonatedBookId, ownerId: ownerId },
		{ isIgnored: true },
		{ new: false }
	).exec(callBack);
};

//-------------updated DONATED Book to be unavailable-------------------------
var makeDonatedBookUnavailable = function (donatedBookId, callBack) {
	DonatedBook.findByIdAndUpdate({ _id: donatedBookId }, { availability: false }, { new: false }).exec(callBack);
};

//------------get bluePrint books of requested books -----------
var getBluePrintBooks = function (bluePrintBooksId, callBack) {
	Book.find({ _id: { $in: bluePrintBooksId } }).exec(callBack);
};
//----------------get Owner Profile ---------------------
var getOwnerEmailOfRequestedBook = function (ownerId, callBack) {
	User.findOne({ _id: ownerId }).exec(callBack);
};

//-----------get university name from its Id----------------
var getUniversityName = function (univId, callBack) {
	University.findOne({ _id: univId }).exec(callBack);
};
//--------edit Profile---------------
var editProfile = function (profileId, userAvatar, callBack) {
	Profile.findByIdAndUpdate({ _id: profileId }, { userAvatar: userAvatar }, { new: false }).exec(callBack);
};
//---------find user profile----------
var findProfile = function(userId, callBack) {
	Profile.findOne({ userId: userId }).exec(callBack);
};
module.exports.saveBook = saveBook;
module.exports.saveDonatedBook = saveDonatedBook;
module.exports.saveUser = saveUser;
module.exports.saveProfile = saveProfile;
module.exports.saveUniversity = saveUniversity;
module.exports.findRandomUnis = findRandomUnis;
module.exports.findRecentlyAddedBooks = findRecentlyAddedBooks;
module.exports.countDonatedBooks = countDonatedBooks;
module.exports.countUniversities = countUniversities;
module.exports.countUsers = countUsers;
module.exports.getBooksOfUniversity = getBooksOfUniversity;
module.exports.getDonatedBooks = getDonatedBooks;
module.exports.getDonatedBooksOwnersName = getDonatedBooksOwnersName;
module.exports.getbluePrintBook = getbluePrintBook;
module.exports.getUserProfie = getUserProfie;
module.exports.getAllUniversities = getAllUniversities;
module.exports.User = User;
module.exports.getDonatedBooksOfUser = getDonatedBooksOfUser;
module.exports.getAllBluePrintBooksdonatedByUser = getAllBluePrintBooksdonatedByUser;
module.exports.getAllBooks = getAllBooks;
module.exports.saveRequestedBook = saveRequestedBook;
module.exports.saveNotification = saveNotification;
module.exports.getUnivName = getUnivName;
module.exports.getRequestedBooks = getRequestedBooks;
module.exports.getBooksRequestedByTheUser = getBooksRequestedByTheUser;
module.exports.findRequesterName = findRequesterName;
module.exports.updateRequestedBookToAccepted = updateRequestedBookToAccepted;
module.exports.updateRequestedBookToIgnored = updateRequestedBookToIgnored;
module.exports.makeDonatedBookUnavailable = makeDonatedBookUnavailable;
module.exports.getBluePrintBooks = getBluePrintBooks;
module.exports.getOwnerEmailOfRequestedBook = getOwnerEmailOfRequestedBook;
module.exports.getUniversityName = getUniversityName;
module.exports.editProfile = editProfile;
module.exports.findProfile = findProfile;
