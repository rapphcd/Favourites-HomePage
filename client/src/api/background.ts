import axios from "axios";

export const editBackground = async (file : File) : Promise<boolean> => {
    const data = new FormData();
    data.append('file', file)
    const res = await axios.post("http://localhost:8080/background/upload", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.status == 200
}

export const getBackground = async () : Promise<File> => {
    const res = await axios.get("http://localhost:8080/background/get");
    return res.data.file
}