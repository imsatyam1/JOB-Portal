const { setSingleCompany } = require("@/redux/companySlice");
const { COMPANY_API_END_POINT } = require("@/utils/constant");
const { useEffect } = require("react");
const { useDispatch } = require("react-redux")

const useGetCompanyById = (comapanyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${comapanyId}`, {withCredentials: true});
                if(res.data.success){
                     dispatch(setSingleCompany(res.data.company));
                }
            }
            catch(error){
                console.log(error);
                
            }
        }
        fetchSingleCompany();
    },[]);
}

export default useGetCompanyById;