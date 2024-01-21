import { classNames } from '@/utils';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from 'lucide-react';
import React from 'react';

const navigation = [
    { name: "Woman's Fashion", href: '#', children: true },
    { name: "Men's Fashion", href: '#', children: true },
    { name: 'Electronics', href: '#', children: false },
    { name: 'Home & Lifestyle', href: '#', children: false },
    { name: 'Medicine', href: '#', children: false },
    { name: 'Sports & Outdoor', href: '#', children: false },
    { name: "Baby's & Toys", href: '#', children: false },
    { name: 'Groceries & Pets', href: '#', children: false },
    { name: 'Health & Beauty', href: '#', children: false },
  ]

const LeftMenu = () => {
  return (
    <div className="w-max border-r-[1px] pr-8 pt-8">
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className="flex items-center justify-between w-60 text-left rounded-md px-2 gap-x-3 text-md leading-6 font-[400] text-black"
                          >
                            {item.name}
                            {item.children && <ChevronRightIcon
                              className="ml-auto h-5 w-5 shrink-0 text-black"
                              aria-hidden="true"
                            />}
                          </Disclosure.Button>
                        </>
                      )}
                    </Disclosure>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftMenu;

