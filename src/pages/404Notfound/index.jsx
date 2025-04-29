import { NavLink } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="bg-[#354F52] w-screen h-screen">
      <div className="fixed top-[35%] left-[50%] translate-x-[-50%] text-center">
        <h1 className="text-amber-400 font-semibold text-[100px]">404</h1>
        <p className="text-amber-400 text-lg mb-5">Ushbu qidirilgan page topilmadi!</p>
        <NavLink to="/" className="bg-amber-400 font-medium rounded-lg px-10 py-3">Ortga qaytish</NavLink>
      </div>
    </div>
  )
}

export default Notfound;