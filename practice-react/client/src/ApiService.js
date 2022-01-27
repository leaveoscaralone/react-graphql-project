const BASE_URL = 'http://localhost:3005'

function fetchRequest(path, options) {
    return fetch(BASE_URL + path, options)
    .then(res => res.status < 400 ? res : Promise.reject())
    .then(res => res.status !== 204 ? res.json(): res)
    .catch(err => {
        console.error('Error: ', err);
    })
}

function getTopics() {
    return fetchRequest('/topics');
}

function newTopic(body) {
    return fetchRequest('/topics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

function voteTopic(id, dir) {
    return fetchRequest(`/topics/${id}/${dir}`, { method: 'PUT' })
}

function deleteTopic(id) {
    return fetchRequest(`/topics/${id}`, { method: 'DELETE'})
}

const Apis = {
    getTopics,
    newTopic, 
    voteTopic, 
    deleteTopic
}

export default Apis;