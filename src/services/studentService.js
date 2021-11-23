import axios from "axios";

export default class StudentService{
    getStudents(){
        return axios.get("http://localhost:8080/student/getall")
    }

    addStudent(values){
        return axios.post("http://localhost:8080/student/add",values)
    }

    update(values){
        return axios.put("http://localhost:8080/student/update",values)
    }

    getById(id){
        return axios.get('http://localhost:8080/student/getById/'+id)
    }

    delete(id){
        return axios.delete(`http://localhost:8080/student/delete/${id}`)
    }
}