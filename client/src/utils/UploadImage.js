import Axios from "./Axios";
import SammaryApi from "../common/SummaryApi";
import AxiosTostError from "./AxiosTostError";

const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append("image", image);
        const response = await Axios({
            ...SammaryApi.upload,
            data: formData
        })
        return response
    } catch (error) {
        AxiosTostError(error);
    }
}

export default uploadImage