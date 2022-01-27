import './TopicList.css';
import TopicItem from '../TopicItem/TopicItem'

function TopicList({ topics, voteTopic, deleteTopic}) {
    return topics.length ? topics.sort((a, b) => b.score - a.score)
            .map(topic => {
                <TopicItem key={topic._id} topic={topic} voteTopic={voteTopic} deleteTopic={deleteTopic} ></TopicItem>
            }) : <p>No Topics😞</p>
}

export default TopicList;