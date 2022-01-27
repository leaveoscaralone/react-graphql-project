import "./TopicItem.css";
import moment from "moment";

function TopicItem({ topic, voteTopic, deleteTopic }) {
  return (
    <div className="topic_wrapper">
      <div className="vote_area">
        <button className="vote_btn" onClick={() => voteTopic(topic._id, 'up')}>🔼</button>
        <h3 className="score">{topic.score}</h3>
        <button className="vote_btn" onClick={() => voteTopic(topic._id, 'down')}>🔽</button>
      </div>
      <div className="topic_content">
        <h2 className="title">{topic.title}</h2>
        <p className="date">{moment(topic.datePosted).format("MMM Do")}</p>
      </div>
      <div className="delete_item">
        <button className="delete_btn" onClick={() => deleteTopic(topic._id)}>🪓</button>
      </div>
    </div>
  );
}

export default TopicItem;
