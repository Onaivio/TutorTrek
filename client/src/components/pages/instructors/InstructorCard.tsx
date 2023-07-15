import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { InstructorApiResponse } from "../../../api/types/apiResponses/apiResponseInstructors";

const InstructorCard: React.FC<InstructorApiResponse> = ({
  firstName,
  lastName,
  email,
  subjects,
  qualification,
  skills,
  profilePic,
  about,
}) => {
  return (
    <Card
      shadow={false}
      className='relative grid h-[24rem] w-[24rem] shadow-md cursor-pointer border-gray-200 text-customFontColorBlack max-w-[23rem] items-end justify-center overflow-hidden text-center'
    >
      <CardHeader
        floated={false}
        shadow={false}
        color='transparent'
        className='absolute pt-16 inset-0 m-0  w-full rounded-none bg-cover bg-center'
      >
        <Avatar
          size='xxl'
          variant='circular'
          alt='tania andrew'  
          className='border-2 border-white'
          src={profilePic?profilePic:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
        />
        <Typography variant='h5' className='mb-4'>
          {firstName + " " + lastName}
        </Typography>
        <Typography variant='p' className=''>
          {about}
        </Typography>
      </CardHeader>
      <CardBody
        className='relative  px-6 md:px-12'
        style={{ height: "calc(100% - 16rem)" }}
      >
        <Typography
          variant='h6'
          color='black'
          className='mb-6 font-medium leading-[1.5]'
        >
          {skills+", "+subjects+", "+qualification},
        </Typography>
      </CardBody>
    </Card>
  );
};

export default InstructorCard;
