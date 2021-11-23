import axios from "axios";

export default class UserService{
    login(values){
        return axios.post("http://localhost:8080/user/add",values)
    }

    getAll(){
        return axios.get("http://localhost:8080/user/getAll")
    }
}