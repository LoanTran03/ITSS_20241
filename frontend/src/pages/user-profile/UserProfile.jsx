import { Breadcrumbs, Button, Input } from "@material-tailwind/react";
import { MdHome } from "react-icons/md";
import ImageHolder from "../../assets/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
export default function UserProfile() {
  return (
    <div>
      <Breadcrumbs className=" bg-white text-black">
        <a href="#">
          <MdHome />
        </a>
        <a href="#">...</a>
        <a href="#">Profile</a>
      </Breadcrumbs>
      <div className="w-full p-6">
        <h2 className=" text-3xl">Profile</h2>
        <hr className="w-1/2" />
        <div className="w-full flex flex-row gap-0">
          <div className=" w-1/3 flex justify-center pt-20">
            <img src={ImageHolder} className=" w-60 " />
          </div>
          <div className="w-2/3 flex flex-col gap-3 p-6">
            <div className=" flex flex-row gap-0 w-full items-center ">
              <div className="w-1/6">Name:</div>
              <div className="w-5/6">
                <Input label="Disabled" value={"Name"} disabled />
              </div>
            </div>
            <div className=" flex flex-row gap-0 w-full items-center ">
              <div className="w-1/6">Email:</div>
              <div className="w-5/6">
                <Input label="Disabled" value={"Email"} disabled />
              </div>
            </div>
            <div className=" flex flex-row gap-0 w-full items-center ">
              <div className="w-1/6">Email:</div>
              <div className="w-5/6 flex flex-row gap-3">
                <Input label="Disabled" value={"Year"} disabled />
                <Input label="Disabled" value={"Month"} disabled />
                <Input label="Disabled" value={"Day"} disabled />
              </div>
            </div>
            <div className=" flex flex-row gap-0 w-full items-center ">
              <div className="w-1/6">Phone:</div>
              <div className="w-5/6">
                <Input label="Disabled" value={"000 0000 000"} disabled />
              </div>
            </div>
            <div className=" flex flex-row gap-0 w-full items-center ">
              <div className="w-1/6">Place of work:</div>
              <div className="w-5/6">
                <Input label="Disabled" value={"Place of work"} disabled />
              </div>
            </div>
            <div className=" flex flex-row gap-0 w-full items-center ">
              <div className="w-1/6">Position:</div>
              <div className="w-5/6">
                <Input label="Disabled" value={"Position"} disabled />
              </div>
            </div>

            <Button color="blue" className=" w-20">
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
