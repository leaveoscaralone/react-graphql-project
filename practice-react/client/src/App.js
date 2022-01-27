import './App.css';
import { useState, useEffect } from 'react'
import TopicList from './TopicList/TopicList'
import Apis from './ApiService'

function App() {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    Apis.getTopics()
    .then(result => {setTopics(result)})
  }, [])

  function voteTopic(id, dir) {
    Apis.voteTopic(id, dir)
    .then(votedTopic => {
      setTopics(topicList => {
        const topicToUpdate = topicList.find(topic => topic._id === id);
        topicToUpdate.score = votedTopic.score;
        return [...topicList]
      })
    })
  }

  function deleteTopic(id) {
    Apis.deleteTopic(id)
    .then(setTopics(sansDeleted => sansDeleted.filter(topic => topic._id !== id)));
  }


  return (
    <div className="App">
      <TopicList topics={topics} voteTopic={voteTopic} deleteTopic={deleteTopic} ></TopicList>
    </div>
  );
}

export default App;
