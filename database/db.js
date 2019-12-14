var mongoose = require('mongoose');
require('mongoose-query-random');
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//-------------------MongoURI----------------------------
const URI = 'mongodb+srv://bookbank:bookbank@book-bank-3ough.mongodb.net/test?retryWrites=true&w=majority';

//-------------------Connection Setup-------------------------
mongoose.connect(URI, function(err, db) {
	if (err) {
		console.log('Unable to connect to the server. Please start the server. Error:', err);
	} else {
		console.log('Mongoose Connected to Server successfully!');
	}
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
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

var saveBook = function(book, callBack) {
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

var saveDonatedBook = function(donatedBook, callBack) {
	console.log('in save function');
	var newDonatedBook = new DonatedBook({
		userId: donatedBook.userId,
		bookId: donatedBook.bookId,
		availability: donatedBook.availability,
		createdAt: donatedBook.createdAt
	});

	newDonatedBook.save(callBack);
};

//=======================================================
//-------------------Requested Book Schema---------------
//=======================================================
var requestedBooksSchema = mongoose.Schema({
	requesterId: { type: String }, // the user who sent the request.
	ownerId: { type: String }, // the who donated the book
	bookId: { type: String }, // Id of the BluePrint book
	donatedBookId: { type: String },
	createdAt: { type: Date, default: Date.now }
});

//-------------------Requested Book Model-------------------------
let RequestedBook = mongoose.model('requested-books', requestedBooksSchema);

var saveRequestedBook = function(requestedBook, callBack) {
	// console.log('in save function');
	var newRequestedBook = new RequestedBook({
		requesterId: requestedBook.requesterId,
		ownerId: requestedBook.ownerId,
		bookId: requestedBook.bookId,
		donatedBookId: requestedBook.donatedBookId,
		createdAt: requestedBook.createdAt
	});

	newRequestedBook.save(callBack);
};

//=======================================================
//-------------------User Schema-------------------------
//=======================================================
var userSchema = mongoose.Schema({
	userName: { type: String },
	email: { type: String, unique: true },
	password: { type: String }
});
//-------------------User Model-------------------------
var User = mongoose.model('user', userSchema);

var saveUser = function(user) {
	var newUser = new User({
		userName: user.userName,
		email: user.email,
		password: user.password
	});

	newUser.save(function(err, res) {
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

var saveProfile = function(profile) {
	var newProfile = new Profile({
		userId: profile.userId,
		universityId: profile.universityId,
		userAvatar: profile.userAvatar
	});

	newProfile.save(function(err, res) {
		if (err) {
			throw err;
		}
		console.log('this profile has been was added', res);
	});
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

var saveUniversity = function(uni) {
	var newUniversity = new University({
		universityName: uni.universityName,
		universityImg: uni.universityImg
	});

	newUniversity.save(function(err, res) {
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

var saveNotification = function(notification) {
	var newNotification = new Notification({
		senderId: notification.senderId,
		recipientId: notification.recipientId,
		text: notification.text,
		isRead: notification.isRead,
		createdAt: notification.createdAt
	});

	newNotification.save(function(err, noti) {
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
var findRandomUnis = function(callback) {
	University.find().random(4, true, callback);
};
//--------- Find  recently added Books ---------
var findRecentlyAddedBooks = function(callback) {
	Book.find().sort({ createdAt: 'desc' }).limit(4).exec(callback);
};

//--------- count Donated Books ---------
var countDonatedBooks = function(callBack) {
	DonatedBook.count({}, callBack);
};

//--------- count Universities ---------
var countUniversities = function(callBack) {
	University.count({}, callBack);
};

//--------- count Users---------
var countUsers = function(callBack) {
	User.count({}, callBack);
};

//--------- get the books of a university---------
var getBooksOfUniversity = function(univId, callBack) {
	Book.find({ universityId: univId }).sort({ createdAt: 'desc' }).exec(callBack);
};

//---------get bluePrint book from its Id ---------
var getbluePrintBook = function(bluePrintId, callBack) {
	Book.findOne({ _id: bluePrintId }).exec(callBack);
};

//--------- get the donated books from the bluePrint Book Id ---------
var getDonatedBooks = function(bluePrintId, callBack) {
	DonatedBook.find({ bookId: bluePrintId }).sort({ createdAt: 'asc' }).exec(callBack);
};

//-------- get usres names of donated books from profile collection -------
var getDonatedBooksOwnersName = function(usersId, callBack) {
	User.find({ _id: { $in: usersId } }, callBack);
};

//----- Git user's Profile ---------
var getUserProfie = function(userId, callBack) {
	Profile.findOne({ _id: userId }).exec(callBack);
};

// -------- get all Universities ---------
var getAllUniversities = function(callBack) {
	University.find({}).exec(callBack);
};

//-------get donated books as BluePrint books for a specific user -------------
var getDonatedBooksAsBluePrintsForUser = function(userId, callBack) {
	DonatedBook.find({ userId: userId }, callBack);
};
//--------------------------------------

var getAllBluePrintBooksdonatedByUser = function(bluePrintBooksId, callBack) {
	Book.find({ _id: { $in: bluePrintBooksId } }, callBack);
};
//--------------------------------------

var getAllBooks = function(callBack) {
	Book.find({}, callBack);
};
//--------------------------------------
var getUnivName = function(univId, callBack) {
	University.findOne({ _id: univId }).select('universityName').exec(callBack);
};
//--------------------------------------
var getRequestedBooks = function(userId, callBack) {
	RequestedBook.find({ ownerId: userId }, callBack);
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
module.exports.getDonatedBooksAsBluePrintsForUser = getDonatedBooksAsBluePrintsForUser;
module.exports.getAllBluePrintBooksdonatedByUser = getAllBluePrintBooksdonatedByUser;
module.exports.getAllBooks = getAllBooks;
module.exports.saveRequestedBook = saveRequestedBook;
module.exports.saveNotification = saveNotification;
module.exports.getUnivName = getUnivName;
module.exports.getRequestedBooks = getRequestedBooks;
