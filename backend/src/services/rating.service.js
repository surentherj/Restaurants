const { default: mongoose } = require("mongoose");
const ratings = require("../model/rating.model");
const { upsertData } = require("../utils/mongo/mongoDao");

exports.addrating = async (body, createdBy) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rating = new ratings({ ...body, createdBy });
      await rating.save();
      resolve(await ratings.findOne(body).sort({ createdAt: -1 }));
    } catch (err) {
      reject(err);
    }
  });
};

exports.updaterating = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { response: ratingDetail } = await upsertData(
        { _id: body.id },
        ratings,
        body
      );
      resolve(ratingDetail);
    } catch (err) {
      reject(err);
    }
  });
};

exports.getratings = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = {};
      result = await ratings
        .find({
          list: id,
          $or: [
            { reply: { $exists: false } },
            { reply: { $in: [null, new mongoose.Types.ObjectId()] } },
            { reply: new mongoose.Types.ObjectId() },
          ],
        })
        .populate({ path: "createdBy", select: "name" })
        .sort({ createdAt: -1 });
      let output = [];
      for (let res of result) {
        let reply = await ratings
          .find({
            reply: res.id,
          })
          .populate({ path: "createdBy", select: "name" })
          .sort({ createdAt: 1 });
        output.push({ ...JSON.parse(JSON.stringify(res)), reply });
      }
      resolve(output);
    } catch (err) {
      reject(err);
    }
  });
};

exports.deleterating = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await ratings.deleteOne({ _id: id });
      ratings.deleteMany({ reply: id });
      resolve(result || {});
    } catch (err) {
      reject(err);
    }
  });
};
