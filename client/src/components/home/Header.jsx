const Header = () => {
  return (
    <div className="w-full  backdrop-blur-md rounded-full backdrop-brightness-[65%]">
      <h1
        className="m-auto w-full text-[4.5rem] md:text-[8rem] select-none text-center "
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
    </div>
  );
};

export default Header;
