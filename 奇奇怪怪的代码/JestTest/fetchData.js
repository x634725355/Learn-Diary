import axios from "axios";

let kaka = "http://192.168.227.11:7001/kaka";
let error = "http://192.168.227.11:7001/error"

export const fetchData = (fn) => {
    axios.get(kaka).then((response) => {
        console.log("数据是啥", response.data);
        fn(response.data);
    });
}

export const fetchTwoData = () => {
    return axios.get(kaka);
}

export const fetchThreeData = () => {
    return axios.get(error);
}

