import React, { useContext } from "react";
import Card from "./Card";
import { ContactsContext } from "./Context";

function Contacts({search,category,status}) {
     const { contacts } = useContext(ContactsContext);
  
  return (
    <div className="mx-auto flex my-3 px-6 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">

          {contacts.length === 0 ? (
          <div className="col-span-full flex justify-center items-center text-gray-500 text-lg">
            No Contacts
          </div>
        ) : (
          <Card category={category} status={status} search={search}/>
           )
          }
        
      </div>
    </div>
  );
}

export default Contacts;