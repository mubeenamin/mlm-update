import Image from "next/image"


const UserNavbar = () => {

  return (
    <div className="py-3 px-8 bg-white flex justify-between items-center">
        <h2 className="text-2xl font-semibold"> OPUS GLOBAL <span className="text-pink">User-Panel</span></h2>
        <Image src={"/logo.jpeg"} alt="logo" width={50} height={50} className="rounded-full cursor-pointer"/>
       
    </div>
  )
}

export default UserNavbar