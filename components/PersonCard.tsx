import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  imageUrl: string;
  name: string;
  description: string;
  linkedInUrl?: string;
  instagramUrl?: string;
  role: string;
}

const PersonCard = ({ imageUrl, name, description, role }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-md bg-gray-800 py-6 px-4 flex flex-col gap-2" onClick={() => setOpen(!open)}>
      <div className="w-40 h-40 sm:h-64 sm:w-64 overflow-hidden rounded-full mx-auto relative">
        <Image src={imageUrl} layout="fill" objectFit="cover" />
      </div>
      <h4 className="font-semibold text-center">{name}</h4>
      <p className="text-center">{role}</p>
      <div>
        {!open && <p className="primary-hover text-center text-sm opacity-50">More...</p>}
        <AnimatePresence>
          {open && (
            <motion.p
              initial={{ height: "0", opacity: 0.65 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: "0", opacity: 0.65 }}
              className="overflow-hidden">
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PersonCard;
