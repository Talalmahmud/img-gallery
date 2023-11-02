"use client";

import Image from "next/legacy/image";
import { useRef, useState } from "react";

const Home: React.FC = () => {
  const [fruits, setFruits] = useState([
    "/assets/image-1.webp",
    "/assets/image-2.webp",
    "/assets/image-3.webp",
    "/assets/image-4.webp",
    "/assets/image-5.webp",
    "/assets/image-6.webp",
    "/assets/image-7.webp",
    "/assets/image-8.webp",
    "/assets/image-9.webp",
    "/assets/image-10.jpeg",
    "/assets/image-11.jpeg",
  ]);

  const dragItem = useRef<number | null>(null);
  const dragOverITem = useRef<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // check in filter
  const handleCheckboxChange = (index: number) => {
    const updatedSelectedItems = [...selectedItems];
    const itemIndex = updatedSelectedItems.indexOf(index);

    if (itemIndex === -1) {
      updatedSelectedItems.push(index);
    } else {
      updatedSelectedItems.splice(itemIndex, 1);
    }

    setSelectedItems(updatedSelectedItems);
  };

  // drag and drop replace and sorting item

  const sortingItem = () => {
    if (dragItem.current !== null && dragOverITem.current !== null) {
      const allFruits = [...fruits];
      const draggedItem = allFruits[dragItem.current];
      const itemIndex = allFruits.indexOf(draggedItem);
      allFruits.splice(dragItem.current, 1);
      allFruits.splice(dragOverITem.current, 0, draggedItem);

      dragItem.current = null;
      dragOverITem.current = null;
      setFruits(allFruits);
    }
  };

  // item delete and item update

  const handleDeleteSelected = (): void => {
    const updatedFruits = fruits.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setFruits(updatedFruits);
    setSelectedItems([]);
  };

  return (
    <main className="flex min-h-screen bg-gray-200 flex-col justify-center items-center p-4 sm:p-8">
      <div className="bg-white w-full shadow-lg rounded-[10px]">
        {/*  selected item amount show and delete */}
        <div className="flex justify-between bg-white shadow-md items-center w-full px-4 py-2 border-b-2">
          <div>
            {selectedItems.length > 0 ? (
              <div className="flex items-center gap-x-[4px]">
                <input
                  type="checkbox"
                  checked
                  readOnly
                  className="bg-blue-700 h-[20px] w-[20px] p-1"
                />
                <span> {selectedItems.length} file selected</span>
              </div>
            ) : (
              <p className=" text-md font-bold">Gallery</p>
            )}
          </div>
          <div>
            {selectedItems.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="text-red-500 hover:underline"
              >
                Delete file
              </button>
            )}
          </div>
        </div>

        {/* card section */}
        <div className=" grid grid-flow-dense bg-white p-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-4">
          {fruits.map((item, index) => (
            <div
              key={index}
              className={`relative bg-black border-2 text-[20px] min-h-[200px] cursor-pointer ${
                index === 0
                  ? " col-span-2 row-span-2 "
                  : "col-span-0 row-span-0 "
              } font-bold justify-center items-center flex rounded-md group overflow-hidden transition-all duration-300 transform ${
                dragItem.current === index ? "scale-110" : ""
              }`}
              draggable
              onTouchStart={() => (dragItem.current = index)}
              onTouchMove={() => (dragOverITem.current = index)}
              onTouchEnd={sortingItem}
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverITem.current = index)}
              onDragEnd={sortingItem}
              onDragOver={(e) => e.preventDefault()}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Image
                src={item}
                layout="fill"
                alt=""
                className="group-hover:opacity-50"
              />
              {(selectedItems.includes(index) || hoveredItem === index) && (
                <input
                  type="checkbox"
                  className="absolute h-[20px] w-[20px] cursor-pointer top-2 left-2 z-10"
                  checked={selectedItems.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              )}
            </div>
          ))}
          <div className=" bg-red-400"></div>
        </div>
      </div>
    </main>
  );
};

export default Home;
