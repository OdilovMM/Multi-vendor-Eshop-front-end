import { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const ImageSlider = ({ images }) => {
  const [imgInd, setImgInd] = useState(0);

  const changeImage = (arrow) => {
    if (arrow === "left") {
      if (imgInd === 0) {
        setImgInd(images.length - 1);
      } else {
        setImgInd(imgInd - 1);
      }
    } else {
      if (imgInd === images.length - 1) {
        setImgInd(0);
      } else {
        setImgInd(imgInd + 1);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between gap-2 h-[500px] flex-row w-full z-[99999]  ">
        <div className="w-2/12 flex flex-col border-gray-400 rounded-md overflow-hidden overflow-y-scroll items-center justify-start gap-5 h-[500px] scrollbar-thin ">
          {images?.map((image, index) => (
            <img
              src={images[index]}
              onClick={() => setImgInd(index)}
              key={index}
              className="object-contain cursor-pointer rounded-lg border border-gray-500 w-full h-[83px] "
            />
          ))}
        </div>
        <div className="w-10/12 relative h-[500px] rounded-lg border border-gray-400 overflow-hidden">
          <span
            onClick={() => changeImage("left")}
            className="absolute pl-4 bottom-[250px] left-0 cursor-pointer"
          >
            <BiLeftArrow color="black" size={26} />
          </span>
          <div className="h-[500px]">
            <img
              src={images?.[imgInd]}
              alt=""
              className="w-full h-full object-contain cursor-pointer"
            />
          </div>
          <span
            onClick={() => changeImage("right")}
            className=" absolute pr-4 right-0   bottom-[250px] cursor-pointer"
          >
            <BiRightArrow color="black" size={26} />{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
