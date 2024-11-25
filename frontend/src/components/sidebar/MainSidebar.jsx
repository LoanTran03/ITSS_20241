import { List, ListItem } from "@material-tailwind/react";

export default function MainSidebar() {
  return (
    <div className="w-full h-full p-3 border-2">
      <div className=" text-2xl font-bold mb-6">LOGO</div>
      <div className="w-full">
        <List className=" w-full ">
          <ListItem>Dashboard</ListItem>
          <ListItem>Schedule</ListItem>
          <ListItem>Target</ListItem>
          <ListItem>Statistics</ListItem>
          <ListItem>Nutrition</ListItem>
        </List>
      </div>
    </div>
  );
}
