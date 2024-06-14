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
      <div className="flex  h-[500px] flex-row md:flex-col   w-full z-[99999]  ">
        <div className=" flex flex-col md:flex-row border-gray-400 rounded-md overflow-hidden overflow-y-scroll md:overflow-x-scroll md:overflow-y-hidden items-center justify-start gap-5 md:h-[200px] h-[500px] scrollbar-thin ">
          {images?.map((image, index) => (
            <img
              src={images[index]}
              onClick={() => setImgInd(index)}
              key={index}
              className="object-contain cursor-pointer rounded-lg   w-full h-[83px]"
            />
          ))}
        </div>
        <div className=" relative h-[500px] rounded-lg overflow-hidden">
          <span
            onClick={() => changeImage("left")}
            className="absolute pl-4 bottom-[250px] left-0 cursor-pointer"
          >
            <BiLeftArrow color="gray" size={13} />
          </span>
          <div className="h-[500px] md:h-[350px]">
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
            <BiRightArrow color="gray" size={13} />{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
