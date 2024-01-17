import {
  Facebook,
  Instagram,
  Linkedin,
  SendHorizonal,
  Twitter,
} from "lucide-react";

const navigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  my_account: [
    { name: "My Account", href: "#" },
    { name: "Login / Register", href: "#" },
    { name: "Cart", href: "#" },
    { name: "Wishlist", href: "#" },
    { name: "Shop", href: "#" },
  ],
  quick_link: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Contact", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: <Facebook className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: <Instagram className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      name: "X",
      href: "#",
      icon: <Twitter className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      name: "Linkedin",
      href: "#",
      icon: <Linkedin className="h-5 w-5 text-white" aria-hidden="true" />,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-20 sm:pt-12">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          {/* Subscribe */}
          <div className="w-max">
            <h1 className="font-semibold text-gray-500 text-xl">Exclusive</h1>
            <h3 className="text-sm font-semibold leading-6 text-white mt-4">
              Let's Subscribe
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              Get 10% off on every nth order.
            </p>
            <form className="mt-6 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>

              <div className="relative w-full">
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 pr-10 pl-3 py-1.5 text-base text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full outline-none"
                  placeholder="Enter your email"
                />
                <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <SendHorizonal className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* Supports, Account */}
          <div className="grid grid-cols-2 gap-8 xl:col-span-3">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-md font-semibold leading-6 text-white">
                  Supports
                </h3>
                <ul role="list" className="mt-6 space-y-3 text-white text-sm">
                  <li>
                    <span>
                      H.No. 7, Road No. 8, Patel Nagar, Patna - 800024
                    </span>
                  </li>
                  <li>
                    <span>dipkfilms@gmail.com</span>
                  </li>
                  <li>
                    <span>+91-8757210196</span>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-md font-semibold leading-6 text-white">
                  Account
                </h3>
                <ul role="list" className="mt-6 space-y-3">
                  {navigation.my_account.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Company, Download App */}
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-md font-semibold leading-6 text-white">
                  Quick Link
                </h3>
                <ul role="list" className="mt-6 space-y-3">
                  {navigation.quick_link.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-md font-semibold leading-6 text-white">
                  Download App
                </h3>
                <div className="mt-5 text-white">
                  <span className=" text-xs leading-6 text-gray-300">
                    Get 20% discount on new signup
                  </span>
                </div>
                <div className="flex space-x-4 mt-3">
                  <img src="/qr_code.png" alt="" className="flex-1" />
                  <div className="space-y-3">
                    <img src="/play_store.png" />
                    <img src="/apple_store.png" />
                  </div>
                </div>
                <div className="flex space-x-6 md:order-2 mt-4">
                  {navigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-500 hover:text-gray-400"
                    >
                      <span className="sr-only">{item.name}</span>
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 border-t border-white/10 pt-4 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-14">
          <p className="mt-8 text-sm leading-5 text-gray-400 md:order-1 md:mt-0 w-full text-center">
            &copy; 2023 Exclusive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
