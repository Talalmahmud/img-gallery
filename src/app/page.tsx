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
                priority
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
          <label className=" bg-slate-200 border-black border-2 border-dotted rounded-[10px] flex justify-center items-center cursor-pointer">
            <div className=" flex flex-col justify-center items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="true"
                className=" h-[24px] w-[24px]"
              >
                <path d="M 0 2 L 0 22 L 24 22 L 24 2 Z M 2 4 L 22 4 L 22 20 L 2 20 Z M 17 7 C 15.894531 7 15 7.894531 15 9 C 15 10.105469 15.894531 11 17 11 C 18.105469 11 19 10.105469 19 9 C 19 7.894531 18.105469 7 17 7 Z M 7.875 9.78125 L 4 12.53125 L 4 18 L 20 18 L 20 14.84375 L 15.9375 12.375 L 12.53125 13.90625 Z"></path>
              </svg>
              <p>Add Images</p>
            </div>
            <input
              type="file"
              name=""
              id=""
              className="hidden"
              accept=".jpeg,.jpg,.webp,.png"
            />
          </label>
        </div>
      </div>
    </main>
  );
};

export default Home;
