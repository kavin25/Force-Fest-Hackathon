// const mongoose = require("mongoose");
// const marked = require("marked");
// const slugify = require("slugify");
// const createDomPurify = require("dompurify");
// const { JSDOM } = require("jsdom");
// const dompurify = createDomPurify(new JSDOM().window);
// const db3 = require("../config/keys").MongoURI;
// const conn3 = mongoose.createConnection(db3);

// var Article = conn3.model(
//   "Article",
//   new mongoose.Schema({
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     markdown: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     sanitizedHtml: {
//       type: String,
//       required: true,
//     },
//   })
// );

// articleSchema.pre("validate", function (next) {
//   if (this.title) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//   }

//   if (this.markdown) {
//     this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
//   }

//   next();
// });

// module.exports = Article;

const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const db3 = require("../config/keys").MongoURI;
const conn3 = mongoose.createConnection(db3);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
  }

  next();
});

module.exports = conn3.model("Article", articleSchema);
