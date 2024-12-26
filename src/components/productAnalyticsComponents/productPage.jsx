import React from 'react';
import MainComponent from "./MainComponent";
import TaskScheduler from "./TaskScheduler"; 

function ProductPage() {
  return (
    <div className='flex-1 '>
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="flex-1 flex mx-auto">
          <div className="flex-1 flex flex-col">
            {/* <Header /> */}
            <MainComponent />
          </div>
          <TaskScheduler />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
