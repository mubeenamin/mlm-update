import Image from "next/image"
import Link from "next/link"


const HomeNav = () => {
    return (

        <main className=" mt-4 mb-4 px-4 mx-auto max-w-7xl sm:px-6">
            <nav className=" flex items-center justify-between  justify-center">
                    <div className="flex items-center ">
                        <div className="flex items-center justify-between w-full md:w-auto">
                            <Link href="/" className="flex items-center">
                                <Image src="/logos.png" alt="logo" width={80} height={80} className="" />
                            </Link>
                        </div>
                    </div>
                    <div className="flex space-x-2 md:space-x-10 list-none">
                        <li>
                            <Link
                                href="/"
                                className="text-base font-normal text-gray-500 list-none hover:text-gray-900" >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                                target=""
                            >
                                About
                            </Link>
                        </li> <li>
                            <Link
                                href="/contact-us"
                                className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                                target=""
                            >
                                Contact Us
                            </Link>
                        </li>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="inline-flex rounded-full shadow">
                            <Link href="/signIn" className="inline-flex items-center px-4 py-2 text-base text-white bg-mlmSkyLight border border-transparent rounded-full cursor-pointer font-base hover:bg-mlmSky ">
                                Login
                            </Link>
                        </div>
                    </div>
                </nav>
             </main>


    )
}

export default HomeNav