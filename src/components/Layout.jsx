/* eslint-disable react/prop-types */

import { ToastContainer } from "react-toastify";
import Banner from "./Banner";
import Footer from "./Footer";
import Navbar from "./Navbar";
import TasksBoard from "./TasksBoard";
import TasksProvider from "../contexts/TasksContext";

const Layout = () => {
  return (
    <div className="bg-[#191D26] font-[Inter] text-white">
      <Navbar />
      <Banner />

      <TasksProvider>
        <TasksBoard />
      </TasksProvider>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
