import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { Input, Button } from "@nextui-org/react";

const LoginForm = () => {
  const { handleLogin } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  return (
    <div className="LoginForm backdrop-blur-lg rounded-full border border-success mt-6  container max-w-sm m-auto  justify-center flex flex-column">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(formData);
        }}
      >
        <div className="form-group m-3">
          <Input
            label="Username"
            isClearable
            onClear={() => setFormData({ ...formData, username: "" })}
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],

              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            name="username"
            value={formData.username}
            onChange={handleChange}
            isRequired
          />
        </div>
        <div className="form-group m-4">
          <Input
            type="password"
            label="Password"
            isClearable
            onClear={() => setFormData({ ...formData, password: "" })}
            radius="lg"
            autoComplete="off"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            name="password"
            value={formData.password}
            onChange={handleChange}
            isRequired
          />
        </div>
        <div className="form-group">
          <Button
            type="submit"
            color="success"
            auto
            size="large"
            radius="lg"
            className="shadow-xl mt-4 rounded-b-none text-white/90 font-bold"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
