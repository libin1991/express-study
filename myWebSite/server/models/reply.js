const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const db = require('../lib/mongo');

const ReplySchema = new mongoose.Schema({
    content : { type:String },
    replyer_id: { type:ObjectId }, //个人信息最近回帖：根据其user_id去查询
    article_id: { type:ObjectId },
    topic_title: {type:String},      //topic_id与topic_title作为最近回帖展示的主题信息
  	author_id: {type: String},							    //topic_title:回复的话题title,topic_id:回复的话题id 	
    create_at:{type:String },
    replyer: {
    	name: { type: String},
    	avatar_url: {type: String}
    }
});

ReplySchema.index({replyer_id:1},{create_at:1});
ReplySchema.index({article_id:1});

const Reply = db.model('Reply',ReplySchema);

module.exports = Reply;
