import Axios from './Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosTostError from './AxiosTostError';

export const fetchUserDitails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDitails
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export default fetchUserDitails