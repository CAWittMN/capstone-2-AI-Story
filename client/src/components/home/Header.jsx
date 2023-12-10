const Header = () => {
  return (
    <div className="md:w-2/4 w-full flex justify-center items-center rounded-full">
      <h1
        className="text-[4.5rem] mb-5 z-10 md:text-[8rem] select-none flex justify-center items-center"
        style={{
          fontFamily: "Alice",

          fontWeight: "bold",
        }}
      >
        <span
          className="text-transparent drop-shadow-md bg-clip-text bg-gradient-to-r to-sky-400 via-purple-300 from-green-500"
          style={{
            filter:
              "saturate(75%) brightness(120%) drop-shadow(0 0 0.5rem #fff)",
          }}
        >
          Story
        </span>
        <span
          style={{
            filter:
              "saturate(30%) brightness(200%) drop-shadow(0 0 0.5rem #fff)",
          }}
        >
          Gen
        </span>
      </h1>
      <div className="md:w-[580px] z-2 drop-shadow-lg w-full  rounded-full border-black border-[3rem]  blur-3xl  fixed"></div>
    </div>
  );
};

export default Header;
