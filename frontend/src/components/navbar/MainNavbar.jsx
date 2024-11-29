import { Avatar, IconButton, Chip } from "@material-tailwind/react";
import AvatarImage from "../../assets/T02QFU9TCTD-U02RG3RP57C-6820f0c8ad64-512.png";
import { FaRegBell } from "react-icons/fa";
export default function MainNavbar() {
  return (
    <div className=" h-16 px-6 gap-12 w-full flex flex-row justify-end items-center ">
      <div className="relative">
        <IconButton variant="text" className="relative rounded-full">
          <FaRegBell className=" h-8 w-8" />
        </IconButton>
        <Chip
          value="0"
          size="sm"
          variant="filled"
          color="blue"
          className="absolute top-0 right-0 translate-x-1 -translate-y-2 rounded-full "
        />
      </div>
      <div>
        <Avatar src={AvatarImage} alt="avatar" />
      </div>
    </div>
  );
}
