import axios from '../axios'

export default  class ProjectService {
    static async deleteProject(idProject){
        return await axios.delete(`/project/${idProject}`)
    }
    static async createProject(nameProject){
        return await axios.post(`/project`, {nameProject: nameProject})
    }
    static async getProjects(){
        return await axios.get(`/projects`)
    }
    static async editProject(editData,idProject){
        return await axios.post(`/project/${idProject}/edit`, { ...editData })
    }
}