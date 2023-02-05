import { Sidebar } from "flowbite-react";
import React from "react";

export default function Trends() {
  return (
    <div className="w-full">
      <Sidebar aria-label="Default sidebar example" className="w-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item>
              <h4 className="border-0 border-b-2 border-solid border-gray-200 pb-1 text-sm font-semibold text-black">
                Trends for you
              </h4>
            </Sidebar.Item>
            <Sidebar.Item href="#" labelColor="alternative">
              <h1 className="text-base font-semibold text-black">#Kanban</h1>
              <p className="text-sm font-medium text-gray-400">213k Tweets</p>
            </Sidebar.Item>
            <Sidebar.Item href="#">
              <h1 className="text-base font-semibold text-black">#Kanban</h1>
              <p className="text-sm font-medium text-gray-400">213k Tweets</p>
            </Sidebar.Item>
            <Sidebar.Item href="#">
              <h1 className="text-base font-semibold text-black">#Kanban</h1>
              <p className="text-sm font-medium text-gray-400">213k Tweets</p>
            </Sidebar.Item>
            <Sidebar.Item href="#">
              <h1 className="text-base font-semibold text-black">#Kanban</h1>
              <p className="text-sm font-medium text-gray-400">213k Tweets</p>
            </Sidebar.Item>
            <Sidebar.Item href="#">
              <h1 className="text-base font-semibold text-black">#Kanban</h1>
              <p className="text-sm font-medium text-gray-400">213k Tweets</p>
            </Sidebar.Item>
            <Sidebar.Item href="#">
              <h1 className="text-base font-semibold text-black">#Kanban</h1>
              <p className="text-sm font-medium text-gray-400">213k Tweets</p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
