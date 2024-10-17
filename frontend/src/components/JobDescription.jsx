import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';


const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store => store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyHandler = async () => {
        try{
            const res= await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials: true});

            if(res.data.success){
                setIsApplied(true);
                const updateSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant: user?._id}]}
                dispatch(setSingleJob(updateSingleJob));
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try{
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials: true});

                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position}</Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                    <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary} LPA</Badge>
                </div>
            </div>
            <Button isApplied={isApplied ? null : applyHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? `bg-gray-600 cursor-not-allowed`:`bg-[#7209b7] hover:bg-[#5f32ad]`}`}>{isApplied ? `Already Applied`: `Apply Now`}</Button>
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
        <div className='my-4'>
            <div className='flex'>
            <h1 className='font-bold my-1'>Role: <Badge className='mx-4 pl-4 font-nomal bg-gray-800 px-2 py-1'>{singleJob?.title}</Badge></h1>
            <h1 className='font-bold my-1'>Location: <Badge className='mx-2 pl-4 font-nomal bg-gray-800 px-2 py-1'>{singleJob?.location}</Badge></h1>
            </div>
            <h1 className='font-bold my-1 mt-3'>Description: <div className='mt-3 mb-3 border border-2 border-rounded-lg py-2 px-4  font-nomal text-gray-800'>{singleJob?.description}</div></h1>
            <div className='flex'>
            <h1 className='font-bold my-1 px-2 p-1.5'>Experience: <Badge className='mx-3 px-2 py-1 font-nomal text-red-300 bg-gray-800'>{singleJob?.experience}</Badge></h1>
            <h1 className='font-bold my-1 px-2 py-1.5'>Salary: <Badge className='mx-3 font-nomal bg-gray-800 px-2 py-1'>{singleJob?.salary} LPA</Badge></h1>
            </div>
            <h1 className='font-bold my-1 px-2 py-1.5'>Total Applicants: <span className='pl-4 font-nomal text-gray-800'>{singleJob?.applications.length}</span></h1>
            <h1 className='font-bold my-1 px-2 py-1.5'>Posted Date: <span className='pl-4 font-nomal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
        </div>
    </div>
  )
}

export default JobDescription