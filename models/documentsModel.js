const { Schema, model } = require("mongoose");
const SectionModel = require("./sectionsModel");
const documentsSchema = Schema(
  {
    // section: {
    //   name: {
    //     ar: {
    //       type: String,
    //       required: [true, "please enter the section name in Arabic"],
    //     },
    //     en: {
    //       type: String,
    //       required: [true, "please enter the section name in English"],
    //     },
    //   },
    // },

    question: {
      ar: {
        type: String,
        required: [true, "please fill the question in Arabic"],
      },
      en: {
        type: String,
        required: [true, "please fill the question in English"],
      },
      subQuest: {
        ar: {
          type: String,
          required: [true, "please fill the sub question in Arabic"],
        },
        en: {
          type: String,
          required: [true, "please fill the sub question in English"],
        },
      },
    },
    options: {
      ar: {
        type: [String],
        required: [true, "Arabic choices is required, please fill it"],
      },
      en: {
        type: [String],
        required: [true, "English choices is required, please fill it"],
      },
    },
    description: {
      ar: String,
      en: String,
    },
    auther: {
      type: String,
      default: "user123",
    },
    category: [
      {
        type: Schema.ObjectId,
        ref: SectionModel,
        required: [
          true,
          "category is required to point to the correct question section",
        ],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true } },
  { toObject: { virtuals: true } }
);
const documentModel = model("documents", documentsSchema);
documentsSchema.pre("find", function (next) {
  // this.populate({ path: "category" });
  next();
});
// documentsSchema.virtual("section", {
//   ref: "sectionsSchema",
//   localField: "questions",
//   foreignField: "category",
// });

module.exports = documentModel;
