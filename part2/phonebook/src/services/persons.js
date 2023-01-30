import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
};

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id,newObject) => {
    return axios.put(`${baseUrl}/${id}`,newObject)
}

const exported = {
    getAll,
    create,
    remove,
    update
}

export default exported
