import { useState, useContext, useMemo } from "react";
import AppContext from "../../context/AppContext";
import { Input, Button } from "@nextui-org/react";

const SignupForm = () => {
  const { handleSignup } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    age: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const emailIsInvalid = useMemo(() => {
    if (formData.email === "") return false;
    return validateEmail(formData.email) ? false : true;
  }, [formData.email]);

  return (
    <div className="SignupForm backdrop-blur-lg rounded-3xl border border-success mt-6  container max-w-sm m-auto  justify-center flex flex-column">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup(formData);
        }}
      >
        <div className="form-group m-3">
          <Input
            label="Username"
            color={formData.username.length < 3 ? "danger" : "success"}
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
            label="Password"
            type="password"
            isClearable
            onClear={() => setFormData({ ...formData, password: "" })}
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
        <div className="form-group m-4">
          <Input
            label="Email"
            isClearable
            onClear={() => setFormData({ ...formData, email: "" })}
            isInvalid={emailIsInvalid}
            errorMessage={
              emailIsInvalid && "Please enter a valid email address."
            }
            color={emailIsInvalid && "danger"}
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            isRequired
          />
        </div>
        <div className="form-group m-4">
          <Input
            label="First Name"
            isClearable
            onClear={() => setFormData({ ...formData, firstName: "" })}
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
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            isRequired
          />
        </div>
        <div className="form-group m-4">
          <Input
            label="Last Name"
            isClearable
            onClear={() => setFormData({ ...formData, lastName: "" })}
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
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            isRequired
          />
        </div>
        <div className="form-group m-4">
          <Input
            label="Age"
            placeholder="0"
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
            name="age"
            value={formData.age}
            onChange={handleChange}
            type="number"
            isRequired
          />
        </div>
        <div className="form-group m-4">
          <Input
            label="Gender"
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
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            isRequired
          />
        </div>
        <Button
          type="submit"
          color="success"
          auto
          size="large"
          radius="lg"
          className="shadow-xl mt-4 rounded-b-none text-white/90 font-bold"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
