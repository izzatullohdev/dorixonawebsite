import { Input } from "antd";

const { TextArea } = Input;

const Register = () => {
  return (
    <div className="py-10">
      <h1 className="text-center font-medium text-[28px] pb-5">
        Register form
      </h1>
      <div className="container mx-auto flex items-center justify-center rounded-lg">
        <form action="" className="w-[600px] max-md:w-[90vw] flex flex-col items-center gap-3">
          <Input type="text" placeholder="Name" className="text-[17px]"/>
          <Input type="email" placeholder="Email" className="text-[17px]"/>
          <TextArea placeholder="Your message..." rows={4} className="text-[17px]"/>
          <button className="w-full text-[#EECB98] font-medium bg-[#354f52] rounded-md px-12 mt-2 py-2">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;