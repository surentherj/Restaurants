const lists = require("../model/list.model");
const ratings = require("../model/rating.model");
const { upsertData } = require("../utils/mongo/mongoDao");

exports.addlist = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const List = new lists(body);
      await List.save();
      resolve(await lists.findOne(body).sort({ createdAt: -1 }));
    } catch (err) {
      reject(err);
    }
  });
};

exports.updatelist = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { response: listDetail } = await upsertData(
        { _id: body.id },
        lists,
        body
      );
      resolve(listDetail);
    } catch (err) {
      reject(err);
    }
  });
};

exports.getLists = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { startAt = 0, maxResult = 20, searchValue } = body;
      let searchObj = {};
      if (searchValue) {
        searchObj = {
          $or: [
            { name: { $regex: searchValue, $options: "i" } },
            { owner: { $regex: searchValue, $options: "i" } },
            { address: { $regex: searchValue, $options: "i" } },
            { description: { $regex: searchValue, $options: "i" } },
          ],
        };
      }
      let result = {};
      result.total = await lists.countDocuments(searchObj);
      result.lists = await lists
        .find(searchObj)
        .skip(startAt)
        .limit(maxResult)
        .sort({ name: 1 });
      result.startAt = startAt;
      result.searchValue = searchValue;
      result.maxResult = result?.lists?.length || 0;
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

exports.deleteList = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await lists.deleteOne({ _id: id });
      resolve(result || {});
    } catch (err) {
      reject(err);
    }
  });
};

exports.getDashboardData = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let barChart = await ratings.aggregate([
        {
          $lookup: {
            from: "lists",
            localField: "list",
            foreignField: "_id",
            as: "restaurant",
          },
        },
        {
          $unwind: "$restaurant",
        },
        {
          $group: {
            _id: {
              restaurantName: "$restaurant.name",
              nonVeg: "$restaurant.nonVeg",
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            restaurantName: "$_id.restaurantName",
            nonVeg: "$_id.nonVeg",
            count: 1,
          },
        },
        {
          $sort: { restaurantName: 1 },
        },
      ]);

      let labels = [];
      let vegData = [];
      let nonVegData = [];

      barChart.forEach((item) => {
        labels.push(item.restaurantName);
        if (item.nonVeg) {
          nonVegData.push(item.count);
          vegData.push(0);
        } else {
          vegData.push(item.count);
          nonVegData.push(0);
        }
      });

      let datasets = [
        {
          label: "Veg",
          backgroundColor: "#b80f0f",
          borderColor: "#b80f0f",
          data: vegData,
        },
        {
          label: "Non-Veg",
          backgroundColor: "#42b80f",
          borderColor: "#42b80f",
          data: nonVegData,
        },
      ];

      labels = labels || [];
      datasets = datasets || [];

      let piechart = await ratings.aggregate([
        {
          $group: {
            _id: "$list",
            averageRating: { $avg: "$rating" },
          },
        },
        {
          $lookup: {
            from: "lists",
            localField: "_id",
            foreignField: "_id",
            as: "restaurant",
          },
        },
        {
          $unwind: "$restaurant",
        },
        {
          $project: {
            _id: 0,
            nonVeg: "$restaurant.nonVeg",
            averageRating: 1,
          },
        },
      ]);

      const data = piechart.reduce((acc, curr) => {
        const key = curr.nonVeg ? "Non-Veg" : "Veg";
        acc[key] = acc[key] || { count: 0, totalRating: 0 };
        acc[key].count++;
        acc[key].totalRating += curr.averageRating;
        return acc;
      }, {});
      let pielabels = Object.keys(data);
      let counts = Object.values(data).map((item) => item.count);
      resolve({
        pieChart: { labels: pielabels, datasets: counts },
        barChart: { labels, datasets },
      });
    } catch (err) {
      reject(err);
    }
  });
};
