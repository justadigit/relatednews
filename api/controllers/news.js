// index , detail , post_news , delete_news , update_news

const News = require('../../models/News');
const index = (req, res) => {
  News.find()
    .populate('categoryId')
    .sort({ createdAt: -1 })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ Messge: 'No Data Yet' });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
const detail = (req, res) => {
  const id = req.params.id;
  News.findById(id)
    .populate('categoryId')
    .then((newsdata) => {
      News.find()
        .populate('categoryId')
        .select('_id title body newsImage relatedImage')
        .then((datas) => {
          let related = datas.filter((item) => {
            // console.log(typeof item._id , item._id);
            // console.log(typeof newsdata._id , newsdata._id);
            // console.log(Object.is(item._id.toString(),newsdata._id.toString()));
            return (
              item._id.toString() !== newsdata._id.toString() &&
              item.categoryId.name == newsdata.categoryId.name
            );
          });

          res.status(200).json({
            news: {
              id: newsdata._id,
              title: newsdata.title,
              body: newsdata.body,
              newsImage: newsdata.newsImage,
              relatedImage: newsdata.relatedImage,
              type: newsdata.categoryId.name,
              updatedAt: newsdata.updatedAt,
            },
            relatednews: related,
          });
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
const post_news = async (req, res) => {
  const title = await req.body.title;
  const body = await req.body.body;
  const newsImage = await req.files.newsImage;
  console.log(newsImage[0].path);
  const relatedImage = await req.files.relatedImage;
  let relatedArr = [];

  relatedImage.map((item) => {
    relatedArr.push(item.path);
  });
  const news = new News({
    title: title,
    body: body,
    newsImage: newsImage[0].path,
    relatedImage: relatedArr,
    categoryId: req.body.categoryId,
  });
  news
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
module.exports = {
  index,
  detail,
  post_news,
};
