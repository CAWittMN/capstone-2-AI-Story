const Header = () => {
  return (
    <div className="h-100 p-20">
      <h1
        className="m-auto text-4xl select-none text-center mt-20 mx-20"
        style={{
          fontFamily: "Alice",
          fontWeight: "bold",
          fontSize: "8rem",
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
